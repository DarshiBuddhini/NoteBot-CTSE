import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import Message from './ChatMsg';
import InputBox from './InputBox';

const { Header, Content } = Layout;
const { Title } = Typography;

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
    const userMessage = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <Title style={{ color: 'white', margin: 0 }} level={3}>
          CTSE Lecture Chatbot
        </Title>
      </Header>
      <Content style={{ padding: '20px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
      </Content>
      <InputBox onSend={handleSend} />
    </Layout>
  );
};

export default ChatWindow;
