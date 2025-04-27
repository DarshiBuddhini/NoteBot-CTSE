import React, { useState } from 'react'
import ChatMsg from './ChatMsg'
import InputBox from './InputBox'

// Add loading state and error handling
const ChatWindow = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSend = async (msg) => {
    try {
      setLoading(true)
      setMessages(prev => [...prev, { from: 'user', text: msg }])
      
      // Replace with actual API call
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: msg })
      })
      const data = await response.json()
      
      setMessages(prev => [...prev, { from: 'bot', text: data.response }])
    } catch (err) {
      setError('Failed to get response')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {messages.map((msg, index) => (
          <ChatMsg key={index} from={msg.from} text={msg.text} />
        ))}
        {loading && <ChatMsg from="bot" text="Thinking..." />}
        {error && <div className="error-message">{error}</div>}
      </div>
      <InputBox onSend={handleSend} isFirstMessage={messages.length === 0} disabled={loading} />
    </div>
  )
}

export default ChatWindow
