import React from 'react';
import { Comment, Avatar } from 'antd';

const ChatMsg = ({ sender, text }) => {
  const isUser = sender === 'user';
  return (
    <Comment
      author={isUser ? 'You' : 'CTSE Bot'}
      avatar={
        <Avatar
          style={{ backgroundColor: isUser ? '#87d068' : '#1890ff' }}
        >
          {isUser ? 'U' : 'B'}
        </Avatar>
      }
      content={<p>{text}</p>}
      style={{ textAlign: isUser ? 'right' : 'left' }}
    />
  );
};

export default ChatMsg;
