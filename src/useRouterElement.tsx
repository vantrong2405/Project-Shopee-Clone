import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterLayout from './layouts/RegisterLayout';
import MainLayout from './layouts/MainLayout';
import { themeContext } from './context/app.context';
import Profile from './Components/Profile';


const protectedAuthenicated = () => {
  const { isAuthenicated } = useContext(themeContext)
  return isAuthenicated ? <Outlet /> : <Navigate to='/login' />
}

const rejectAuthenicated = () => {
  const { isAuthenicated } = useContext(themeContext)
  return !isAuthenicated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouterElement() {
  let routerElement = useRoutes([
    {
      path: '/',
      element:
        <MainLayout>
          <ProductList />
        </MainLayout>
    },
    {
      path: '',
      element: protectedAuthenicated(),
      children: [

        {
          path: '/profile',
          element:
            <MainLayout>
              <Profile />
            </MainLayout>
        },
      ]
    },
    {
      path: '',
      element: rejectAuthenicated(),
      children: [
        {
          path: '/login',
          element:
            <RegisterLayout>
              <Login />
            </RegisterLayout >
        },
        {
          path: '/register',
          element:
            <RegisterLayout>
              <Register />
            </RegisterLayout>
        },
      ]
    }

  ]);
  return routerElement
}
