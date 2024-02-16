/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import type { PathRouteProps } from 'react-router-dom'

const Home = React.lazy(() => import('@/pages/home'))
const SignIn = React.lazy(() => import('@/pages/signin'))
const SignUp = React.lazy(() => import('@/pages/signup'))
const Category = React.lazy(() => import('@/pages/category'))
const Brand = React.lazy(() => import('@/pages/brand'))
const ProductDetail = React.lazy(() => import('@/pages/product-detail'))
const Cart = React.lazy(() => import('@/pages/cart'))
const MyAccount = React.lazy(() => import('@/pages/my-account'))

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
    path: '/product/:slug',
    element: <ProductDetail />,
  },
]

export const protectedRoutes: Array<PathRouteProps> = [
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/my-account',
    element: <MyAccount />,
  },
]
