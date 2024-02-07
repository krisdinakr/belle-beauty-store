import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/layout'
import { protectedRoutes, routes } from './router/routes'
import RequiredAuth from './router/RequiredAuth'

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
          {protectedRoutes.map((routeProps) => (
            <Route
              {...routeProps}
              key={routeProps.path as string}
            />
          ))}
        </Route>
      </Route>
    </Routes>
  </Suspense>
)

export default App
