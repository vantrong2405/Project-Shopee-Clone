import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterLayout from './layouts/RegisterLayout';
import MainLayout from './layouts/MainLayout';

const authenicated = true
const protectedAuthenicated = () => {
  return authenicated ? <Outlet /> : <Navigate to='/login' />
}

const rejectAuthenicated = () => {
  return !authenicated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouterElement() {
  let routerElement = useRoutes([
    {
      path: '',
      element: protectedAuthenicated(),
      children: [
        {
          path: '/',
          element:
            <MainLayout>
              <ProductList />
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
