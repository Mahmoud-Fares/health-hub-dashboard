import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ErrorBoundary from '@/shared/components/error-boundary';

const MainLayout = lazy(() => import('@/app/layouts/main-layout'));
const AdminLayout = lazy(() => import('@/app/layouts/admin-layout'));
const AuthLayout = lazy(() => import('@/app/layouts/auth-layout'));

const Home = lazy(() => import('@/app/pages/home'));
const Login = lazy(() => import('@/app/pages/login'));

const Products = lazy(() => import('@/app/pages/products'));
const Categories = lazy(() => import('@/app/pages/categories'));
const Orders = lazy(() => import('@/app/pages/orders'));
const Specialties = lazy(() => import('@/app/pages/specialties'));
const Doctors = lazy(() => import('@/app/pages/doctors'));

const NotFound = lazy(() => import('@/app/pages/not-found'));

export const router = createBrowserRouter([
   {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorBoundary />,
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: '*',
            element: <NotFound />,
         },
      ],
   },
   // Protected routes group
   {
      path: '/',
      element: <AdminLayout />,
      errorElement: <ErrorBoundary />,
      children: [
         {
            path: 'product',
            element: <Products />,
         },
         {
            path: 'category',
            element: <Categories />,
         },
         {
            path: 'order',
            element: <Orders />,
         },
         {
            path: 'specialty',
            element: <Specialties />,
         },
         {
            path: 'doctors',
            element: <Doctors />,
         },
      ],
   },

   // Auth routes group
   {
      path: '/',
      element: <AuthLayout />,
      errorElement: <ErrorBoundary />,
      children: [
         {
            path: 'login',
            element: <Login />,
         },
      ],
   },
]);
