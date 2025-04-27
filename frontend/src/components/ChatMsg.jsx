import React, { useState,useEffect } from 'react'
import { Avatar } from 'antd'

// const ChatMsg = ({ sender, text }) => {
//   const isUser = sender === 'user'

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: isUser ? 'flex-end' : 'flex-start',
//         marginBottom: '12px',
//         alignItems: 'flex-start',
//       }}
//     >
//       {!isUser && <Avatar style={{ marginRight: 8, backgroundColor: '#1677ff' }}>B</Avatar>}
//       <div
//         style={{
//           maxWidth: '75%',
//           background: isUser ? '#4ade80' : '#334155',
//           color: isUser ? '#000' : '#fff',
//           padding: '10px 14px',
//           borderRadius: '16px',
//           borderTopLeftRadius: isUser ? '16px' : '4px',
//           borderTopRightRadius: isUser ? '4px' : '16px',
//           fontSize: '15px',
//           lineHeight: '1.5',
//         }}
//       >
//         {text}
//       </div>
//       {isUser && <Avatar style={{ marginLeft: 8, backgroundColor: '#22c55e' }}>U</Avatar>}
//     </div>
//   )
// }
// Add typing animation and markdown support
import ReactMarkdown from 'react-markdown'
import { Typography } from 'antd'

const { Text } = Typography

const ChatMsg = ({ sender, text }) => {
  const isUser = sender === 'user'
  const [displayText, setDisplayText] = useState('')
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (isUser) {
      setDisplayText(text)
      return
    }
    
    // Simulate typing effect for bot messages
    setTyping(true)
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
        setTyping(false)
      }
    }, 20)

    return () => clearInterval(typingInterval)
  }, [text, isUser])

  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
      {!isUser && <Avatar style={{ marginRight: 8 }}>B</Avatar>}
      <div style={{ maxWidth: '75%' }}>
        <div style={{
          background: isUser ? '#4ade80' : '#334155',
          color: isUser ? '#000' : '#fff',
          padding: '10px 14px',
          borderRadius: '16px',
          borderTopLeftRadius: isUser ? '16px' : '4px',
          borderTopRightRadius: isUser ? '4px' : '16px',
        }}>
          <ReactMarkdown>{displayText}</ReactMarkdown>
          {typing && <Text type="secondary">...</Text>}
        </div>
      </div>
      {isUser && <Avatar style={{ marginLeft: 8 }}>U</Avatar>}
    </div>
  )
}
export default ChatMsg
