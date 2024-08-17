// useRouterElement.tsx
import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import { themeContext } from './context/app.context'
import Profile from './Components/Profile'
import path from './constants/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

const protectedAuthenicated = () => {
  const { isAuthenicated } = useContext(themeContext)
  return isAuthenicated ? <Outlet /> : <Navigate to={path.login} />
}

const rejectAuthenicated = () => {
  const { isAuthenicated } = useContext(themeContext)
  return !isAuthenicated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouterElement() {
  let routerElement = useRoutes([
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: path.home,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: protectedAuthenicated(),
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: path.cart,
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        },
      ]
    },
    {
      path: '',
      element: rejectAuthenicated(),
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routerElement
}
