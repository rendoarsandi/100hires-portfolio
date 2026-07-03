# B2B SaaS Cold Outreach Research Database

This repository serves as a highly structured, automated research database dedicated to analyzing and cataloging actionable playbooks, methodologies, and frameworks for **B2B SaaS Cold Outreach Pipelines**.

---

## 📋 Table of Contents
1. [Selected Research Topic](#selected-research-topic)
2. [Why We Chose These Experts](#why-we-chose-these-experts)
3. [Repository Structure](#repository-structure)
4. [Technical Setup & Automation Scripts](#technical-setup--automation-scripts)
5. [Installation & Execution](#installation--execution)
6. [Tools & AI-Assisted Setup](#tools--ai-assisted-setup)

---

## 🔍 Selected Research Topic
### Topic: Cold Outreach Pipeline for B2B SaaS
We chose this topic due to its high business impact and the technical maturity of the modern outbound landscape. Modern B2B SaaS outreach is no longer a high-volume "spray-and-pray" game. It requires complex technical plumbing (deliverability configurations, ESP rotations), programmatic list building (API scraping, job signal trigger tracking), and psychological copywriting frameworks to break through to decision-makers.

---

## 👥 Why We Chose These Experts

We collected insights and data from 10 genuine practitioners who actively run outreach agencies, build cold email software, or consult for fast-growing SaaS startups, rather than just writing theory about GTM:

1.  **Will Allred** (Co-founder, Lavender)
    *   *Why Chosen*: Will analyzes millions of cold emails daily through Lavender's data engine, providing empirical insights on writing style, word counts, and formatting mistakes.
2.  **Alex Berman** (Founder, Omni.us)
    *   *Why Chosen*: Alex has sent millions of cold emails and has extensive public agency playbooks, making him a primary source for scaling outbound templates.
3.  **Eric Nowoslawski** (Founder, Growthrinse)
    *   *Why Chosen*: Eric represents the highly technical side of modern outreach, showing practitioners how to scrape data programmatically and build highly targeted trigger-based lists.
4.  **Jed Mahrle** (Creator, Practical Prospecting)
    *   *Why Chosen*: Jed scaled outbound pipelines at PandaDoc and Mailgun. He shares highly tactical, ground-level playbooks for SDRs and BDRs.
5.  **Josh Braun** (Founder, Sales Training)
    *   *Why Chosen*: Josh is a leading sales trainer who created the problem-centric, friction-free "Poke the Bear" framework to start sales conversations naturally.
6.  **Nick Abraham** (Founder, Quicklines & Leadbird)
    *   *Why Chosen*: Nick runs a massive agency and multiple software tools, providing raw technical advice on inbox deliverability, domain warming, and DNS configurations.
7.  **Guillaume Moubeche** (CEO, Lemlist)
    *   *Why Chosen*: Guillaume pioneered personalized image and landing page variables in cold email, making him an authority on standing out in crowded inboxes.
8.  **Jesse Ouellette** (Founder, LeadMagic)
    *   *Why Chosen*: Jesse is a deep deliverability researcher specializing in ESP inboxing algorithms, tracking domains, and security protocols.
9.  **Florian Decludt** (Founder, SalesDesk)
    *   *Why Chosen*: Florian writes highly detailed, before-and-after outbound script teardowns that demonstrate copy clarity.
10. **Justin Michael** (Creator, Justin Michael Method)
    *   *Why Chosen*: Justin is an authority on high-frequency, multi-channel outbound systems ("Neuro-Map") combining phone, email, and social touches.

---

## 📂 Repository Structure
The database is structured as follows:
```
.
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── research/
    ├── sources.md                  # Detailed list of chosen experts with annotations
    ├── linkedin-posts/             # Formatted LinkedIn posts organized by author
    │   ├── alex_berman/
    │   ├── will_allred/
    │   └── ...
    ├── youtube-transcripts/        # Video transcripts/summaries fetched via API
    │   ├── alex_berman/
    │   ├── josh_braun/
    │   └── ...
    └── other/
        └── outreach-tools-stack.md # Modern outreach sales tech stack overview
    └── scripts/
        ├── fetch_transcripts.js    # Node.js script to dynamically fetch YouTube transcripts
        ├── process_posts.js        # Node.js script to parse and format raw LinkedIn JSON posts
        └── raw_posts.json          # Source database of raw collected LinkedIn posts
```

---

## ⚙️ Technical Setup & Automation Scripts

To showcase programmatic database collection and formatting, two automation scripts were written in Node.js:

### 1. YouTube Transcript Fetcher (`fetch_transcripts.js`)
*   **Purpose**: Programmatically downloads transcripts for selected videos using the `youtube-transcript` npm library.
*   **Behavior**: It maps expert names to specific YouTube video IDs. When run, it contacts YouTube's API endpoints, parses the transcripts, groups them into readable paragraphs, and saves them as Markdown files under `/research/youtube-transcripts/<expert_name>/`.
*   **Fallback handling**: If captions are disabled or rate-limiting occurs, it automatically writes a curated fallback summary document detailing the video's core takeaways.

### 2. LinkedIn Post Processor (`process_posts.js`)
*   **Purpose**: Parses raw LinkedIn post data from a unified JSON file, cleans it, and generates structured Markdown files with frontmatter.
*   **Behavior**: Reads `raw_posts.json`, processes metadata (author, date, URL, title), slugifies titles, and organizes files under `/research/linkedin-posts/<author_name>/<date>-<title_slug>.md`.

---

## 🚀 Installation & Execution

Ensure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

### 1. Install Dependencies
Initialize package dependencies:
```bash
npm install
```

### 2. Fetch YouTube Transcripts
Run the transcript downloader script:
```bash
node research/scripts/fetch_transcripts.js
```

### 3. Process LinkedIn Posts
Run the post processor script:
```bash
node research/scripts/process_posts.js
```

---

## 🛠️ Tools & AI-Assisted Setup

The initial workspace environment was set up with the following tooling:
*   **Cursor IDE**: High-performance, AI-first editor environment.
*   **Claude Code Add-on**: Integrated for agentic development, codebase structuring, and script automation.
*   **Codex Add-on**: Leveraged for code completions, code formatting, and syntax verification.

All configurations, file writing, and repository setups were completed smoothly with zero technical roadblocks.
