import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Navigate, RouterProvider, createBrowserRouter } from 'react-router'

import { AuthProvider } from './AuthProvider.jsx'
import { roles, users } from './data/data.js'
import { fetchUsers } from './loaderUtils/usersLoader.js'
const App = lazy(() => import('./App.jsx'))
const Home = lazy(() => import('./Pages/Home.jsx'))
const Contact = lazy(() => import('./Pages/Contact.jsx'))
const About = lazy(() => import('./Pages/About.jsx'))
const NotFound = lazy(() => import('./Pages/NotFound.jsx'))
const RedirectPage = lazy(() => import('./Pages/RedirectPage.jsx'))
const DashLayout = lazy(() => import('./Layout/DashLayout.jsx'))
const Profile = lazy(() => import('./Components/Profile.jsx'))
const Setting = lazy(() => import('./Components/Setting.jsx'))
const ProtectedRoute = lazy(() => import('./Pages/ProtectedRoute.jsx'))
const Login = lazy(() => import('./Components/Login.jsx'))
const RoleList = lazy(() => import('RoleCard/RoleList'))
const UserList = lazy(() => import('UserCard/UserList'))

// the router itself controls data fetching, mutations, loading states, and error handling instead of components doing everything.
const router = createBrowserRouter([  //it defines the router
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
                loader: fetchUsers
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'home',
                element: <RedirectPage />
            },
            {
                path: 'dashboard',
                element:
                    <ProtectedRoute>
                        <DashLayout />
                    </ProtectedRoute>,
                children: [
                    {
                        index: true, element: <Navigate to={"profile/3180"} /> //here we can't write simply <Profile/> because if we do so then Url wil stay simply /dashboard 
                    },
                    {
                        path: 'profile/:id',
                        element: <Profile />
                    },
                    {
                        path: 'setting',
                        element: <Setting />
                    },
                ]
            },
            {
                path: 'userApp',
                element: <Suspense fallback="Roles Laoding">
                    <RoleList roles={roles} />
                </Suspense>
            },
            {
                path: 'roleApp',
                element: <Suspense fallback="Users Loading">
                    <UserList users={users} />
                </Suspense>
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: '*',
                element: <NotFound />
            },
        ]
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>,
)
