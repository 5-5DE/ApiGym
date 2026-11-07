"""Real Firefox QA of npm start. Stdlib protocol; existing Pillow checks PNG dimensions."""
import base64,json,pathlib,socket,subprocess,tempfile,time,os,signal,argparse
R=pathlib.Path(__file__).resolve().parent.parent;D=R/'reports/C0-I-browser';D.mkdir(exist_ok=True)
def freeport():
 with socket.socket() as s:s.bind(('127.0.0.1',0));return s.getsockname()[1]
parser=argparse.ArgumentParser();parser.add_argument('--firefox',default='/snap/firefox/current/usr/lib/firefox/firefox');args=parser.parse_args()
httpport,port=freeport(),freeport();profile=pathlib.Path(tempfile.mkdtemp(prefix='apigym-c0i-firefox-'));(profile/'user.js').write_text(f'user_pref("marionette.port",{port});\n')
appLog=open(D/'npm-start.txt','w');ffLog=open(D/'firefox.txt','w');sock=None
app=subprocess.Popen(['npm','start'],cwd=R,env={**os.environ,'HOST':'127.0.0.1','PORT':str(httpport),'API_KEY':''},stdout=appLog,stderr=appLog,start_new_session=True)
ff=subprocess.Popen([args.firefox,'--headless','--no-remote','--marionette','--profile',str(profile)],stdout=ffLog,stderr=ffLog)
report={'browser':'Firefox headless installed locally','branch':'consolidation/core-c0','serverCommand':'npm start (isolated loopback port)','checks':[]};seq=0
try:
 for _ in range(200):
  try:sock=socket.create_connection(('127.0.0.1',port),timeout=1);break
  except OSError:time.sleep(.1)
 if sock is None:raise RuntimeError('Browser unavailable')
 sock.settimeout(20)
 def recv():
  head=b''
  while not head.endswith(b':'):
   part=sock.recv(1)
   if not part:raise RuntimeError('Marionette closed')
   head+=part
  size=int(head[:-1]);raw=b''
  while len(raw)<size:raw+=sock.recv(size-len(raw))
  return json.loads(raw)
 report['handshake']=recv()
 def command(name,args=None):
  global seq;seq+=1;data=json.dumps([0,seq,name,args or {}]).encode();sock.sendall(str(len(data)).encode()+b':'+data);r=recv()
  if r[2]:raise RuntimeError(str(r[2]))
  return r[3].get('value',r[3]) if isinstance(r[3],dict) else r[3]
 def js(code):return command('WebDriver:ExecuteScript',{'script':code,'args':[]})
 def el(css):return command('WebDriver:FindElement',{'using':'css selector','value':css})['element-6066-11e4-a52e-4f735466cecf']
 def click(css):command('WebDriver:ElementClick',{'id':el(css)})
 def wait(code):
  for _ in range(250):
   if js(code):return
   time.sleep(.1)
  raise AssertionError('Wait failed: '+code)
 def check(name,code):assert js(code),name;report['checks'].append({'name':name,'passed':True})
 def search(text):
  command('WebDriver:ElementClear',{'id':el('input[name=q]')});command('WebDriver:ElementSendKeys',{'id':el('input[name=q]'),'text':text,'value':list(text)});click('#filters button');wait('return !document.querySelector("#status").textContent.includes("Cargando")&&!document.querySelector("#status").textContent.includes("cargando");')
 def shot(name,reset=True):
  if reset:js('window.scrollTo(0,0);return true;')
  (D/name).write_bytes(base64.b64decode(command('WebDriver:TakeScreenshot',{'id':None,'full':False,'scroll':False})))
 # Wait for our own app only; never touch an existing server or real profile.
 import urllib.request
 for _ in range(200):
  try:
   with urllib.request.urlopen(f'http://127.0.0.1:{httpport}/health',timeout=1) as r:
    if r.status==200:break
  except OSError:time.sleep(.1)
 session=command('WebDriver:NewSession',{'capabilities':{'alwaysMatch':{}}});report['version']=session['capabilities']['browserVersion'];command('WebDriver:SetWindowRect',{'width':1280,'height':1000});command('WebDriver:Navigate',{'url':f'http://127.0.0.1:{httpport}/'})
 wait('return document.querySelector("#status").textContent.includes("2069 ejercicios encontrados");')
 check('75 names / 73 instructions / 75 pending / 0 reviewed / 1994 fallback','return ["75 nombres en español","73 con instrucciones en español","75 nombres pendientes de revisión","0 traducciones con revisión acreditada","1994 nombres con fallback inglés"].every(t=>document.querySelector("#stats").textContent.includes(t));')
 check('all catalog cards progressively loaded','return document.querySelectorAll("#results .card").length===2069;');shot('catalog-counters.png')
 for id,title in [('flow-0372','Bíceps con mancuerna en banco predicador'),('flow-0599','Curl femoral sentado en máquina'),('Barbell_Squat','Sentadilla con barra')]:
  search(id);check(id+': exact one card',f'return document.querySelectorAll("#results .card").length===1 && document.querySelector("#results h2").textContent==={json.dumps(title)};')
  check(id+': draft visible','return document.querySelector("#results .name-status").textContent.includes("borrador sin revisión acreditada");');shot(id+'-card.png');click('#results button')
  check(id+': detail status','return document.querySelector("#detail").open && document.querySelector("#detail-body .name-status").textContent.includes("borrador");')
  if id.startswith('flow-'):
   check(id+': English instructions explicit','return document.querySelector("#detail-body").textContent.includes("instrucciones originales en inglés");')
   check(id+': legacy SVG style retained','return document.querySelector("#detail img").classList.contains("sketch") && document.querySelector("#detail img").classList.contains("demonstration");')
  else:check('Spanish instructions not falsely reviewed','return document.querySelector("#detail-body").textContent.includes("traducción automática sin revisión acreditada");')
  shot(id+'-detail.png');click('#close')
 search('3_4_Sit-Up');check('English fallback title explicit','return document.querySelector("#results .name-status").textContent.includes("Nombre original en inglés · traducción pendiente");');js('document.querySelector("#results").scrollIntoView();return true;');shot('english-fallback.png',False)
 search('biceps-mancuerna-predicador');check('Spanish aliases and normalization','return document.querySelector("#results").textContent.includes("Bíceps con mancuerna en banco predicador");')
 search('dumbbell preacher curl');check('English name search','return document.querySelector("#results").textContent.includes("Bíceps con mancuerna en banco predicador");')
 search('flow-0372');click('select[name=lang] option[value=en]');click('#filters button');wait('return document.querySelector("#results h2")?.textContent==="dumbbell preacher curl";')
 check('explicit English locale is original, not fallback error','return document.querySelector("#results .name-status").textContent==="Nombre original en inglés";')
 check('no experimental navigation','return ![...document.querySelectorAll("a")].some(a=>/atlas|anatomy|admin/.test(a.getAttribute("href")));')
 report['viewport']=js('return {width:innerWidth,height:innerHeight,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth};');assert report['viewport']['scrollWidth']<=report['viewport']['clientWidth'];report['status']='passed';command('WebDriver:DeleteSession');print('Core Firefox checks passed:',len(report['checks']),flush=True)
except Exception as e:report['status']='failed';report['error']=str(e);raise
finally:
 (D/'results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 if sock:sock.close()
 if ff.poll() is None:ff.terminate()
 try:ff.wait(timeout=10)
 except subprocess.TimeoutExpired:ff.kill();ff.wait()
 try:os.killpg(app.pid,signal.SIGTERM)
 except ProcessLookupError:pass
 try:app.wait(timeout=10)
 except subprocess.TimeoutExpired:os.killpg(app.pid,signal.SIGKILL);app.wait()
 appLog.close();ffLog.close()
