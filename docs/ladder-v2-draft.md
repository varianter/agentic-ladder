# Agentic Ladder v2: content draft for review

Working draft. Not shown on the page. `src:` keeps the interview numbers for our own review and is not shown either.

Markers:

- **[moved]** placed at another level than the interview gave it. Check this in the expert review.
- **[ours]** our own synthesis or your framing, not said in an interview.
- **How:** `named` = an interviewee named it, `suggest` = I will propose it for you to approve, `MISSING` = nothing yet.

Structure: three levels (Beginner, Experienced, Leading) × three scopes (Self, Team, Client organization). Self topics are shared by all disciplines unless they say otherwise. Team and Organization are shared, plus discipline items where an interview gave one.

Disciplines: Developer, Designer, Sales & management, Advisory, and General (only the shared topics).

---

## Level 1 · Beginner

**Idea:** Use AI on small real tasks every day, and check what it gives you.

**Day one framing [ours, from 4, 7, 10, 12, 13]:** Start on small, real tasks. Challenge what it says, since you are the expert. If you like structure, follow a course. Nobody is behind.

### Steps (one per scope)

- Self: Use an assistant on one small real task every day, and check the result.
- Team: Agree with your team which tools you use, and that no agent writes to production.
- Organization: Find out which tools and data the client allows, and ask for the rules if there are none.

### Self, all disciplines

1. **Start small and challenge the answers**
   - Why: you learn what it is good at without risking real work. Your expertise is what catches its mistakes.
   - Ask: when did you last disagree with the agent and turn out to be right?
   - How: named: find a course to follow (10), DataCamp (10). suggest: a vendor getting-started guide.
   - src: 4, 7, 10, 12, 13

2. **Models and the app around them**
   - What: the model is not the app. Model families differ in strengths, multimodality and price.
   - Why: you judge all AI by one tool's weak spots, and expect the wrong things.
   - Ask: can you name a task where another model or app does better than your default?
   - How: named: vendor docs (6), benchmarks and LLM arena (6, 7), Andrej Karpathy's videos (7).
   - src: 4, 5, 6, 7, 12

3. **Token management: cost, quality and climate**
   - What: tokens, effort settings, context size and model choice decide cost and quality. The strongest model at max effort is not the default.
   - Why: blasting frontier models at everything can be lose-lose: worse results, a high bill for the client, poor return and more energy use. [ours, your framing]
   - Ask: do you know roughly what your last task cost, and whether a smaller model would have done?
   - How: named: vendor pricing docs (6). suggest: vendor docs on effort and context. MISSING: a Variant guide to cost and energy.
   - src: 1, 5, 6, 7, 13

4. **Prompt at the right level**
   - What: be concrete about the goal, the limits and the size of the task. Be open about the solution and let the agent propose. Don't polish the wording.
   - Why: dictating the solution gives you the wrong thing. A vague goal gives you vague work.
   - Ask: when did you last ask for options instead of dictating the answer?
   - How: named: Laurie Voss's talk (2). suggest: vendor prompting guide.
   - src: 2, 4, 6, 7

5. **Grilling: let the agent interview you first**
   - Why: you and the agent agree on what to make before anything is made. It finds gaps you would miss.
   - Ask: has an agent asked you ten questions before producing anything?
   - How: named: Matt Pocock's grill-me skill and aihero.dev (5, 13).
   - src: 2, 4, 5, 10, 13

6. **Plan first, and keep research apart from doing**
   - Why: you make the important choices yourself and keep your own competence.
   - Ask: do you read and correct a plan before the agent acts?
   - How: MISSING
   - src: 3, 6, 7

7. **Context and sessions**
   - What: what the agent sees, when to start a new session, and how to hand over between sessions.
   - Why: answers get worse in long sessions, and tokens burn.
   - Ask: do you know when a session has gone stale?
   - How: MISSING
   - src: 7, 10, 13

8. **Use AI to explain and to think with**
   - What: describe the problem and ask why, not only for facts or fixes.
   - Why: you get answers, but never reason with it.
   - Ask: do you describe problems to it, or only ask for answers?
   - How: MISSING
   - src: 2, 9, 12

9. **Data rules: keep sensitive data out**
   - What: know what the client allows in which tool. Mask sensitive data on the way in.
   - Why: privacy breaches at the client.
   - Ask: do you know the data rule for your current client?
   - How: MISSING (a short sheet per client)
   - src: 6, 7, 10

10. **Connect your sources, and decide what not to connect** (first step of MCP and connectors)
    - Why: without them you copy and paste. Connect too much and private conversations leak.
    - Ask: can you list what your assistant can read right now?
    - How: suggest: vendor docs on connectors.
    - src: 6, 8, 9, 10, 12, S

11. **Use ready-made skills** (first step of skills)
    - Why: good routines from others, without writing them yourself.
    - Ask: have you installed a skill and used it on real work?
    - How: named: Matt Pocock's skills (5, 13).
    - src: 4, 5, 8, 13

12. **You own what you deliver**
    - Why: work that looks fine but is not in place.
    - Ask: could you explain every part of your last delivery without the agent?
    - How: MISSING
    - src: 3, 7, 11

### Team, all disciplines

1. **Agree what the team uses**: tools, shared rules and instructions for agents.
   - Why: everyone uses agents their own way, and quality depends on who did the task.
   - Ask: is there one file that tells every agent how the team works?
   - src: 4, 5, 6, 7, 13
2. **No agent writes to production**
   - Why: one mistake becomes an incident.
   - Ask: can any agent on the team reach production today?
   - src: 4
3. **Roles, boundaries and definition of done**
   - Why: nobody knows when a part is finished, or who owns it.
   - Ask: who owns a change a designer delivers as code?
   - src: 1
4. **Share what works**
   - Why: everyone rediscovers the same things.
   - Ask: when did the team last share an AI finding?
   - src: 8, 2 (rewritten from "an AI channel")

### Organization (client), all disciplines

1. **Help the client publish which tools and plugins are allowed**
   - Why: people avoid the tools, or install anything.
   - Ask: can someone at the client find out what is allowed in a minute?
   - src: 6, 7, 13
2. **Help the client set rules for which data can go where**
   - Why: confidentiality rests on individual guesses.
   - src: 6, 10
3. **Help the client set up a shared way to learn** [rewritten from Variant-internal answers]
   - Why: learning is mostly random.
   - Ask: is there a planned path, or do people find things by chance?
   - src: 8, 10, 11

### Discipline: Developer

1. **A coding agent with plan mode, plus an inline assistant in the IDE**
   - src: 2, 5, 6, 7, S
2. **Give the agent a clear goal, by one of two routes**: a written issue or spec, or TODOs in the code from your own mental model.
   - Why: AI writes the code, so our job is to set better goals.
   - How: named: Matt Pocock's skills for issues (4).
   - src: 3, 4
3. **Use the agent to explain code and odd behavior**
   - src: 2
4. **Solid software engineering fundamentals**
   - Why: you cannot judge what the agent hands you.
   - src: 2, S
5. **Split work into small tasks. A pull request should be a gift**
   - src: 13
6. **AGENTS.md in the repo, and handover between sessions**
   - src: 13
7. **Try different harnesses and models**
   - src: 4, 6, 7

### Discipline: Designer

1. **Give the design tool your Figma structure, not a screenshot**
   - src: 1
2. **Git and GitHub: clone, branch, pull request**
   - src: 1
3. **AI in every research step**: questions, interviews, transcripts, synthesis, ideas.
   - src: 11
4. **Transcribe interviews and meetings** (shared with Sales & management and Advisory)
   - How: named examples: Word transcription (11), Trale (10), Jamie (12).
   - src: 9, 10, 11, 12
5. **Structure research data so it can be found**
   - src: 11
6. **Critical analysis at each handoff**
   - src: 11

### Discipline: Sales & management

1. **The assistant as a sparring partner**
   - src: 12
2. **Transcribe meetings** (shared)
   - src: 12
3. **Connect email, statistics and the systems you work in**
   - src: 12
4. **Know what MCP, skills and git are**
   - src: 8

### Discipline: Advisory

1. **A project per client or case, as a sparring partner**
   - src: 9, 10
2. **Transcribe meetings and interviews** (shared)
   - src: 9, 10
3. **Connect files, Excel and Office 365, and decide what to leave out**
   - Why: it is easy to lose control of Excel. Private conversations should not be connected.
   - src: 9, 10
4. **Build trust by checking output against the source**
   - src: 9
5. **Tone of voice**
   - src: 9

### Tests ("you are there when")

- General: you have used AI on real work five days in a row, and you can explain everything you delivered.
- Developer: you have merged an agent-written change that you fully understand.
- Designer: you have checked an AI summary against your raw material, and opened a pull request.
- Sales & management: you describe problems to it instead of only asking for facts.
- Advisory: an AI-assisted draft has gone out in your name after your own checks.

---

## Level 2 · Experienced

**Idea:** Give the agent your context, standards and limits. Choose how to work based on the task.

### Steps

- Self: Pick one routine you repeat every week and turn it into a skill.
- Team: Put shared skills, rules and decision records in the repo or shared space.
- Organization: Help the client connect agents to their documentation and knowledge base, read-only.

### Self, all disciplines

1. **Choose how to work, based on the task** [ours, from your answer]
   - What: pick the way of working based on context, how correct the result must be, and how much you need a correct mental model of the system.
   - Why: one way of working for everything is either too slow or too risky.
   - Ask: on your last task, did you choose how much to hand over, or just do what you always do?
   - Per discipline: Developer: a spec, TODOs in code, or one-shot, based on risk. Designer: a throwaway exploration or a deliverable. Business: a draft for yourself or a figure for the client.
   - src: 3, 7 (the two ends), plus your framing
2. **Pick model and effort per job**
   - What: a strong model to plan and orchestrate, a cheaper one to implement. The strongest is not always right.
   - Why: slow and expensive runs, or weak plans.
   - Ask: do you know which model and effort did your last task?
   - src: 5, 6, 7, 13
3. **Write your own skills** (second step of skills)
   - Ask: have you written a skill for something you do every week?
   - How: named: Matt Pocock's skills as examples (5, 13). suggest: vendor docs on skills.
   - src: 4, 6, 10, 13
4. **Connect project context, read-only by default** (second step of MCP)
   - What: backlog, docs, logs and dashboards through MCP or plugins.
   - Why: the agent guesses about things it could look up.
   - How: named examples: Atlassian plugin (6), Grafana MCP (6).
   - src: 6, 8, 13
5. **Use your craft and domain knowledge to steer**
   - Why: generic output, and no way to tell good from bad.
   - Ask: where did your expertise change the result last week?
   - src: 3, 5, 9, 10, 13
6. **Critical review at every handoff**
   - src: 3, 6, 11
7. **Permissions and sandboxing**
   - Why: an agent with your full access makes your worst mistake at machine speed.
   - src: 4, 11
8. **Use AI to learn, not only to fetch information**
   - src: 5, 8, 9

### Team, all disciplines

1. **Shared, project-specific skills in the repo or shared space**
   - src: 4, 5, 6, 13
2. **Decision records: readable, numbered and dated. Post mortems and runbooks**
   - Why: decisions vanish, and the agent cannot act on knowledge in people's heads.
   - src: 5, 13
3. **Shared rules for review, and a shared first review by an agent**
   - src: 5, 6, 13
4. **Guardrails set up once for everyone**: sandboxing, read-only by default, secrets handled in skills.
   - src: 4, 13
5. **Pair through prompting on hard problems**
   - src: 1
6. **Written practices, shared mental models, and follow-up on how each person works**
   - Why: juniors dump the task into the agent and push.
   - src: 2, 5, 11

### Organization (client), all disciplines

1. **Connect documentation and knowledge bases, also for development**
   - Why: agents cannot ask for base data and domain information.
   - src: 12, 13
2. **A shared knowledge base**
   - src: 8
3. **Local models where privacy requires it**
   - Why: some clients cannot use cloud AI at all.
   - src: 8, 11
4. **Make time for quality culture** [rewritten from Variant-internal]
   - Why: culture loses to delivery every week.
   - src: 5

### Discipline: Developer

1. A healthy codebase with conventions and good examples (2, 4, 6)
2. Less time on prompts, more on domain and architecture tests (2, 4)
3. Build your own mental model before the change (3)
4. grill-with-docs, decision records and time on the domain (5, 13)
5. Application and system architecture (4)
6. Mix manual review with AI review (3, 5, 6)
7. Sandboxing, for example Docker (4)
8. Several sessions with a clear overview, for example tmux or remote sessions (13)
9. Reverse engineering, prototyping and AI-assisted infrastructure as code (S)

### Discipline: Designer

1. Design to code: where the handover reinterprets (1)
2. Explore instead of imagine: other clicks, scale, other domains (1)
3. Know what is worth making, tied to the product strategy (1)
4. How an agent loop works, when you design agent products (1). named: LangSmith Fleet (1)
5. Agents on your machine, with permissions understood (11)
6. Research analysis by meaning, not only by words (9, 11) (shared with Advisory)

### Discipline: Sales & management

1. A second brain: meetings and sources in one knowledge base (8). named: Karpathy (8)
2. Structured input, many outputs: business cases, templates (12)
3. Scheduled tasks that prepare work before you need it (12) **[moved]** from getting started
4. Voice recordings as input (12)
5. Git basics, for knowledge bases and skills as files (8) **[moved]** from getting started

### Discipline: Advisory

1. Research analysis by meaning, not only by words (9) (shared)
2. Structured input reused for reports and templates (9)
3. Scheduled tasks (10)
4. Personal versus shared skills (10)
5. AI and ethics, AI for business leaders (10). named: DataCamp (10)
6. Connect the assistant to Figma and workshop tools (10)
7. Use your experience to create, not to skip experience (10)

### Tests

- General: a colleague would get the same quality with your setup.
- Developer: a fresh agent session follows your conventions without being told.
- Designer: you have delivered a design change as a pull request.
- Sales & management: a new deliverable starts from your knowledge base, not a blank page.
- Advisory: you can ask your material how people reasoned, not only what they said.

---

## Level 3 · Leading

**Idea:** Change how you work and what you take responsibility for. Make others good too.

### Steps

- Self: Decide what is worth doing this week, and run agents on the rest.
- Team: Rework the team's process for agents, and agree who owns what.
- Organization: Help the client build one agreed way of working with agents, and name who owns it.

### Self, all disciplines

1. **Take a broader product role** [ours + 1, 2]
   - What: change how you work, which responsibilities you take and which positions you take. You are still a technical expert, but above all an expert in turning the real world into systems, processes and formal structures that work as modelled.
   - Why: production gets cheap, so judgment about what to build and why is what matters. "Caring about what you make matters even more" (2).
   - Ask: what did you take responsibility for this month that is outside your title?
   - How: named: Laurie Voss's talk on product engineers (2).
   - src: 1, 2
2. **Choose what you should do, not what you can do**
   - Why: a pile of nice-to-haves nobody asked for.
   - src: 1, 10
3. **Several agents at once**: subagents, parallel sessions, orchestration, and one agent checking another.
   - src: 2, 5, 7, 13, S
4. **Manage cognitive load and text fatigue**
   - src: 2, 3, 4
5. **Build processes and systems, not single outputs**
   - src: 10, 11
6. **Curate your skills**: prune, rewrite, know when no skill is needed, and share across the team and client (third step of skills).
   - src: 13
7. **Assess the risks of connected tools** (third step of MCP)
   - Why: security comes second to hype.
   - src: 4, 5

### Team, all disciplines

1. **New ways of working as teams get smaller** (8)
2. **Ownership shared by humans and agents** (6)
3. **Test the codebase and conventions, not only the application** (2, 4) **[moved]** from getting good

### Organization (client), all disciplines

1. **A software factory**: one agreed way of building with agents, integrated with existing workflows, with a named owner (13)
2. **Someone asks what we should do differently**, beyond solving each day's tasks (5)
3. **Build AI into the systems where work happens** (12) **[moved]** from getting started

### Discipline: Developer

1. Tests for the application architecture itself (2, 4)
2. Ownership of a codebase agents mostly write (6)
3. Agentic on-call and triage across agents (S)
4. Your own harness setup and local models (6, 7) **[moved]** 7 said getting good
5. How MCP works inside, and the risks (5)
6. Routing skills that load only when needed (13) **[moved]** from getting good

### Discipline: Designer

1. A workday that starts from pull requests (1)
2. Read design out of code with the agent's help (1)
3. Shared research structures with team and client (11)
4. Describe the new practices for the field (11)

### Discipline: Sales & management

1. Automate low-value tasks, for more face time with clients and consultants (8)
2. Skills for business routines (12)
3. AI built into systems, for example Flowcase (12)

### Discipline: Advisory

1. Protect quality and correctness in the whole system (9)
2. AI in forecasting work (9)
3. Processes and systems, for example onboarding (10)

### Tests

- General: work gets done while you do something else, and others use what you built.
- Developer: you steer several agents and still know why the code looks the way it does.
- Designer: you can review a change that arrives as code.
- Sales & management: something useful is prepared for you every week without you asking.
- Advisory: your process catches a wrong figure before the client does.

---

## Open for you

- What are **Ponytail** (6, 13) and **Pstack** (2)? I don't know them and will not guess links.
- Removed from the page: the disagreements table. Each topic now gives one answer.
