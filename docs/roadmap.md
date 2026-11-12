<!-- Snapshot of the Claude Docs roadmap, exported 2026-11-12. The editable doc: https://claude.ai/artifact/GaFzf6b98sFvGV8rHK7NMm -->

# Agentic AI roadmap for product development disciplines

Nov 12, 2026 · @Mikael Brevik

A three-level model that takes a consultant from no experience to leading with AI agents, per discipline: for yourself, your team and the client. It is built from 14 interviews and 1 self-submitted map with Variant consultants, and it is the long form of the ladder page. Find your level, do the steps for your discipline, and use the topic tables to find what you did not know you were missing.

## The model: three levels, three scopes

| Level | Name | The idea |
| --- | --- | --- |
| 1 | Beginner | Use AI on small, real tasks and check what it gives you. |
| 2 | Experienced | Give it your context, standards and limits, and choose how to work per task. |
| 3 | Leading | Change how you work and what you take on, and lift the people around you. |

Every level has three scopes:

- **Yourself**: How you work on your own.
- **Your team**: What you take initiative on, so the team uses AI well and keeps quality.
- **The client**: What you advise and push for in the client's organization.

The levels match the interview sheet's getting started, getting good and next level. Some topics sit on another level by our judgment, listed under "Placed by judgment" below. Experts review the placement.

## How to follow it

1. Pick your discipline. General holds only the topics shared by everyone.
2. Find your level. Read the three tests for your discipline from level 1 up, and stop at the first one you cannot pass.
3. Do the steps for that level: one for yourself, one for your team and one for the client. Give them two weeks of real work.
4. Check the test again. If you pass, move one level up.
5. Go through the topics at your level and rate each one: "I do this", "Know of it" or "Never heard of it". The ones you never heard of are your unknown unknowns, so try two of them. Bold topics are the core of the level.
6. Read the path of one other discipline. Designers now work in pull requests and developers write specs, so the paths are merging.
7. Take the team and client steps to your team. You cannot climb those alone.

## Your path by discipline

Each discipline has one step for yourself per level, and one test that says you are there. General holds only the shared topics.

### General

| Level | Your step | You are there when |
| --- | --- | --- |
| 1 Beginner | Use an assistant on one small, real task every day, and check the result. | You have used AI on real work five days in a row, and you can explain everything you delivered |
| 2 Experienced | Turn one routine you repeat every week into a skill. | A colleague would get the same quality with your setup |
| 3 Leading | Decide what is worth doing this week, and run agents on the rest. | Work gets done while you do something else, and others use what you built |

### Developers

| Level | Your step | You are there when |
| --- | --- | --- |
| 1 Beginner | Install a coding agent in a repository you know, and let it make one small change you read line by line. | You have merged an agent-written change that you fully understand |
| 2 Experienced | Put conventions, decision records and tests in the repository, so a fresh session follows them. | A fresh agent session follows your conventions without being told |
| 3 Leading | Run several sessions with one checking another, and test the architecture itself. | You steer several agents and still know why the code looks the way it does |

### Designers

| Level | Your step | You are there when |
| --- | --- | --- |
| 1 Beginner | Transcribe one interview, ask for patterns, and check them against your own notes. | You have checked an AI summary against your raw material |
| 2 Experienced | Deliver one design change as a pull request. | You have delivered a design change as a pull request |
| 3 Leading | Start your day from pull requests, and share your research setup with the team. | You can review a design change that arrives as code, and a colleague uses your setup |

### Sales and management

| Level | Your step | You are there when |
| --- | --- | --- |
| 1 Beginner | Describe a real problem to the assistant, and let it ask you questions before it answers. | You describe problems to it instead of only asking for facts |
| 2 Experienced | Keep meetings and sources in one knowledge base the assistant can read. | A new deliverable starts from your knowledge base, not a blank page |
| 3 Leading | Automate the low-value tasks, so you get more time with clients and consultants. | Something useful is prepared for you every week without you asking |

### Advisory

| Level | Your step | You are there when |
| --- | --- | --- |
| 1 Beginner | Set up a project for one client or case, and transcribe one meeting into it. | An AI-assisted draft has gone out in your name after your own checks |
| 2 Experienced | Ask your interview material how people reasoned, not only what they said. | You can ask your material how people reasoned, and check the answer |
| 3 Leading | Build checks into your process that catch errors before the client does. | Your process catches a wrong figure before the client does |

### Your team and the client

These steps are the same for every discipline.

| Level | Your team | The client |
| --- | --- | --- |
| 1 Beginner | Agree which tools and rules the team uses, and that no agent writes to production. | Find out which tools and data the client allows, and help them write it down if nobody has. |
| 2 Experienced | Put shared skills, decision records and review rules where every person and agent reads them. | Help the client connect agents to their documentation and knowledge base, read-only. |
| 3 Leading | Rework the team's process for agents, and agree who owns what. | Help the client build one agreed way of working with agents, and name who owns it. |

## Level 1 Beginner: topics

Use AI on small, real tasks and check what it gives you.

### Yourself

| Topic | Who | What it means | What goes wrong without it | Ask yourself | Source |
| --- | --- | --- | --- | --- | --- |
| **Start small, and challenge the answers** | Everyone | Use it on small, real tasks from today's work. Disagree with it when you know better. Nobody is behind. | You learn what it is good at without risking real work. Your expertise is what catches its mistakes. | When did you last disagree with the agent and turn out to be right? | 4, 7, 10, 12, 13 |
| **Token management: cost, quality and climate** | Everyone | Tokens, effort, context size and model choice decide what a task costs and how good it gets. The strongest model at full effort is not the default. Know your usage limits and watch how fast you use them. | Throwing frontier models at everything can be lose-lose: worse results, a large bill for the client, poor return and more energy used. Or you hit your limit and wait hours to work again. | Do you know roughly what your last task cost, and whether a smaller model would have done? | 1, 5, 6, 7, 13, 14 |
| **Use ready-made skills, starting with grilling** | Everyone | A skill is a packaged instruction the agent loads for a kind of task. Start with skills others wrote. Try grilling first: before it makes anything, the agent asks you questions until you agree on what to make. | You get good routines without writing them yourself, and the agent finds gaps you would miss before work starts. | Has an agent asked you ten questions before producing anything? | 2, 4, 5, 8, 10, 13, 14 |
| **Use it as a sparring partner, to explain and to think with** | Everyone | Describe the problem and ask why, not only for facts or fixes. | It is not a fact machine. Use it to help you think, and do not trust an answer you have not thought through. | Do you describe problems to it, or only ask for answers? | 2, 9, 12 |
| **Keep sensitive data out** | Everyone | Know which data the client allows in which tool. Mask sensitive data on the way in. | A privacy breach at the client. | Do you know the data rule for your current client? | 6, 7, 10 |
| **You own what you deliver** | Everyone | You are the expert, and the systems you build affect the real world. Speed is no reason for a bad system. A bus driver does not speed because the manager wants efficiency. Push back, and explain why. | Work can look fine without being in place. | Could you explain every part of your last delivery without the agent? | 3, 7, 11, 14 |
| **A coding agent with plan mode, and an inline assistant in the IDE** | Developer |  | In a chat window you copy and paste, and the agent never sees the codebase. | Has an agent made a change across several files for you? | 2, 5, 6, 7, S |
| **Give the agent a clear goal, by one of two routes** | Developer | Write an issue or spec the agent can solve from the text alone. Or build your own mental model and leave TODOs in the code for the agent. | The agent writes the code, so our job is to set better goals. | Could an agent solve your last issue from the text alone? | 3, 4 |
| **Give the design agent your Figma structure, not a screenshot** | Designer |  | A sketched screen gives the agent very little. | Does the agent get your components, or only a picture? | 1 |
| **Transcribe meetings and interviews** | Designer, Sales & management, Advisory | For example the transcription in Word, Trale or Jamie. Ask for consent first. | Analysis starts from memory and scattered notes, and details get lost. | Is your last important meeting searchable? | 9, 10, 11, 12 |
| **A project per client or case, as a sparring partner** | Advisory |  | Every conversation starts from zero, and the material is spread out. | Does the assistant know the case before you start typing? | 9, 10 |
| **Build trust by checking output against the source** | Advisory |  | You trust it too much, or not at all. | How do you check a number the agent gives you? | 9 |
| Models and the app around them | Everyone | The model is not the app. Model families differ in strengths, input types and price. Give the same task to two tools now and then. For developers, that means other coding agents too. | You judge all AI by one tool's weak spots, and settle on the first setup that worked. | Have you given the same task to two tools? | 4, 5, 6, 7, 12, 14 |
| Prompt at the right level | Everyone | Be concrete about the goal, the limits and the size of the task. Be open about the solution, and let the agent propose. Do not polish the wording. | Dictating the solution gives you the wrong thing. A vague goal gives you vague work. | When did you last ask for options instead of dictating the answer? | 2, 4, 6, 7 |
| Plan first, and keep research apart from doing | Everyone |  | You make the important choices yourself, and keep your own competence. | Do you read and correct a plan before the agent acts? | 3, 6, 7 |
| Context, and when to start a new session | Everyone | Know what the agent sees, when a session has gone stale, and how to hand over to a fresh one. Developers keep an AGENTS.md in the repository so every session starts with the basics. | Answers get worse in long sessions, tokens burn, and each new session starts cold. | What does a new session know before you type? | 7, 10, 13, 14 |
| Connect the sources you work in, and decide what not to connect | Everyone | Email, calendar, files, spreadsheets, Office 365, statistics and the other systems you use every day. Leave private conversations out, and keep control of what the agent can change. | Without them the agent only knows what you paste in. Connect too much and private conversations leak. | Can you list what your assistant can read right now? | 6, 8, 9, 10, 12, S |
| Use the agent to explain code and odd behavior | Developer |  | You miss the cheapest way to learn a codebase. | Do you ask why before you ask for a fix? | 2 |
| Solid software engineering fundamentals | Developer |  | You cannot judge what the agent hands you. | Which part of the agent's last change would you have done differently? | 2, S |
| Split work into small tasks | Developer | A pull request should be a gift. | Large changes nobody can review. | Would you enjoy reviewing your last pull request? | 13 |
| Git and GitHub: clone, branch, pull request | Designer |  | You cannot deliver design as code, or follow work that lives in repositories. | Can you open a pull request and read someone else's? | 1 |
| AI in every research step | Designer | Research questions, interviews, transcripts, summaries, common patterns and ideas. | You run the old process at the old speed. | Which research step has not changed yet? | 11 |
| Structure research data so it can be found | Designer |  | The agent cannot answer from material it cannot find. | Could the agent find every interview on one theme? | 11 |
| Critical analysis at each handoff | Designer |  | Confident summaries with errors reach the client. | Do you check the synthesis against the raw material? | 11 |
| Know what MCP, skills and Git are | Sales & management |  | You cannot follow where the tools are going, or talk about them with clients. | Can you explain what a skill is to a colleague? | 8 |
| Tone of voice | Advisory |  | Text that does not sound like you. | Would a client recognize your voice in the draft? | 9 |

### Your team

| Topic | Who | What it means | What goes wrong without it | Ask yourself | Source |
| --- | --- | --- | --- | --- | --- |
| **Agree what the team uses** | Everyone | Tools, skills and one set of instructions every agent reads. Prefer one shared setup, with the same skills and settings. Someone who knows what they are doing can use their own. | Everyone uses agents their own way, and quality depends on who did the task. | Is there one file that tells every agent how the team works? | 4, 5, 6, 7, 13, 14 |
| **No agent writes to production** | Everyone |  | One mistake becomes an incident. | Can any agent on the team reach production today? | 4 |
| Roles, boundaries and definition of done | Everyone |  | Nobody knows when a part is finished, or who owns it. | Who owns a change a designer delivers as code? | 1 |
| Share what works | Everyone | A channel and a regular slot for what people learn about AI. | Everyone rediscovers the same things. | When did the team last share an AI finding? | 2, 8, 14 |

### The client

| Topic | Who | What it means | What goes wrong without it | Ask yourself | Source |
| --- | --- | --- | --- | --- | --- |
| **Help the client publish which tools and plugins are allowed** | Everyone | People will find a way. Give them approved tools to experiment with, or they use private accounts. | People avoid the tools, or use private accounts nobody controls, where client data may be used for training. | Can someone at the client find out what is allowed in a minute? | 6, 7, 13, 14 |
| Help the client set rules for which data can go where | Everyone |  | Confidentiality rests on individual guesses. | Does everyone at the client know the rule for their own data? | 6, 10 |
| Help the client set up a shared way to learn and experiment | Everyone | A planned path, room to experiment, and a sharing culture, not chance. | Learning is mostly random. | Is there a planned path at the client, or do people find things by chance? | 8, 10, 11, 14 |

## Level 2 Experienced: topics

Give it your context, standards and limits, and choose how to work per task.

### Yourself

| Topic | Who | What it means | What goes wrong without it | Ask yourself | Source |
| --- | --- | --- | --- | --- | --- |
| **Choose how to work, based on the task** | Everyone | Pick how much to hand over based on the context, how correct the result must be, and how much you need a correct mental model of the system. A developer picks between a spec, TODOs in code, or a one-shot. A designer between a throwaway exploration and a deliverable. A business role between a draft for yourself and a figure for the client. | One way of working for everything is either too slow or too risky. | On your last task, did you choose how much to hand over, or do what you always do? | 3, 7 |
| **Pick model and effort per job** | Everyone | For example a strong model to plan and orchestrate, and a cheaper one to implement. | Slow and expensive runs, or weak plans. | Do you know which model and effort did your last task? | 5, 6, 7, 13, 14 |
| **Write your own skills, and know which to keep personal** | Everyone | Keep them short. Run the task with and without the skill, and keep it only if the result is better. | You repeat the same instructions, and the quality varies. | Have you written a skill for something you do every week? | 4, 6, 10, 13, 14 |
| **A fixed way to review agent output at every handoff** | Everyone |  | Errors pass on to the client or the next person. | Do you have a fixed way of checking agent output? | 3, 6, 11 |
| **A healthy codebase with conventions and good examples** | Developer |  | Agents copy the patterns they find, bad ones too. | Would a new session find one clear way to do things? | 2, 4, 6 |
| **Less time on prompts, more on domain and architecture tests** | Developer |  | Nothing stops the agent from drifting. | Do your tests check the domain, or only utilities? | 2, 4 |
| **Design to code: where the handover reinterprets** | Designer |  | The built result drifts from the design. | Do you know where your design gets reinterpreted? | 1 |
| **Explore instead of imagine** | Designer | Try other clicks, other scales and other domains, instead of thinking them through. | UX flows thought through for one case only. | How many variants did you test before choosing? | 1 |
| **Research analysis by meaning, not only by words** | Designer, Advisory | Ask your interview material how people talked about and reasoned around a topic. Still do the interviews yourself. | Analysis stays at four to five hours per interview hour. | Can you ask your material how people reasoned? | 9, 11 |
| **A second brain: meetings and sources in one knowledge base** | Sales & management |  | Information cannot be combined for decisions. | Where would the agent find what you learned last quarter? | 8 |
| **Structured input, many outputs** | Sales & management, Advisory | Reports, templates and business cases from the same material. | Each deliverable is handmade from zero. | Has the agent filled your standard template from raw data? | 9, 12 |
| Connect project context, read-only by default | Everyone | The backlog, docs, logs and dashboards. Judge when MCP is the right tool. For developers it often is not needed. For example the Atlassian plugin or a Grafana MCP. | The agent guesses about things it could look up. | Which system would save you most time if the agent could read it? | 6, 8, 13, 14 |
| Use your craft and domain knowledge to steer | Everyone | Use your experience to make something better, not to skip the experience. | Generic, polished output with nothing behind it, and no way to tell good from bad. | What in your last deliverable could only you have added? | 3, 5, 9, 10, 13 |
| Permissions and sandboxing | Everyone | Know what an agent on your machine may read and change. Developers can run agents in a sandbox, for example Docker. | An agent with your full access makes your worst mistake at machine speed. | What is the most damaging thing your agent could do today? | 4, 11, 14 |
| Use AI to learn, not only to fetch information | Everyone | Learn while you work. For example a skill that teaches you a new technology, or a quiz on a change you just reviewed. | You get faster but not better. | Have you asked the agent to teach you something this month? | 5, 8, 9, 14 |
| Build your own mental model before the change | Developer |  | Review gets harder than writing would have been. | Can you sketch the change before the agent makes it? | 3, 14 |
| Grilling with docs, decision records and time on the domain | Developer |  | Decisions vanish, and each session starts from zero. | Where are your last three design decisions written down? | 5, 13 |
| Application and system architecture | Developer |  | The agent does not know which direction to go. Developers still know best. | Who decided the structure of your last feature? | 4 |
| Mix manual review with AI review | Developer |  | Review becomes a bottleneck or a rubber stamp. | How much of your week is review now? | 3, 5, 6 |
| Several sessions with a clear overview | Developer | For example tmux or remote sessions. | It is easy to lose control. | Can you say what each of your running sessions is doing right now? | 13 |
| Reverse engineering, prototyping and infrastructure as code with AI | Developer |  | You only use agents for feature work. | Have you used an agent on infrastructure or legacy code? | S |
| Know what is worth making, tied to the product strategy | Designer |  | Cheap production leads to low-value work. | Can you tie your last prototype to a product goal? | 1 |
| How an agent loop works, when you design or build AI into products | Designer, Developer |  | You design or build a system you do not understand. | Can you describe the loop behind your product? | 1, 14 |
| Scheduled tasks that prepare work before you need it | Sales & management, Advisory |  | You prepare every meeting by hand. | What gets prepared for you automatically each week? | 10, 12 |
| Voice recordings as input | Sales & management |  | You lose thoughts away from the keyboard. | Do you talk your notes in? | 12 |
| Git basics, for knowledge bases and skills kept as files | Sales & management, Advisory |  | You cannot share or version what you build. | Could a colleague get your skills and notes without you emailing them? | 8 |
| AI and ethics, and AI for business leaders | Advisory |  | You advise on something you have not studied. | Have you taken a structured course? | 10 |
| Connect the assistant to Figma and workshop tools | Advisory |  | You move things between tools by hand. | Has an agent built a workshop board for you? | 10 |

### Your team

| Topic | Who | What it means | What goes wrong without it | Ask yourself | Source |
| --- | --- | --- | --- | --- | --- |
| **Shared, project-specific skills** | Everyone | In the repository or a shared plugin. Golden paths for recurring work: debugging, review, changelogs, sprint planning, post mortems and decision records. Skills for your stack and for handling secrets. Built for the project, not for one person. | Agents get your stack wrong the same way every time. | Does everyone run the same skills for planning and review? | 4, 5, 6, 13, 14 |
| **Decision records, post mortems and runbooks** | Everyone | Readable by people, numbered and dated, kept where the agent can read them. | Decisions vanish, and the agent cannot act on knowledge that lives in people's heads. | Could an agent follow your runbook for the last incident? | 5, 13, 14 |
| **Guardrails set up once for everyone** | Everyone | Sandboxing, read-only by default, and secrets handled through skills. | Each agent can reach everything its owner can. | Is sandboxing set up once, or left to each person? | 4, 13, 14 |
| Shared rules for review, and one shared first review by an agent | Everyone |  | Review quality depends on who reviews. | Does every pull request get the same first review? | 5, 6, 13 |
| Pair through prompting on hard problems | Everyone |  | Decisions made by one person and one agent. | Have two of you prompted together on a hard problem? | 1 |
| A team contract for AI, and follow-up on how each person works | Everyone | Write down how the team uses AI to keep quality and work well together, so everyone shares the same mental model. | Juniors dump the task into the agent and push it, without seeing the bigger picture. | Does your team have a contract for how you use AI, and does everyone follow it? | 2, 5, 11, 14 |

### The client

| Topic | Who | What it means | What goes wrong without it | Ask yourself | Source |
| --- | --- | --- | --- | --- | --- |
| **A shared knowledge base, connected for every agent, also for development** | Everyone | Gather documentation, base data and domain information that is spread over many systems, and connect it so agents can look it up. | Agents cannot look up base data and domain information, and spread-out information cannot support decisions. | Can a coding agent at the client look up domain facts without someone pasting them in? | 8, 12, 13, 14 |
| **Help the client make sure agents see no more than the person using them** | Everyone | A shared hub of connectors moves the access check from the person to a server, and the server often sees more. Check access per person, and log what agents read and do. | Losing control of data is easy, and people reach data they should not see. | When an agent reads data at the client, whose access does it use? | 14 |
| Local models where privacy requires it | Everyone |  | Some clients cannot use cloud AI at all. | What do you advise a client that forbids cloud models? | 8, 11 |
| Make time for quality culture | Everyone |  | Culture loses to delivery every week. | Is time for this in anyone's plan at the client? | 5 |
| Help the client build their own skills, plugins and MCP servers | Everyone | Their internal best practice, packaged so every agent can use it, and improved as they learn. | Each team writes its own, and what the client learns does not build up. | Can teams at the client find and install skills other teams built? | 14 |

## Level 3 Leading: topics

Change how you work and what you take on, and lift the people around you.

### Yourself

| Topic | Who | What it means | What goes wrong without it | Ask yourself | Source |
| --- | --- | --- | --- | --- | --- |
| **Take a broader product role** | Everyone | Change how you work, what you take responsibility for and which positions you take. You are still a technical expert, but above all an expert in turning the real world into systems, processes and formal structures that work as modelled. | Making things gets cheap, so judgment about what to make and why is what counts, and so does caring about what you make. | What did you take responsibility for this month that is outside your title? | 1, 2, 14 |
| **Choose what you should do, not what you can do** | Everyone |  | A pile of nice-to-haves nobody asked for. | What did you decide not to make this week? | 1, 10 |
| **Several agents at once** | Everyone | Subagents, parallel sessions and orchestration, with one agent checking another. Give each subagent one narrow mandate. | You wait on one agent, or run many and lose quality. | Does anything other than you check the agent's work? | 2, 5, 7, 13, 14, S |
| **Tests for the application architecture itself** | Developer |  | Structure erodes one merge at a time. | Would a test fail if an agent broke your layering? | 2, 4 |
| **A workday that starts from pull requests** | Designer |  | You become the bottleneck when others send code. | Can you review a design change that arrives as code? | 1 |
| **Automate the tasks that take time but do not matter** | Sales & management |  | Less face time with clients and consultants. | What took an hour last week that an agent could have done? | 8 |
| **Protect quality and correctness in the whole system** | Advisory |  | Errors multiply when automation scales. | What catches a wrong figure before the client does? | 9 |
| Manage cognitive load and text fatigue | Everyone |  | You stop reading what the agents write. | How much agent output did you skim this week? | 2, 3, 4 |
| Build processes and systems, not single outputs | Everyone | For example onboarding, or a research setup others can run. | The gain stays with one task and one person. | Which of your routines could a colleague run tomorrow? | 10, 11 |
| Curate your skills | Everyone | Prune and rewrite them, know when no skill is needed, and share the good ones with the team and the client. | Skills pile up and fill the context. | Which skill did you last delete or rewrite? | 9, 12, 13, 14 |
| Assess the risks of connected tools | Everyone | Know what an MCP server or plugin can read and do before you install it. Developers learn how MCP works inside and read the server's code. | Security comes second to hype, and you install servers you cannot assess. | Do you know what an MCP server you installed can do? | 4, 5 |
| Agentic on-call and triage across agents | Developer |  | Operations stays manual while development speeds up. | Could an agent do the first ten minutes of your last incident? | S |
| Your own agent setup and local models | Developer |  | You depend on defaults you do not understand, and some data stays off limits. | Do you know what a local model can and cannot do for you? | 6, 7 |
| Routing skills that load others only when needed | Developer |  | Context fills up and quality drops. | Do your skills load only when the task needs them? | 13, 14 |
| Read design out of code with the agent's help | Designer |  | Changes land that no designer has seen. | How do you look at a pull request you cannot read? | 1 |
| Write down the new practices for the field | Designer |  | Everyone invents their own method, and the skill stays with one person. | Has your team written down how you research with AI? | 11 |
| Skills for business routines | Sales & management, Advisory |  | You know of skills but have not seen the value, so it stays untried. | Have you tried one skill on a real task? | 9, 12 |
| AI in forecasting work | Advisory |  | Forecasts stay manual. | Which part of your forecast could an agent prepare? | 9 |

### Your team

| Topic | Who | What it means | What goes wrong without it | Ask yourself | Source |
| --- | --- | --- | --- | --- | --- |
| **New ways of working as teams get smaller** | Everyone | Use AI to solve new things better, not the same tasks faster. Shift work left, and spend the time on the critical parts of the craft. | A process built for more people. | What would you stop doing with three people? | 8, 14 |
| **Ownership shared by people and agents** | Everyone |  | Shared ownership of the code gets lost. | Who on your team knows why the code looks the way it does? | 6 |
| Test the codebase and conventions, not only the application | Everyone |  | Agents break conventions nothing protects. | Which team convention is enforced by a test? | 2, 4 |

### The client

| Topic | Who | What it means | What goes wrong without it | Ask yourself | Source |
| --- | --- | --- | --- | --- | --- |
| **One agreed way of building with agents** | Everyone | A software factory, built into existing workflows, with a named owner. It takes large, systematic change. | AI use stays a personal habit. | Can the client describe their way of building with agents in one sentence? | 13, 14 |
| Make someone own the question of what to do differently | Everyone | Beyond solving each day's tasks. | Tasks get optimized, and the purpose gets missed. | Who at the client is responsible for that question? | 5, 14 |
| Build AI into the systems where work happens | Everyone | Assistants built around how the business works, not only a general chat app. Tools that act, not only find: HR changes, onboarding, KPI reports, slides. One place where people discover them, with guided tours. For example an assistant connected to the CV system. | AI stays a side window. | Which client system should have this built in first? | 12, 14 |

## Learning resources

Learning resources are not listed here. Each topic's resources live on the ladder page and in `src/resources/` in the repo, where anyone can suggest one through GitHub.

## Where we need more material

The model is weakest at both ends: nobody interviewed is a total beginner, and few described the leading level outside development. We need more interviews or maps here before we can trust the path.

| Part of the model | What we have | What to collect |
| --- | --- | --- |
| Level 1 Beginner, all disciplines | Day-one advice from people who are already past it. The level 1 steps are our synthesis | Interviews with people who have not started or stopped early: what blocked them, what the first week looked like |
| Level 3 Leading, designers | 2 people | More designers who work from pull requests or share research setups |
| Level 3 Leading, sales, management and advisory | 4 people, two of them naming skills they have not tried | People who run scheduled or automated work in sales, advisory or management |
| Sales and management, and advisory | 4 interviews with no discipline recorded. We placed 8 and 12 in sales and management, 9 and 10 in advisory | Record the role, so the split can be checked |
| Missing disciplines | None | Product managers, project leads, testers, data and platform engineers, tech leads |
| Your team, level 3 | 1 person | Teams that have changed their process because of agents |
| The client, levels 2 and 3 | 4 people and 2 people | Leaders and client-side views: what clients allow, forbid and expect |
| Why it matters, how you found out | Few answers. Many "what goes wrong" cells are our reading | Failure stories: what went wrong, and where the gap showed up |
| Juniors | One senior's view of juniors | Juniors themselves, on how they build judgment with agents |
| The self-submitted map | One, left unfinished | A survey wave to get breadth behind the 14 voices |

## Placed by judgment

These topics sit on another level than the interview gave them, or rest on our own framing. Check them in the expert review.

| Topic | Level now | What we did | Source |
| --- | --- | --- | --- |
| Start small, and challenge the answers | 1 | The day-one framing ("nobody is behind") is ours, built from several answers | 4, 7, 10, 12, 13 |
| Token management: cost, quality and climate | 1 | The "lose-lose" framing is ours | 1, 5, 6, 7, 13 |
| Choose how to work, based on the task | 2 | Our synthesis of two answers | 3, 7 |
| Scheduled tasks that prepare work before you need it | 2 | Moved up from getting started | 12 |
| Git basics, for knowledge bases and skills kept as files | 2 | Moved up from getting started | 8 |
| Take a broader product role | 3 | Our framing, backed by two answers | 1, 2 |
| Your own agent setup and local models | 3 | Interview 7 said getting good | 6, 7 |
| Routing skills that load others only when needed | 3 | Moved up from getting good | 13 |
| Test the codebase and conventions, not only the application | 3 | Moved up from getting good | 2, 4 |
| Build AI into the systems where work happens | 3 | Moved up from getting started | 12 |

## Where interviewees disagreed

On these eight points people reached opposite conclusions. The model gives one answer per topic, and the last column says where it landed.

| Tension | One side | Other side | Where the model lands |
| --- | --- | --- | --- |
| Grilling | Being interviewed by the agent makes the result good (2, 4, 5, 10) | Grill-me is exhausting, and sitting in chat is not how I want to work (3) | Try grilling first, as one of the ready-made skills. "Use ready-made skills, starting with grilling", level 1 |
| Specs or code first | Writing specs and issues is now the developer's main job (4) | I do not understand the spec approach and have given up. I write TODOs in the code and send those to the agent (3) | Both routes are fine. "Give the agent a clear goal, by one of two routes", level 1 |
| Prompts or tests | Better instructions give better results (4) | Spend less time on prompts and more on tests (2) | Tests. "Less time on prompts, more on domain and architecture tests", level 2 |
| One-shot or step by step | Claude can now deliver a whole product from one prompt (7) | Much looks fine but is not in place, and it is better to write more yourself than to review more (3, 5) | It depends on the task. "Choose how to work, based on the task", level 2 |
| General or specialized tools | Specialized tools are usually not as good as Claude (11) | Dedicated tools for transcription and meetings are part of the daily kit (10, 12) | Dedicated tools for transcription. "Transcribe meetings and interviews", level 1 |
| Careful or casual prompting | Open questions at the right level matter (2) | You do not always need to think every wording through (7) | Be concrete about the goal, and do not polish the wording. "Prompt at the right level", level 1 |
| Frontier model or not | The strongest models are what made agents workable, for example for orchestration (2, 5) | Never uses the frontier model. A non-frontier model at medium effort does the job (13) | The strongest model is not the default. Pick per job. "Token management" at level 1 and "Pick model and effort per job" at level 2 |
| MCP for developers | Read application logs through MCP (13) | MCP is mostly not needed in a development environment, and knowing when it is needed is the skill (14) | Judge when MCP is the right tool. "Connect project context, read-only by default", level 2 |

## Open questions

These are the known unknowns from the reflections. Nobody in the interviews has a good answer yet.

- How to handle climate and energy use. It holds one person back from using the tools fully (1, 6).
- How to keep security from coming second to the hype (4).
- How to solve text fatigue and balance cognitive load when agents produce more than anyone can read (2, 4).
- How to keep ownership of a codebase that agents write (6).
- How juniors build judgment when the agent does the work (5).
- What spec-driven work is, and whether it is worth it (3).
- Where to share: one person wants an AI-specific developer channel, another wants better sharing and recommended courses in Variant (2, 10).
- What the new practices for each field are, when so much still changes (11).
- What we should be working on beyond solving the daily tasks (5).
- What skills are really good for, outside development (9, 12).

## Vocabulary check

If you cannot explain a term in this table, you have found an unknown. All terms were used in the interviews.

| Term | What it means | Source |
| --- | --- | --- |
| Harness | The app around the model that gives it tools, files and a loop to work in, such as Claude Code or Codex | 4, 6, 7 |
| Skill | A packaged set of instructions the agent loads for one kind of task. Can be personal, per project or shared in the organization | 4, 5, 6, 10 |
| MCP | Model Context Protocol, the standard way to connect an agent to other systems such as Jira, Grafana or Flowcase | 5, 6, 8 |
| [grill-me](https://aihero.dev/skills-grill-me) | A skill by Matt Pocock where the agent interviews you about a plan until the decisions are made | 2, 3, 5, S |
| [grill-with-docs](https://aihero.dev/skills-grill-with-docs) | The same interview for codebases. It also writes down the decisions and the domain language as it goes | 5, 6, S |
| ADR | Architecture decision record, a short note on one decision and why it was made | 5 |
| Plan mode | The agent proposes a plan and waits for approval before changing anything | 6, 7 |
| Subagent and orchestration | One agent hands parts of a task to other agents, often a strong model directing cheaper ones | 5 |
| Effort | A setting for how much the model reasons before answering. It changes quality, time and cost | 7 |
| Sandboxing | Running the agent in an isolated environment so it can only reach what you allow | 4, 11 |
| Architecture test | A test that fails when code breaks the agreed structure, not when a feature breaks | 2, 4 |
| Second brain | A personal or shared knowledge base, often Markdown files, that the agent reads and writes | 8 |
| One-shotting | Getting a complete result from a single prompt | 7 |
| Text fatigue | Tiredness from reading the volume of text agents produce | 4 |
| [Doorman fallacy](https://www.ibisworld.com/blog/ai-impact-rory-sutherland-doorman-fallacy-reputation-risk/1/1126/) | Rory Sutherland's term for reducing a role to its most visible task, automating that task and losing the value that was harder to measure | 8 |
| [Reverse centaur](https://forklog.com/en/how-humans-became-the-body-for-machines/?hl=en-gb) | Cory Doctorow's term for a person who serves the machine at the machine's pace, instead of being helped by it | 8 |
| Meat proxy | Not looked up. From context: a person who only passes AI output along without adding judgment | 8 |
| [pstack](https://github.com/cursor/plugins/tree/main/pstack) | A set of skills for a full development flow, in Cursor's plugins | 2 |
| [Ponytail](https://github.com/DietrichGebert/ponytail) | A skill by Dietrich Gebert that makes a coding agent write less code. Named by two developers | 6, 13 |
| AGENTS.md | A file in the repo that tells coding agents how the project works and what rules to follow | 13 |
| Compacting and handover | Summarizing a long session so the work can continue in a fresh one without losing the thread | 13 |
| Routing skill | A small skill that points to other skills, so each one loads only when the task needs it | 13 |
| Runbook | Written steps for an operational task. With one in the repo, an agent can do more of the task | 13 |
| SOPS | A tool for keeping secrets encrypted in the repo, so agents and skills never handle them in plain text | 6, 13 |
| Software factory | One agreed, organization-wide way of building software with agents, integrated with existing workflows | 13 |

Sources: [aihero.dev on grill-me](https://aihero.dev/skills-grill-me), [aihero.dev on grill-with-docs](https://aihero.dev/skills-grill-with-docs), [IBISWorld on the doorman fallacy](https://www.ibisworld.com/blog/ai-impact-rory-sutherland-doorman-fallacy-reputation-risk/1/1126/), [ForkLog on the reverse centaur](https://forklog.com/en/how-humans-became-the-body-for-machines/?hl=en-gb). These come from search results and I did not open the full pages. The other definitions are general knowledge.

## What the data covers

The roadmap rests on 15 people, so read it as a first map and not as a finding about all of Variant.

- Developers are best covered: interviews 2, 3, 4, 6, 7, 13 and 14, plus the self-submitted map, which was left unfinished. Interview 5 has no discipline recorded and is placed as a developer.
- Design rests on two people: interviews 1 and 11. Interview 2 also works in UX and UI, but feeds only the developer track. Research analysis is shared between designers and advisory.
- Sales and management rests on interviews 8 and 12, and advisory on 9 and 10. None of the four recorded a discipline, so the split is ours.
- No one is recorded as product manager, project lead, tester, data or platform engineer. Those tracks are missing.
- All 14 interviewees answered for themselves. For the team, 9 covered getting started and getting good and 2 covered next level. For the client organization the numbers are 7, 5 and 3.
- Few people answered why it matters and how they found out, so several "what goes wrong" cells are our reading of what was said.

The next interviews will add most if they go to the missing disciplines and ask directly about the team and the client.
