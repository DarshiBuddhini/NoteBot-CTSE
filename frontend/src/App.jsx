import React, { useState, useEffect } from 'react'
import { Switch } from 'antd';
import { ConfigProvider, Layout, theme, Typography, Button, Dropdown, Menu, Select, Space, Divider, Tooltip, Badge } from 'antd'
import {
  BulbOutlined,
  BulbFilled,
  MenuOutlined,
  GithubOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
  SendOutlined,
  PlusOutlined,
  DeleteOutlined,
  HistoryOutlined,
  SettingOutlined
} from '@ant-design/icons'
import ChatWindow from './components/ChatWindow'

const { defaultAlgorithm, darkAlgorithm } = theme
const { Title, Text } = Typography
const { Option } = Select

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [selectedLecture, setSelectedLecture] = useState(null)
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setCollapsed(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const lectures = [
  { number: 1, title: "Lecture 1 - Part 1 - Intro to DevOps and Beyond" },
  { number: 2, title: "Lecture 1 - Part 2 - Containers 101" },
  { number: 3, title: "Lecture 2 - Part 1" },
  { number: 4, title: "Lecture 2 - Part 2" },
  { number: 5, title: "Lecture 3 - Part 1 - Introduction to AWS Cloud Platform" },
  { number: 6, title: "Lecture 3 - Part 2 - Cloud Computing 101" },
  { number: 7, title: "Lecture 4 - Part 1 - CAP Theorem" },
  { number: 8, title: "Lecture 4 - Part 2 - Cloud Computing Concepts" },
  { number: 9, title: "Lecture 4 - Part 3 - Key Essentials for Building Application" },
  { number: 10, title: "Lecture 5 - Part 1 - Introduction to Microservices" },
  { number: 11, title: "Lecture 5 - Part 2 - Microservice Design Patterns" },
  { number: 12, title: "Lecture 07 - Introduction to AI ML" },
  { number: 13, title: "Lecture 7 ML - Part 1" },
  { number: 14, title: "Lecture 7 - ML - Part 2 - LLM" }
];

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: 'Documentation',
          icon: <FileTextOutlined />,
          onClick: () => window.open('/docs', '_blank')
        },
        {
          key: '2',
          label: 'GitHub Repository',
          icon: <GithubOutlined />,
          onClick: () => window.open('https://github.com/DarshiBuddhini/NoteBot-CTSE', '_blank')
        },
        {
          key: '3',
          label: 'Help & Support',
          icon: <QuestionCircleOutlined />,
          onClick: () => window.open('/support', '_blank')
        }
      ]}
    />
  )

  const handleNewChat = () => {
    const newConversation = {
      id: Date.now(),
      title: `New Chat ${conversations.length + 1}`,
      createdAt: new Date(),
      messages: []
    }
    setConversations([newConversation, ...conversations])
    setActiveConversation(newConversation.id)
    setSelectedLecture(null)
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: darkMode ? '#1890ff' : '#1677ff',
          borderRadius: 8,
        },
        components: {
          Layout: {
            headerBg: darkMode ? '#141414' : '#1677ff',
            bodyBg: darkMode ? '#1f1f1f' : '#f5f5f5',
          },
          Button: {
            defaultBg: darkMode ? '#333' : '#fff',
          }
        }
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '0 1rem' : '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ color: 'white' }}
              />
            )}
            <Title level={4} style={{ color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="brain">🧠</span> CTSE NoteBot
            </Title>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
              {darkMode ? <BulbFilled /> : <BulbOutlined />}
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                style={{ marginLeft: 8 }}
              />
            </div>



            <Dropdown menu={menu} placement="bottomRight">
              <Button
                type="text"
                icon={<SettingOutlined />}
                style={{ color: 'white' }}
              />
            </Dropdown>
          </div>
        </Layout.Header>

        <Layout>
          {!isMobile && (
            <Layout.Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              width={250}
              style={{
                background: darkMode ? '#141414' : '#fff',
                borderRight: darkMode ? '1px solid #303030' : '1px solid #f0f0f0'
              }}
            >
              <div style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleNewChat}
                  style={{ marginBottom: '1rem' }}
                >
                  New Chat
                </Button>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <Text strong style={{ color: darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)' }}>
                    Recent Conversations
                  </Text>
                  <Menu
                    mode="inline"
                    selectedKeys={activeConversation ? [activeConversation.toString()] : []}
                    style={{ border: 'none', background: 'transparent' }}
                    items={conversations.map(conv => ({
                      key: conv.id,
                      label: (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text ellipsis>{conv.title}</Text>
                          <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              setConversations(conversations.filter(c => c.id !== conv.id))
                              if (activeConversation === conv.id) {
                                setActiveConversation(null)
                              }
                            }}
                          />
                        </div>
                      ),
                      icon: <HistoryOutlined />,
                      onClick: () => setActiveConversation(conv.id)
                    }))}
                  />
                </div>
              </div>
            </Layout.Sider>
          )}

          <Layout.Content style={{
            padding: isMobile ? '1rem' : '2rem',
            background: darkMode ? '#1f1f1f' : '#f5f5f5'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Text strong style={{ fontSize: '1.2rem' }}>
                  {activeConversation ?
                    conversations.find(c => c.id === activeConversation)?.title :
                    "New Conversation"}
                </Text>
                <Select
                  placeholder="Select CTSE Lecture"
                  style={{ width: 300 }}
                  value={selectedLecture}
                  onChange={setSelectedLecture}
                  optionLabelProp="label"
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
              </div>

              <ChatWindow
                darkMode={darkMode}
                selectedLecture={selectedLecture}
                style={{ flex: 1 }}
              />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default App