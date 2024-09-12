import  { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import { themeContext } from './context/app.context'
import Profile from './pages/User/pages/Profile'
import path from './constants/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'
import UserLayout from './layouts/UserLayout'
import ChangePassword from './pages/User/pages/ChangePassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchase'
import NotFound from './pages/NotFound'

const ProtectedRoute = () => {
  const { isAuthenicated } = useContext(themeContext)
  return isAuthenicated ? <Outlet /> : <Navigate to={path.login} />
}

const RejectedRoute = () => {
  const { isAuthenicated } = useContext(themeContext)
  return !isAuthenicated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
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
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            },
          ]
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path : '*',
      element :(
        <MainLayout>
          <NotFound/>
        </MainLayout>
      )
    }
  ])
  return routeElements
}
