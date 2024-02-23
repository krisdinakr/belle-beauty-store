import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/layout'
import { protectedRoutes, routes } from './router/routes'
import RequiredAuth from './router/RequiredAuth'
import AccountLayout from './pages/account-layout'
const PageNotFound = React.lazy(() => import('@/pages/page-not-found'))
const Checkout = React.lazy(() => import('@/pages/checkout'))

const App = () => (
  <Suspense>
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        {/* public route */}
        {routes.map((routeProps) => (
          <Route
            {...routeProps}
            key={routeProps.path as string}
          />
        ))}

        {/* required auth route */}
        <Route element={<RequiredAuth />}>
          {protectedRoutes.map((routeProps) => {
            if (routeProps.path === '/cart') {
              return (
                <Route
                  {...routeProps}
                  key={routeProps.path as string}
                />
              )
            }

            return (
              <Route
                element={<AccountLayout />}
                key={routeProps.path as string}
              >
                <Route {...routeProps} />
              </Route>
            )
          })}
        </Route>

        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Route>

      <Route
        path="/"
        element={<RequiredAuth />}
      >
        <Route
          path="checkout"
          element={<Checkout />}
        />
      </Route>
    </Routes>
  </Suspense>
)

export default App
