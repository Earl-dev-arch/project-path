const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const STORE={user:"yp_user_v3",answers:"yp_answers_v3",saved:"yp_saved_v3",cookie:"yp_cookie_v3",session:"yp_question_session_v3"};
const state={user:JSON.parse(localStorage.getItem(STORE.user)||"null"),answers:JSON.parse(localStorage.getItem(STORE.answers)||"{}"),saved:JSON.parse(localStorage.getItem(STORE.saved)||"[]"),session:JSON.parse(localStorage.getItem(STORE.session)||"null"),qIndex:0};

const categoryConfig=[
 {id:"interests",label:"Genuine interests",weight:14,types:["scenario","single","multi"]},
 {id:"subjects",label:"Subjects & curiosity",weight:10,types:["multi","single","open"]},
 {id:"problem",label:"Problem solving",weight:12,types:["scenario","scale","single"]},
 {id:"creativity",label:"Creativity",weight:9,types:["scenario","single","open"]},
 {id:"communication",label:"Communication & people",weight:10,types:["scenario","single","rank"]},
 {id:"workstyle",label:"Working style",weight:11,types:["single","scale","scenario"]},
 {id:"motivation",label:"Motivation",weight:9,types:["single","scenario","open"]},
 {id:"learning",label:"Learning environment",weight:8,types:["single","scale","rank"]},
 {id:"pressure",label:"External pressure",weight:9,types:["scenario","single","open"]},
 {id:"values",label:"Values & long-term direction",weight:8,types:["single","scenario","open"]}
];

const contexts=[
"when you have a free weekend","during a school project","when nobody is grading you","when you are choosing an extracurricular activity","when you discover a new topic online"
];

const seedByCategory={
interests:[
"What activity would you naturally keep doing after the first hour because you are genuinely absorbed?",
"If you had to spend a month exploring one unfamiliar area, which kind of exploration would hold your attention?",
"Which type of question makes you want to search for the answer instead of moving on?",
"When a hobby becomes difficult, what usually makes you continue?",
"What kind of result makes you feel that an activity was worth your time?",
"Which type of project would you open voluntarily without being assigned it?",
"What topic could you imagine discussing for a long time without needing external praise?",
"When you see someone demonstrating a skill, what makes you want to try it yourself?",
"Which activity gives you the strongest feeling of curiosity rather than obligation?",
"What kind of challenge would you choose if several options were equally available?",
"Which part of a new field do you usually want to understand first?",
"What kind of problem makes you lose track of time?",
"Which type of content do you most often return to after discovering it once?",
"When you have a completely open afternoon, what kind of activity is most tempting?",
"What kind of project would you be willing to restart after failing the first attempt?",
"Which kind of discovery feels most satisfying to you?",
"What makes you think, 'I want to learn how to do that'?",
"Which activity would you keep exploring even if your friends were uninterested?",
"Which kind of curiosity has stayed with you for more than a few months?",
"What would you choose to investigate if there were no reward, grade, status or audience?"
],
subjects:[
"Which school subject would you choose to study more deeply if you could remove grades from the decision?",
"Which subject has concepts you enjoy connecting with real-world examples?",
"When a lesson is difficult, which kind of subject makes you most willing to persist?",
"Which combination of subjects feels most interesting when you imagine studying them together?",
"What kind of school assignment do you tend to improve beyond the minimum?",
"Which subject would you like to understand well enough to teach someone else?",
"Which subject would you choose for an independent mini-project?",
"Which type of class makes you ask follow-up questions most often?",
"Which subject would you miss most if it disappeared from your schedule?",
"Which subject feels most useful for solving real problems you care about?",
"Which subject do you enjoy even when the teacher is not especially entertaining?",
"Which subject-related skill would you like to become noticeably stronger at?",
"Which subject creates the most interesting questions for you outside class?",
"Which subject would you combine with technology, design or business?",
"Which school topic have you explored voluntarily outside the curriculum?",
"Which subject would you investigate through a documentary, book or experiment?",
"Which subject has changed the way you look at everyday situations?",
"Which subject feels difficult but still rewarding?",
"Which subject would you choose if you could design your own elective?",
"Which subject area could you imagine studying for several years without needing a quick payoff?"
],
problem:[
"When a problem has no obvious answer, what is your first instinct?",
"When a solution fails, what do you naturally do next?",
"Which part of solving a complicated problem feels most satisfying?",
"When several explanations are possible, how do you decide what to investigate first?",
"What kind of puzzle or challenge keeps your attention longest?",
"How do you react when a problem requires several attempts before it works?",
"When instructions are incomplete, what do you tend to do?",
"Which approach sounds most natural when a system is behaving unexpectedly?",
"How do you handle a task that looks too large to finish at first?",
"What makes you trust that a solution is actually working?",
"When you notice a mistake, what do you want to know before fixing it?",
"Which kind of evidence helps you change your mind about a solution?",
"When two good solutions exist, what usually matters most to you?",
"How do you approach a problem where people disagree about the cause?",
"What part of debugging or troubleshooting do you find most interesting?",
"How comfortable are you breaking a large problem into smaller tests?",
"What kind of problem would you willingly solve just for the challenge?",
"When a solution works by accident, what are you most likely to do?",
"How do you respond when a familiar method stops working?",
"What kind of problem would you like to become unusually good at solving?"
],
creativity:[
"When you are asked to make something original, where do your ideas usually come from?",
"What kind of creative constraint makes you more interested rather than less interested?",
"When you see a design you like, what do you notice first?",
"Which kind of creative project would you keep refining after it was technically finished?",
"How do you react when someone critiques something you created?",
"What kind of medium would you choose to communicate an idea?",
"When a blank page feels intimidating, what helps you start?",
"Which part of creating something feels best: imagining, making, testing or polishing?",
"What kind of unusual combination of ideas sounds fun to explore?",
"When you redesign something, what do you focus on first?",
"Which creative task would you try without worrying whether you are already good at it?",
"How important is personal style when you make something?",
"What kind of feedback makes you want to improve a creative project?",
"Which kind of visual, written or interactive work grabs your attention?",
"When a creative project has no single correct answer, how do you feel?",
"What would you create if you had to teach an idea without using a normal lecture?",
"How often do you find yourself changing an existing idea to make it your own?",
"Which type of creativity feels most natural: visual, technical, verbal, social or practical?",
"What kind of project would you proudly show someone even if it were unfinished?",
"What creative skill would you most like to develop over the next two years?"
],
communication:[
"When working with other people, which contribution feels most natural?",
"How do you usually explain something complicated to someone who is new to it?",
"What kind of conversation makes you want to learn more about another person?",
"When a group disagrees, what role do you tend to take?",
"How comfortable are you asking for clarification when you do not understand?",
"What makes communication feel satisfying to you?",
"When someone is struggling with a task, what do you naturally do?",
"Which kind of group project would you choose voluntarily?",
"How do you react when you need to present an idea to unfamiliar people?",
"What kind of feedback are you most comfortable giving?",
"When someone has a different viewpoint, what makes you curious rather than frustrated?",
"Which communication skill would most improve your future work?",
"How do you balance listening with getting your own idea across?",
"What kind of person do you find easiest to collaborate with?",
"Which role sounds most natural in a team: explainer, organizer, researcher, builder or mediator?",
"When a team succeeds, which part of the process gives you the most satisfaction?",
"How do you prefer to resolve misunderstandings?",
"What kind of audience would you enjoy communicating with?",
"How much do you enjoy helping someone understand something they previously found confusing?",
"What kind of leadership communication would you like to become better at?"
],
workstyle:[
"When you have control over how a task gets done, which structure suits you?",
"How much uninterrupted time do you prefer before checking in with other people?",
"When priorities change suddenly, what helps you stay productive?",
"Which environment would make it easiest for you to do your best work?",
"How do you prefer to divide a large project?",
"What balance between routine and variety feels comfortable?",
"When you have several tasks, how do you decide what to do first?",
"How much autonomy do you want in choosing methods?",
"Which sounds better: a clearly defined task or a problem you must define yourself?",
"How do you feel about working on a project that changes direction repeatedly?",
"What kind of workspace helps you concentrate?",
"When deadlines are far away, what keeps you moving?",
"How do you prefer to receive instructions?",
"How comfortable are you switching between deep focus and social collaboration?",
"What kind of responsibility would you rather have?",
"How do you respond to repetitive work when it serves a larger goal?",
"What makes a workday feel satisfying to you?",
"Which schedule would let you use your strengths best?",
"How much structure do you need before starting an unfamiliar task?",
"What work pattern would you like to avoid in a future career?"
],
motivation:[
"Which outcome would make you feel that your effort was meaningful?",
"What kind of progress motivates you to keep going?",
"Which reward matters least to you when deciding whether to pursue an activity?",
"What makes you willing to practice a difficult skill for months?",
"When a task is boring but useful, what helps you finish it?",
"Which kind of recognition feels genuinely satisfying rather than merely impressive?",
"What would make you choose a harder path over an easier one?",
"How important is visible progress to your motivation?",
"What makes you proud of your work?",
"Which kind of goal would you willingly set for yourself?",
"When nobody notices your effort, what keeps you working?",
"Which matters more when choosing a project: impact, mastery, freedom, creativity or stability?",
"What makes you lose motivation quickly?",
"How do you react when progress is slower than expected?",
"What kind of challenge gives you a sense of purpose?",
"Which future outcome would you work toward even if it took years?",
"How much does competition motivate you?",
"What kind of independence matters most to you?",
"What makes a successful result feel personally meaningful?",
"If money and status were equal across careers, what would you optimize for?"
],
learning:[
"When learning a new skill, what do you want to do first?",
"How do you know when you genuinely understand something?",
"Which learning format keeps you engaged longest?",
"What do you do when an explanation does not make sense?",
"How much trial and error do you like when learning?",
"When you find a gap in your knowledge, what do you do?",
"How do you prefer to practice a new skill?",
"What kind of teacher or mentor helps you learn best?",
"How much theory do you want before applying an idea?",
"Which type of project teaches you the most?",
"How do you prefer to prepare for a difficult assessment?",
"When you learn from the internet, what makes a source feel trustworthy?",
"How comfortable are you teaching yourself from multiple sources?",
"What helps you remember something for a long time?",
"How do you respond to feedback while learning?",
"Which is more satisfying: understanding a concept or mastering a procedure?",
"How much freedom do you want to choose what to learn next?",
"What do you do when you become interested in a topic outside school?",
"How do you prefer to measure your progress?",
"What learning habit would you most like to strengthen?"
],
pressure:[
"When people around you strongly prefer a particular career for you, what happens to your own preference?",
"If a prestigious career did not impress anyone, how interested would you remain?",
"When friends choose a popular field, how much does that affect your curiosity?",
"How often do salary discussions change how you think about a career?",
"If your family expected one path, what would you want to investigate before agreeing?",
"How confident are you that your current career preference comes from your own experiences?",
"What information might be missing from your current view of careers?",
"When someone says a career is 'the future,' what do you do with that claim?",
"How much does social media influence what careers seem attractive?",
"If a career were respected but its daily tasks bored you, what would you do?",
"When adults give career advice, what kind of evidence would you want from them?",
"How often do you compare your future with classmates' plans?",
"What would make you reconsider a career you chose mainly for status?",
"If a career paid less but matched your interests much better, what would you investigate?",
"How much do you feel you need a career choice that others can easily explain?",
"What would you choose to explore if nobody could see the result?",
"How comfortable are you saying 'I don't know yet' about your career?",
"Which pressure is hardest to notice: family, peers, trends, money or lack of information?",
"How often do you choose something because it seems safe rather than interesting?",
"What would help you separate your own preference from other people's expectations?"
],
values:[
"What kind of contribution would you like your future work to make?",
"Which trade-off would you think about most when choosing an education path?",
"What does a good life look like beyond a job title?",
"How important is flexibility when imagining your adult life?",
"What kind of problem in society would you like your work to help address?",
"Which matters most: stability, autonomy, impact, mastery, creativity or community?",
"What kind of environment would you want to spend most of your working life in?",
"How important is geographic freedom to your future plans?",
"What would make you change your mind about a long-term goal?",
"Which future skill do you think will remain useful across many careers?",
"What kind of person do you hope your education helps you become?",
"How much uncertainty are you comfortable accepting for a meaningful opportunity?",
"What does financial security mean to you?",
"How important is time outside work when thinking about a career?",
"Which kind of responsibility would you be proud to carry?",
"What would make an education pathway feel worth the effort?",
"How important is the ability to keep learning throughout adulthood?",
"What kind of legacy, if any, would you want your work to leave?",
"Which constraint would most affect your education choices: location, cost, time, family needs or academic requirements?",
"What do you want your future career to leave room for?"
]};

const answerSets={
single:["I would choose it naturally","I would probably try it","I might choose it if it had a clear purpose","I would avoid it unless required","I am genuinely unsure"],
multi:["Building or making","Researching or analyzing","Creating or designing","Explaining or teaching","Helping or organizing","Experimenting","Writing or communicating","Leading or coordinating"],
scale:null,scenario:["Explore the problem first","Start making a small experiment","Ask someone and compare perspectives","Research examples and evidence","Break it into steps and test each one"],open:null,rank:["Most natural","Second most natural","Middle","Less natural","Least natural"]
};

function makeQuestionBank(){
 const bank=[];let id=1;
 for(const cfg of categoryConfig){
   const seeds=seedByCategory[cfg.id];
   seeds.forEach((seed,si)=>{
     contexts.forEach((ctx,ci)=>{
       const type=cfg.types[(si+ci)%cfg.types.length];
       let q={id:`Q${String(id).padStart(4,"0")}`,category:cfg.id,categoryLabel:cfg.label,weight:cfg.weight,type,prompt:`${seed} ${ctx}.`,sourceWeight:cfg.weight};
       if(type==="single"||type==="scenario") q.options=type==="scenario"?answerSets.scenario:answerSets.single;
       if(type==="multi") q.options=answerSets.multi;
       if(type==="scale") q.scaleLabels=["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"];
       if(type==="rank") q.options=["Solving a difficult problem","Creating something original","Explaining an idea","Investigating evidence","Leading a group"];
       bank.push(q);id++;
     });
   });
 }
 return bank;
}
const QUESTION_BANK=makeQuestionBank(); // exactly 1,000 generated deep prompts
const TOTAL_BANK=QUESTION_BANK.length;

function weightedSession(){
 // Weighted sampling without replacement using an exponential-race key.
 // Each question has the category's configured first-draw weight.
 const candidates=QUESTION_BANK.map(q=>({q,key:-Math.log(Math.max(Math.random(),1e-12))/q.weight}));
 candidates.sort((a,b)=>a.key-b.key);
 let selected=candidates.slice(0,20).map(x=>x.q);
 // Ensure every dimension can appear at least once; replace the weakest duplicate-category picks if needed.
 const present=new Set(selected.map(q=>q.category));
 for(const cfg of categoryConfig){
   if(present.has(cfg.id)) continue;
   const replacement=QUESTION_BANK.filter(q=>q.category===cfg.id&&!selected.some(s=>s.id===q.id))[Math.floor(Math.random()*100)];
   const counts={};selected.forEach(q=>counts[q.category]=(counts[q.category]||0)+1);
   let idx=selected.length-1;let weakest=Infinity;
   for(let i=0;i<selected.length;i++){if(counts[selected[i].category]>1 && candidates.find(x=>x.q.id===selected[i].id)?.key<weakest){weakest=candidates.find(x=>x.q.id===selected[i].id)?.key;idx=i}}
   selected[idx]=replacement;present.add(cfg.id);
 }
 return shuffle(selected);
}
function shuffle(a){return a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1])}
function newSession(){state.session={ids:weightedSession().map(q=>q.id),started:Date.now()};state.answers={};state.qIndex=0;saveState()}
function saveState(){localStorage.setItem(STORE.user,JSON.stringify(state.user));localStorage.setItem(STORE.answers,JSON.stringify(state.answers));localStorage.setItem(STORE.saved,JSON.stringify(state.saved));localStorage.setItem(STORE.session,JSON.stringify(state.session))}
function sessionQuestions(){return state.session?.ids?.map(id=>QUESTION_BANK.find(q=>q.id===id)).filter(Boolean)||[]}
function ensureSession(){if(!state.session||state.session.ids?.length!==20)newSession()}

function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove("show"),2400)}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function showPage(id){$$(".page").forEach(x=>x.classList.remove("active"));$("#"+id)?.classList.add("active");window.scrollTo({top:0,behavior:"smooth"});$("#mobileNav").classList.remove("open")}
function openModal(id){$("#"+id).classList.remove("hidden")}
function closeModal(id){$("#"+id).classList.add("hidden")}
function switchAuth(type){$$(".auth-tabs button").forEach(b=>b.classList.toggle("active",b.dataset.auth===type));$("#loginBox").classList.toggle("hidden",type!=="login");$("#signupBox").classList.toggle("hidden",type!=="signup")}

$$("[data-page]").forEach(a=>a.onclick=e=>{e.preventDefault();showPage(a.dataset.page)});
$("#hamb").onclick=()=>$("#mobileNav").classList.toggle("open");
$("#heroStart").onclick=()=>{if(requireLogin()){goTab("questionnaire")}};
$("#roadmapStart").onclick=()=>{if(requireLogin()){showPage("dashboard");goTab("roadmaps")}};
$$("[data-scroll]").forEach(b=>b.onclick=()=>document.querySelector(b.dataset.scroll)?.scrollIntoView({behavior:"smooth"}));
$("#loginBtn").onclick=()=>{openModal("authModal");switchAuth("login")};
$("#signupBtn").onclick=()=>{openModal("authModal");switchAuth("signup")};
$$("[data-close]").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
$("#privacyBtn").onclick=$("#privacyFoot").onclick=()=>openModal("privacyModal");

function requireLogin(){if(!state.user){openModal("authModal");switchAuth("login");toast("Log in or create an account to continue.");return false}showPage("dashboard");return true}
function goTab(name){if(!state.user)return;$$(".side").forEach(x=>x.classList.toggle("active",x.dataset.tab===name));$$(".tab").forEach(x=>x.classList.toggle("active",x.id==="tab-"+name));if(name==="questionnaire")renderQuestion();if(name==="analysis")renderAnalysis();if(name==="pathways")renderPathways();if(name==="roadmaps")renderRoadmap();if(name==="saved")renderSaved();if(name==="compare")renderCompare();if(name==="profile")loadProfile();if(name==="overview")renderOverview()}
$$("[data-tab]").forEach(b=>b.onclick=()=>{if(requireLogin())goTab(b.dataset.tab)});

$("#signupForm").onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());state.user={...d,role:"student",createdAt:Date.now()};state.answers={};newSession();saveState();closeModal("authModal");updateUI();showPage("dashboard");goTab("overview");requestAnimationFrame(()=>{document.getElementById("journeyBoard")?.scrollIntoView({behavior:"smooth",block:"start"});document.getElementById("journeyQuestionnaire")?.classList.add("current")});toast("Account created — your Your Path journey starts here!")};
$("#loginForm").onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());if(d.email==="admin@yourpath.demo"&&d.password==="admin123"){state.user={name:"Admin",email:d.email,role:"admin",grade:"College"}}else{state.user={name:d.email.split("@")[0],email:d.email,role:"student",grade:state.user?.grade||"Grade 10"}}ensureSession();saveState();closeModal("authModal");updateUI();showPage("dashboard");goTab("overview");toast("Logged in.")};
$("#logout").onclick=()=>{state.user=null;saveState();showPage("home");toast("Logged out.")};

function updateUI(){
 $("#welcome").textContent=`Welcome back, ${state.user?.name||"there"}! 👋`;
 $("#savedCount").textContent=state.saved.length;
 const answered=Object.keys(state.answers).length;$("#completion").textContent=`${Math.round(answered/20*100)}%`;
 $(".side.admin").style.display=state.user?.role==="admin"?"block":"none";
 renderOverview();renderPublic();
 renderInterestMap();
 renderJourney();
}
function renderJourney(){
 const user=state.user||{};
 const qs=sessionQuestions();
 const answered=qs.filter(q=>state.answers[q.id]!=null&&state.answers[q.id]!==""&&!(Array.isArray(state.answers[q.id])&&state.answers[q.id].length===0)).length;
 const complete=answered===20;
 const pct=Math.round(answered/20*100);
 const profile=document.getElementById("journeyProfileText");
 const qTitle=document.getElementById("journeyQTitle");
 const qText=document.getElementById("journeyQText");
 const aTitle=document.getElementById("journeyATitle");
 const aText=document.getElementById("journeyAText");
 const action=document.getElementById("journeyActionText");
 if(profile) profile.textContent=`${user.name||"Student"} • ${user.grade||"Grade not set"} • Account created`;
 if(qTitle) qTitle.textContent=complete?"20 / 20 completed":`${answered} / 20 answered`;
 if(qText) qText.textContent=complete?"Questionnaire complete. Your interest map and analysis are ready.":"Explore your genuine interests, preferences and motivations.";
 if(aTitle) aTitle.textContent=complete?"Analysis ready":"Waiting for answers";
 if(aText) aText.textContent=complete?"Your responses can now be reviewed for patterns, contradictions and uncertainty.":"Complete the questionnaire before interpreting your responses.";
 if(action) action.textContent=complete?"Choose one small experiment from your roadmap and track what you learn.":"Start by answering the questionnaire, then choose an action based on what you discover.";
 const ids=["journeyQuestionnaire","journeyAnalysis","journeyPathways","journeyRoadmap","journeyAction"];
 ids.forEach(id=>document.getElementById(id)?.classList.remove("current","done"));
 const jq=document.getElementById("journeyQuestionnaire");
 if(complete) jq?.classList.add("done"); else jq?.classList.add("current");
 if(complete){["journeyAnalysis","journeyPathways"].forEach(id=>document.getElementById(id)?.classList.add("current"));}
 // The first three journey stages become complete as the student progresses.
 if(complete){document.getElementById("journeyQuestionnaire")?.classList.add("done");}
}

function renderOverview(){
 const p=pathways.slice(0,4);$("#topPaths").innerHTML=p.map(x=>`<div class="path-mini"><span class="path-icon">${x.icon}</span><span><b>${x.name}</b><small>${x.tag}</small></span></div>`).join("");
}
function renderInterestMap(){
 const fill=$("#radarFill"), status=$("#interestStatus"), bars=$("#interestBars");
 if(!fill||!status||!bars)return;
 const qs=sessionQuestions();
 const answeredQs=qs.filter(q=>state.answers[q.id]!=null&&state.answers[q.id]!==""&&!(Array.isArray(state.answers[q.id])&&state.answers[q.id].every(v=>v==="")));
 const complete=answeredQs.length===20;
 if(!complete){
   fill.classList.remove("ready");
   status.textContent=`${answeredQs.length}/20 answered`;
   bars.innerHTML="<div class=\"muted\">Finish all 20 questions to reveal your interest profile.</div>";
   return;
 }
 // This is an explainable prototype signal map, not a scientific personality score.
 const axes=["Analytical","Creative","People","Learning","Curiosity"];
 const scores=Object.fromEntries(axes.map(a=>[a,1]));
 const axisByCategory={
   interests:{Curiosity:3,Creative:1}, subjects:{Learning:2,Analytical:1}, problem:{Analytical:4,Curiosity:1},
   creativity:{Creative:5}, communication:{People:4,Creative:1}, leadership:{People:5}, motivation:{Learning:2,People:1},
   learning:{Learning:5,Curiosity:2}, pressure:{People:1,Curiosity:1}, values:{Curiosity:2,Learning:1}
 };
 const addText=(text)=>{
   const t=String(text||"").toLowerCase();
   const hits={analytical:["math","data","logic","solve","analysis","code","program","system","evidence","research","pattern","debug","science"],creative:["design","create","art","music","story","write","video","build","invent","creative","visual"],people:["people","help","teach","team","lead","communicate","community","listen","friend","customer"],learning:["learn","study","understand","read","course","practice","skill","knowledge","curious","explore"],curiosity:["why","how","discover","investigate","experiment","question","research","explore","new","curious"]};
   for(const [axis,words] of Object.entries(hits)){const n=words.reduce((a,w)=>a+(t.includes(w)?1:0),0);scores[axis]+=Math.min(n,3);}
 };
 answeredQs.forEach(q=>{
   const base=axisByCategory[q.category]||{};
   Object.entries(base).forEach(([axis,val])=>scores[axis]+=val);
   const val=state.answers[q.id];
   addText(Array.isArray(val)?val.join(" "):val);
   if(q.type==="scale" && Number(val)){const n=Number(val);scores.Learning+=n*.25;scores.Curiosity+=n*.25;}
 });
 const max=Math.max(...Object.values(scores));
 const normalized=Object.fromEntries(axes.map(a=>[a,Math.max(28,Math.round(scores[a]/max*100))]));
 // The visual uses five radial points in the same order as the labels.
 const points=[normalized.Analytical,normalized.Creative,normalized.People,normalized.Learning,normalized.Curiosity];
 const cx=50,cy=50,r=45;
 const coords=points.map((v,i)=>{const angle=(-90+i*72)*Math.PI/180;const rr=r*(v/100);return `${(cx+Math.cos(angle)*rr).toFixed(1)}% ${(cy+Math.sin(angle)*rr).toFixed(1)}%`;});
 fill.style.clipPath=`polygon(${coords.join(",")})`;
 fill.classList.remove("ready");requestAnimationFrame(()=>fill.classList.add("ready"));
 status.textContent="Updated from your 20 answers";
 bars.innerHTML=axes.map((a,i)=>`<div class="interest-bar"><span>${a}</span><div class="interest-track"><i style="width:${normalized[a]}%"></i></div><b>${normalized[a]}</b></div>`).join("");
}
const pathways=[
{name:"Data Science & Analytics",icon:"◈",tag:"Analytical + curious",reason:"A useful direction to test if you enjoy patterns, evidence, statistics and turning questions into structured analysis.",skills:"Statistics, Python, SQL, communication",edu:"Math/science + CS, statistics or data-focused degree",work:"Focused analysis + collaboration",challenge:"Abstract math, messy data and long debugging cycles",alt:"Economics, BI, research, quantitative analysis"},
{name:"Psychology & Behaviour",icon:"◉",tag:"People + research",reason:"Worth exploring if you are curious about people, behaviour, communication and evidence-based questions.",skills:"Research methods, writing, statistics, listening",edu:"Psychology/social science + specialist study where required",work:"People-facing + research",challenge:"Some specialist roles require further study",alt:"UX research, HR, education, behavioural science"},
{name:"UX / Product Design",icon:"◇",tag:"Creative + problem solving",reason:"Worth testing if you like understanding users, creating ideas and improving how products work.",skills:"Design, prototyping, research, communication",edu:"Design, HCI, CS or portfolio-based routes",work:"Highly collaborative",challenge:"Iteration, critique and portfolio building",alt:"Product management, UX research, visual design"},
{name:"Environmental Science",icon:"♧",tag:"Science + impact",reason:"Fits a curiosity about natural systems, evidence and practical environmental problems.",skills:"Research, data, field methods, communication",edu:"Science + environmental/geoscience routes",work:"Field + lab + collaboration",challenge:"Some roles involve fieldwork and location constraints",alt:"Geoscience, conservation, sustainability"},
{name:"Software Engineering",icon:"</>",tag:"Logical + builder",reason:"A direction to investigate if you enjoy constructing systems, debugging and learning technical tools.",skills:"Programming, algorithms, teamwork, systems thinking",edu:"CS/software/engineering or strong portfolio route",work:"Focused building + team collaboration",challenge:"Continuous learning and debugging",alt:"Cybersecurity, cloud, QA, developer tools"},
{name:"Cybersecurity",icon:"⌁",tag:"Systems + investigation",reason:"Explore this if protecting systems, investigating failures and understanding networks sounds engaging.",skills:"Networking, Linux, security concepts, scripting",edu:"CS/IT/cybersecurity + labs/certifications",work:"Independent investigation + team response",challenge:"Constant learning and careful documentation",alt:"Network engineering, digital forensics, cloud security"},
{name:"Engineering & Computational Science",icon:"△",tag:"Math + making",reason:"A direction for students drawn to physics, systems, models and building practical solutions.",skills:"Math, modelling, programming, technical communication",edu:"Math/science + engineering or computational degree",work:"Technical team + project work",challenge:"Can be mathematically demanding",alt:"Robotics, simulation, systems engineering"},
{name:"Business & Entrepreneurship",icon:"↗",tag:"Initiative + people",reason:"Worth testing if you enjoy building ideas, decision-making, communication and measurable outcomes.",skills:"Communication, finance, market research, leadership",edu:"Business/economics or mixed routes",work:"Collaboration + uncertainty",challenge:"Outcomes and income can be less predictable",alt:"Marketing, operations, product, finance"}
];

function renderPublic(){$("#publicPaths").innerHTML=pathways.map(p=>`<article class="path-card"><span class="tag">${p.tag}</span><h3>${p.icon} ${p.name}</h3><p class="reason">${p.reason}</p><p><b>Skills:</b> ${p.skills}</p><p><b>Related:</b> ${p.alt}</p><button class="small-btn" onclick="requireLogin()">Personalize this</button></article>`).join("")}

function capture(){
 const q=sessionQuestions()[state.qIndex];if(!q)return;
 if(q.type==="open")state.answers[q.id]=$("#answerOpen")?.value||"";
 else if(q.type==="rank")state.answers[q.id]=$$("#answerRank select").map(x=>x.value);
 else if(q.type==="multi")state.answers[q.id]=$$("#question input[type=checkbox]:checked").map(x=>x.value);
 else state.answers[q.id]=$$("#question input[name=answer]:checked")[0]?.value||"";
 saveState();updateUI();
}
function renderQuestion(){
 ensureSession();const qs=sessionQuestions(),q=qs[state.qIndex];if(!q)return;
 $("#qCount").textContent=`${state.qIndex+1} / 20`;
 const firstDraw=(q.weight/100).toFixed(2);$("#selectionInfo").innerHTML=`<b>${escapeHtml(q.categoryLabel)}</b><br><br>This question has a configured <strong>${firstDraw}% first-draw chance</strong> because its category weight is ${q.weight}/100 and there are 100 questions in each category.<br><br>The exact chance of appearing in the full 20-question session changes after other questions are selected. This number is a selection mechanic, not a psychological score.`;
 let body="";
 const val=state.answers[q.id];
 if(q.type==="scale")body=`<div class="scale">${q.scaleLabels.map((x,i)=>`<label><input type="radio" name="answer" value="${i+1}" ${String(val)===String(i+1)?"checked":""}>${i+1}<small>${x}</small></label>`).join("")}</div>`;
 else if(q.type==="open")body=`<textarea class="open" id="answerOpen" placeholder="Write honestly. A few sentences are enough.">${escapeHtml(val||"")}</textarea>`;
 else if(q.type==="rank")body=`<div class="rank" id="answerRank">${q.options.map((o,i)=>`<div><span>${escapeHtml(o)}</span><select><option value="">Rank</option>${[1,2,3,4,5].map(n=>`<option ${String(val?.[i])===String(n)?"selected":""}>${n}</option>`).join("")}</select></div>`).join("")}</div>`;
 else body=`<div class="options">${q.options.map(o=>`<label class="option ${Array.isArray(val)?val.includes(o):val===o?"selected":""}"><input type="${q.type==="multi"?"checkbox":"radio"}" name="answer" value="${escapeHtml(o)}" ${Array.isArray(val)?val.includes(o)?"checked":"":val===o?"checked":""}><span>${escapeHtml(o)}</span></label>`).join("")}</div>`;
 $("#question").innerHTML=`<div class="question-card"><div class="question-type">${q.type.toUpperCase()} · ${escapeHtml(q.categoryLabel)}</div><h3>${escapeHtml(q.prompt)}</h3>${body}<p class="muted">There is no socially correct answer. Choose what describes you, even if it sounds less impressive.</p><div class="question-nav"><button class="btn soft" id="back" ${state.qIndex===0?"disabled":""}>← Back</button><button class="btn primary" id="next">${state.qIndex===19?"Finish analysis":"Next →"}</button></div></div>`;
 $$("#question input").forEach(x=>x.addEventListener("change",()=>{$$(".option").forEach(o=>{const inp=o.querySelector("input");if(inp)o.classList.toggle("selected",inp.checked)})}));
 $("#answerOpen")?.addEventListener("input",capture);$$("#answerRank select").forEach(x=>x.addEventListener("change",capture));
 $("#back").onclick=()=>{capture();state.qIndex=Math.max(0,state.qIndex-1);renderQuestion()};
 $("#next").onclick=()=>{capture();if(state.qIndex<19){state.qIndex++;renderQuestion()}else{capture();renderInterestMap();goTab("analysis");toast("20 responses analyzed. Your interest map is now filled from your answers.")}};
}
function renderAnalysis(){
 const qs=sessionQuestions(),answered=qs.filter(q=>state.answers[q.id]!=null&&state.answers[q.id]!=="").length;
 const categoryCounts={};qs.forEach(q=>{if(state.answers[q.id]!=null)categoryCounts[q.categoryLabel]=(categoryCounts[q.categoryLabel]||0)+1});
 const chips=Object.keys(categoryCounts).map(x=>`<span class="chip">${x}</span>`).join("");
 $("#analysisIntro").textContent=answered<20?`You have answered ${answered} of 20 selected questions. Complete the session for a fuller analysis.`:"Your responses are now treated as a set of signals. The analysis should be read as hypotheses to test, not a prediction of your future.";
 $("#analysis").innerHTML=`<div class="analysis-grid"><div class="analysis-box"><h3>Dimensions explored</h3><div class="chips2">${chips||"<span class=chip>Not enough data yet</span>"}</div><p class="muted">The 1,000-question bank covers ten dimensions. The 20-question session is only one sample, so retaking later can add information.</p></div><div class="analysis-box"><h3>Possible working style</h3><p><b>Explore:</b> focused work with purposeful collaboration, then compare that hypothesis with your real experiences in projects.</p><p class="muted">Do not treat this as a diagnosis or personality type.</p></div><div class="analysis-box"><h3>External-pressure reflection</h3><div class="notice">If answers about status, salary, family expectations or social trends conflict with your activity preferences, the system should ask follow-up questions rather than decide that pressure is the cause.</div></div><div class="analysis-box"><h3>Contradictions</h3><p>If you say you strongly prefer a career but repeatedly choose activities that conflict with its core work, that should be flagged for reflection. Your Path should never silently convert a contradiction into a “match score.”</p></div><div class="analysis-box full"><h3>Next step</h3><p>Explore several pathways, save the ones worth testing, then use the roadmap to run small real-world experiments.</p><button class="btn primary" onclick="goTab('pathways')">Explore pathways →</button></div></div>`;
}
function renderPathways(){
 $("#pathGrid").innerHTML=pathways.map(p=>`<article class="path-card"><span class="tag">${p.tag}</span><h3>${p.icon} ${p.name}</h3><p class="reason">${p.reason}</p><p><b>Skills:</b> ${p.skills}</p><p><b>Education:</b> ${p.edu}</p><p><b>Work style:</b> ${p.work}</p><p><b>Challenges:</b> ${p.challenge}</p><p><b>Alternatives:</b> ${p.alt}</p><div class="path-actions"><button class="small-btn save" onclick="toggleSave('${p.name}')">♡ ${state.saved.includes(p.name)?"Saved":"Save"}</button><button class="small-btn" onclick="toast('In production, this would open current cited research for this pathway.')">Research</button></div></article>`).join("");
}
function toggleSave(name){state.saved=state.saved.includes(name)?state.saved.filter(x=>x!==name):[...state.saved,name];saveState();renderPathways();renderSaved();updateUI();toast(state.saved.includes(name)?"Pathway saved.":"Pathway removed.")}
function renderSaved(){if(!state.saved.length){$("#saved").innerHTML='<div class="card"><p class="muted">Nothing saved yet. Explore pathways and save a few directions you want to investigate.</p></div>';return}$("#saved").innerHTML=state.saved.map(n=>{const p=pathways.find(x=>x.name===n);return `<div class="card" style="margin-bottom:10px"><b>${p.name}</b><p class="muted">${p.reason}</p><button class="small-btn" onclick="toggleSave('${p.name}')">Remove</button></div>`}).join("")}
function renderCompare(){const p=pathways.slice(0,4);$("#compare").innerHTML=`<table class="compare"><thead><tr><th>Feature</th>${p.map(x=>`<th>${x.name}</th>`).join("")}</tr></thead><tbody><tr><th>Why it matches</th>${p.map(x=>`<td>${x.reason}</td>`).join("")}</tr><tr><th>Skills</th>${p.map(x=>`<td>${x.skills}</td>`).join("")}</tr><tr><th>Education</th>${p.map(x=>`<td>${x.edu}</td>`).join("")}</tr><tr><th>Work style</th>${p.map(x=>`<td>${x.work}</td>`).join("")}</tr><tr><th>Challenges</th>${p.map(x=>`<td>${x.challenge}</td>`).join("")}</tr></tbody></table>`}
function renderRoadmap(){const g=state.user?.grade||"Grade 10";$("#roadmapGrade").textContent=`Example action plan for ${g}. A production version should adapt this to country, budget, admissions and the chosen pathway.`;$("#roadmap").innerHTML=`<div class="roadmap-card"><h3>Next 30 days</h3><p class="muted">Explore 2–3 pathways, talk to someone in a relevant field, try one small project and write down what you enjoyed and disliked.</p></div><div class="roadmap-card"><h3>Next 6 months</h3><p class="muted">Build a portfolio project, join a relevant club/competition, strengthen prerequisite subjects and research education routes.</p></div><div class="roadmap-card"><h3>Next 1–2 years</h3><p class="muted">Deepen skills, create stronger evidence of interest, compare degree routes and prepare applications or entrance requirements.</p></div>`}
function loadProfile(){const f=$("#profile");if(!state.user)return;for(const el of f.elements)if(el.name&&state.user[el.name]!=null)el.value=state.user[el.name]}
$("#profile").onsubmit=e=>{e.preventDefault();state.user={...state.user,...Object.fromEntries(new FormData(e.target).entries())};saveState();updateUI();toast("Profile saved.")};
$("#feedback").onsubmit=e=>{e.preventDefault();localStorage.setItem("yp_feedback_v3",JSON.stringify(Object.fromEntries(new FormData(e.target).entries())));e.target.reset();toast("Feedback saved in this demo.")};

$("#accept").onclick=()=>{localStorage.setItem(STORE.cookie,"accepted");$("#cookie").style.display="none";toast("Cookie preference saved.")};
$("#essential").onclick=()=>{localStorage.setItem(STORE.cookie,"essential");$("#cookie").style.display="none";toast("Essential-only preference saved.")};
$("#cookieSettings").onclick=()=>$("#cookie").style.display="flex";
if(localStorage.getItem(STORE.cookie))$("#cookie").style.display="none";

ensureSession();updateUI();renderQuestion();

window.newQuestionSession=()=>{newSession();renderQuestion();toast("New 20-question session generated.")};
window.goTab=goTab;window.requireLogin=requireLogin;window.toggleSave=toggleSave;

document.addEventListener("keydown",e=>{if(e.key==="Escape"){$$(".modal-backdrop").forEach(m=>m.classList.add("hidden"))}});

/* ================= AI ORCHESTRATOR v5 ================= */
const AI_STORE={session:'yp_ai_session_v5',result:'yp_ai_result_v5'};
state.aiSession=localStorage.getItem(AI_STORE.session)||null;
state.aiResult=JSON.parse(localStorage.getItem(AI_STORE.result)||'null');
state.aiQuestion=null;

function aiApi(path, body){
  return fetch(path,{method:'POST',headers:{'Content-Type':'application/json','X-Session-Id':state.aiSession||''},body:JSON.stringify(body||{})}).then(async r=>{const d=await r.json().catch(()=>({error:'Invalid server response'}));if(!r.ok)throw new Error(d.error||`AI request failed (${r.status})`);return d});
}
function setAIStatus(text,kind='idle'){
  let el=$('#aiStatus');
  if(!el){const head=document.querySelector('.dash-head');if(!head)return;el=document.createElement('div');el.id='aiStatus';el.className='ai-status';head.appendChild(el)}
  el.className=`ai-status ${kind}`;el.innerHTML=`<span class="ai-dot"></span><span>${escapeHtml(text)}</span>`;
}
function saveAI(){if(state.aiSession)localStorage.setItem(AI_STORE.session,state.aiSession);if(state.aiResult)localStorage.setItem(AI_STORE.result,JSON.stringify(state.aiResult));}
async function startAISession(){
  if(!state.user)return;
  setAIStatus('AI is preparing your adaptive questionnaire…','loading');
  try{
    const d=await aiApi('/api/ai/start',{profile:state.user});
    state.aiSession=d.sessionId;state.aiQuestion=d.question;state.qIndex=0;state.answers={};state.aiResult=null;saveAI();saveState();
    renderAIQuestion();updateAIJourney();setAIStatus('AI interviewer is active','ready');
  }catch(e){setAIStatus('AI server not connected — demo questionnaire available','warning');toast(e.message);ensureSession();renderQuestion();}
}
function aiAnswerValue(q){
  if(q.type==='open')return $('#aiOpen')?.value||'';
  if(q.type==='rank')return $$('#aiQuestionCard select').map(x=>x.value);
  if(q.type==='multi')return $$('#aiQuestionCard input[type=checkbox]:checked').map(x=>x.value);
  return $$('#aiQuestionCard input[name=aiAnswer]:checked')[0]?.value||'';
}
function renderAIQuestion(){
  const q=state.aiQuestion;if(!q)return;
  const n=(state.qIndex||0)+1;$('#qCount').textContent=`${n} / 20`;
  $('#selectionInfo').innerHTML=`<b>AI adaptive selection</b><br><br>The AI chose this question from your previous responses and the information it still needs. It may change the next question when your answers reveal a new direction.<br><br><span class="muted">This is not a psychological score.</span>`;
  let body='';
  if(q.type==='open') body=`<textarea class="open" id="aiOpen" placeholder="Answer honestly. A few sentences are enough."></textarea>`;
  else if(q.type==='scale') body=`<div class="scale">${(q.scaleLabels||['Strongly disagree','Disagree','Neutral','Agree','Strongly agree']).map((x,i)=>`<label><input type="radio" name="aiAnswer" value="${i+1}">${i+1}<small>${escapeHtml(x)}</small></label>`).join('')}</div>`;
  else if(q.type==='rank') body=`<div class="rank" id="aiQuestionCard">${(q.options||[]).map(o=>`<div><span>${escapeHtml(o)}</span><select><option value="">Rank</option>${[1,2,3,4,5].map(n=>`<option>${n}</option>`).join('')}</select></div>`).join('')}</div>`;
  else body=`<div class="options">${(q.options||[]).map(o=>`<label class="option"><input type="${q.type==='multi'?'checkbox':'radio'}" name="aiAnswer" value="${escapeHtml(o)}"><span>${escapeHtml(o)}</span></label>`).join('')}</div>`;
  $('#question').innerHTML=`<div class="question-card ai-question-card" id="aiQuestionCard"><div class="question-type">AI ADAPTIVE · ${escapeHtml(q.dimension||'Your Path')}</div><h3>${escapeHtml(q.question)}</h3>${body}<p class="muted">There is no socially correct answer. The AI will use your answer to decide what to explore next.</p><div class="ai-why">✦ ${escapeHtml(q.why||'This question helps the AI understand a part of your preferences.')}</div><div class="question-nav"><button class="btn soft" id="aiBack" ${n===1?'disabled':''}>← Back</button><button class="btn primary" id="aiNext">${n===20?'Finish & analyze':'Next →'}</button></div></div>`;
  $$('#question input').forEach(x=>x.addEventListener('change',()=>{$$('.option').forEach(o=>{const inp=o.querySelector('input');if(inp)o.classList.toggle('selected',inp.checked)})}));
  $('#aiBack').onclick=()=>{toast('Adaptive back-navigation is intentionally limited so the AI can keep the interview sequence coherent.');};
  $('#aiNext').onclick=submitAIAnswer;
}
async function submitAIAnswer(){
  const q=state.aiQuestion;const answer=aiAnswerValue(q);
  if(answer===''||(Array.isArray(answer)&&answer.every(x=>!x))){toast('Choose or write an answer before continuing.');return;}
  const btn=$('#aiNext');btn.disabled=true;btn.textContent='AI thinking…';setAIStatus(`AI is reviewing answer ${state.qIndex+1}…`,'loading');
  try{
    const d=await aiApi('/api/ai/answer',{question:q.question,answer});
    state.answers[`AI_${state.qIndex+1}`]=answer;saveState();
    if(d.complete){state.aiResult=d.analysis;state.qIndex=20;saveAI();renderAIResult();renderInterestMapFromAI();updateAIJourney();goTab('analysis');setAIStatus('AI analysis complete','ready');toast('Your adaptive interview is complete.');}
    else{state.qIndex=d.number-1;state.aiQuestion=d.question;saveAI();renderAIQuestion();setAIStatus(`AI interviewer — question ${d.number} of 20`,'ready');}
  }catch(e){btn.disabled=false;btn.textContent=(state.qIndex===19?'Finish & analyze':'Next →');setAIStatus('AI request failed','warning');toast(e.message);}
}
function renderAIResult(){
  if(!state.aiResult)return;
  const a=state.aiResult;
  $('#analysisIntro').textContent='The AI has synthesized your answers into hypotheses, evidence, uncertainty and pathways. These are exploration aids—not a verdict about your future.';
  const list=(x)=>Array.isArray(x)?x.map(v=>`<li>${escapeHtml(v)}</li>`).join(''):'';
  const pressure=(a.pressureSignals||[]).map(x=>`<div class="signal"><b>${escapeHtml(x.area)}</b><span>${escapeHtml(x.level)}</span><p>${escapeHtml(x.evidence)}</p></div>`).join('')||'<p class="muted">No strong signal identified from this short interview.</p>';
  const contradictions=(a.contradictions||[]).map(x=>`<div class="signal"><b>${escapeHtml(x.signal)}</b><p>${escapeHtml(x.evidence)}</p><small>Follow-up: ${escapeHtml(x.followUp)}</small></div>`).join('')||'<p class="muted">No major contradiction was identified in this session.</p>';
  $('#analysis').innerHTML=`<div class="ai-banner"><span class="ai-orb">✦</span><div><b>AI-guided analysis</b><p>${escapeHtml(a.summary||'Analysis generated from your adaptive interview.')}</p></div></div><div class="analysis-grid"><div class="analysis-box"><h3>Interest signals</h3><div class="interest-ai-bars">${Object.entries(a.interestMap||{}).map(([k,v])=>`<div><span>${escapeHtml(k)}</span><i><em style="width:${Math.max(0,Math.min(100,Number(v)||0))}%"></em></i><b>${Math.round(Number(v)||0)}</b></div>`).join('')}</div></div><div class="analysis-box"><h3>Strength signals</h3><ul>${list(a.strengthSignals)||'<li>More evidence is needed.</li>'}</ul><h3>Areas to develop</h3><ul>${list(a.developmentAreas)||'<li>More evidence is needed.</li>'}</ul></div><div class="analysis-box"><h3>Working style hypothesis</h3><p>${escapeHtml(a.workingStyleHypothesis||'Not enough evidence yet.')}</p></div><div class="analysis-box"><h3>External-pressure reflection</h3>${pressure}<p class="muted">These are response-pattern indicators, not claims about what you think.</p></div><div class="analysis-box full"><h3>Contradictions worth exploring</h3>${contradictions}</div><div class="analysis-box full"><h3>Uncertainty</h3><ul>${list(a.uncertainty)||'<li>This is only one 20-question session.</li>'}</ul></div><div class="analysis-box full"><h3>AI next step</h3><p>Explore the pathways, choose a few experiments, then return later with new evidence. Your answers can change over time.</p><button class="btn primary" onclick="goTab('pathways')">Explore AI pathways →</button></div></div>`;
}
function renderAIPatways(){
  const ps=state.aiResult?.pathways||[];if(!ps.length){renderPathways();return;}
  $('#pathGrid').innerHTML=ps.map((p,i)=>`<article class="path-card ai-path"><span class="tag">AI pathway ${i+1}</span><h3>✦ ${escapeHtml(p.name)}</h3><p class="reason">${escapeHtml(p.why)}</p><p><b>Interests:</b> ${escapeHtml((p.interests||[]).join(', '))}</p><p><b>Skills:</b> ${escapeHtml((p.skills||[]).join(', '))}</p><p><b>Useful subjects:</b> ${escapeHtml((p.subjects||[]).join(', '))}</p><p><b>Education:</b> ${escapeHtml((p.education||[]).join(' · '))}</p><p><b>Work style:</b> ${escapeHtml(p.workStyle||'')}</p><p><b>Trade-offs:</b> ${escapeHtml((p.tradeoffs||[]).join(' · '))}</p><p><b>Related alternatives:</b> ${escapeHtml((p.alternatives||[]).join(', '))}</p><div class="path-actions"><button class="small-btn save" onclick="toggleAISave('${escapeHtml(p.name).replace(/'/g,"\\'")}')">♡ ${state.saved.includes(p.name)?'Saved':'Save'}</button><button class="small-btn" onclick="toast('AI says: ${escapeHtml(p.nextTest||'Test this pathway with a small project.').replace(/'/g,"\\'")}')">Test this path</button></div></article>`).join('');
}
function toggleAISave(name){state.saved=state.saved.includes(name)?state.saved.filter(x=>x!==name):[...state.saved,name];saveState();renderAIPatways();renderSaved();updateUI();toast(state.saved.includes(name)?'AI pathway saved.':'AI pathway removed.');}
function renderAIRoadmap(){
  const r=state.aiResult?.roadmap;if(!r){renderRoadmap();return;}
  const box=(title,arr)=>`<div class="roadmap-card ai-roadmap"><span class="eyebrow">AI-GUIDED</span><h3>${title}</h3><ul>${(arr||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div>`;
  $('#roadmapGrade').textContent=`AI-generated action plan adapted to ${state.user?.grade||'your current stage'}. Verify education and admissions details against current official sources.`;
  $('#roadmap').innerHTML=box('Next 30 days',r.next30Days)+box('Next 6 months',r.next6Months)+box('Next 1–2 years',r.next1to2Years)+`<div class="ai-disclaimer">✦ The roadmap is a planning hypothesis. It should be updated as you gain real experience, grades, project evidence and current education information.</div>`;
}
function renderInterestMapFromAI(){
 const m=state.aiResult?.interestMap;if(!m)return;
 const vals={Analytical:Number(m.analytical)||0,Creative:Number(m.creative)||0,People:Number(m.people)||0,Learning:Number(m.learning)||0,Curiosity:Number(m.curiosity)||0};
 $('#interestStatus').textContent='AI-filled from your 20 answers';
 const order=['Analytical','Creative','People','Learning','Curiosity'];const points=order.map(k=>Math.max(8,Math.min(100,vals[k])));
 const cx=120,cy=120,r=82;const coords=points.map((v,i)=>{const a=(-Math.PI/2)+(i*2*Math.PI/5);return [cx+Math.cos(a)*r*(v/100),cy+Math.sin(a)*r*(v/100)]});
 $('#radarFill').style.clipPath=`polygon(${coords.map(([x,y])=>`${(x/240)*100}% ${(y/240)*100}%`).join(',')})`;
 $('#interestBars').innerHTML=order.map(k=>`<div><span>${k}</span><i><em style="width:${vals[k]}%"></em></i><b>${Math.round(vals[k])}</b></div>`).join('');
}
function updateAIJourney(){
 const complete=Boolean(state.aiResult);const n=state.qIndex||0;
 $('#journeyQTitle').textContent=complete?'20 questions complete':`Question ${Math.min(n+1,20)} of 20`;
 $('#journeyQText').textContent=complete?'Your adaptive interview is complete.':'The AI is choosing each question from what it still needs to learn about you.';
 $('#journeyATitle').textContent=complete?'AI analysis ready':'AI is listening';
 $('#journeyAText').textContent=complete?'Interest signals, contradictions, uncertainty and pathways have been generated.':'Answers will guide the next question and later analysis.';
 ['journeyQuestionnaire','journeyAnalysis','journeyPathways','journeyRoadmap','journeyAction'].forEach(id=>document.getElementById(id)?.classList.remove('current','complete'));
 if(n>0)$('#journeyQuestionnaire')?.classList.add('complete');
 if(complete){['journeyAnalysis','journeyPathways','journeyRoadmap'].forEach(id=>document.getElementById(id)?.classList.add('complete'));$('#journeyAction')?.classList.add('current');}
 else $('#journeyQuestionnaire')?.classList.add('current');
}

// AI-aware dashboard hooks
const originalGoTab=goTab;
goTab=function(name){originalGoTab(name);if(name==='questionnaire'){if(state.aiQuestion)renderAIQuestion();else if(state.aiSession&&!state.aiResult)startAISession();}if(name==='analysis'&&state.aiResult)renderAIResult();if(name==='pathways'&&state.aiResult)renderAIPatways();if(name==='roadmaps'&&state.aiResult)renderAIRoadmap();updateAIJourney();};

// Replace questionnaire start/finish behavior with AI interview when possible.
const oldQuestionStart=window.newQuestionSession;
window.newQuestionSession=()=>{state.aiSession=null;state.aiResult=null;state.aiQuestion=null;state.qIndex=0;localStorage.removeItem(AI_STORE.session);localStorage.removeItem(AI_STORE.result);startAISession();};

// Update signup/login to start an AI-controlled journey.
const oldSignup= $('#signupForm').onsubmit;
$('#signupForm').onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());state.user={...d,role:'student',createdAt:Date.now()};state.answers={};state.saved=[];saveState();closeModal('authModal');updateUI();showPage('dashboard');goTab('overview');updateAIJourney();await startAISession();toast('Account created — your AI guide is ready.');};
const oldLogin=$('#loginForm').onsubmit;
$('#loginForm').onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());if(d.email==='admin@yourpath.demo'&&d.password==='admin123'){state.user={name:'Admin',email:d.email,role:'admin',grade:'College'};ensureSession();saveState();closeModal('authModal');updateUI();showPage('dashboard');goTab('overview');toast('Admin logged in.');return;}state.user={name:d.email.split('@')[0],email:d.email,role:'student',grade:state.user?.grade||'Grade 10'};saveState();closeModal('authModal');updateUI();showPage('dashboard');goTab('overview');if(!state.aiSession||!state.aiResult)await startAISession();toast('Logged in — your AI guide is ready.');};

// Initial AI-aware rendering.
if(state.aiResult){renderAIResult();renderAIPatways();renderAIRoadmap();renderInterestMapFromAI();setAIStatus('AI analysis loaded','ready');}
else if(state.aiQuestion){renderAIQuestion();setAIStatus('AI interviewer is active','ready');}

// Make the overview itself AI-driven instead of showing static demo pathways.
const staticRenderOverview=renderOverview;
renderOverview=function(){
  const ps=state.aiResult?.pathways||[];
  if(ps.length){
    $('#topPaths').innerHTML=ps.slice(0,4).map((p,i)=>`<div class="path-mini"><span class="path-icon">✦</span><span><b>${escapeHtml(p.name)}</b><small>AI pathway ${i+1} · ${escapeHtml(p.why||'Explore this direction')}</small></span></div>`).join('');
  } else staticRenderOverview();
  if(state.aiResult?.pressureSignals){
    const levels=state.aiResult.pressureSignals;
    const box=$('.pressure');
    if(box)box.innerHTML=levels.slice(0,3).map(x=>`<p><span>${escapeHtml(x.area)}</span><b>${escapeHtml(x.level)}</b></p>`).join('');
  }
};
const staticRenderInterestMap=renderInterestMap;
renderInterestMap=function(){if(state.aiResult)renderInterestMapFromAI();else staticRenderInterestMap();};
const staticRenderJourney=renderJourney;
renderJourney=function(){staticRenderJourney();updateAIJourney();};

// Keep dashboard counters and AI content live after every answer.
const oldSubmitAIAnswer=submitAIAnswer;
submitAIAnswer=async function(){await oldSubmitAIAnswer();updateUI();if(state.aiResult){renderAIResult();renderAIPatways();renderAIRoadmap();renderInterestMapFromAI();}updateAIJourney();};

/* ================================================================
   YOUR PATH — LOCAL AI FROM SCRATCH
   No external AI/API. Explainable adaptive expert system.
   ================================================================ */
const LOCAL_AI_STORE={session:'yp_local_ai_session_v1',result:'yp_local_ai_result_v1'};
const LOCAL_AI={
  version:'1.0', maxQuestions:20,
  dimensions:['Analytical','Creative','People','Learning','Curiosity'],
  weights:{
    interests:{Curiosity:4,Creative:1}, subjects:{Learning:3,Analytical:2,Curiosity:1},
    problem:{Analytical:5,Curiosity:2}, creativity:{Creative:5},
    communication:{People:5,Creative:1}, workstyle:{People:2,Analytical:2},
    motivation:{Learning:2,People:1}, learning:{Learning:5,Curiosity:2},
    pressure:{People:1,Curiosity:1}, values:{Curiosity:2,Learning:2}
  },
  keywords:{
    Analytical:['math','data','logic','solve','analysis','code','program','system','evidence','research','pattern','debug','science','statistics','numbers','technical'],
    Creative:['design','create','art','music','story','write','video','build','invent','creative','visual','draw','imagine','original','make'],
    People:['people','help','teach','team','lead','communicate','community','listen','friend','customer','organize','explain','collaborate','group'],
    Learning:['learn','study','understand','read','course','practice','skill','knowledge','curious','explore','improve','master'],
    Curiosity:['why','how','discover','investigate','experiment','question','research','explore','new','curious','evidence','unknown']
  },
  pressureWords:['parents','parent','family','friends','peer','salary','money','status','prestige','respect','pressure','expected','expectation','popular','secure'],
  pathwayProfiles:[
    // Technology & computing
    {name:'Computer Science',icon:'⌘',dims:{Analytical:1,Curiosity:.8,Learning:.8,Creative:.35},cats:['problem','subjects','learning'],skills:['Programming','algorithms','systems thinking'],subjects:['Mathematics','Computer Science','Science'],tradeoffs:['Continuous learning','Technical problem solving'],alt:['Software Engineering','Data Science','Cybersecurity'],test:'Build a small program or solve a coding problem and notice whether you enjoy the process.'},
    {name:'Information Technology',icon:'▣',dims:{Analytical:.8,Learning:.8,People:.45,Curiosity:.65},cats:['problem','learning','workstyle'],skills:['IT support','networks','systems','troubleshooting'],subjects:['ICT','Mathematics','Computer Science'],tradeoffs:['Frequent troubleshooting','Technology changes quickly'],alt:['Network Engineering','Systems Administration','Cybersecurity'],test:'Set up a small home lab and document how devices, users and services connect.'},
    {name:'Information Systems',icon:'◫',dims:{Analytical:.8,People:.65,Learning:.7,Creative:.35},cats:['problem','communication','workstyle'],skills:['Business analysis','databases','systems thinking','communication'],subjects:['ICT','Business','Mathematics'],tradeoffs:['Bridging technical and business needs','Project deadlines'],alt:['Business Analytics','IT Management','Software Development'],test:'Map how a real school or small-business process works and design a better information flow.'},
    {name:'Software Engineering',icon:'</>',dims:{Analytical:1,Curiosity:.65,Learning:.7,Creative:.25},cats:['problem','subjects','learning'],skills:['Programming','algorithms','debugging','teamwork'],subjects:['Mathematics','Computer Science','Science'],tradeoffs:['Long focused sessions','Continuous learning'],alt:['Computer Science','QA','Cloud Engineering'],test:'Build a small app or automate a repetitive task and see whether the process itself is enjoyable.'},
    {name:'Data Science & Analytics',icon:'◈',dims:{Analytical:1,Curiosity:.85,Learning:.7,Creative:.2},cats:['problem','subjects','interests'],skills:['Statistics','data analysis','Python/SQL','communication'],subjects:['Mathematics','Statistics','Computer Science'],tradeoffs:['Messy data','Evidence-based work'],alt:['Economics','Business Analytics','Research'],test:'Use a small public dataset, ask one question, and make a simple chart.'},
    {name:'Cybersecurity',icon:'⌁',dims:{Analytical:.9,Curiosity:.95,Learning:.8,Creative:.25},cats:['problem','interests','subjects'],skills:['Networking','Linux','security concepts','scripting'],subjects:['ICT','Computer Science','Mathematics'],tradeoffs:['Constantly changing threats','Careful troubleshooting'],alt:['Digital Forensics','Network Engineering','Cloud Security'],test:'Use a legal local practice lab to learn how a basic service works and how it can be secured.'},

    // Engineering & built environment
    {name:'Civil Engineering',icon:'▰',dims:{Analytical:.9,Learning:.75,Creative:.55,People:.35},cats:['problem','subjects','values'],skills:['Mathematics','structures','design','project planning'],subjects:['Mathematics','Physics','Engineering'],tradeoffs:['Technical responsibility','Field and office work'],alt:['Construction Management','Structural Engineering','Environmental Engineering'],test:'Study a local structure and sketch how its loads, materials and constraints could be considered.'},
    {name:'Mechanical Engineering',icon:'⚙',dims:{Analytical:1,Creative:.55,Learning:.8,Curiosity:.75},cats:['problem','subjects','interests'],skills:['Mechanics','CAD','design','mathematics'],subjects:['Mathematics','Physics','Engineering'],tradeoffs:['Math-heavy study','Iterative testing'],alt:['Mechatronics','Automotive Engineering','Manufacturing'],test:'Design or model a simple mechanism and test how changing one variable affects it.'},
    {name:'Electrical Engineering',icon:'⌁',dims:{Analytical:.95,Learning:.85,Curiosity:.8,Creative:.4},cats:['problem','subjects','learning'],skills:['Circuits','electronics','mathematics','systems'],subjects:['Mathematics','Physics','Electronics'],tradeoffs:['Technical theory','Careful testing'],alt:['Electronics Engineering','Power Engineering','Embedded Systems'],test:'Build a safe low-voltage circuit or simulation and document what each component does.'},
    {name:'Electronics Engineering',icon:'◌',dims:{Analytical:.95,Creative:.55,Curiosity:.85,Learning:.85},cats:['problem','interests','subjects'],skills:['Electronics','embedded systems','circuits','programming'],subjects:['Mathematics','Physics','ICT'],tradeoffs:['Detailed debugging','Rapid hardware changes'],alt:['Electrical Engineering','Robotics','Embedded Systems'],test:'Experiment with a beginner microcontroller project and keep a troubleshooting log.'},
    {name:'Chemical Engineering',icon:'⚗',dims:{Analytical:.95,Learning:.9,Curiosity:.8,Creative:.3},cats:['problem','subjects','learning'],skills:['Chemistry','process design','mathematics','safety'],subjects:['Chemistry','Mathematics','Physics'],tradeoffs:['Demanding quantitative study','Process and safety constraints'],alt:['Chemistry','Materials Science','Environmental Engineering'],test:'Explore how an everyday product is manufactured and map its inputs, processes and outputs.'},
    {name:'Industrial Engineering',icon:'⇄',dims:{Analytical:.9,People:.55,Learning:.7,Creative:.45},cats:['problem','workstyle','communication'],skills:['Optimization','statistics','process improvement','operations'],subjects:['Mathematics','Statistics','Business'],tradeoffs:['Process-focused work','Balancing people and efficiency'],alt:['Operations Management','Supply Chain','Business Analytics'],test:'Choose a repeated school process and measure where time or effort is being lost.'},
    {name:'Mechatronics / Robotics',icon:'🤖',dims:{Analytical:.95,Creative:.6,Curiosity:.9,Learning:.85},cats:['problem','interests','creativity'],skills:['Mechanics','electronics','programming','control systems'],subjects:['Mathematics','Physics','ICT'],tradeoffs:['Cross-disciplinary learning','Hands-on troubleshooting'],alt:['Mechanical Engineering','Electronics Engineering','Automation'],test:'Build or simulate a small automated mechanism.'},
    {name:'Architecture',icon:'⌂',dims:{Creative:.9,Analytical:.65,People:.4,Learning:.7},cats:['creativity','problem','values'],skills:['Design','spatial thinking','drawing','technical communication'],subjects:['Mathematics','Art','Physics'],tradeoffs:['Long design projects','Balancing creativity and regulations'],alt:['Interior Design','Urban Planning','Landscape Architecture'],test:'Redesign a small room or public space for a specific user and explain the constraints.'},
    {name:'Urban & Regional Planning',icon:'⌖',dims:{Analytical:.7,People:.65,Curiosity:.8,Creative:.55},cats:['values','problem','communication'],skills:['Planning','GIS','research','community engagement'],subjects:['Geography','Social Studies','Mathematics'],tradeoffs:['Many stakeholders','Long-term projects'],alt:['Architecture','Geography','Public Administration'],test:'Map one local issue such as traffic, walkability or public space and propose alternatives.'},

    // Natural sciences & mathematics
    {name:'Mathematics',icon:'∑',dims:{Analytical:1,Learning:.9,Curiosity:.85,Creative:.3},cats:['subjects','problem','learning'],skills:['Proof','logic','modelling','quantitative reasoning'],subjects:['Mathematics','Statistics','Computer Science'],tradeoffs:['Abstract reasoning','Requires sustained practice'],alt:['Statistics','Actuarial Science','Economics'],test:'Choose a mathematical idea and explain it with your own example.'},
    {name:'Statistics',icon:'▥',dims:{Analytical:1,Curiosity:.85,Learning:.85,People:.3},cats:['problem','subjects','interests'],skills:['Probability','data analysis','inference','communication'],subjects:['Mathematics','Statistics','Computer Science'],tradeoffs:['Careful interpretation','Uncertainty is unavoidable'],alt:['Data Science','Economics','Biostatistics'],test:'Compare two datasets and write what the data can and cannot support.'},
    {name:'Physics',icon:'◉',dims:{Analytical:1,Curiosity:.95,Learning:.9,Creative:.35},cats:['problem','subjects','interests'],skills:['Modelling','experimentation','mathematics','reasoning'],subjects:['Physics','Mathematics','Science'],tradeoffs:['Strong mathematical component','Experimentation can be slow'],alt:['Engineering','Astronomy','Materials Science'],test:'Measure a simple physical phenomenon and create a model that explains the observations.'},
    {name:'Chemistry',icon:'⚗',dims:{Analytical:.9,Curiosity:.9,Learning:.9,Creative:.35},cats:['subjects','interests','learning'],skills:['Laboratory methods','chemistry','data interpretation'],subjects:['Chemistry','Biology','Mathematics'],tradeoffs:['Lab safety','Detailed concepts and procedures'],alt:['Pharmacy','Chemical Engineering','Environmental Science'],test:'Investigate a safe household chemistry question using reliable sources and observations.'},
    {name:'Biology',icon:'♧',dims:{Curiosity:.95,Learning:.9,Analytical:.65,People:.3},cats:['subjects','interests','learning'],skills:['Observation','research','lab methods','scientific writing'],subjects:['Biology','Chemistry','Science'],tradeoffs:['Large amount of content','Research can be repetitive'],alt:['Biotechnology','Medicine','Environmental Science'],test:'Choose a biological question and compare evidence from several credible sources.'},
    {name:'Environmental Science',icon:'♧',dims:{Curiosity:.9,Learning:.8,Analytical:.65,People:.35},cats:['subjects','values','interests'],skills:['Research','data','field methods','communication'],subjects:['Biology','Chemistry','Earth Science'],tradeoffs:['Field conditions','Complex systems'],alt:['Geoscience','Conservation','Sustainability'],test:'Choose a local environmental question and collect observations for a week.'},
    {name:'Geology / Earth Science',icon:'◇',dims:{Curiosity:.9,Learning:.8,Analytical:.7,People:.25},cats:['subjects','interests','problem'],skills:['Field observation','earth systems','mapping','analysis'],subjects:['Earth Science','Geography','Physics'],tradeoffs:['Fieldwork','Specialized locations may matter'],alt:['Environmental Science','Geography','Mining Engineering'],test:'Study the geology or landforms around your area using maps and credible references.'},
    {name:'Astronomy / Astrophysics',icon:'✦',dims:{Curiosity:1,Analytical:.95,Learning:.95,Creative:.3},cats:['interests','subjects','learning'],skills:['Physics','mathematics','data analysis','research'],subjects:['Physics','Mathematics','Science'],tradeoffs:['Highly quantitative','Specialist careers often require advanced study'],alt:['Physics','Data Science','Space Science'],test:'Track an observable sky object or analyze public astronomy data.'},

    // Health & life sciences
    {name:'Medicine',icon:'✚',dims:{People:.75,Learning:1,Curiosity:.8,Analytical:.7},cats:['subjects','communication','values'],skills:['Clinical reasoning','biology','communication','decision-making'],subjects:['Biology','Chemistry','Physics'],tradeoffs:['Long training','High responsibility and demanding schedules'],alt:['Nursing','Medical Technology','Public Health'],test:'Learn what a typical day looks like for several medical specialties and compare the actual tasks.'},
    {name:'Nursing',icon:'✚',dims:{People:1,Learning:.8,Curiosity:.65,Analytical:.55},cats:['communication','values','learning'],skills:['Patient care','communication','clinical skills','teamwork'],subjects:['Biology','Health','Chemistry'],tradeoffs:['Emotionally and physically demanding','Shift work can occur'],alt:['Medicine','Midwifery','Public Health'],test:'Interview a nurse or watch an official career overview and list the daily responsibilities.'},
    {name:'Pharmacy',icon:'⚕',dims:{Learning:.9,Analytical:.8,People:.65,Curiosity:.75},cats:['subjects','communication','learning'],skills:['Pharmacology','chemistry','patient communication','accuracy'],subjects:['Chemistry','Biology','Mathematics'],tradeoffs:['High accuracy requirements','Patient-facing or regulated work'],alt:['Medicine','Medical Technology','Chemistry'],test:'Research how pharmacists contribute beyond dispensing and summarize the roles you find.'},
    {name:'Medical Technology / Medical Laboratory Science',icon:'⌬',dims:{Analytical:.85,Learning:.9,Curiosity:.85,People:.35},cats:['subjects','problem','learning'],skills:['Laboratory science','biology','chemistry','accuracy'],subjects:['Biology','Chemistry','Science'],tradeoffs:['Detailed laboratory procedures','Accuracy is critical'],alt:['Biology','Pharmacy','Public Health'],test:'Explore how a diagnostic laboratory turns a specimen into useful clinical information.'},
    {name:'Dentistry',icon:'◉',dims:{People:.75,Analytical:.7,Learning:.85,Creative:.45},cats:['communication','subjects','workstyle'],skills:['Clinical skills','biology','fine motor skills','patient communication'],subjects:['Biology','Chemistry','Health'],tradeoffs:['Long training','Precision and patient responsibility'],alt:['Medicine','Dental Technology','Public Health'],test:'Compare preventive, restorative and community dentistry to see which daily tasks interest you.'},
    {name:'Physical Therapy',icon:'↻',dims:{People:.9,Learning:.75,Analytical:.6,Creative:.4},cats:['communication','values','learning'],skills:['Movement science','assessment','coaching','patient care'],subjects:['Biology','Health','Physics'],tradeoffs:['Hands-on patient work','Progress can be gradual'],alt:['Occupational Therapy','Sports Science','Nursing'],test:'Learn how a therapist assesses movement and design a safe educational exercise plan without presenting it as medical advice.'},
    {name:'Occupational Therapy',icon:'◎',dims:{People:.9,Creative:.55,Learning:.75,Curiosity:.65},cats:['communication','values','creativity'],skills:['Rehabilitation','problem solving','communication','adaptation'],subjects:['Biology','Health','Psychology'],tradeoffs:['Patient-centered work','Requires patience and adaptation'],alt:['Physical Therapy','Psychology','Special Education'],test:'Explore how occupational therapists adapt activities to help people participate in daily life.'},
    {name:'Public Health',icon:'⊕',dims:{People:.8,Analytical:.65,Curiosity:.8,Learning:.8},cats:['values','communication','subjects'],skills:['Epidemiology','health education','data','community work'],subjects:['Biology','Statistics','Social Science'],tradeoffs:['Community-level rather than one-to-one impact','Complex public systems'],alt:['Medicine','Nursing','Health Administration'],test:'Investigate one local public-health issue using official statistics and propose a non-medical educational intervention.'},
    {name:'Nutrition & Dietetics',icon:'⌁',dims:{People:.75,Learning:.8,Analytical:.6,Curiosity:.7},cats:['subjects','communication','values'],skills:['Nutrition science','assessment','communication','research'],subjects:['Biology','Chemistry','Health'],tradeoffs:['Evidence changes with research','Client behavior can be complex'],alt:['Food Science','Public Health','Sports Science'],test:'Compare nutrition claims online with guidance from reputable health authorities.'},
    {name:'Veterinary Medicine / Animal Science',icon:'🐾',dims:{People:.6,Curiosity:.9,Learning:.85,Analytical:.65},cats:['interests','subjects','values'],skills:['Animal biology','clinical reasoning','observation','communication'],subjects:['Biology','Chemistry','Animal Science'],tradeoffs:['Emotional cases','Practical and clinical work'],alt:['Animal Science','Biology','Agriculture'],test:'Compare veterinary clinical work with animal science, conservation and livestock-related careers.'},

    // Psychology, education & social sciences
    {name:'Psychology',icon:'◉',dims:{People:1,Curiosity:.8,Learning:.75,Analytical:.35},cats:['communication','interests','learning'],skills:['Listening','research methods','writing','statistics'],subjects:['Psychology','Biology','Statistics'],tradeoffs:['People-focused work','Some specialist roles require further study'],alt:['Counseling','Human Resources','UX Research'],test:'Read one behavioral study and identify its question, method, evidence and limits.'},
    {name:'Education / Teaching',icon:'▤',dims:{People:1,Creative:.55,Learning:.8,Curiosity:.65},cats:['communication','values','learning'],skills:['Teaching','lesson design','communication','assessment'],subjects:['Education','English','Mathematics or specialization'],tradeoffs:['High people interaction','Planning and classroom responsibility'],alt:['Training & Development','Educational Technology','Counseling'],test:'Teach a short concept to someone and revise your explanation based on what confused them.'},
    {name:'Early Childhood Education',icon:'☀',dims:{People:1,Creative:.65,Learning:.7,Curiosity:.65},cats:['communication','values','creativity'],skills:['Child development','activity design','communication','patience'],subjects:['Education','Psychology','Language'],tradeoffs:['High responsibility','Energetic people-focused work'],alt:['Elementary Education','Special Education','Child Development'],test:'Research age-appropriate learning activities and explain why each supports development.'},
    {name:'Special Education',icon:'◎',dims:{People:1,Creative:.55,Learning:.85,Curiosity:.7},cats:['communication','values','learning'],skills:['Inclusive teaching','adaptation','communication','observation'],subjects:['Education','Psychology','Health'],tradeoffs:['Highly individualized work','Requires patience and flexibility'],alt:['Education','Occupational Therapy','Psychology'],test:'Explore how learning materials can be adapted for different needs.'},
    {name:'Social Work',icon:'♡',dims:{People:1,Values:1,Learning:.65,Curiosity:.7},cats:['communication','values','pressure'],skills:['Case support','advocacy','communication','community work'],subjects:['Social Studies','Psychology','Communication'],tradeoffs:['Emotionally demanding situations','Strong community focus'],alt:['Counseling','Public Administration','Community Development'],test:'Learn about different social-work settings and compare their daily responsibilities.'},
    {name:'Sociology',icon:'◎',dims:{Curiosity:.9,People:.85,Learning:.8,Analytical:.45},cats:['values','interests','communication'],skills:['Social research','writing','data interpretation','observation'],subjects:['Social Studies','Statistics','History'],tradeoffs:['Research may be abstract','Career paths can span many sectors'],alt:['Anthropology','Public Policy','Human Resources'],test:'Investigate one social pattern using both qualitative and quantitative evidence.'},
    {name:'Political Science / Public Policy',icon:'§',dims:{People:.7,Curiosity:.9,Analytical:.65,Learning:.8},cats:['values','communication','interests'],skills:['Research','writing','policy analysis','argument evaluation'],subjects:['Social Studies','History','English'],tradeoffs:['Complex competing interests','Requires careful evidence evaluation'],alt:['Law','Public Administration','International Relations'],test:'Compare two documented policy approaches to one issue and separate facts from opinions.'},
    {name:'International Relations',icon:'◎',dims:{People:.75,Curiosity:.95,Learning:.85,Analytical:.55},cats:['values','communication','interests'],skills:['Research','languages','writing','cross-cultural communication'],subjects:['History','Social Studies','Languages'],tradeoffs:['Competitive fields','Global issues are complex and uncertain'],alt:['Political Science','Diplomacy','International Business'],test:'Choose an international issue and compare how several countries officially describe it.'},
    {name:'Anthropology',icon:'⌁',dims:{Curiosity:1,People:.8,Learning:.85,Analytical:.45},cats:['interests','communication','values'],skills:['Field research','observation','writing','cultural analysis'],subjects:['Social Studies','History','Languages'],tradeoffs:['Fieldwork can be demanding','Research-oriented career paths'],alt:['Sociology','Archaeology','Cultural Studies'],test:'Observe an everyday social practice and write questions about why it exists without assuming an answer.'},
    {name:'History',icon:'⌛',dims:{Curiosity:.9,Learning:.95,People:.55,Analytical:.55},cats:['subjects','interests','learning'],skills:['Research','source evaluation','writing','contextual reasoning'],subjects:['History','English','Social Studies'],tradeoffs:['Extensive reading','Interpretation requires source criticism'],alt:['Law','Education','Archives'],test:'Take a historical claim and compare several primary and secondary sources.'},

    // Business, finance, law & communication
    {name:'Business Administration',icon:'↗',dims:{People:.75,Analytical:.55,Creative:.55,Learning:.7},cats:['motivation','communication','values'],skills:['Management','finance basics','communication','operations'],subjects:['Business','Economics','Mathematics'],tradeoffs:['Broad rather than specialized','Team and deadline driven'],alt:['Marketing','Management','Entrepreneurship'],test:'Analyze how a small business earns, spends and creates value.'},
    {name:'Accounting',icon:'▤',dims:{Analytical:.9,Learning:.8,People:.45,Curiosity:.55},cats:['subjects','workstyle','problem'],skills:['Accounting','financial reporting','accuracy','analysis'],subjects:['Mathematics','Business','Economics'],tradeoffs:['Detail-heavy','Accuracy and deadlines matter'],alt:['Finance','Auditing','Management Accounting'],test:'Create a simple budget and reconcile the numbers carefully.'},
    {name:'Finance',icon:'₱',dims:{Analytical:.85,Learning:.75,People:.45,Curiosity:.65},cats:['subjects','problem','motivation'],skills:['Financial analysis','economics','risk','quantitative reasoning'],subjects:['Mathematics','Economics','Business'],tradeoffs:['High attention to uncertainty','Numbers and decisions are central'],alt:['Accounting','Economics','Actuarial Science'],test:'Learn how compound growth, inflation and risk affect a hypothetical long-term plan.'},
    {name:'Economics',icon:'∿',dims:{Analytical:.85,Curiosity:.85,Learning:.8,People:.5},cats:['problem','subjects','values'],skills:['Economic reasoning','statistics','research','writing'],subjects:['Mathematics','Economics','Social Studies'],tradeoffs:['Models simplify reality','Requires quantitative and conceptual thinking'],alt:['Finance','Public Policy','Business Analytics'],test:'Use a simple supply-and-demand example to explain a real-world price change.'},
    {name:'Marketing',icon:'✦',dims:{Creative:.8,People:.8,Analytical:.5,Curiosity:.65},cats:['creativity','communication','motivation'],skills:['Research','branding','communication','analytics'],subjects:['Business','English','Art/Design'],tradeoffs:['Fast-changing trends','Results can be uncertain'],alt:['Advertising','Public Relations','Sales'],test:'Compare how two brands communicate to different audiences and identify the evidence.'},
    {name:'Entrepreneurship',icon:'↗',dims:{People:.8,Creative:.75,Curiosity:.65,Analytical:.55},cats:['motivation','communication','values'],skills:['Problem discovery','market research','finance','leadership'],subjects:['Business','Economics','Mathematics'],tradeoffs:['Uncertainty','Requires experimentation and resilience'],alt:['Business Administration','Marketing','Innovation Management'],test:'Interview three people about a real problem before proposing a solution.'},
    {name:'Human Resources',icon:'♧',dims:{People:1,Analytical:.45,Learning:.7,Creative:.4},cats:['communication','values','workstyle'],skills:['Recruitment','communication','organizational behavior','policy'],subjects:['Business','Psychology','Communication'],tradeoffs:['People conflicts can be difficult','Requires confidentiality and fairness'],alt:['Psychology','Management','Labor Relations'],test:'Study how organizations recruit, onboard and develop people.'},
    {name:'Law / Legal Studies',icon:'§',dims:{Analytical:.75,People:.7,Learning:.9,Curiosity:.8},cats:['communication','problem','subjects'],skills:['Reading','argument analysis','research','writing'],subjects:['English','History','Social Studies'],tradeoffs:['Heavy reading','Precision and competing arguments'],alt:['Political Science','Criminology','Compliance'],test:'Read a simple public legal case summary and identify the facts, issue, arguments and decision.'},
    {name:'Criminology',icon:'⌁',dims:{Curiosity:.85,People:.65,Analytical:.65,Learning:.8},cats:['interests','problem','values'],skills:['Research','crime analysis','social science','writing'],subjects:['Social Studies','Psychology','Statistics'],tradeoffs:['Sensitive subject matter','Evidence must be handled carefully'],alt:['Law','Forensics','Public Safety'],test:'Study evidence-based explanations of crime and compare them without assuming one cause.'},
    {name:'Communication / Media Studies',icon:'◌',dims:{People:.8,Creative:.8,Learning:.65,Curiosity:.6},cats:['communication','creativity','interests'],skills:['Writing','speaking','media production','research'],subjects:['English','Communication','Media Arts'],tradeoffs:['Fast-changing media','Public-facing work can be demanding'],alt:['Journalism','Public Relations','Advertising'],test:'Create a short explanation of a complex topic for two different audiences.'},
    {name:'Journalism',icon:'▤',dims:{Curiosity:.9,People:.75,Creative:.7,Analytical:.55},cats:['communication','interests','values'],skills:['Interviewing','research','writing','source verification'],subjects:['English','Social Studies','Media'],tradeoffs:['Deadlines','Source verification and public scrutiny'],alt:['Communication','Broadcasting','Public Relations'],test:'Report a local topic using multiple sources and clearly separate verified facts from claims.'},
    {name:'Public Relations',icon:'◉',dims:{People:.9,Creative:.75,Curiosity:.55,Analytical:.4},cats:['communication','creativity','motivation'],skills:['Writing','media relations','campaign planning','communication'],subjects:['Communication','English','Business'],tradeoffs:['Reputation-sensitive work','Fast deadlines'],alt:['Marketing','Journalism','Advertising'],test:'Draft a factual communication plan for a hypothetical school event and consider different audiences.'},

    // Arts, design & creative fields
    {name:'Fine Arts',icon:'✦',dims:{Creative:1,Curiosity:.7,People:.35,Learning:.65},cats:['creativity','interests','values'],skills:['Visual practice','concept development','critique','portfolio building'],subjects:['Art','History','Design'],tradeoffs:['Portfolio development takes time','Income paths can vary'],alt:['Graphic Design','Illustration','Art Education'],test:'Make a small body of work around one theme and document how your idea changed.'},
    {name:'Graphic Design',icon:'◇',dims:{Creative:1,People:.55,Analytical:.4,Learning:.65},cats:['creativity','communication','interests'],skills:['Typography','layout','visual communication','design software'],subjects:['Art','Design','ICT'],tradeoffs:['Frequent critique','Client constraints'],alt:['UI Design','Illustration','Advertising'],test:'Redesign a poster for a specific audience and explain your design choices.'},
    {name:'Animation / 3D / Visual Effects',icon:'✦',dims:{Creative:1,Analytical:.45,Learning:.75,Curiosity:.7},cats:['creativity','interests','learning'],skills:['Storyboarding','3D tools','animation','visual storytelling'],subjects:['Art','ICT','Media'],tradeoffs:['Long production cycles','Technical creative tools'],alt:['Film','Game Art','Graphic Design'],test:'Create a short storyboard or simple animation sequence with a clear visual idea.'},
    {name:'Film / Broadcasting',icon:'▶',dims:{Creative:.9,People:.75,Curiosity:.65,Learning:.55},cats:['creativity','communication','interests'],skills:['Storytelling','camera/audio','editing','production'],subjects:['Media','English','Art'],tradeoffs:['Team-based production','Irregular project schedules'],alt:['Journalism','Communication','Digital Media'],test:'Produce a short factual video with a script, shots and source notes.'},
    {name:'Music / Performing Arts',icon:'♫',dims:{Creative:1,People:.7,Learning:.7,Curiosity:.65},cats:['creativity','communication','interests'],skills:['Performance','practice','composition','collaboration'],subjects:['Music','Arts','Languages'],tradeoffs:['High practice demands','Performance pressure can occur'],alt:['Music Education','Production','Arts Management'],test:'Learn or create a short piece and record what practice methods helped most.'},
    {name:'Interior Design',icon:'⌂',dims:{Creative:.95,People:.55,Analytical:.45,Learning:.65},cats:['creativity','values','workstyle'],skills:['Spatial design','materials','visualization','client communication'],subjects:['Art','Design','Mathematics'],tradeoffs:['Client constraints','Detailed revisions'],alt:['Architecture','Furniture Design','Visual Merchandising'],test:'Redesign a small room for a specific user, budget and functional need.'},
    {name:'Fashion Design / Apparel',icon:'◇',dims:{Creative:1,People:.5,Learning:.65,Curiosity:.65},cats:['creativity','interests','values'],skills:['Design','materials','pattern making','visual communication'],subjects:['Art','Design','Home Economics'],tradeoffs:['Trend-sensitive','Production constraints'],alt:['Textile Design','Merchandising','Costume Design'],test:'Design a small capsule collection around a practical user need.'},

    // Agriculture, food, environment & natural resources
    {name:'Agriculture / Agribusiness',icon:'♧',dims:{Curiosity:.8,People:.55,Analytical:.6,Learning:.75},cats:['values','subjects','interests'],skills:['Crop systems','business','field observation','resource management'],subjects:['Biology','Chemistry','Business'],tradeoffs:['Field conditions','Seasonal and market uncertainty'],alt:['Agricultural Engineering','Food Science','Environmental Science'],test:'Investigate one crop or farm system and map its biological and business constraints.'},
    {name:'Agricultural Engineering',icon:'⚙',dims:{Analytical:.9,Curiosity:.8,Learning:.8,Creative:.55},cats:['problem','subjects','values'],skills:['Engineering','irrigation','machinery','resource systems'],subjects:['Mathematics','Physics','Agriculture'],tradeoffs:['Technical and field work','Real-world environmental constraints'],alt:['Mechanical Engineering','Agriculture','Environmental Engineering'],test:'Design a simple water-use or farm-efficiency improvement and estimate its trade-offs.'},
    {name:'Food Science & Technology',icon:'◇',dims:{Analytical:.75,Curiosity:.85,Learning:.85,Creative:.45},cats:['subjects','interests','problem'],skills:['Food chemistry','quality control','processing','research'],subjects:['Chemistry','Biology','Mathematics'],tradeoffs:['Quality and safety requirements','Laboratory or production environments'],alt:['Nutrition','Chemistry','Agribusiness'],test:'Investigate how one packaged food is processed, preserved and quality-tested.'},
    {name:'Forestry / Natural Resources',icon:'♧',dims:{Curiosity:.9,Learning:.8,People:.4,Analytical:.55},cats:['values','interests','subjects'],skills:['Ecology','field methods','resource management','mapping'],subjects:['Biology','Earth Science','Geography'],tradeoffs:['Outdoor work','Long-term environmental systems'],alt:['Environmental Science','Agriculture','Conservation'],test:'Study a local ecosystem and identify pressures, stakeholders and possible conservation actions.'},

    // Hospitality, tourism, maritime & services
    {name:'Hospitality Management',icon:'✦',dims:{People:.95,Creative:.55,Learning:.6,Analytical:.35},cats:['communication','workstyle','motivation'],skills:['Guest service','operations','teamwork','event planning'],subjects:['Business','Communication','Home Economics'],tradeoffs:['Customer-facing work','Variable schedules'],alt:['Tourism','Restaurant Management','Events'],test:'Analyze the guest journey of a hotel or restaurant and identify points where service matters.'},
    {name:'Tourism Management',icon:'⌖',dims:{People:.85,Curiosity:.8,Creative:.6,Learning:.6},cats:['communication','interests','values'],skills:['Tour planning','communication','destination research','marketing'],subjects:['Geography','Business','Communication'],tradeoffs:['Seasonal demand','Customer-facing schedules'],alt:['Hospitality','Travel Management','Events'],test:'Design a responsible local tourism itinerary with audience, budget and sustainability considerations.'},
    {name:'Culinary Arts / Culinary Management',icon:'♨',dims:{Creative:.8,People:.75,Learning:.65,Curiosity:.6},cats:['creativity','workstyle','interests'],skills:['Cooking','food safety','menu planning','operations'],subjects:['Home Economics','Science','Business'],tradeoffs:['Fast-paced work','Long or irregular hours can occur'],alt:['Food Science','Hospitality','Entrepreneurship'],test:'Plan and execute a simple meal while tracking preparation time, cost and quality.'},
    {name:'Maritime Studies / Marine Transportation',icon:'⚓',dims:{Analytical:.65,Learning:.8,Curiosity:.8,People:.55},cats:['values','subjects','workstyle'],skills:['Navigation','safety','operations','discipline'],subjects:['Physics','Mathematics','Geography'],tradeoffs:['Extended periods away from home may occur','Strict safety procedures'],alt:['Marine Engineering','Logistics','Port Management'],test:'Research the training, certification and actual onboard duties for maritime roles.'},
    {name:'Marine Engineering',icon:'⚓',dims:{Analytical:.9,Learning:.85,Curiosity:.8,Creative:.35},cats:['problem','subjects','workstyle'],skills:['Mechanical systems','engines','maintenance','safety'],subjects:['Mathematics','Physics','Engineering'],tradeoffs:['Technical responsibility','Potential extended time at sea'],alt:['Mechanical Engineering','Maritime Studies','Marine Technology'],test:'Learn how a ship propulsion system works and identify its major engineering subsystems.'},
    {name:'Logistics & Supply Chain Management',icon:'⇄',dims:{Analytical:.75,People:.6,Learning:.7,Curiosity:.6},cats:['problem','workstyle','communication'],skills:['Planning','inventory','operations','data'],subjects:['Business','Mathematics','Economics'],tradeoffs:['Time-sensitive decisions','Coordination across many people'],alt:['Industrial Engineering','Business Administration','Operations'],test:'Map how an everyday product moves from supplier to customer and find possible bottlenecks.'},

    // Public service, safety & specialized fields
    {name:'Public Administration',icon:'▤',dims:{People:.75,Analytical:.6,Learning:.8,Curiosity:.7},cats:['values','communication','workstyle'],skills:['Policy implementation','administration','public service','research'],subjects:['Social Studies','Business','English'],tradeoffs:['Complex procedures','Many stakeholders'],alt:['Political Science','Public Policy','Community Development'],test:'Study how a local public service is delivered and identify the roles involved.'},
    {name:'Library & Information Science',icon:'▤',dims:{Learning:.9,People:.65,Curiosity:.8,Analytical:.55},cats:['learning','communication','interests'],skills:['Information organization','research','digital literacy','service'],subjects:['English','ICT','Research'],tradeoffs:['Detail-oriented work','Service responsibilities'],alt:['Archives','Records Management','Education'],test:'Organize a small collection of information using a clear classification system.'},
    {name:'Emergency Management / Disaster Risk Reduction',icon:'△',dims:{People:.75,Analytical:.7,Curiosity:.8,Learning:.8},cats:['values','problem','communication'],skills:['Risk assessment','planning','coordination','communication'],subjects:['Science','Geography','Social Studies'],tradeoffs:['High-stakes situations','Preparedness work can be repetitive'],alt:['Public Administration','Environmental Science','Safety Management'],test:'Create a basic community hazard map using publicly available information.'},
    {name:'Aviation / Aeronautics',icon:'✈',dims:{Analytical:.8,Learning:.85,Curiosity:.85,People:.45},cats:['subjects','workstyle','interests'],skills:['Safety','systems','navigation','technical communication'],subjects:['Physics','Mathematics','Geography'],tradeoffs:['Strict regulations','Safety-critical procedures'],alt:['Aerospace Engineering','Air Traffic Services','Aircraft Maintenance'],test:'Explore the different careers around aviation rather than focusing only on pilots.'},
    {name:'Forensic Science',icon:'⌬',dims:{Analytical:.9,Curiosity:.9,Learning:.85,People:.3},cats:['problem','interests','subjects'],skills:['Laboratory methods','evidence handling','chemistry','documentation'],subjects:['Chemistry','Biology','Physics'],tradeoffs:['Strict evidence procedures','Sensitive subject matter'],alt:['Chemistry','Criminology','Medical Laboratory Science'],test:'Learn how evidence is documented and why scientific conclusions must distinguish observation from inference.'},
    {name:'Sports Science / Exercise Science',icon:'↻',dims:{People:.7,Learning:.75,Curiosity:.75,Analytical:.55},cats:['interests','subjects','communication'],skills:['Exercise science','measurement','coaching','anatomy'],subjects:['Biology','Health','Physics'],tradeoffs:['Hands-on work','Evidence and safety matter'],alt:['Physical Therapy','Coaching','Nutrition'],test:'Compare how exercise science, physical therapy and coaching differ in goals and daily work.'}
  ]
};

function localAIState(){
  if(!state.localAI) state.localAI={asked:[],history:[],signals:Object.fromEntries(LOCAL_AI.dimensions.map(x=>[x,1])),catEvidence:{},pressure:{},contradictions:[],started:Date.now(),complete:false};
  return state.localAI;
}
function saveLocalAI(){localStorage.setItem(LOCAL_AI_STORE.session,JSON.stringify(state.localAI||null));localStorage.setItem(LOCAL_AI_STORE.result,JSON.stringify(state.localAIResult||null));saveState();}
function loadLocalAI(){
  try{state.localAI=JSON.parse(localStorage.getItem(LOCAL_AI_STORE.session)||'null');state.localAIResult=JSON.parse(localStorage.getItem(LOCAL_AI_STORE.result)||'null')}catch(e){}
}
loadLocalAI();

function localAnswerText(q,val){return String(Array.isArray(val)?val.join(' | '):val||'').toLowerCase()}
function localValidAnswer(v){return v!==undefined&&v!==null&&v!==''&&(!Array.isArray(v)||v.some(x=>x!==''));}
function localSignalFromAnswer(q,val){
  const a=localAIState(), text=localAnswerText(q,val); a.history.push({id:q.id,category:q.category,text}); a.catEvidence[q.category]=(a.catEvidence[q.category]||0)+1;
  for(const [dim,words] of Object.entries(LOCAL_AI.keywords)){
    const hits=words.reduce((n,w)=>n+(text.includes(w)?1:0),0);
    if(hits)a.signals[dim]+=Math.min(hits,3)*.65;
  }
  for(const [dim,w] of Object.entries(LOCAL_AI.weights[q.category]||{})) a.signals[dim]+=w;
  if(q.type==='scale'&&Number(val)){a.signals.Learning+=Number(val)*.25;a.signals.Curiosity+=Number(val)*.25}
  const pressureHits=LOCAL_AI.pressureWords.filter(w=>text.includes(w));
  if(pressureHits.length){a.pressure[q.category]=(a.pressure[q.category]||0)+pressureHits.length}
  // Simple contradiction detector: stated preference vs repeated category evidence.
  if(a.history.length>=5){
    const recent=a.history.slice(-5); const analytical=recent.filter(x=>['problem','subjects'].includes(x.category)).length;
    const creative=recent.filter(x=>x.category==='creativity').length;
    if(analytical>=2&&creative>=2&&a.signals.Analytical>1.6&&a.signals.Creative>1.6){a.contradictions.push({signal:'Multiple strong directions',evidence:'Recent answers show both technical/problem-solving and creative signals.',followUp:'Test both through small projects rather than forcing an early choice.'})}
  }
}
function localNormalize(){const a=localAIState(), vals=a.signals, max=Math.max(...Object.values(vals));return Object.fromEntries(LOCAL_AI.dimensions.map(d=>[d,Math.max(28,Math.round(vals[d]/max*100))]));}
function localCategoryNeed(cat){const a=localAIState(); const count=a.catEvidence[cat]||0; return Math.max(0,2-count)*3 + (a.history.length<10?2:0);}
function localQuestionScore(q){
  const a=localAIState(); if(a.asked.includes(q.id))return -1e9;
  let score=q.weight*.08 + localCategoryNeed(q.category)*2;
  // Favor dimensions that have not yet been sampled and question types that add different evidence.
  const usedTypes=a.history.map(h=>QUESTION_BANK.find(x=>x.id===h.id)?.type).filter(Boolean); if(!usedTypes.includes(q.type))score+=2;
  const text=q.prompt.toLowerCase();
  const low=Object.entries(a.signals).sort((x,y)=>x[1]-y[1]).slice(0,2).map(x=>x[0]);
  for(const dim of low) if(LOCAL_AI.keywords[dim].some(w=>text.includes(w)))score+=2.5;
  // If pressure signals appear, ask values/pressure questions to clarify rather than infer.
  if(Object.values(a.pressure).some(v=>v>=2)&&['pressure','values','motivation'].includes(q.category))score+=4;
  // Occasionally probe an underrepresented category even when it is not currently strong.
  score+=Math.random()*1.2;
  return score;
}
function localChooseFirst(){
  const candidates=QUESTION_BANK.filter(q=>q.category!=='pressure');
  return candidates[Math.floor(Math.random()*candidates.length)];
}
function localChooseNext(){
  const a=localAIState();
  const pool=QUESTION_BANK.filter(q=>!a.asked.includes(q.id));
  return pool.sort((x,y)=>localQuestionScore(y)-localQuestionScore(x))[0]||pool[0];
}
function localStartSession(){
  state.localAI={asked:[],history:[],signals:Object.fromEntries(LOCAL_AI.dimensions.map(x=>[x,1])),catEvidence:{},pressure:{},contradictions:[],started:Date.now(),complete:false};
  state.localAIResult=null;state.answers={};state.qIndex=0;
  const q=localChooseFirst();state.localAI.asked=[q.id];state.session={ids:[q.id],started:Date.now()};saveLocalAI();
  renderLocalQuestion();updateUI();
}
function localCurrentQuestion(){const a=localAIState();const id=a.asked[a.asked.length-1];return QUESTION_BANK.find(q=>q.id===id)||null}
function localCapture(){
  const q=localCurrentQuestion();if(!q)return null; let val='';
  if(q.type==='open')val=$('#answerOpen')?.value||'';
  else if(q.type==='rank')val=$$('#answerRank select').map(x=>x.value);
  else if(q.type==='multi')val=$$('#question input[type=checkbox]:checked').map(x=>x.value);
  else val=$$('#question input[name=answer]:checked')[0]?.value||'';
  if(!localValidAnswer(val)){toast('Choose or write an answer before continuing.');return null;}
  state.answers[q.id]=val;localSignalFromAnswer(q,val);return val;
}
function renderLocalQuestion(){
  const q=localCurrentQuestion();if(!q)return;const n=localAIState().history.length+1;
  $('#qCount').textContent=`${n} / ${LOCAL_AI.maxQuestions}`;
  $('#selectionInfo').innerHTML=`<b>LOCAL ADAPTIVE AI</b><br><br>This engine is choosing the next question from the 1,000-question bank using your previous answers, coverage gaps and response patterns.<br><br><span class="muted">No cloud AI and no career match score.</span>`;
  const val=state.answers[q.id];let body='';
  if(q.type==='scale')body=`<div class="scale">${q.scaleLabels.map((x,i)=>`<label><input type="radio" name="answer" value="${i+1}" ${String(val)===String(i+1)?'checked':''}>${i+1}<small>${escapeHtml(x)}</small></label>`).join('')}</div>`;
  else if(q.type==='open')body=`<textarea class="open" id="answerOpen" placeholder="Write honestly. A few sentences are enough.">${escapeHtml(val||'')}</textarea>`;
  else if(q.type==='rank')body=`<div class="rank" id="answerRank">${q.options.map(o=>`<div><span>${escapeHtml(o)}</span><select><option value="">Rank</option>${[1,2,3,4,5].map(n=>`<option ${Array.isArray(val)&&val.includes(String(n))&&val[q.options.indexOf(o)]===String(n)?'selected':''}>${n}</option>`).join('')}</select></div>`).join('')}</div>`;
  else body=`<div class="options">${(q.options||[]).map(o=>`<label class="option"><input type="${q.type==='multi'?'checkbox':'radio'}" name="answer" value="${escapeHtml(o)}"><span>${escapeHtml(o)}</span></label>`).join('')}</div>`;
  $('#question').innerHTML=`<div class="question-card ai-question-card" id="localQuestionCard"><div class="question-type">LOCAL AI · ${escapeHtml(q.categoryLabel)}</div><h3>${escapeHtml(q.prompt)}</h3>${body}<p class="muted">There is no socially correct answer. The next question may change based on this answer.</p><div class="ai-why">✦ Adaptive reason: the engine is balancing evidence across your interests, working style, values and problem-solving patterns.</div><div class="question-nav"><button class="btn soft" id="localBack" disabled>← Adaptive</button><button class="btn primary" id="localNext">${n===20?'Finish & analyze':'Next →'}</button></div></div>`;
  $$('#question input').forEach(x=>x.addEventListener('change',()=>{$$('.option').forEach(o=>{const inp=o.querySelector('input');if(inp)o.classList.toggle('selected',inp.checked)})}));
  $('#localNext').onclick=localNext;
}
function localNext(){
  if(!localCapture())return; const a=localAIState();
  if(a.history.length>=LOCAL_AI.maxQuestions){a.complete=true;state.localAIResult=localBuildResult();saveLocalAI();renderLocalResult();renderLocalPathways();renderLocalRoadmap();renderLocalInterest();updateUI();toast('20 adaptive answers analyzed locally.');goTab('analysis');return;}
  const next=localChooseNext();if(!next){toast('No unused questions remain.');return;}a.asked.push(next.id);state.session.ids=a.asked.slice();state.qIndex=a.asked.length-1;saveLocalAI();renderLocalQuestion();updateUI();
}
function localBuildResult(){
  const a=localAIState(), interestMap=localNormalize();
  const sorted=Object.entries(interestMap).sort((x,y)=>y[1]-x[1]);
  const strengths=sorted.slice(0,3).map(([d])=>`${d} shows a repeated signal across the adaptive answers.`);
  const develop=sorted.slice(-2).map(([d])=>`${d} has less evidence so far; try a small experiment before drawing conclusions.`);
  const pressureSignals=Object.entries(a.pressure).filter(([,v])=>v>=2).map(([cat,v])=>({area:cat==='pressure'?'External expectations / pressure':cat,level:v>=4?'Worth clarifying':'Possible signal',evidence:`Several responses contained language related to external expectations or status/financial considerations. This is a reflection prompt, not a conclusion about motivation.`}));
  const pathways=LOCAL_AI.pathwayProfiles.map(p=>{let score=0;for(const [d,w] of Object.entries(p.dims))score+=(interestMap[d]||0)*w;for(const c of p.cats)score+=((a.catEvidence[c]||0)*3);return {...p,_score:score}}).sort((x,y)=>y._score-x._score).slice(0,30).map(({_score,...p})=>p);
  const top=sorted.slice(0,2).map(x=>x[0].toLowerCase()).join(' and ');
  return {summary:`Your answers show the clearest current signals around ${top}. These are directions to test, not a prediction or a final career decision.`,interestMap,strengthSignals:strengths,developmentAreas:develop,workingStyleHypothesis:'The evidence suggests a mix of focused problem-solving and exploration. Test this through real projects because a short questionnaire cannot establish a fixed personality type.',pressureSignals,contradictions:a.contradictions.slice(0,3),uncertainty:['This is one 20-question sample from a 1,000-question bank.','Some dimensions have stronger evidence than others.','Pathways should be tested with projects, conversations, coursework and current education information.'],pathways,roadmap:{next30Days:['Pick one pathway experiment from the suggestions and spend 2–4 hours testing it.','Write down what you enjoyed, what frustrated you, and what you would voluntarily learn next.','Talk to one student, teacher or professional about the real work involved.'],next6Months:['Build 2–3 small projects across different pathways.','Strengthen the school subjects and foundational skills that recur across your experiments.','Compare your evidence and update your pathway set instead of treating the first result as final.'],next1to2Years:['Choose coursework, extracurriculars and projects that preserve multiple plausible options.','Research current degree requirements, scholarships and admissions directly from official sources when relevant.','Retake the questionnaire after gaining new experience and compare how your evidence changed.']}};
}
function renderLocalResult(){
 const a=state.localAIResult;if(!a)return;const list=x=>Array.isArray(x)?x.map(v=>`<li>${escapeHtml(v)}</li>`).join(''):'';
 const pressure=(a.pressureSignals||[]).map(x=>`<div class="signal"><b>${escapeHtml(x.area)}</b><span>${escapeHtml(x.level)}</span><p>${escapeHtml(x.evidence)}</p></div>`).join('')||'<p class="muted">No repeated pressure-related signal was detected.</p>';
 const contradictions=(a.contradictions||[]).map(x=>`<div class="signal"><b>${escapeHtml(x.signal)}</b><p>${escapeHtml(x.evidence)}</p><small>${escapeHtml(x.followUp)}</small></div>`).join('')||'<p class="muted">No major contradiction signal was detected.</p>';
 $('#analysisIntro').textContent='Local AI analysis generated from your 20 adaptive answers.';
 $('#analysis').innerHTML=`<div class="ai-banner"><span class="ai-orb">✦</span><div><b>Local AI analysis</b><p>${escapeHtml(a.summary)}</p></div></div><div class="analysis-grid"><div class="analysis-box"><h3>Interest signals</h3><div class="interest-ai-bars">${Object.entries(a.interestMap).map(([k,v])=>`<div><span>${escapeHtml(k)}</span><i><em style="width:${v}%"></em></i><b>${v}</b></div>`).join('')}</div></div><div class="analysis-box"><h3>Strength signals</h3><ul>${list(a.strengthSignals)}</ul><h3>Development areas</h3><ul>${list(a.developmentAreas)}</ul></div><div class="analysis-box"><h3>Working style</h3><p>${escapeHtml(a.workingStyleHypothesis)}</p></div><div class="analysis-box"><h3>Pressure reflection</h3>${pressure}<p class="muted">Response-pattern indicator only.</p></div><div class="analysis-box full"><h3>Contradictions / mixed signals</h3>${contradictions}</div><div class="analysis-box full"><h3>Uncertainty</h3><ul>${list(a.uncertainty)}</ul></div><div class="analysis-box full"><button class="btn primary" onclick="goTab('pathways')">Explore pathways →</button></div></div>`;
}
function renderLocalPathways(){
 const ps=state.localAIResult?.pathways||[];if(!ps.length)return;$('#pathGrid').innerHTML=ps.map((p,i)=>`<article class="path-card ai-path"><span class="tag">LOCAL AI PATHWAY ${i+1}</span><h3>${p.icon} ${escapeHtml(p.name)}</h3><p class="reason">A direction to test based on the evidence in your adaptive answers.</p><p><b>Skills:</b> ${escapeHtml(p.skills.join(', '))}</p><p><b>Subjects:</b> ${escapeHtml(p.subjects.join(', '))}</p><p><b>Trade-offs:</b> ${escapeHtml(p.tradeoffs.join(' · '))}</p><p><b>Alternatives:</b> ${escapeHtml(p.alt.join(', '))}</p><div class="path-actions"><button class="small-btn save" onclick="toggleLocalSave('${escapeHtml(p.name).replace(/'/g,"\\'")}')">♡ ${state.saved.includes(p.name)?'Saved':'Save'}</button><button class="small-btn" onclick="toast('${escapeHtml(p.test).replace(/'/g,"\\'")}')">Test this path</button></div></article>`).join('');
}
function toggleLocalSave(name){state.saved=state.saved.includes(name)?state.saved.filter(x=>x!==name):[...state.saved,name];saveState();renderLocalPathways();renderSaved();updateUI();}
function renderLocalRoadmap(){const r=state.localAIResult?.roadmap;if(!r)return;const box=(t,a)=>`<div class="roadmap-card ai-roadmap"><span class="eyebrow">LOCAL AI</span><h3>${t}</h3><ul>${a.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div>`;$('#roadmapGrade').textContent=`Action plan adapted to ${state.user?.grade||'your current stage'}.`;$('#roadmap').innerHTML=box('Next 30 days',r.next30Days)+box('Next 6 months',r.next6Months)+box('Next 1–2 years',r.next1to2Years);}
function renderLocalInterest(){const m=state.localAIResult?.interestMap;if(!m)return;const order=LOCAL_AI.dimensions;const vals=order.map(x=>m[x]);const cx=50,cy=50,r=45;const coords=vals.map((v,i)=>{const angle=(-90+i*72)*Math.PI/180,rr=r*(v/100);return `${(cx+Math.cos(angle)*rr).toFixed(1)}% ${(cy+Math.sin(angle)*rr).toFixed(1)}%`;});$('#radarFill').style.clipPath=`polygon(${coords.join(',')})`;$('#radarFill').classList.add('ready');$('#interestStatus').textContent='Local AI · updated from 20 adaptive answers';$('#interestBars').innerHTML=order.map(x=>`<div class="interest-bar"><span>${x}</span><div class="interest-track"><i style="width:${m[x]}%"></i></div><b>${m[x]}</b></div>`).join('');}
function renderLocalOverview(){const ps=state.localAIResult?.pathways||[];if(ps.length)$('#topPaths').innerHTML=ps.slice(0,4).map(p=>`<div class="path-mini"><span class="path-icon">${p.icon}</span><span><b>${escapeHtml(p.name)}</b><small>Local AI pathway</small></span></div>`).join('');}
function renderLocalJourney(){const a=localAIState(),n=a.history.length,complete=!!state.localAIResult;$('#journeyQTitle').textContent=complete?'20 questions complete':`${n} / 20 answered`;$('#journeyQText').textContent=complete?'Adaptive interview complete.':'The local AI chooses each next question from the 1,000-question bank.';$('#journeyATitle').textContent=complete?'Analysis ready':'AI is learning';$('#journeyAText').textContent=complete?'Signals, uncertainty and pathways are ready.':'Each answer updates the next-question selection.';['journeyQuestionnaire','journeyAnalysis','journeyPathways','journeyRoadmap','journeyAction'].forEach(id=>document.getElementById(id)?.classList.remove('current','complete','done'));if(complete){['journeyQuestionnaire','journeyAnalysis','journeyPathways','journeyRoadmap'].forEach(id=>document.getElementById(id)?.classList.add('complete'));document.getElementById('journeyAction')?.classList.add('current')}else document.getElementById('journeyQuestionnaire')?.classList.add('current');}

// Replace the prototype's questionnaire/dashboard orchestration with the local AI.
const baseGoTab=goTab;
goTab=function(name){if(!state.user)return;$$('.side').forEach(x=>x.classList.toggle('active',x.dataset.tab===name));$$('.tab').forEach(x=>x.classList.toggle('active',x.id==='tab-'+name));if(name==='questionnaire')renderLocalQuestion();if(name==='analysis'){if(state.localAIResult)renderLocalResult();else renderAnalysis();}if(name==='pathways'){if(state.localAIResult)renderLocalPathways();else renderPathways();}if(name==='roadmaps'){if(state.localAIResult)renderLocalRoadmap();else renderRoadmap();}if(name==='saved')renderSaved();if(name==='compare')renderCompare();if(name==='profile')loadProfile();if(name==='overview'){if(state.localAIResult)renderLocalOverview();renderOverview();}renderLocalJourney();};

$('#signupForm').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());state.user={...d,role:'student',createdAt:Date.now()};state.saved=[];localStartSession();closeModal('authModal');updateUI();showPage('dashboard');goTab('overview');toast('Account created — your local AI guide is ready.');};
$('#loginForm').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target).entries());if(d.email==='admin@yourpath.demo'&&d.password==='admin123'){state.user={name:'Admin',email:d.email,role:'admin',grade:'College'};}else state.user={name:d.email.split('@')[0],email:d.email,role:'student',grade:state.user?.grade||'Grade 10'};saveState();closeModal('authModal');updateUI();showPage('dashboard');goTab('overview');if(!state.localAIResult&&!localAIState().history.length)localStartSession();toast('Logged in — local AI is ready.');};
window.newQuestionSession=()=>{localStartSession();toast('New adaptive 20-question session started.');};

const baseUpdateUI=updateUI;
updateUI=function(){baseUpdateUI();if(state.localAIResult){renderLocalOverview();renderLocalInterest();}renderLocalJourney();};

if(state.user&&state.localAIResult){renderLocalResult();renderLocalPathways();renderLocalRoadmap();renderLocalInterest();}
else if(state.user&&localAIState().history.length&&!state.localAIResult){renderLocalQuestion();}

/* ================= LOCAL AI ADMIN ANALYTICS =================
   No hard-coded platform numbers. The from-scratch AI observes only
   student sessions that are currently alive in this browser/origin.
*/
const ADMIN_LOCAL_STORE='yp_local_active_users_v1';
const ADMIN_HEARTBEAT_MS=15000;
const ADMIN_EXPIRY_MS=45000;
let ADMIN_TAB_SESSION=sessionStorage.getItem('yp_admin_tab_session_v1');
if(!ADMIN_TAB_SESSION){ADMIN_TAB_SESSION='tab_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,9);sessionStorage.setItem('yp_admin_tab_session_v1',ADMIN_TAB_SESSION)}

function adminReadActive(){
  try{return JSON.parse(localStorage.getItem(ADMIN_LOCAL_STORE)||'{}')}catch{return {}}
}
function adminWriteActive(data){localStorage.setItem(ADMIN_LOCAL_STORE,JSON.stringify(data))}
function adminPrune(){
  const data=adminReadActive(), now=Date.now();
  for(const [sid,u] of Object.entries(data)){if(!u||now-(u.lastSeen||0)>ADMIN_EXPIRY_MS)delete data[sid]}
  adminWriteActive(data); return data;
}
function adminToday(ts){const d=new Date(ts||0),n=new Date();return d.getFullYear()===n.getFullYear()&&d.getMonth()===n.getMonth()&&d.getDate()===n.getDate()}
function adminSyncStudent(){
  const data=adminPrune();
  if(!state.user || state.user.role==='admin'){
    if(data[ADMIN_TAB_SESSION]){delete data[ADMIN_TAB_SESSION];adminWriteActive(data)}
    return data;
  }
  data[ADMIN_TAB_SESSION]={
    sessionId:ADMIN_TAB_SESSION,
    email:state.user.email||'',
    name:state.user.name||'Student',
    grade:state.user.grade||'Not specified',
    createdAt:Number(state.user.createdAt)||Date.now(),
    lastSeen:Date.now(),
    completed:!!state.localAIResult,
    answered:localAIState().history?.length||0,
    interestMap:state.localAIResult?.interestMap||null,
    pathwayCount:state.localAIResult?.pathways?.length||0
  };
  adminWriteActive(data); return data;
}
function adminUniqueActive(){
  const data=adminSyncStudent(), grouped={};
  for(const u of Object.values(data)){
    if(!u||Date.now()-(u.lastSeen||0)>ADMIN_EXPIRY_MS||!u.email)continue;
    const key=u.email.toLowerCase();
    if(!grouped[key]||u.lastSeen>grouped[key].lastSeen)grouped[key]=u;
  }
  return Object.values(grouped);
}
function adminAIAnalyze(users){
  if(!users.length)return {insight:'No student is currently signed in. The dashboard will update automatically when a student session becomes active.',dims:[]};
  const dims=['Analytical','Creative','People','Learning','Curiosity'];
  const sums=Object.fromEntries(dims.map(d=>[d,0])); let evidence=0;
  for(const u of users){for(const d of dims){const v=Number(u.interestMap?.[d]);if(Number.isFinite(v)){sums[d]+=v;evidence++}}}
  const averages=dims.map(d=>[d,Math.round(sums[d]/Math.max(1,users.filter(u=>Number.isFinite(Number(u.interestMap?.[d]))).length))]).sort((a,b)=>b[1]-a[1]);
  const active=users.length, complete=users.filter(u=>u.completed).length, progress=active-complete;
  const top=averages[0]?.[0]||'Learning';
  let insight=`The local AI is observing ${active} active student ${active===1?'session':'profiles'}. The strongest observed interest signal is ${top}.`;
  if(complete)insight+=` ${complete} ${complete===1?'student has':'students have'} completed the adaptive interview.`;
  if(progress)insight+=` ${progress} ${progress===1?'student is':'students are'} still exploring.`;
  if(!evidence)insight='Active students are signed in, but the AI does not yet have completed interest-map evidence. Complete the 20-question interview to generate richer admin insights.';
  return {insight,dims:averages};
}
function renderAdminLocalAI(){
  if(!state.user||state.user.role!=='admin')return;
  const users=adminUniqueActive(), completed=users.filter(u=>u.completed), progress=users.filter(u=>!u.completed), today=users.filter(u=>adminToday(u.createdAt));
  const analysis=adminAIAnalyze(users);
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=String(v)};
  set('adminTotalUsers',users.length);set('adminCompleted',completed.length);set('adminProgress',progress.length);set('adminToday',today.length);
  set('adminScopeText','Local AI mode: counts only unique student profiles with a live heartbeat in this browser. When a session disappears, it is removed from these numbers.');
  set('adminAIInsight',analysis.insight);
  const bars=document.getElementById('adminInterestBars');
  if(bars){bars.innerHTML=analysis.dims.length?analysis.dims.map(([d,v])=>`<span>${escapeHtml(d)}<i style="width:${Math.max(0,Math.min(100,v))}%"></i></span>`).join(''):'<p class="muted">No interest evidence yet.</p>'}
  const list=document.getElementById('adminActiveList');
  if(list){
    list.innerHTML=users.length?users.map(u=>`<div class="admin-active-user"><b>${escapeHtml(u.name)}</b><small>${escapeHtml(u.grade)} · ${u.completed?'20/20 complete':`${u.answered}/20 answered`}</small><small>${u.pathwayCount?`${u.pathwayCount} AI pathways generated`:'AI pathways not generated yet'}</small></div>`).join(''):'<p class="muted admin-live-empty">No active student sessions right now.</p>';
  }
}
function adminRemoveCurrent(){const data=adminReadActive();delete data[ADMIN_TAB_SESSION];adminWriteActive(data)}
window.addEventListener('beforeunload',adminRemoveCurrent);
window.addEventListener('storage',e=>{if(e.key===ADMIN_LOCAL_STORE&&state.user?.role==='admin')renderAdminLocalAI()});
setInterval(()=>{if(state.user?.role==='admin')adminPrune();else adminSyncStudent();if(state.user?.role==='admin')renderAdminLocalAI()},ADMIN_HEARTBEAT_MS);

const previousGoTabForAdmin=goTab;
goTab=function(name){previousGoTabForAdmin(name);if(name==='admin')renderAdminLocalAI();};
const previousUpdateUIForAdmin=updateUI;
updateUI=function(){previousUpdateUIForAdmin();adminSyncStudent();if(state.user?.role==='admin')renderAdminLocalAI();};
const previousLogoutHandler=document.getElementById('logout')?.onclick;
if(document.getElementById('logout'))document.getElementById('logout').onclick=()=>{adminRemoveCurrent();state.user=null;saveState();showPage('home');toast('Logged out.')};

// Refresh the local admin view after the local AI changes its result.
const originalLocalAnswer=window.localAnswer;
window.addEventListener('local-ai-updated',()=>{adminSyncStudent();if(state.user?.role==='admin')renderAdminLocalAI()});
