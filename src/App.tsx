import { BrowserRouter as Router } from 'react-router-dom'

import Layout from '@/layout'
import Routings from '@/router/Routings'
import { AuthProvider } from '@/context/AuthContext'
import { NavigationProvider } from '@/context/NavigationContext'

const App = () => (
  <Router>
    <AuthProvider>
      <NavigationProvider>
        <Layout>
          <Routings />
        </Layout>
      </NavigationProvider>
    </AuthProvider>
  </Router>
)

export default App
