# Variant Agentic Ladder: Developer

> Variant's roadmap for getting good at agentic AI in product development. Three levels, and at each level what to do for yourself, your team and the client. Built from interviews with Variant consultants.

Interactive page: https://agentic-ladder.raa.academy/. Index: https://agentic-ladder.raa.academy/llms.txt. Made from https://github.com/varianter/agentic-ladder/blob/main/src/model.json by scripts/build-llm.mjs. Do not edit by hand.

## How it works

- Levels: 1 Beginner (Use AI on small, real tasks and check what it gives you.) 2 Experienced (Give it your context, standards and limits, and choose how to work per task.) 3 Leading (Change how you work and what you take on, and lift the people around you.)
- Scopes at every level: Yourself (`self`): How you work on your own. Your team (`team`): What you take initiative on, so the team uses AI well and keeps quality. The client (`org`): What you advise and push for in the client's organization. "The client" means the client's organization.
- Each level has a step for yourself and a "You are there when" test per discipline, and shared steps for the team and the client.
- Topics are what to train on. Core topics come first. Each has a stable id, why it matters and a question to ask yourself.
- To find a level: answer the tests from level 1 up. The first one that is not yet true is the level to work on. Passing all three means: lift your team and the client.
- A training plan: topics at the person's level they have never heard of first, then ones they know of but do not do yet. Pick two and try them this week.

## Ratings

The page saves answers in the viewer's browser. They move to and from an AI as JSON:

```json
{ "v": 1, "disc": "dev", "quiz": { "dev": { "1": "yes", "2": "no" } }, "rate": { "start-small": "do" } }
```

- `disc`: the discipline key: `general` (General), `dev` (Developer), `des` (Designer), `sales` (Sales & management), `adv` (Advisory).
- `quiz`: the "You are there when" tests per discipline, by level. `"yes"` or `"no"`. The level to work on is the first one not answered `"yes"`.
- `rate`: topic ratings by topic id. `"do"` is "I do this", `"know"` is "Know of it", `"new"` is "Never heard of it".
- Leave out what is not known. Never invent topic ids.
- To hand ratings back, link to `https://agentic-ladder.raa.academy/#ratings=<encoded>`. Encode the JSON as UTF-8 base64url without padding if you can run code. Otherwise percent-encode the JSON (`encodeURIComponent`). The page also takes the raw JSON pasted into "Import ratings". It shows what will change before it saves.

## Level 1: Beginner

Level 1 · no experience. Use AI on small, real tasks and check what it gives you.

- Step for yourself: Install a coding agent in a repository you know, and let it make one small change you read line by line.
- You are there when: You have merged an agent-written change that you fully understand.
- Step for your team: Agree which tools and rules the team uses, and that no agent writes to production.
- Step for the client: Find out which tools and data the client allows, and help them write it down if nobody has.

### Level 1, Yourself

How you work on your own.

#### Start small, and challenge the answers

- id: `start-small`, core. For all disciplines.
- What: Use it on small, real tasks from today's work. Disagree with it when you know better. Nobody is behind.
- Why: You learn what it is good at without risking real work. Your expertise is what catches its mistakes.
- Ask yourself: When did you last disagree with the agent and turn out to be right?
- Resources:
  - [DataCamp, if you like a course to follow](https://www.datacamp.com)

#### Token management: cost, quality and climate

- id: `token-management`, core. For all disciplines.
- What: Tokens, effort, context size and model choice decide what a task costs and how good it gets. The strongest model at full effort is not the default. Know your usage limits and watch how fast you use them.
- Why: Throwing frontier models at everything can be lose-lose: worse results, a large bill for the client, poor return and more energy used. Or you hit your limit and wait hours to work again.
- Ask yourself: Do you know roughly what your last task cost, and whether a smaller model would have done?
- Resources:
  - Your vendor's pricing documentation

#### Use ready-made skills, starting with grilling

- id: `grilling`, core. For all disciplines.
- What: A skill is a packaged instruction the agent loads for a kind of task. Start with skills others wrote. Try grilling first: before it makes anything, the agent asks you questions until you agree on what to make.
- Why: You get good routines without writing them yourself, and the agent finds gaps you would miss before work starts.
- Ask yourself: Has an agent asked you ten questions before producing anything?
- Resources:
  - [Matt Pocock's skills, including grill-me](https://github.com/mattpocock/skills)
  - [AI Hero](https://www.aihero.dev)

#### Use it as a sparring partner, to explain and to think with

- id: `think-with-it`, core. For all disciplines.
- What: Describe the problem and ask why, not only for facts or fixes.
- Why: It is not a fact machine. Use it to help you think, and do not trust an answer you have not thought through.
- Ask yourself: Do you describe problems to it, or only ask for answers?
- Resources: none yet.

#### Keep sensitive data out

- id: `data-rules`, core. For all disciplines.
- What: Know which data the client allows in which tool. Mask sensitive data on the way in.
- Why: A privacy breach at the client.
- Ask yourself: Do you know the data rule for your current client?
- Resources: none yet.

#### You own what you deliver

- id: `own-delivery`, core. For all disciplines.
- What: You are the expert, and the systems you build affect the real world. Speed is no reason for a bad system. A bus driver does not speed because the manager wants efficiency. Push back, and explain why.
- Why: Work can look fine without being in place.
- Ask yourself: Could you explain every part of your last delivery without the agent?
- Resources: none yet.

#### A coding agent with plan mode, and an inline assistant in the IDE

- id: `coding-agent`, core. For Developer.
- Why: In a chat window you copy and paste, and the agent never sees the codebase.
- Ask yourself: Has an agent made a change across several files for you?
- Resources: none yet.

#### Give the agent a clear goal, by one of two routes

- id: `clear-goal`, core. For Developer.
- What: Write an issue or spec the agent can solve from the text alone. Or build your own mental model and leave TODOs in the code for the agent.
- Why: The agent writes the code, so our job is to set better goals.
- Ask yourself: Could an agent solve your last issue from the text alone?
- Resources:
  - [Matt Pocock's skills for writing issues](https://github.com/mattpocock/skills)

#### Models and the app around them

- id: `models-and-apps`. For all disciplines.
- What: The model is not the app. Model families differ in strengths, input types and price. Give the same task to two tools now and then. For developers, that means other coding agents too.
- Why: You judge all AI by one tool's weak spots, and settle on the first setup that worked.
- Ask yourself: Have you given the same task to two tools?
- Resources:
  - [LMArena, to compare models](https://lmarena.ai)
  - [Andrej Karpathy's videos](https://www.youtube.com/@AndrejKarpathy)
  - Your vendor's model documentation

#### Prompt at the right level

- id: `prompt-level`. For all disciplines.
- What: Be concrete about the goal, the limits and the size of the task. Be open about the solution, and let the agent propose. Do not polish the wording.
- Why: Dictating the solution gives you the wrong thing. A vague goal gives you vague work.
- Ask yourself: When did you last ask for options instead of dictating the answer?
- Resources: none yet.

#### Plan first, and keep research apart from doing

- id: `plan-first`. For all disciplines.
- Why: You make the important choices yourself, and keep your own competence.
- Ask yourself: Do you read and correct a plan before the agent acts?
- Resources: none yet.

#### Context, and when to start a new session

- id: `context-sessions`. For all disciplines.
- What: Know what the agent sees, when a session has gone stale, and how to hand over to a fresh one. Developers keep an AGENTS.md in the repository so every session starts with the basics.
- Why: Answers get worse in long sessions, tokens burn, and each new session starts cold.
- Ask yourself: What does a new session know before you type?
- Resources: none yet.

#### Connect the sources you work in, and decide what not to connect

- id: `connect-sources`. For all disciplines.
- What: Email, calendar, files, spreadsheets, Office 365, statistics and the other systems you use every day. Leave private conversations out, and keep control of what the agent can change.
- Why: Without them the agent only knows what you paste in. Connect too much and private conversations leak.
- Ask yourself: Can you list what your assistant can read right now?
- Resources: none yet.

#### Use the agent to explain code and odd behavior

- id: `explain-code`. For Developer.
- Why: You miss the cheapest way to learn a codebase.
- Ask yourself: Do you ask why before you ask for a fix?
- Resources: none yet.

#### Solid software engineering fundamentals

- id: `fundamentals`. For Developer.
- Why: You cannot judge what the agent hands you.
- Ask yourself: Which part of the agent's last change would you have done differently?
- Resources: none yet.

#### Split work into small tasks

- id: `small-tasks`. For Developer.
- What: A pull request should be a gift.
- Why: Large changes nobody can review.
- Ask yourself: Would you enjoy reviewing your last pull request?
- Resources: none yet.

### Level 1, Your team

What you take initiative on, so the team uses AI well and keeps quality.

#### Agree what the team uses

- id: `team-agree-tools`, core. For all disciplines.
- What: Tools, skills and one set of instructions every agent reads. Prefer one shared setup, with the same skills and settings. Someone who knows what they are doing can use their own.
- Why: Everyone uses agents their own way, and quality depends on who did the task.
- Ask yourself: Is there one file that tells every agent how the team works?
- Resources: none yet.

#### No agent writes to production

- id: `team-no-prod`, core. For all disciplines.
- Why: One mistake becomes an incident.
- Ask yourself: Can any agent on the team reach production today?
- Resources: none yet.

#### Roles, boundaries and definition of done

- id: `team-roles-done`. For all disciplines.
- Why: Nobody knows when a part is finished, or who owns it.
- Ask yourself: Who owns a change a designer delivers as code?
- Resources: none yet.

#### Share what works

- id: `team-share`. For all disciplines.
- What: A channel and a regular slot for what people learn about AI.
- Why: Everyone rediscovers the same things.
- Ask yourself: When did the team last share an AI finding?
- Resources: none yet.

### Level 1, The client

What you advise and push for in the client's organization.

#### Help the client publish which tools and plugins are allowed

- id: `org-allowed-tools`, core. For all disciplines.
- What: People will find a way. Give them approved tools to experiment with, or they use private accounts.
- Why: People avoid the tools, or use private accounts nobody controls, where client data may be used for training.
- Ask yourself: Can someone at the client find out what is allowed in a minute?
- Resources: none yet.

#### Help the client set rules for which data can go where

- id: `org-data-rules`. For all disciplines.
- Why: Confidentiality rests on individual guesses.
- Ask yourself: Does everyone at the client know the rule for their own data?
- Resources: none yet.

#### Help the client set up a shared way to learn and experiment

- id: `org-learning`. For all disciplines.
- What: A planned path, room to experiment, and a sharing culture, not chance.
- Why: Learning is mostly random.
- Ask yourself: Is there a planned path at the client, or do people find things by chance?
- Resources: none yet.

## Level 2: Experienced

Level 2 · daily use. Give it your context, standards and limits, and choose how to work per task.

- Step for yourself: Put conventions, decision records and tests in the repository, so a fresh session follows them.
- You are there when: A fresh agent session follows your conventions without being told.
- Step for your team: Put shared skills, decision records and review rules where every person and agent reads them.
- Step for the client: Help the client connect agents to their documentation and knowledge base, read-only.

### Level 2, Yourself

How you work on your own.

#### Choose how to work, based on the task

- id: `work-mode`, core. For all disciplines.
- What: Pick how much to hand over based on the context, how correct the result must be, and how much you need a correct mental model of the system. A developer picks between a spec, TODOs in code, or a one-shot. A designer between a throwaway exploration and a deliverable. A business role between a draft for yourself and a figure for the client.
- Why: One way of working for everything is either too slow or too risky.
- Ask yourself: On your last task, did you choose how much to hand over, or do what you always do?
- Resources: none yet.

#### Pick model and effort per job

- id: `model-per-job`, core. For all disciplines.
- What: For example a strong model to plan and orchestrate, and a cheaper one to implement.
- Why: Slow and expensive runs, or weak plans.
- Ask yourself: Do you know which model and effort did your last task?
- Resources: none yet.

#### Write your own skills, and know which to keep personal

- id: `write-skills`, core. For all disciplines.
- What: Keep them short. Run the task with and without the skill, and keep it only if the result is better.
- Why: You repeat the same instructions, and the quality varies.
- Ask yourself: Have you written a skill for something you do every week?
- Resources:
  - [Matt Pocock's skills, as examples](https://github.com/mattpocock/skills)
  - [Ponytail](https://github.com/DietrichGebert/ponytail)

#### A fixed way to review agent output at every handoff

- id: `review-handoff`, core. For all disciplines.
- Why: Errors pass on to the client or the next person.
- Ask yourself: Do you have a fixed way of checking agent output?
- Resources: none yet.

#### A healthy codebase with conventions and good examples

- id: `healthy-codebase`, core. For Developer.
- Why: Agents copy the patterns they find, bad ones too.
- Ask yourself: Would a new session find one clear way to do things?
- Resources: none yet.

#### Less time on prompts, more on domain and architecture tests

- id: `tests-over-prompts`, core. For Developer.
- Why: Nothing stops the agent from drifting.
- Ask yourself: Do your tests check the domain, or only utilities?
- Resources: none yet.

#### Connect project context, read-only by default

- id: `connect-context`. For all disciplines.
- What: The backlog, docs, logs and dashboards. Judge when MCP is the right tool. For developers it often is not needed. For example the Atlassian plugin or a Grafana MCP.
- Why: The agent guesses about things it could look up.
- Ask yourself: Which system would save you most time if the agent could read it?
- Resources: none yet.

#### Use your craft and domain knowledge to steer

- id: `craft-steer`. For all disciplines.
- What: Use your experience to make something better, not to skip the experience.
- Why: Generic, polished output with nothing behind it, and no way to tell good from bad.
- Ask yourself: What in your last deliverable could only you have added?
- Resources: none yet.

#### Permissions and sandboxing

- id: `sandboxing`. For all disciplines.
- What: Know what an agent on your machine may read and change. Developers can run agents in a sandbox, for example Docker.
- Why: An agent with your full access makes your worst mistake at machine speed.
- Ask yourself: What is the most damaging thing your agent could do today?
- Resources: none yet.

#### Use AI to learn, not only to fetch information

- id: `learn-with-ai`. For all disciplines.
- What: Learn while you work. For example a skill that teaches you a new technology, or a quiz on a change you just reviewed.
- Why: You get faster but not better.
- Ask yourself: Have you asked the agent to teach you something this month?
- Resources: none yet.

#### Build your own mental model before the change

- id: `mental-model-first`. For Developer.
- Why: Review gets harder than writing would have been.
- Ask yourself: Can you sketch the change before the agent makes it?
- Resources: none yet.

#### Grilling with docs, decision records and time on the domain

- id: `grill-with-docs`. For Developer.
- Why: Decisions vanish, and each session starts from zero.
- Ask yourself: Where are your last three design decisions written down?
- Resources:
  - [Matt Pocock's grill-with-docs skill](https://github.com/mattpocock/skills)

#### Application and system architecture

- id: `architecture`. For Developer.
- Why: The agent does not know which direction to go. Developers still know best.
- Ask yourself: Who decided the structure of your last feature?
- Resources: none yet.

#### Mix manual review with AI review

- id: `mixed-review`. For Developer.
- Why: Review becomes a bottleneck or a rubber stamp.
- Ask yourself: How much of your week is review now?
- Resources: none yet.

#### Several sessions with a clear overview

- id: `multi-session`. For Developer.
- What: For example tmux or remote sessions.
- Why: It is easy to lose control.
- Ask yourself: Can you say what each of your running sessions is doing right now?
- Resources: none yet.

#### Reverse engineering, prototyping and infrastructure as code with AI

- id: `beyond-features`. For Developer.
- Why: You only use agents for feature work.
- Ask yourself: Have you used an agent on infrastructure or legacy code?
- Resources: none yet.

#### How an agent loop works, when you design or build AI into products

- id: `agent-loop`. For Designer, Developer.
- Why: You design or build a system you do not understand.
- Ask yourself: Can you describe the loop behind your product?
- Resources:
  - LangSmith Fleet

### Level 2, Your team

What you take initiative on, so the team uses AI well and keeps quality.

#### Shared, project-specific skills

- id: `team-shared-skills`, core. For all disciplines.
- What: In the repository or a shared plugin. Golden paths for recurring work: debugging, review, changelogs, sprint planning, post mortems and decision records. Skills for your stack and for handling secrets. Built for the project, not for one person.
- Why: Agents get your stack wrong the same way every time.
- Ask yourself: Does everyone run the same skills for planning and review?
- Resources:
  - [Ponytail](https://github.com/DietrichGebert/ponytail)

#### Decision records, post mortems and runbooks

- id: `team-decisions`, core. For all disciplines.
- What: Readable by people, numbered and dated, kept where the agent can read them.
- Why: Decisions vanish, and the agent cannot act on knowledge that lives in people's heads.
- Ask yourself: Could an agent follow your runbook for the last incident?
- Resources: none yet.

#### Guardrails set up once for everyone

- id: `team-guardrails`, core. For all disciplines.
- What: Sandboxing, read-only by default, and secrets handled through skills.
- Why: Each agent can reach everything its owner can.
- Ask yourself: Is sandboxing set up once, or left to each person?
- Resources: none yet.

#### Shared rules for review, and one shared first review by an agent

- id: `team-review`. For all disciplines.
- Why: Review quality depends on who reviews.
- Ask yourself: Does every pull request get the same first review?
- Resources: none yet.

#### Pair through prompting on hard problems

- id: `team-pair`. For all disciplines.
- Why: Decisions made by one person and one agent.
- Ask yourself: Have two of you prompted together on a hard problem?
- Resources: none yet.

#### A team contract for AI, and follow-up on how each person works

- id: `team-practices`. For all disciplines.
- What: Write down how the team uses AI to keep quality and work well together, so everyone shares the same mental model.
- Why: Juniors dump the task into the agent and push it, without seeing the bigger picture.
- Ask yourself: Does your team have a contract for how you use AI, and does everyone follow it?
- Resources:
  - [pstack, a set of skills for a full development flow](https://github.com/cursor/plugins/tree/main/pstack)

### Level 2, The client

What you advise and push for in the client's organization.

#### A shared knowledge base, connected for every agent, also for development

- id: `org-connect-knowledge`, core. For all disciplines.
- What: Gather documentation, base data and domain information that is spread over many systems, and connect it so agents can look it up.
- Why: Agents cannot look up base data and domain information, and spread-out information cannot support decisions.
- Ask yourself: Can a coding agent at the client look up domain facts without someone pasting them in?
- Resources: none yet.

#### Help the client make sure agents see no more than the person using them

- id: `org-agent-access`, core. For all disciplines.
- What: A shared hub of connectors moves the access check from the person to a server, and the server often sees more. Check access per person, and log what agents read and do.
- Why: Losing control of data is easy, and people reach data they should not see.
- Ask yourself: When an agent reads data at the client, whose access does it use?
- Resources: none yet.

#### Local models where privacy requires it

- id: `org-local-models`. For all disciplines.
- Why: Some clients cannot use cloud AI at all.
- Ask yourself: What do you advise a client that forbids cloud models?
- Resources: none yet.

#### Make time for quality culture

- id: `org-quality-time`. For all disciplines.
- Why: Culture loses to delivery every week.
- Ask yourself: Is time for this in anyone's plan at the client?
- Resources: none yet.

#### Help the client build their own skills, plugins and MCP servers

- id: `org-shared-skills`. For all disciplines.
- What: Their internal best practice, packaged so every agent can use it, and improved as they learn.
- Why: Each team writes its own, and what the client learns does not build up.
- Ask yourself: Can teams at the client find and install skills other teams built?
- Resources: none yet.

## Level 3: Leading

Level 3 · self-sufficient and leading. Change how you work and what you take on, and lift the people around you.

- Step for yourself: Run several sessions with one checking another, and test the architecture itself.
- You are there when: You steer several agents and still know why the code looks the way it does.
- Step for your team: Rework the team's process for agents, and agree who owns what.
- Step for the client: Help the client build one agreed way of working with agents, and name who owns it.

### Level 3, Yourself

How you work on your own.

#### Take a broader product role

- id: `product-role`, core. For all disciplines.
- What: Change how you work, what you take responsibility for and which positions you take. You are still a technical expert, but above all an expert in turning the real world into systems, processes and formal structures that work as modelled.
- Why: Making things gets cheap, so judgment about what to make and why is what counts, and so does caring about what you make.
- Ask yourself: What did you take responsibility for this month that is outside your title?
- Resources:
  - Laurie Voss's talk on becoming product engineers

#### Choose what you should do, not what you can do

- id: `should-not-can`, core. For all disciplines.
- Why: A pile of nice-to-haves nobody asked for.
- Ask yourself: What did you decide not to make this week?
- Resources: none yet.

#### Several agents at once

- id: `several-agents`, core. For all disciplines.
- What: Subagents, parallel sessions and orchestration, with one agent checking another. Give each subagent one narrow mandate.
- Why: You wait on one agent, or run many and lose quality.
- Ask yourself: Does anything other than you check the agent's work?
- Resources: none yet.

#### Tests for the application architecture itself

- id: `architecture-tests`, core. For Developer.
- Why: Structure erodes one merge at a time.
- Ask yourself: Would a test fail if an agent broke your layering?
- Resources: none yet.

#### Manage cognitive load and text fatigue

- id: `cognitive-load`. For all disciplines.
- Why: You stop reading what the agents write.
- Ask yourself: How much agent output did you skim this week?
- Resources: none yet.

#### Build processes and systems, not single outputs

- id: `processes-systems`. For all disciplines.
- What: For example onboarding, or a research setup others can run.
- Why: The gain stays with one task and one person.
- Ask yourself: Which of your routines could a colleague run tomorrow?
- Resources: none yet.

#### Curate your skills

- id: `curate-skills`. For all disciplines.
- What: Prune and rewrite them, know when no skill is needed, and share the good ones with the team and the client.
- Why: Skills pile up and fill the context.
- Ask yourself: Which skill did you last delete or rewrite?
- Resources: none yet.

#### Assess the risks of connected tools

- id: `assess-risks`. For all disciplines.
- What: Know what an MCP server or plugin can read and do before you install it. Developers learn how MCP works inside and read the server's code.
- Why: Security comes second to hype, and you install servers you cannot assess.
- Ask yourself: Do you know what an MCP server you installed can do?
- Resources: none yet.

#### Agentic on-call and triage across agents

- id: `on-call-triage`. For Developer.
- Why: Operations stays manual while development speeds up.
- Ask yourself: Could an agent do the first ten minutes of your last incident?
- Resources: none yet.

#### Your own agent setup and local models

- id: `own-harness`. For Developer.
- Why: You depend on defaults you do not understand, and some data stays off limits.
- Ask yourself: Do you know what a local model can and cannot do for you?
- Resources: none yet.

#### Routing skills that load others only when needed

- id: `routing-skills`. For Developer.
- Why: Context fills up and quality drops.
- Ask yourself: Do your skills load only when the task needs them?
- Resources: none yet.

### Level 3, Your team

What you take initiative on, so the team uses AI well and keeps quality.

#### New ways of working as teams get smaller

- id: `team-smaller`, core. For all disciplines.
- What: Use AI to solve new things better, not the same tasks faster. Shift work left, and spend the time on the critical parts of the craft.
- Why: A process built for more people.
- Ask yourself: What would you stop doing with three people?
- Resources: none yet.

#### Ownership shared by people and agents

- id: `team-ownership`, core. For all disciplines.
- Why: Shared ownership of the code gets lost.
- Ask yourself: Who on your team knows why the code looks the way it does?
- Resources: none yet.

#### Test the codebase and conventions, not only the application

- id: `team-test-codebase`. For all disciplines.
- Why: Agents break conventions nothing protects.
- Ask yourself: Which team convention is enforced by a test?
- Resources: none yet.

### Level 3, The client

What you advise and push for in the client's organization.

#### One agreed way of building with agents

- id: `org-software-factory`, core. For all disciplines.
- What: A software factory, built into existing workflows, with a named owner. It takes large, systematic change.
- Why: AI use stays a personal habit.
- Ask yourself: Can the client describe their way of building with agents in one sentence?
- Resources: none yet.

#### Make someone own the question of what to do differently

- id: `org-ask-differently`. For all disciplines.
- What: Beyond solving each day's tasks.
- Why: Tasks get optimized, and the purpose gets missed.
- Ask yourself: Who at the client is responsible for that question?
- Resources: none yet.

#### Build AI into the systems where work happens

- id: `org-ai-in-systems`. For all disciplines.
- What: Assistants built around how the business works, not only a general chat app. Tools that act, not only find: HR changes, onboarding, KPI reports, slides. One place where people discover them, with guided tours. For example an assistant connected to the CV system.
- Why: AI stays a side window.
- Ask yourself: Which client system should have this built in first?
- Resources: none yet.
