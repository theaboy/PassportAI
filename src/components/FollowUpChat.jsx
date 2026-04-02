import { useState, useRef, useEffect } from 'react'
import { sendFollowUp } from '../api/claude'

const SUGGESTED_QUESTIONS = [
  'What documents do I need for the first scholarship?',
  'How do I renew my study permit step by step?',
  'Can I work part-time while studying?',
  'What is the fastest path to permanent residency?',
  'Are there coding bootcamps in Montreal for newcomers?',
]

function Message({ role, content, isTyping }) {
  const isUser = role === 'user'

  if (isTyping) {
    return (
      <div className="flex items-end gap-3">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 text-xs font-bold flex-shrink-0">
          P
        </div>
        <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-slate-800/80 border border-white/8">
          <div className="flex gap-1 items-center h-4">
            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-end gap-3 animate-slide-in-right ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      {isUser ? (
        <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      ) : (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 text-xs font-bold flex-shrink-0">
          P
        </div>
      )}

      {/* Bubble */}
      <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
        isUser
          ? 'bg-amber-500/15 border border-amber-500/20 text-amber-100 rounded-br-sm'
          : 'bg-slate-800/80 border border-white/8 text-slate-200 rounded-bl-sm'
      }`}>
        {content.split('\n').map((line, i) => (
          <p key={i} className={i > 0 ? 'mt-2' : ''}>
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function FollowUpChat({ profile, passport }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const send = async (text) => {
    const userText = text || input.trim()
    if (!userText || isLoading) return

    setInput('')
    setError(null)

    const newMessages = [...messages, { role: 'user', content: userText }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      const { reply } = await sendFollowUp(
        newMessages.map(m => ({ role: m.role, content: m.content })),
        profile,
        passport
      )
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const isEmpty = messages.length === 0

  return (
    <div className="border-t border-white/5 bg-passport-navy">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-sm">
            P
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Ask PassportAI</h3>
            <p className="text-xs text-slate-500">Ask anything about your passport, visa, scholarships, or next steps</p>
          </div>
        </div>

        {/* Suggested Questions (only shown when chat is empty) */}
        {isEmpty && (
          <div className="flex flex-wrap gap-2 mb-6">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="text-xs px-3 py-1.5 rounded-full border border-white/8 bg-white/3 text-slate-400 hover:border-amber-400/30 hover:text-amber-300 hover:bg-amber-400/5 transition-all duration-150"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Message Thread */}
        {!isEmpty && (
          <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
            {messages.map((msg, i) => (
              <Message key={i} role={msg.role} content={msg.content} />
            ))}
            {isLoading && <Message role="assistant" isTyping />}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {error}
          </div>
        )}

        {/* Input Bar */}
        <div className="flex items-end gap-3 p-1 rounded-xl border border-white/8 bg-passport-card focus-within:border-amber-400/30 transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a follow-up question..."
            rows={1}
            className="flex-1 bg-transparent px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none resize-none leading-relaxed"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || isLoading}
            className="mb-1 mr-1 w-9 h-9 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 flex-shrink-0"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full spinner" />
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            )}
          </button>
        </div>

        <p className="mt-2 text-xs text-center text-slate-700">
          PassportAI provides general guidance. For legal decisions, consult a certified immigration consultant.
        </p>

      </div>
    </div>
  )
}
