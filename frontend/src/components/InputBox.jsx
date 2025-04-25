import React, { useState } from 'react'
import { Input, Button } from 'antd'

const InputBox = ({ onSend, isFirstMessage }) => {
  const [value, setValue] = useState('')

  const handleSend = () => {
    if (!value.trim()) return
    onSend(value)
    setValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const containerStyle = isFirstMessage
    ? {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: 'transparent',
      }
    : {
        padding: '1rem',
        borderTop: '1px solid #d9d9d9',
        backgroundColor: 'transparent',
      }

  const inputStyle = {
    width: isFirstMessage ? '100%' : '100%',
    maxWidth: '800px',
    borderRadius: '10px',
  }

  return (
    <div style={containerStyle}>
      <Input.TextArea
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your question..."
        autoSize={{ minRows: 1, maxRows: 6 }}
        style={inputStyle}
      />
      <Button type="primary" onClick={handleSend} style={{ marginTop: '0.5rem' }}>
        Send
      </Button>
    </div>
  )
}

export default InputBox
