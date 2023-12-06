import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage  from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />}/>
      <Route path="/login" element={<LoginPage />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
