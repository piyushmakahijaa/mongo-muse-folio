# MongoDB Portfolio Hub

i wanted to build a portfolio so you gave me this html file (analyse it)
but i want it to be more mongodb themed
the design that i have gave is good but too common nowadays, gimme something mongo db themed but something more innovative into it ,
i mean i loved current design take inspiration from current design and see what we could add into mongodb themed
ive also attached my resume for referece


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Piyush Makhija — preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#0b0c10; --bg-alt:#101218; --surface:#15171e; --border:#262932;
    --text:#e9e6df; --text-dim:#8b8f9a;
    --mongo:#5fa87a; --mongo-dim:#274a34;
    --sql:#6c8fd1; --sql-dim:#26375c;
    --post:#cd8358; --post-dim:#4a301f;
    --lav:#9089c9;
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  body{
    background:var(--bg); color:var(--text);
    font-family:'Inter',sans-serif;
    line-height:1.6;
  }
  code, .mono{ font-family:'JetBrains Mono', monospace; }

  /* topbar */
  .topbar{
    display:flex; align-items:center; justify-content:space-between;
    padding:18px 40px; border-bottom:1px solid var(--border);
    background:var(--bg-alt);
  }
  .logo{ font-family:'JetBrains Mono',monospace; font-size:14px; color:var(--text-dim); }
  .logo span{ color:var(--lav); }
  nav{ display:flex; gap:28px; }
  .nav-item{
    display:flex; align-items:center; gap:7px;
    font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--text-dim);
    text-decoration:none; cursor:pointer;
  }
  .dot{ width:6px; height:6px; border-radius:50%; }
  .dot.home{ background:var(--lav); }
  .dot.proj{ background:var(--mongo); }
  .dot.about{ background:var(--sql); }
  .dot.contact{ background:var(--post); }
  .nav-item:hover{ color:var(--text); }

  /* hero */
  .hero{ padding:64px 40px 40px; max-width:760px; }
  .terminal{
    background:var(--surface); border:1px solid var(--border);
    border-radius:8px; overflow:hidden;
  }
  .term-head{
    display:flex; align-items:center; gap:8px;
    padding:10px 14px; border-bottom:1px solid var(--border);
  }
  .term-head .tdot{ width:10px; height:10px; border-radius:50%; background:#333644; }
  .term-title{ margin-left:8px; font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--text-dim); }
  .term-body{ padding:22px 20px; font-family:'JetBrains Mono',monospace; font-size:14px; min-height:150px; }
  .term-body .ln{ margin-bottom:10px; white-space:pre-wrap; }
  .prompt{ color:var(--lav); }
  .out{ color:var(--text-dim); }
  .cursor{
    display:inline-block; width:8px; height:15px; background:var(--text);
    vertical-align:text-bottom; animation:blink 1s step-end infinite;
  }
  @keyframes blink{ 50%{ opacity:0; } }

  /* projects preview */
  .section{ padding:20px 40px 80px; max-width:760px; }
  .section-label{
    font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--mongo);
    text-transform:uppercase; letter-spacing:.08em; margin-bottom:14px;
  }
  .query-bar{
    display:flex; align-items:center; gap:12px;
    background:var(--bg-alt); border:1px solid var(--border); border-radius:6px;
    padding:12px 16px; margin-bottom:26px;
  }
  .query-bar code{ font-size:13px; color:var(--mongo); flex:1; }
  .chip{
    font-family:'JetBrains Mono',monospace; font-size:11px;
    padding:3px 9px; border-radius:100px; background:var(--mongo-dim); color:var(--mongo);
    opacity:0; transition:opacity .3s ease;
  }
  .chip.show{ opacity:1; }

  .cards{ display:flex; flex-direction:column; gap:14px; }
  .card{
    background:var(--surface); border:1px solid var(--border); border-radius:8px;
    padding:18px 20px; opacity:0; transform:translateY(10px);
    transition:opacity .5s ease, transform .5s ease, border-color .2s ease;
  }
  .card.visible{ opacity:1; transform:translateY(0); }
  .card:hover{ border-color:var(--mongo-dim); }
  .card-id{ font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--text-dim); margin-bottom:6px; }
  .card-id b{ color:var(--mongo); font-weight:500; }
  .card-title{ font-size:16px; font-weight:600; margin-bottom:6px; }
  .card-desc{ font-size:14px; color:var(--text-dim); margin-bottom:12px; }
  .tags{ display:flex; flex-wrap:wrap; gap:8px; }
  .tag{
    font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--text-dim);
    border:1px solid var(--border); padding:3px 8px; border-radius:4px;
  }

  .teaser{ display:flex; gap:12px; margin-top:36px; }
  .teaser-chip{
    flex:1; font-family:'JetBrains Mono',monospace; font-size:12px;
    border:1px dashed var(--border); border-radius:6px; padding:12px 14px; color:var(--text-dim);
  }
  .teaser-chip b{ display:block; font-size:11px; margin-bottom:4px; }
  .teaser-chip.about b{ color:var(--sql); }
  .teaser-chip.contact b{ color:var(--post); }

  @media (prefers-reduced-motion: reduce){
    .cursor{ animation:none; }
    .card{ transition:none; }
  }




  


    

piyush@</span>makhija<span>:~$</span></div>
    
      

home


      

projects


      

about


      

contact


    
  

  


    


      


        


        

piyush@portfolio: ~
      
      
    
  

  


    

projects.find()


    


      
      200 OK
    


    


      


        

_id: ObjectId("devtinder")


        

devTinder


        

Full-stack MERN app — JWT-secured REST APIs, real-time chat and WebRTC video calling, deployed via GitHub Actions CI/CD to AWS EC2.


        

Node.jsSocket.IOWebRTCAWS EC2


      


      


        

_id: ObjectId("regit")


        

Regit


        

Platform for adopting unfinished engineering projects — AI module for project health analysis and auto-generated pitch decks.


        

MongoDBReactOpenRouterAI


      


      


        

_id: ObjectId("bird_species")


        

Bird species recognition system


        

Full-stack AI platform identifying bird species from images and audio, backed by a ResNet50 classifier and a Flask microservice.


        

PyTorchFlaskReact.js


      


    



    


      

about.htmlSELECT * FROM piyush WHERE role = 'developer';


      

contact.htmlPOST /contact  →  201 Created

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mongo-muse-folio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3a0d4f8f-f5e2-4aef-a669-4fdff5617681).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
