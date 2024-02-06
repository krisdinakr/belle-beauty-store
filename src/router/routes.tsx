import React from 'react'
import type { PathRouteProps } from 'react-router-dom'

const Home = React.lazy(() => import('@/pages/home'))
const SignIn = React.lazy(() => import('@/pages/signin'))
const SignUp = React.lazy(() => import('@/pages/signup'))
const Category = React.lazy(() => import('@/pages/category'))
const Brand = React.lazy(() => import('@/pages/brand'))
const ProductDetail = React.lazy(() => import('@/pages/product-detail'))

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
  {
    path: '/brand/:slug',
    element: <Brand />,
  },
  {
    path: '/:slug',
    element: <ProductDetail />,
  },
]
