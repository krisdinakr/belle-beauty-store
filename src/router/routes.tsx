import React from 'react'
import type { PathRouteProps } from 'react-router-dom'

const Home = React.lazy(() => import('@/pages/home'))
const Login = React.lazy(() => import('@/pages/login'))

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/sign-in',
    element: <Login />,
  },
]
