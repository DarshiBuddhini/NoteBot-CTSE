import React, { useState } from 'react'
import { ConfigProvider, Switch, Layout, theme } from 'antd'
import ChatWindow from './components/ChatWindow'

const { defaultAlgorithm, darkAlgorithm } = theme

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: 'white', margin: 0 }}>🧠 CTSE NoteBot</h1>
          <div style={{ color: 'white' }}>
            <span style={{ marginRight: 8 }}>Dark Mode</span>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </div>
        </Layout.Header>
        <Layout.Content style={{ padding: '1rem' }}>
          <ChatWindow />
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
