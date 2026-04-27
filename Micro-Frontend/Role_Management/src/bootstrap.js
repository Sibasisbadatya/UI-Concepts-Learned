import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router'
import { AuthProvider } from './AuthProvider.jsx'
import { roles, users } from './data/data.js'
import { fetchUsers } from './loaderUtils/usersLoader.js'
import { Provider } from 'react-redux'        // ✅ ADD
import store from './reducers/store.js'                // ✅ ADD

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

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            { path: '/', element: <Home /> },
            { path: 'about', element: <About />, loader: fetchUsers },
            { path: 'contact', element: <Contact /> },
            { path: 'home', element: <RedirectPage /> },
            {
                path: 'dashboard',
                element: <ProtectedRoute><DashLayout /></ProtectedRoute>,
                children: [
                    { index: true, element: <Navigate to={"profile/3180"} /> },
                    { path: 'profile/:id', element: <Profile /> },
                    { path: 'setting', element: <Setting /> },
                ]
            },
            {
                path: 'userApp',
                element: (
                    <Suspense fallback="Users Loading">
                        <UserList users={users} />
                    </Suspense>
                )
            },
            {
                path: 'roleApp',
                element: (
                    <Suspense fallback="Roles Loading">
                        <RoleList roles={roles} />
                    </Suspense>
                )
            },
            { path: 'login', element: <Login /> },
            { path: '*', element: <NotFound /> },
        ]
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>        
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </Provider>                    
    </StrictMode>,
)