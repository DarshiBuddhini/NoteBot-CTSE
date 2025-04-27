import React, { useState, useEffect } from 'react'
import { ConfigProvider, Switch, Layout, theme, Typography, Button, Dropdown, Menu } from 'antd'
import { 
  BulbOutlined, 
  BulbFilled, 
  MenuOutlined, 
  GithubOutlined,
  QuestionCircleOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import ChatWindow from './components/ChatWindow'

const { defaultAlgorithm, darkAlgorithm } = theme
const { Title } = Typography

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check user's preferred color scheme
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

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
          onClick: () => window.open('https://github.com/your-repo', '_blank')
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
            
            <Dropdown overlay={menu} placement="bottomRight">
              <Button 
                type="text" 
                icon={<MenuOutlined />} 
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
              {/* Add sidebar content here */}
              <div style={{ padding: '1rem' }}>
                <h3 style={{ color: darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)' }}>
                  {collapsed ? '...' : 'Chat History'}
                </h3>
                {/* Add chat history list here */}
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
              height: '100%'
            }}>
              <ChatWindow darkMode={darkMode} />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default App