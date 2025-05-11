import React, { useState, useEffect, useRef } from 'react';
import ChatMsg from './ChatMsg';
import InputBox from './InputBox';
import { Button, Space, Typography, Card, Divider, message } from 'antd';
import { SendOutlined, FileTextOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ChatWindow = ({ darkMode, selectedLecture, onLectureChange }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (msg) => {
    try {
      setLoading(true);
      const userMessage = { 
        from: 'user', 
        text: msg,
        timestamp: new Date().toISOString(),
        lecture: selectedLecture
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      const requestBody = {
        question: msg,
        history: messages
          .filter(m => m.from === 'user' || m.from === 'bot')
          .map(m => ({
            role: m.from === 'user' ? 'user' : 'assistant',
            content: m.text
          }))
      };

      const response = await fetch(' http://localhost:5000/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const botMessage = { 
        from: 'bot', 
        text: data.answer,
        timestamp: new Date().toISOString(),
        sources: [
          { title: "CTSE Textbook", page: "N/A" }
        ]
      };
      
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    } catch (err) {
      console.error('API call failed:', err);
      message.error('Failed to get response from server');
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      background: darkMode ? '#1f1f1f' : '#f5f5f5',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {messages.length === 0 ? (
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <Title level={3} style={{ color: darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)' }}>
            CTSE NoteBot Assistant
          </Title>
          <Text type="secondary" style={{ marginBottom: '2rem', maxWidth: '600px' }}>
            Ask me anything about the CTSE lectures. I can help explain concepts, 
            summarize content, and provide additional resources.
          </Text>
          
          <Space wrap style={{ marginBottom: '2rem' }}>
            <Card 
              size="small" 
              hoverable
              onClick={() => handleSend("Summarize the key points from the last lecture")}
              style={{ width: 200 }}
            >
              <Text strong>📝 Summary</Text>
              <Text type="secondary" style={{ display: 'block' }}>Get lecture summary</Text>
            </Card>
            <Card 
              size="small" 
              hoverable
              onClick={() => handleSend("Explain the software development lifecycle")}
              style={{ width: 200 }}
            >
              <Text strong>🤔 Explain</Text>
              <Text type="secondary" style={{ display: 'block' }}>Explain a concept</Text>
            </Card>
            <Card 
              size="small" 
              hoverable
              onClick={() => handleSend("Provide examples of requirements engineering")}
              style={{ width: 200 }}
            >
              <Text strong>🔍 Examples</Text>
              <Text type="secondary" style={{ display: 'block' }}>Request examples</Text>
            </Card>
          </Space>
        </div>
      ) : (
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '1rem',
          background: darkMode ? '#1f1f1f' : '#fff',
          borderRadius: '8px 8px 0 0'
        }}>
          {selectedLecture && (
            <div style={{ 
              marginBottom: '1rem',
              padding: '0.5rem 1rem',
              background: darkMode ? '#2a2a2a' : '#f0f0f0',
              borderRadius: '4px'
            }}>
              <Text strong>Lecture {selectedLecture}: {
                [
                  "Introduction to Software Engineering",
                  "Requirements Engineering",
                  "System Modeling",
                  "Architectural Design",
                  "Design and Implementation",
                  "Software Testing",
                  "Software Evolution",
                  "Project Management"
                ][selectedLecture - 1]
              }</Text>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <React.Fragment key={index}>
              <ChatMsg 
                from={msg.from} 
                text={msg.text} 
                darkMode={darkMode}
                timestamp={msg.timestamp}
                sources={msg.sources}
                isLoading={loading && index === messages.length - 1 && msg.from === 'bot'}
              />
              {index < messages.length - 1 && <Divider style={{ margin: '8px 0' }} />}
            </React.Fragment>
          ))}
          {loading && messages[messages.length - 1]?.from !== 'bot' && (
            <ChatMsg from="bot" text="" darkMode={darkMode} isLoading={true} />
          )}
          {error && <div className="error-message">{error}</div>}
          <div ref={messagesEndRef} />
        </div>
      )}
      
      <InputBox 
        onSend={handleSend} 
        disabled={loading}
        darkMode={darkMode}
        selectedLecture={selectedLecture}
        onLectureChange={onLectureChange}
      />
    </div>
  );
};

export default ChatWindow;