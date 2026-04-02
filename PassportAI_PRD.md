# Product Requirements Document
## PassportAI — The Immigrant Life Navigator
**Version:** 1.0 | **Date:** April 2, 2026 | **Author:** Aymane | **Event:** McGill Data Network Hackathon

---

## 1. Executive Summary

PassportAI is an AI-powered platform that gives immigrants a personalized digital life passport. When a newcomer arrives in a country, they face a chaotic maze of scholarships, visa steps, community resources, and career guidance — all scattered across dozens of websites, all in a language they may not fully command. PassportAI collapses that maze into a single intelligent conversation. The user describes their background in plain language; the AI builds their full roadmap in seconds.

**Theme alignment:** Automate. Optimize. Innovate. — PassportAI automates a process (immigrant onboarding) that currently takes weeks of manual research, optimizes it into a single personalized output, and innovates by treating the immigrant's life journey as a structured, AI-navigable dataset.

---

## 2. Problem Statement

### The manual process today
A Moroccan student arriving in Montreal must:
- Search government websites for visa renewal steps (2–4 hours)
- Browse 15+ scholarship databases to find ones they qualify for (3–6 hours)
- Discover Moroccan-Canadian community organizations through word-of-mouth (days)
- Translate official documents and understand legal requirements without guidance (variable)
- Repeat this process every time their situation changes (new city, new degree, job search)

**Total time wasted per immigrant:** 15–30 hours in the first month alone.

### The gap
No existing tool ingests the immigrant's full context (nationality, education, field, visa type, city) and returns a *personalized, complete* roadmap in one shot. Generic government portals are not personalized. Google searches are noisy. Community Facebook groups are inconsistent.

---

## 3. Solution Overview

PassportAI is a conversational AI interface where the immigrant types one paragraph about themselves. The system:

1. Extracts their profile automatically using Claude AI
2. Matches them to relevant scholarships, community organizations, and visa steps
3. Generates a structured "Life Passport" — a personalized roadmap covering career, education, community, and legal status

**Core insight:** The immigrant shouldn't have to understand the system. The system should understand the immigrant.

---

## 4. Target Users

| User | Description | Primary Need |
|---|---|---|
| Student immigrants | International students on study permits | Scholarships, study resources, part-time work rules |
| Skilled worker immigrants | Professionals on work visas | Career credential recognition, job networks, PR pathways |
| Refugee/asylum seekers | Humanitarian arrivals | Legal support, community organizations, settlement services |
| Family reunification | Sponsored family members | Language learning, community, employment pathways |

**Hackathon demo persona:** Youssef, 23, Moroccan, B.Sc. Computer Science, just arrived in Montreal on a student visa. Looking for scholarships, the Moroccan community, and internship opportunities.

---

## 5. Core Features (MVP — 4-hour build)

### Feature 1: Intelligent Profile Extraction
**What it does:** User types a free-form paragraph about themselves. Claude extracts structured data: nationality, city, field of study/work, visa type, language level, goals.

**Why it matters:** Eliminates the friction of filling out forms. The immigrant just talks.

**Input:** "I'm a Moroccan software engineer, I just moved to Montreal on a student visa, I speak French and English, and I want to find scholarships and connect with the Moroccan community."

**Output:**
```
{
  "nationality": "Moroccan",
  "city": "Montreal",
  "field": "Software Engineering",
  "visa_type": "Student",
  "languages": ["French", "English"],
  "goals": ["scholarships", "community", "career"]
}
```

### Feature 2: Resource Matching Engine
**What it does:** Claude takes the extracted profile and matches it against a curated JSON database of scholarships, community organizations, and visa steps. Returns only the relevant ones.

**Data sources (hardcoded for MVP):**
- 25 scholarships (filtered by field, nationality, province)
- 15 Moroccan-Canadian community organizations in major cities
- Step-by-step visa renewal checklist for student permits in Canada

### Feature 3: The Life Passport Output
**What it does:** Renders a structured, beautiful dashboard with four sections:

- **Visa & Legal** — Next 3 action items for their visa status, deadlines
- **Education & Scholarships** — Top 5 matched scholarships with eligibility and links
- **Career** — Credential recognition steps, relevant job boards, internship programs
- **Community** — Nearby organizations, events, Moroccan-Canadian networks

### Feature 4: Conversational Follow-up
**What it does:** After the passport is generated, the user can ask follow-up questions in natural language. "What documents do I need for the CIBC scholarship?" "Are there coding bootcamps in Montreal for immigrants?"

---

## 6. Technical Architecture

### Stack
| Layer | Technology | Rationale |
|---|---|---|
| Frontend | React (single page) | Fast to build, easy to demo |
| AI Engine | Claude API (claude-sonnet-4-20250514) | Best-in-class instruction following, JSON extraction |
| Data Layer | Static JSON files | No backend needed, achievable in 4 hours |
| Styling | Tailwind CSS | Rapid UI development |
| Hosting | Vercel / localhost | Deploy in 2 minutes |

### AI Prompt Architecture
Two Claude calls per session:

**Call 1 — Profile Extraction**
System: "You are an immigration profile extractor. Given a free-form user description, return a JSON object with fields: nationality, city, field, visa_type, languages, goals. Return JSON only."

**Call 2 — Resource Matching + Passport Generation**
System: "You are an immigration navigator. Given this user profile and these resources [JSON], return a personalized life passport with four sections: visa, education, career, community. Recommend only the relevant items."

### Data Schema (Scholarship example)
```json
{
  "id": "mcgill-entrance-001",
  "name": "McGill Entrance Excellence Award",
  "amount": "$3,000",
  "eligibility": {
    "fields": ["all"],
    "nationalities": ["all"],
    "visa_types": ["student"],
    "cities": ["Montreal"]
  },
  "deadline": "March 1",
  "link": "https://mcgill.ca/studentaid"
}
```

---

## 7. User Flow

```
[User lands on page]
        ↓
[Types background in chat box]
        ↓
[Claude extracts profile — Call 1]
        ↓
[System loads matching JSON data]
        ↓
[Claude generates Life Passport — Call 2]
        ↓
[Dashboard renders with 4 sections]
        ↓
[User asks follow-up questions]
        ↓
[Claude answers conversationally]
```

---

## 8. 4-Hour Build Plan

| Time | Task | Owner |
|---|---|---|
| 0:00 – 0:30 | Set up React project, install dependencies, wire Claude API | Dev |
| 0:30 – 1:00 | Build JSON data files (scholarships, community, visa steps) | Content |
| 1:00 – 1:45 | Build profile extraction prompt + test with 5 personas | Dev |
| 1:45 – 2:30 | Build passport generation prompt + test output quality | Dev |
| 2:30 – 3:15 | Build frontend: chat input + 4-section passport dashboard | Dev |
| 3:15 – 3:45 | Polish UI, add loading states, fix edge cases | Dev |
| 3:45 – 4:00 | Rehearse demo with Youssef persona, prepare pitch | All |

---

## 9. Demo Script (for judges)

**Setup:** Open the app. Show a blank chat box.

**Say:** "Imagine you're Youssef. You just landed in Montreal. You don't know anyone. You don't know where to start."

**Type:** "I'm a 23-year-old Moroccan software engineer, I just arrived in Montreal on a student visa. I speak French and Arabic. I want to find scholarships, connect with the Moroccan community, and eventually get a permanent residency."

**Show:** The Life Passport populates in real time — visa steps, 5 matched scholarships, 3 community orgs, career roadmap.

**Say:** "What used to take Youssef 3 weeks of Googling now takes 8 seconds."

**Ask it a follow-up:** "What documents do I need for the first scholarship?"

**Close with:** "PassportAI doesn't replace the immigration system. It makes it navigable for the first time."

---

## 10. Impact Statement

### Quantified automation
- Manual research time per immigrant: ~20 hours
- PassportAI time to first passport: ~8 seconds
- **Time saved: 99.99%**

### Scale potential
- 400,000+ immigrants arrive in Canada annually
- 300,000+ international students currently enrolled
- Each passport generated saves hours of cognitive load during one of the most stressful periods of a person's life

### Why this matters beyond the hackathon
Immigration is the largest under-served information asymmetry in modern society. The people who need information most (newcomers) have the least access to it in a usable form. PassportAI is a direct attack on that asymmetry.

---

## 11. Future Features (Post-Hackathon)

- **Document scanner:** Upload a visa, diploma, or work permit — Claude extracts and validates the data automatically
- **Timeline tracker:** Visual roadmap of upcoming deadlines (visa renewal, scholarship applications)
- **Community matchmaking:** Connect immigrants with mentors from the same country in the same city
- **Multi-country support:** Expand beyond Canada to France, UK, Germany, UAE
- **Multilingual interface:** Arabic, French, Spanish, Mandarin support natively
- **Job application assistant:** Auto-tailors resumes for Canadian job market standards

---

*Built at the McGill Data Network Hackathon · April 2, 2026 · Theme: Automate. Optimize. Innovate.*
