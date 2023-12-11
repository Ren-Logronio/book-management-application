import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from "react-auth-verification-context";
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { RootState } from './app/store';
import DashboardPage from './pages/DashboardPage';
import HomePage  from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BookViewPage from './pages/BookViewPage';
import BookFormPage from './pages/BookFormPage';
import SearchPage from './pages/SearchPage';

function App() {

  const ProtectedRoute = () => {
    const { user, token } = useSelector((state: RootState) => state.auth)

    if (!user || !token) {
      return (
        <div className='unauthorized'>
          <h1>Unauthorized :</h1>
          <span>
            <NavLink to='/login'>Login</NavLink> to gain access
          </span>
        </div>
      )
    }
  
    return <Outlet />
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/book" element={<BookViewPage />}/>
          <Route path="/forms/book" element={<BookFormPage />} />
          <Route path="/book/search" element={<SearchPage />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
