import scholarships from '../data/scholarships.json'
import community from '../data/community.json'
import visaSteps from '../data/visa_steps.json'

const API_BASE = '/api'

async function post(endpoint, body) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Server error ${res.status}`)
  }
  return res.json()
}

export async function extractProfile(userText) {
  return post('/extract-profile', { userText })
}

export async function generatePassport(profile) {
  const data = { scholarships, community, visa_steps: visaSteps }
  return post('/generate-passport', { profile, data })
}

export async function sendFollowUp(messages, profile, passport) {
  return post('/follow-up', { messages, profile, passport })
}
