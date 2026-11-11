const STORE="agentic-ladder-v1";
let state={disc:"all",view:null,quiz:{},rate:{},core:true};
try{const s=JSON.parse(localStorage.getItem(STORE)||"null");if(s&&typeof s==="object")state=Object.assign(state,s);}catch(e){}
if(!PATH[state.disc])state.disc="all";
function save(){try{localStorage.setItem(STORE,JSON.stringify(state));}catch(e){}}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const $=id=>document.getElementById(id);
const discName=k=>DISC.find(d=>d.k===k).name;

function currentLevel(){
  const q=state.quiz[state.disc]||{};
  for(let i=0;i<4;i++){ if(q[i]!=="yes") return i; }
  return 4;
}
function viewLevel(){ return state.view!=null?state.view:Math.min(currentLevel(),3); }
function verdictText(){
  const q=state.quiz[state.disc]||{}, c=currentLevel();
  if(!Object.keys(q).length) return "Answer from the top. Until you do, the page shows level 0.";
  if(c===4) return "You pass all four tests. Help your team climb next.";
  return `Work on level ${c}: ${LEVELS[c].name}.`;
}

function renderDisc(){
  $("disc").innerHTML=DISC.map(d=>`<label class="chip"><input type="radio" name="disc" id="disc-${d.k}" value="${d.k}" data-kind="disc" ${state.disc===d.k?"checked":""}>${esc(d.name)}</label>`).join("");
}
function renderQuiz(){
  const q=state.quiz[state.disc]||{}, t=PATH[state.disc].tests;
  $("quiz").innerHTML=t.map((x,i)=>`<div class="q">
    <div class="q-head"><span class="q-lvl" id="q${i}-lvl">Level ${i} · ${esc(LEVELS[i].name)}</span><p id="q${i}-txt">${esc(x)}</p></div>
    <div class="yn" role="radiogroup" aria-labelledby="q${i}-lvl q${i}-txt">
      <label><input type="radio" name="q${i}" id="q${i}-yes" value="yes" data-kind="quiz" data-i="${i}" ${q[i]==="yes"?"checked":""}>Yes</label>
      <label><input type="radio" name="q${i}" id="q${i}-no" value="no" data-kind="quiz" data-i="${i}" ${q[i]==="no"?"checked":""}>Not yet</label>
    </div></div>`).join("");
  $("verdict").textContent=verdictText();
}
function renderLadder(){
  const c=currentLevel(), v=viewLevel();
  $("ladder").innerHTML=LEVELS.map(l=>{
    const passed=l.k<c, now=l.k===c;
    const tag=passed?"Done":now?"Now":"";
    return `<li><button type="button" id="rung-${l.k}" class="rung${passed?" passed":""}" data-l="${l.k}" aria-pressed="${l.k===v}"${now?' aria-current="step"':""}>
      <span class="lvl">Level ${l.k}</span><span class="name">${esc(l.name)}</span><span class="idea">${esc(l.idea)}</span>
      <span class="tag">${tag}${passed?'<span class="sr-only">, passed</span>':now?'<span class="sr-only">, your level</span>':""}</span></button></li>`;
  }).join("");
}
function rowsFor(level){
  let out=(((ROWS[state.disc]||{})[level])||[]).map((r,i)=>({r,id:`${state.disc}-${level}-${i}`,core:state.disc==="all"}));
  if(state.disc!=="all"&&state.disc!=="org"&&state.core){
    out=out.concat((((ROWS.all||{})[level])||[]).map((r,i)=>({r,id:`all-${level}-${i}`,core:true})));
  }
  return out;
}
function renderPanel(){
  const v=viewLevel(), L=LEVELS[v], P=PATH[state.disc], g=GAPS[state.disc][v];
  const rows=rowsFor(v);
  const gm=g.m.length
    ?`<div class="gapbox"><h3>Needs more material</h3><ul>${g.m.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`
    :`<div class="gapbox none"><h3>Material is enough for now</h3><p class="named">Several interviewees described this level.</p></div>`;
  const gr=`<div class="gapbox"><h3>Needs learning resources</h3><ul>${g.r.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>${g.n?`<p class="named" style="margin-top:8px">${esc(g.n)}</p>`:""}</div>`;
  const showCoreToggle=state.disc!=="all"&&state.disc!=="org"&&v>0;
  const rowHtml = v===0
    ? `<p class="empty">Level 0 has no detailed topics. Do the three steps, pass the test, and the topics start at level 1.</p>`
    : `<ul class="rows" role="list">${rows.map(({r,id,core})=>{
      const rt=state.rate[id]||"";
      const cls=rt==="do"?" r-do":rt==="know"?" r-know":rt==="new"?" r-new":"";
      const opt=(val,txt)=>`<label><input type="radio" name="rate-${id}" id="r-${id}-${val}" value="${val}" data-kind="rate" data-id="${id}" ${rt===val?"checked":""}>${txt}</label>`;
      return `<li class="row${cls}"><div style="min-width:0">
        <h4 id="t-${id}">${esc(r[0])}</h4>
        <p class="why">Without it: ${esc(r[1])}</p>
        <p class="ask"><strong>Ask yourself:</strong> ${esc(r[2])}</p>
        <p class="meta">${core&&state.disc!=="all"?'<span class="pill core">Shared core</span>':""}<span class="pill">Interviews ${esc(r[3])}</span></p></div>
        <div class="rate" role="radiogroup" aria-labelledby="t-${id}">${opt("do","I do this")}${opt("know","Know of it")}${opt("new","Never heard of it")}</div></li>`;}).join("")}</ul>`;
  $("panel").innerHTML=`
    <div class="panel-head"><div><p class="eyebrow">${esc(discName(state.disc))} · ${esc(L.lvl)}</p><h2 id="panel-title" tabindex="-1">${esc(L.name)}</h2></div>
    <p class="named">${v>0?`${rows.length} topics to rate`:"First steps only"}</p></div>
    <div><h3>Three steps</h3><ol class="steps" role="list">${P.steps[v].map((s,i)=>`<li><span class="n" aria-hidden="true">Step ${i+1}</span>${esc(s)}</li>`).join("")}</ol></div>
    <p class="test"><span class="label">You are there when</span>${esc(P.tests[v])}</p>
    <div class="gaps">${gm}${gr}</div>
    <div class="rowhead"><h3>Topics at this level</h3>${showCoreToggle?`<label class="toggle"><input type="checkbox" id="coretoggle" ${state.core?"checked":""}>Include the shared core</label>`:""}</div>
    ${rowHtml}`;
}
function rowLabel(id){
  const parts=id.split("-"), r=((ROWS[parts[0]]||{})[parts[1]]||[])[+parts[2]];
  return r?{t:r[0],d:parts[0],l:+parts[1]}:null;
}
function renderSummary(){
  const vals=Object.values(state.rate), c={do:0,know:0,new:0};
  vals.forEach(v=>{if(c[v]!=null)c[v]++;});
  const total=Object.values(ROWS).reduce((a,o)=>a+Object.values(o).reduce((b,arr)=>b+arr.length,0),0);
  $("summary").innerHTML=[[`${vals.length} of ${total}`,"topics rated"],[c.do,"I do this"],[c.know,"Know of it"],[c.new,"Never heard of it"]]
    .map(([n,l])=>`<li class="stat"><span class="num">${n}</span><span class="lab">${l}</span></li>`).join("");
  const unk=Object.entries(state.rate).filter(([,v])=>v==="new").map(([id])=>rowLabel(id)).filter(Boolean).sort((a,b)=>a.l-b.l);
  $("unk").innerHTML=unk.length
    ?unk.map(u=>`<li><span class="where">Level ${u.l} ${esc(LEVELS[u.l].name)} · ${esc(discName(u.d))}</span>${esc(u.t)}</li>`).join("")
    :`<li class="empty" style="background:none;padding:0">Nothing yet. Rate topics in the panel above.</li>`;
}
function announce(msg){ const s=$("status"); s.textContent=""; setTimeout(()=>{s.textContent=msg;},50); }
function render(){
  const active=document.activeElement&&document.activeElement.id;
  renderDisc();renderQuiz();renderLadder();renderPanel();renderSummary();
  if(active){const el=$(active); if(el&&el!==document.activeElement)el.focus({preventScroll:true});}
}

document.addEventListener("change",e=>{
  const t=e.target, k=t.dataset&&t.dataset.kind;
  if(k==="disc"){state.disc=t.value;state.view=null;save();render();announce(`${discName(state.disc)}. ${verdictText()}`);return;}
  if(k==="quiz"){const q=state.quiz[state.disc]||(state.quiz[state.disc]={});q[t.dataset.i]=t.value;state.view=null;save();render();announce(verdictText());return;}
  if(k==="rate"){state.rate[t.dataset.id]=t.value;save();render();return;}
  if(t.id==="coretoggle"){state.core=t.checked;save();render();announce(t.checked?"Shared core topics shown.":"Shared core topics hidden.");}
});
document.addEventListener("click",e=>{
  const b=e.target.closest("button"); if(!b)return;
  if(b.dataset.l!=null){state.view=+b.dataset.l;save();render();announce(`Showing level ${state.view}, ${LEVELS[state.view].name}.`);return;}
  if(b.id==="reset"){
    if(b.dataset.armed){state.rate={};state.quiz={};state.view=null;delete b.dataset.armed;b.textContent="Clear my answers";save();render();$("resetmsg").textContent="Cleared.";announce("All answers cleared.");}
    else{b.dataset.armed="1";b.textContent="Press again to clear";$("resetmsg").textContent="This removes all your answers.";announce("Press again to clear all your answers.");}
  }
});
document.documentElement.lang="en";
render();
