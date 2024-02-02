import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { lazy, Suspense } from "react"

// LayOuts
import RootLayout from "./layouts/RootLayout"

// Pages
const Home = lazy(() => import("./pages/home/Home"))
const Tests = lazy(() => import('./pages/tests/Tests'))
const Login = lazy(() => import('./pages/login/Login'))
const AuthorTest = lazy(() => import('./pages/authorTest/AuthorTest'))

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<p>loading...</p>}>
              <Home />
            </Suspense>
          )
        },
        {
          path: '/tests',
          element: (
            <Suspense fallback={<p>loading...</p>}>
              <Tests />
            </Suspense>
          )
        },
        {
          path: '/login',
          element: (
            <Suspense fallback={<p>loading...</p>}>
              <Login />
            </Suspense>
          )
        },
        {
          path: '/authors/:authorId/tests',
          element: (
            <Suspense fallback={<p>loading...</p>}>
              <AuthorTest />
            </Suspense>
          )
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}