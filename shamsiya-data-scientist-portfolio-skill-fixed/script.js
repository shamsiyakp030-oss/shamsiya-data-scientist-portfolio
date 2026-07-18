const root=document.documentElement;
const themeToggle=document.getElementById('themeToggle');
const savedTheme=localStorage.getItem('portfolio-theme');
if(savedTheme) root.dataset.theme=savedTheme;
function syncTheme(){const light=root.dataset.theme==='light';themeToggle.innerHTML=light?'<span>☾</span><b>Dark</b>':'<span>☀</span><b>Light</b>';}
syncTheme();
themeToggle.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='light'?'dark':'light';localStorage.setItem('portfolio-theme',root.dataset.theme);syncTheme();});
const menuBtn=document.getElementById('menuBtn'),navLinks=document.getElementById('navLinks');
menuBtn.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.textContent=open?'×':'☰';});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuBtn.textContent='☰';}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const form=document.getElementById('contactForm');
form.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('name').value.trim(),email=document.getElementById('email').value.trim(),subject=document.getElementById('subject').value.trim(),message=document.getElementById('message').value.trim(),status=document.getElementById('formStatus');if(!name||!email||!subject||!message){status.textContent='Please complete all fields.';return;}status.textContent='Opening your email application…';const body=`Hello Shamsiya,\n\n${message}\n\nFrom: ${name} (${email})`;location.href=`mailto:shamsiyakp030@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;});
const chatLaunch=document.getElementById('chatLaunch'),chatbot=document.getElementById('chatbot'),chatClose=document.getElementById('chatClose'),chatMessages=document.getElementById('chatMessages'),chatInput=document.getElementById('chatInput'),chatSend=document.getElementById('chatSend');
function toggleChat(force){const open=typeof force==='boolean'?force:!chatbot.classList.contains('open');chatbot.classList.toggle('open',open);chatbot.setAttribute('aria-hidden',String(!open));chatLaunch.setAttribute('aria-expanded',String(open));if(open)setTimeout(()=>chatInput.focus(),150)}
chatLaunch.addEventListener('click',()=>toggleChat());chatClose.addEventListener('click',()=>toggleChat(false));
const answers={about:'Shamsiya KP is an AI & Data Science professional with a B.Sc. in Physics and a Diploma in AI & Data Science. She builds analytics, machine learning and AI applications.',projects:'Her featured projects include a Professional AI Research Assistant, Netflix AI Recommendation, Flight Ticket Price Prediction, Crypto Market Prediction, Wellness Centre Analysis and a Cat vs Dog Classifier.',skills:'Her main skills are Python, SQL, Power BI, Pandas, NumPy, Scikit-learn, TensorFlow, Keras, Streamlit, NLP, semantic search, FAISS, Transformers, data cleaning and EDA.',contact:'You can reach Shamsiya at shamsiyakp030@gmail.com, connect on LinkedIn, or use the contact form on this page.',education:'Shamsiya completed a B.Sc. in Physics at the University of Calicut and a Diploma in AI & Data Science at IQJITA Innovative LLP.',github:'Shamsiya has 23+ public GitHub repositories covering AI, machine learning, data science, analytics and Streamlit applications.'};
function addMessage(text,type='bot'){const div=document.createElement('div');div.className=type;div.textContent=text;chatMessages.appendChild(div);chatMessages.scrollTop=chatMessages.scrollHeight;}
function answer(q){const s=q.toLowerCase();let text='I can help with Shamsiya’s profile, projects, skills, education, GitHub or contact information.';if(/about|who|yourself/.test(s))text=answers.about;else if(/project|work|demo/.test(s))text=answers.projects;else if(/skill|technology|tech/.test(s))text=answers.skills;else if(/contact|email|linkedin|hire/.test(s))text=answers.contact;else if(/education|degree|diploma|physics/.test(s))text=answers.education;else if(/github|repo/.test(s))text=answers.github;setTimeout(()=>addMessage(text),220)}
function send(){const value=chatInput.value.trim();if(!value)return;addMessage(value,'user');chatInput.value='';answer(value)}
chatSend.addEventListener('click',send);chatInput.addEventListener('keydown',e=>{if(e.key==='Enter')send()});document.querySelectorAll('.quick button').forEach(btn=>btn.addEventListener('click',()=>{addMessage(btn.textContent,'user');answer(btn.textContent)}));


// Professional motion background and interaction effects
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionCanvas=document.getElementById('motionCanvas');
const cursorGlow=document.getElementById('cursorGlow');
const siteHeader=document.querySelector('.site-header');

if(!reduceMotion && motionCanvas){
  const ctx=motionCanvas.getContext('2d');
  let width=0,height=0,dpr=1,particles=[],pointer={x:innerWidth/2,y:innerHeight/2,active:false};
  const particleCount=()=>Math.max(34,Math.min(82,Math.floor(innerWidth/18)));
  function resizeCanvas(){
    dpr=Math.min(window.devicePixelRatio||1,2);width=innerWidth;height=innerHeight;
    motionCanvas.width=Math.floor(width*dpr);motionCanvas.height=Math.floor(height*dpr);
    motionCanvas.style.width=width+'px';motionCanvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
    const count=particleCount();
    particles=Array.from({length:count},(_,i)=>particles[i]||{
      x:Math.random()*width,y:Math.random()*height,
      vx:(Math.random()-.5)*.24,vy:(Math.random()-.5)*.24,
      r:Math.random()*1.7+.6,phase:Math.random()*Math.PI*2
    });
  }
  function drawMotion(t){
    ctx.clearRect(0,0,width,height);
    const light=root.dataset.theme==='light';
    const dot=light?'rgba(79,70,229,.30)':'rgba(125,211,252,.32)';
    const line=light?'rgba(99,102,241,.09)':'rgba(139,92,246,.10)';
    particles.forEach((p,i)=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<-20)p.x=width+20;if(p.x>width+20)p.x=-20;if(p.y<-20)p.y=height+20;if(p.y>height+20)p.y=-20;
      if(pointer.active){const dx=p.x-pointer.x,dy=p.y-pointer.y,dist=Math.hypot(dx,dy);if(dist<150&&dist>0){p.x+=dx/dist*.18;p.y+=dy/dist*.18}}
      const pulse=.78+Math.sin(t*.0012+p.phase)*.22;
      ctx.beginPath();ctx.fillStyle=dot;ctx.arc(p.x,p.y,p.r*pulse,0,Math.PI*2);ctx.fill();
      for(let j=i+1;j<particles.length;j++){
        const q=particles[j],dx=p.x-q.x,dy=p.y-q.y,d2=dx*dx+dy*dy;
        if(d2<11800){ctx.beginPath();ctx.strokeStyle=line;ctx.lineWidth=1-Math.sqrt(d2)/110;ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}
      }
    });
    requestAnimationFrame(drawMotion);
  }
  resizeCanvas();requestAnimationFrame(drawMotion);
  addEventListener('resize',resizeCanvas,{passive:true});
  addEventListener('pointermove',e=>{pointer={x:e.clientX,y:e.clientY,active:true};if(cursorGlow){cursorGlow.style.transform=`translate3d(${e.clientX-140}px,${e.clientY-140}px,0)`;cursorGlow.style.opacity='1'}},{passive:true});
  addEventListener('pointerleave',()=>{pointer.active=false;if(cursorGlow)cursorGlow.style.opacity='0'},{passive:true});
}

let lastScroll=0;
addEventListener('scroll',()=>{
  const y=scrollY;
  siteHeader?.classList.toggle('scrolled',y>24);
  lastScroll=y;
},{passive:true});

if(!reduceMotion){
  const heroPhoto=document.querySelector('.hero-photo');
  heroPhoto?.addEventListener('pointermove',e=>{
    const rect=heroPhoto.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width-.5;
    const y=(e.clientY-rect.top)/rect.height-.5;
    heroPhoto.querySelector('.photo-orbit')?.style.setProperty('transform',`translate3d(${x*10}px,${y*10}px,0) rotateY(${x*4}deg) rotateX(${-y*4}deg)`);
  });
  heroPhoto?.addEventListener('pointerleave',()=>heroPhoto.querySelector('.photo-orbit')?.style.removeProperty('transform'));

  document.querySelectorAll('.project-card,.skill-card,.role-strip article').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${-y*2.2}deg) rotateY(${x*2.2}deg) translateY(-5px)`;
    });
    card.addEventListener('pointerleave',()=>card.style.removeProperty('transform'));
  });
}

// Reliable skills animation: progress bars and percentage count-up
(function initialiseSkillAnimation(){
  const cards=[...document.querySelectorAll('.skill-card')];
  if(!cards.length) return;
  const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCard(card){
    if(card.dataset.skillDone==='true') return;
    card.dataset.skillDone='true';
    const bar=card.querySelector('.meter i');
    const number=card.querySelector('.skill-top b[data-target]');
    const target=Math.max(0,Math.min(100,Number(number?.dataset.target || bar?.dataset.level || 0)));
    if(bar){
      bar.style.setProperty('--skill-level',target+'%');
      requestAnimationFrame(()=>card.classList.add('skill-animated'));
    }
    if(!number) return;
    if(prefersReduced){number.textContent=target+'%';return;}
    const duration=1200;
    const start=performance.now();
    function tick(now){
      const progress=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-progress,3);
      number.textContent=Math.round(target*eased)+'%';
      if(progress<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if(!('IntersectionObserver' in window)){
    cards.forEach(animateCard);
    return;
  }
  const skillObserver=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){animateCard(entry.target);observer.unobserve(entry.target);}
    });
  },{threshold:0.25,rootMargin:'0px 0px -8% 0px'});
  cards.forEach(card=>skillObserver.observe(card));

  // Fallback for pages opened directly at #skills or restored mid-page.
  setTimeout(()=>cards.forEach(card=>{
    const r=card.getBoundingClientRect();
    if(r.top<innerHeight && r.bottom>0) animateCard(card);
  }),350);
})();
