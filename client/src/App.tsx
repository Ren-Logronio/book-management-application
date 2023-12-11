import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { AuthProvider } from "react-auth-verification-context";
import HomePage  from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />} />
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
