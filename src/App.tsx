import { BrowserRouter as Router } from 'react-router-dom'

import Layout from '@/layout'
import Routings from '@/router/Routings'
import { AuthProvider } from '@/context/AuthContext'
import { CategoryProvider } from '@/context/CategoryContext'

const App = () => (
  <Router>
    <AuthProvider>
      <CategoryProvider>
        <Layout>
          <Routings />
        </Layout>
      </CategoryProvider>
    </AuthProvider>
  </Router>
)

export default App
