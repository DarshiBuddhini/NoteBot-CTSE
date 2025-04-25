import React, { useState } from 'react';
import { Input, Button } from 'antd';

const { TextArea } = Input;

const InputBox = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div style={{ padding: '10px', display: 'flex' }}>
      <TextArea
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onPressEnter={(e) => {
          if (!e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Type your question..."
      />
      <Button type="primary" onClick={handleSend} style={{ marginLeft: '10px' }}>
        Send
      </Button>
    </div>
  );
};

export default InputBox;
