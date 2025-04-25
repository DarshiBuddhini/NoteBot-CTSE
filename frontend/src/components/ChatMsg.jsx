import React from 'react'
import { Avatar } from 'antd'

const ChatMsg = ({ sender, text }) => {
  const isUser = sender === 'user'

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '12px',
        alignItems: 'flex-start',
      }}
    >
      {!isUser && <Avatar style={{ marginRight: 8, backgroundColor: '#1677ff' }}>B</Avatar>}
      <div
        style={{
          maxWidth: '75%',
          background: isUser ? '#4ade80' : '#334155',
          color: isUser ? '#000' : '#fff',
          padding: '10px 14px',
          borderRadius: '16px',
          borderTopLeftRadius: isUser ? '16px' : '4px',
          borderTopRightRadius: isUser ? '4px' : '16px',
          fontSize: '15px',
          lineHeight: '1.5',
        }}
      >
        {text}
      </div>
      {isUser && <Avatar style={{ marginLeft: 8, backgroundColor: '#22c55e' }}>U</Avatar>}
    </div>
  )
}

export default ChatMsg
