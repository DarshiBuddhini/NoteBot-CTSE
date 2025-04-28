import React, { useState,useRef } from 'react'
import { Input, Button, Select, Space, Tooltip, Badge } from 'antd'
import { SendOutlined, FileTextOutlined, PlusOutlined } from '@ant-design/icons'
import { Typography } from 'antd';
const { Text } = Typography;
const { TextArea } = Input
const { Option } = Select

const InputBox = ({ onSend, disabled, darkMode, selectedLecture }) => {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textAreaRef = useRef(null)

  const lectures = [
    { number: 1, title: "Introduction to Software Engineering" },
    { number: 2, title: "Requirements Engineering" },
    { number: 3, title: "System Modeling" },
    { number: 4, title: "Architectural Design" },
    { number: 5, title: "Design and Implementation" },
    { number: 6, title: "Software Testing" },
    { number: 7, title: "Software Evolution" },
    { number: 8, title: "Project Management" },
  ]

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

  const containerStyle = {
    padding: '1rem',
    borderTop: `1px solid ${darkMode ? '#303030' : '#d9d9d9'}`,
    backgroundColor: darkMode ? '#1f1f1f' : '#fff',
    borderRadius: '0 0 8px 8px'
  }

  const inputStyle = {
    width: '100%',
    borderRadius: '18px',
    padding: '12px 16px',
    backgroundColor: darkMode ? '#2a2a2a' : '#f5f5f5',
    borderColor: isFocused ? (darkMode ? '#1890ff' : '#1677ff') : 'transparent',
    boxShadow: isFocused ? `0 0 0 2px ${darkMode ? 'rgba(24, 144, 255, 0.2)' : 'rgba(22, 119, 255, 0.2)'}` : 'none',
    resize: 'none',
    transition: 'all 0.3s'
  }

  return (
    <div style={containerStyle}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        marginBottom: '8px'
      }}>
        <Select
          placeholder="Select Lecture"
          style={{ width: 200 }}
          value={selectedLecture}
          optionLabelProp="label"
          disabled={disabled}
        >
          {lectures.map(lecture => (
            <Option key={lecture.number} value={lecture.number} label={`Lecture ${lecture.number}`}>
              <Space>
                <Badge count={lecture.number} style={{ backgroundColor: darkMode ? '#1890ff' : '#1677ff' }} />
                <span>{lecture.title}</span>
              </Space>
            </Option>
          ))}
        </Select>
        
        <Tooltip title="Attach file">
          <Button 
            icon={<FileTextOutlined />} 
            shape="circle" 
            disabled={disabled}
          />
        </Tooltip>
      </div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end',
        gap: '8px'
      }}>
        <TextArea
          ref={textAreaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about CTSE..."
          autoSize={{ minRows: 1, maxRows: 6 }}
          style={inputStyle}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
        />
        
        <Button 
          type="primary" 
          icon={<SendOutlined />} 
          onClick={handleSend}
          style={{ 
            height: '40px', 
            width: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          disabled={!value.trim() || disabled}
        />
      </div>
      
      <div style={{ 
        marginTop: '8px',
        textAlign: 'center'
      }}>
        <Text type="secondary" style={{ fontSize: '0.8rem' }}>
          CTSE NoteBot may produce inaccurate information. Verify critical information.
        </Text>
      </div>
    </div>
  )
}

export default InputBox