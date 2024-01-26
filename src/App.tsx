import { BrowserRouter as Router } from 'react-router-dom'

import Layout from '@/layout'
import Routings from '@/router/Routings'
import { AuthProvider } from '@/context/AuthContext'

const App = () => (
  <Router>
    <AuthProvider>
      <Layout>
        <Routings />
      </Layout>
    </AuthProvider>
  </Router>
)

export default App
