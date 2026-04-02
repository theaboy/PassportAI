import express from 'express'
import cors from 'cors'
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash'

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json({ limit: '2mb' }))

const apiKey = process.env.GEMINI_API_KEY?.trim()
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null
const model = genAI?.getGenerativeModel({ model: GEMINI_MODEL })

function stripJsonFences(text) {
  return text.replace(/```json\n?|\n?```/g, '').replace(/```\n?|\n?```/g, '').trim()
}

function getErrorMessage(err) {
  const candidates = [
    err?.message,
    err?.error?.message,
    err?.response?.data?.error?.message,
    err?.details,
  ]

  return candidates.find(Boolean) || 'Unknown Gemini error'
}

function requireModel(res) {
  if (model) return true

  res.status(500).json({ error: 'Server is missing GEMINI_API_KEY in .env' })
  return false
}

app.post('/api/extract-profile', async (req, res) => {
  const { userText } = req.body
  if (!userText) return res.status(400).json({ error: 'userText is required' })
  if (!requireModel(res)) return

  try {
    const prompt = `You are an immigration profile extractor. Given a free-form user description, extract and return ONLY a JSON object with these exact fields:
- nationality: string (e.g. "Moroccan")
- city: string (e.g. "Montreal")
- field: string (e.g. "Software Engineering")
- visa_type: string (one of: "student", "work", "refugee", "family", "unknown")
- languages: array of strings (e.g. ["French", "Arabic"])
- goals: array of strings (e.g. ["scholarships", "community", "career"])
- education_level: string (e.g. "Bachelor's", "Master's", "High School")
- name: string (first name only if mentioned, else "Newcomer")

Return valid JSON only. No markdown. No explanation.

User description: ${userText}`

    const result = await model.generateContent(prompt)
    const text = stripJsonFences(result.response.text())
    const profile = JSON.parse(text)
    res.json(profile)
  } catch (err) {
    const message = getErrorMessage(err)
    console.error('Profile extraction error:', message)
    res.status(500).json({ error: `Gemini request failed: ${message}` })
  }
})

app.post('/api/generate-passport', async (req, res) => {
  const { profile, data } = req.body
  if (!profile || !data) return res.status(400).json({ error: 'profile and data are required' })
  if (!requireModel(res)) return

  try {
    const prompt = `You are PassportAI, an expert Canadian immigration navigator. Given a user profile and a resource database, generate a fully personalized Life Passport.

Return ONLY a valid JSON object with this exact structure:
{
  "visa": {
    "status_summary": "one sentence describing their current visa situation",
    "urgency": "low|medium|high",
    "next_steps": [
      { "step": "action to take", "deadline": "when", "priority": "high|medium|low", "details": "brief explanation" }
    ],
    "warnings": ["any important warnings"],
    "upcoming_milestone": "next big visa milestone (e.g. PGWP eligibility, PR pathway)"
  },
  "education": {
    "matched_scholarships": [
      { "name": "scholarship name", "amount": "amount", "deadline": "deadline", "match_reason": "why this matches the user", "link": "url" }
    ],
    "tip": "one personalized education tip"
  },
  "career": {
    "credential_steps": ["step 1", "step 2"],
    "job_boards": [
      { "name": "board name", "url": "url", "relevance": "why relevant" }
    ],
    "internship_programs": ["program 1", "program 2"],
    "top_employers": ["company 1 in their field in Montreal", "company 2"],
    "tip": "one personalized career tip"
  },
  "community": {
    "organizations": [
      { "name": "org name", "description": "brief description", "city": "city", "contact": "contact info" }
    ],
    "quick_wins": ["action they can take this week to connect with community"],
    "tip": "one personalized community tip"
  }
}

Be specific and relevant. Only include scholarships that actually match their field/nationality/visa type. Only include community orgs in their city. Return valid JSON only, with no markdown and no text outside the JSON.

User Profile:
${JSON.stringify(profile, null, 2)}

Available Resources:
${JSON.stringify(data, null, 2)}`

    const result = await model.generateContent(prompt)
    const text = stripJsonFences(result.response.text())
    const passport = JSON.parse(text)
    res.json(passport)
  } catch (err) {
    const message = getErrorMessage(err)
    console.error('Passport generation error:', message)
    res.status(500).json({ error: `Gemini request failed: ${message}` })
  }
})

app.post('/api/follow-up', async (req, res) => {
  const { messages, profile, passport } = req.body
  if (!messages || !profile) return res.status(400).json({ error: 'messages and profile required' })
  if (!requireModel(res)) return

  try {
    const systemContext = `You are PassportAI, a warm, knowledgeable Canadian immigration guide.

The user's profile: ${JSON.stringify(profile)}
Their generated life passport: ${JSON.stringify(passport)}

Answer their follow-up questions with:
- Specific, actionable advice
- Links or contact info when relevant
- A conversational but professional tone
- Brevity, 2-4 sentences unless more detail is needed
- Empathy, moving to a new country is hard

Always answer in the same language the user is writing in (French or English).`

    const chat = model.startChat({
      history: messages.slice(0, -1).map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
    })

    const lastMessage = messages[messages.length - 1]
    const fullPrompt = messages.length === 1
      ? `${systemContext}\n\nUser: ${lastMessage.content}`
      : lastMessage.content

    const result = await chat.sendMessage(fullPrompt)
    res.json({ reply: result.response.text() })
  } catch (err) {
    const message = getErrorMessage(err)
    console.error('Follow-up error:', message)
    res.status(500).json({ error: `Gemini request failed: ${message}` })
  }
})

app.listen(PORT, () => {
  console.log(`\nPassportAI server running on http://localhost:${PORT}`)
  console.log(`Gemini model: ${GEMINI_MODEL}`)
  console.log(apiKey ? 'GEMINI_API_KEY detected.' : 'GEMINI_API_KEY is missing.')
  console.log('Waiting for requests from the React app...\n')
})
