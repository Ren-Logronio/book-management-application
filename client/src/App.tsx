import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import { store } from './app/store';
import { useSelector, Provider } from 'react-redux'
import { Outlet } from 'react-router-dom'
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
            <Navigate replace to='/logout'/>
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )

}

export default App
