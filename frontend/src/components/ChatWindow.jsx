import React, { useState } from 'react'
import ChatMsg from './ChatMsg'
import InputBox from './InputBox'

const ChatWindow = () => {
  const [messages, setMessages] = useState([])

  const handleSend = (msg) => {
    setMessages((prev) => [...prev, { from: 'user', text: msg }])
    // Simulate bot response (replace with actual LLM call)
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: "I'm your assistant!" }])
    }, 1000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {messages.map((msg, index) => (
          <ChatMsg key={index} from={msg.from} text={msg.text} />
        ))}
      </div>
      <InputBox onSend={handleSend} isFirstMessage={messages.length === 0} />
    </div>
  )
}

export default ChatWindow
