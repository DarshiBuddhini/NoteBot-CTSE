import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Avatar, Typography, Space, Tag, Tooltip } from 'antd';
import { UserOutlined, RobotOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const { Text } = Typography;

const lightTheme = {
  plain: {
    color: '#393A34',
    backgroundColor: '#f6f8fa',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#999988',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#e3116c',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#393A34',
      },
    },
    {
      types: ['entity', 'url', 'symbol', 'number', 'boolean', 'variable', 'constant', 'property', 'regex', 'inserted'],
      style: {
        color: '#36acaa',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: '#00a4db',
      },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: '#d73a49',
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: '#6f42c1',
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: '#00009f',
      },
    },
  ],
};

const darkTheme = {
  plain: {
    color: '#f8f8f2',
    backgroundColor: '#282a36',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#6272a4',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#f8f8f2',
      },
    },
    {
      types: ['property', 'tag', 'constant', 'symbol', 'deleted'],
      style: {
        color: '#ff79c6',
      },
    },
    {
      types: ['boolean', 'number'],
      style: {
        color: '#bd93f9',
      },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: {
        color: '#50fa7b',
      },
    },
    {
      types: ['operator', 'entity', 'url', 'variable'],
      style: {
        color: '#f8f8f2',
      },
    },
    {
      types: ['atrule', 'attr-value', 'function'],
      style: {
        color: '#f1fa8c',
      },
    },
    {
      types: ['keyword'],
      style: {
        color: '#8be9fd',
      },
    },
    {
      types: ['regex', 'important'],
      style: {
        color: '#ffb86c',
      },
    },
  ],
};

const ChatMsg = ({ from, text, darkMode, timestamp, sources, isLoading }) => {
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const isUser = from === 'user';

  useEffect(() => {
    if (isUser || isLoading) {
      setDisplayText(text || '');
      return;
    }
    
    setTyping(true);
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setTyping(false);
      }
    }, 10);

    return () => clearInterval(typingInterval);
  }, [text, isUser, isLoading]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-start', 
        marginBottom: '12px',
        gap: '8px'
      }}>
        <Avatar 
          icon={<RobotOutlined />} 
          style={{ 
            backgroundColor: darkMode ? '#1890ff' : '#1677ff',
            color: '#fff'
          }} 
        />
        <div style={{ 
          background: darkMode ? '#2a2a2a' : '#f5f5f5',
          color: darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)',
          padding: '12px 16px',
          borderRadius: '18px',
          borderTopLeftRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{ 
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: darkMode ? '#8be9fd' : '#1677ff',
            animation: 'pulse 1.5s infinite'
          }} />
          <div style={{ 
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: darkMode ? '#8be9fd' : '#1677ff',
            animation: 'pulse 1.5s infinite 0.3s'
          }} />
          <div style={{ 
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: darkMode ? '#8be9fd' : '#1677ff',
            animation: 'pulse 1.5s infinite 0.6s'
          }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: isUser ? 'flex-end' : 'flex-start', 
      marginBottom: '12px',
      gap: '8px'
    }}>
      {!isUser && (
        <Avatar 
          icon={<RobotOutlined />} 
          style={{ 
            backgroundColor: darkMode ? '#1890ff' : '#1677ff',
            color: '#fff'
          }} 
        />
      )}
      
      <div style={{ maxWidth: '80%', minWidth: '200px' }}>
        <div style={{
          background: isUser 
            ? (darkMode ? '#1890ff' : '#1677ff') 
            : (darkMode ? '#2a2a2a' : '#f5f5f5'),
          color: isUser ? '#fff' : (darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)'),
          padding: '12px 16px',
          borderRadius: '18px',
          borderTopLeftRadius: isUser ? '18px' : '4px',
          borderTopRightRadius: isUser ? '4px' : '18px',
          position: 'relative'
        }}>
          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <div style={{ position: 'relative' }}>
                    <CopyToClipboard text={String(children).replace(/\n$/, '')} onCopy={handleCopy}>
                      <button style={{
                        position: 'absolute',
                        right: '8px',
                        top: '8px',
                        background: 'rgba(0,0,0,0.2)',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px',
                        cursor: 'pointer',
                        color: '#fff',
                        zIndex: 1
                      }}>
                        {copied ? <CheckOutlined /> : <CopyOutlined />}
                      </button>
                    </CopyToClipboard>
                    <SyntaxHighlighter
                      language={match[1]}
                      style={darkMode ? darkTheme : lightTheme}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {displayText}
          </ReactMarkdown>
          
          {typing && !isLoading && (
            <div style={{ 
              display: 'inline-block',
              marginLeft: '8px',
              verticalAlign: 'middle'
            }}>
              <span style={{ animation: 'blink 1s infinite' }}>●</span>
              <span style={{ animation: 'blink 1s infinite 0.2s', marginLeft: '4px' }}>●</span>
              <span style={{ animation: 'blink 1s infinite 0.4s', marginLeft: '4px' }}>●</span>
            </div>
          )}
          
          <div style={{ 
            textAlign: 'right',
            marginTop: '4px'
          }}>
            <Text type="secondary" style={{ 
              fontSize: '0.75rem',
              color: isUser ? 'rgba(255,255,255,0.6)' : (darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)')
            }}>
              {timestamp && new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </div>
        </div>
        
        {!isUser && sources && sources.length > 0 && (
          <div style={{ marginTop: '8px' }}>
            <Text type="secondary" style={{ fontSize: '0.75rem' }}>Sources:</Text>
            <Space size={[4, 8]} wrap style={{ marginTop: '4px' }}>
              {sources.map((source, index) => (
                <Tooltip key={index} title={source.title}>
                  <Tag color={darkMode ? 'blue' : 'geekblue'}>
                    {source.page ? `p.${source.page}` : `slide ${source.slide}`}
                  </Tag>
                </Tooltip>
              ))}
            </Space>
          </div>
        )}
      </div>
      
      {isUser && (
        <Avatar 
          icon={<UserOutlined />} 
          style={{ 
            backgroundColor: darkMode ? '#22c55e' : '#4ade80',
            color: '#fff'
          }} 
        />
      )}
    </div>
  );
};

export default ChatMsg;