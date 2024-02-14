import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { lazy, Suspense, useEffect, useState } from "react"
import Loader from "./components/loading/Loading"
import { jwtDecode } from 'jwt-decode'

// LayOuts
import RootLayout from "./layouts/RootLayout"
import AdminLayout from "./layouts/AdminLayout"

// Pages
const Home = lazy(() => import("./pages/home/Home"))
const Tests = lazy(() => import('./pages/tests/Tests'))
const Login = lazy(() => import('./pages/login/Login'))
const AuthorTest = lazy(() => import('./pages/authorTest/AuthorTest'))
const ErrorPage = lazy(() => import('./pages/error/ErrorPage'))
const Admin = lazy(() => import("./pages/admin/Admin"))
const Users = lazy(() => import("./pages/admin/Users"))
const AdminTests = lazy(() => import("./pages/admin/AdminTests"))

export default function App() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setUserData(jwtDecode(localStorage.getItem('token')))
    }
  }, [])


  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          )
        },
        {
          path: '/tests',
          element: (
            <Suspense fallback={<Loader />}>
              <Tests />
            </Suspense>
          )
        },
        {
          path: '/login',
          element: (
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          )
        },
        {
          path: '/authors/:authorId/tests',
          element: (
            <Suspense fallback={<Loader />}>
              <AuthorTest />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '/admin',
      element: userData?.admin && <AdminLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loader />}>
              <Admin />
            </Suspense>
          )
        },
        {
          path: '/admin/users',
          element: (
            <Suspense fallback={<Loader />}>
              <Users />
            </Suspense>
          )
        },
        {
          path: '/admin/tests',
          element: (
            <Suspense fallback={<Loader />}>
              <AdminTests />
            </Suspense>
          )
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}