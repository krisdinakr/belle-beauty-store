import React from 'react'
import type { PathRouteProps } from 'react-router-dom'

const Home = React.lazy(() => import('@/pages/home'))
const SignIn = React.lazy(() => import('@/pages/signin'))
const SignUp = React.lazy(() => import('@/pages/signup'))
const Category = React.lazy(() => import('@/pages/category'))

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/category/:slug',
    element: <Category />,
  },
]
