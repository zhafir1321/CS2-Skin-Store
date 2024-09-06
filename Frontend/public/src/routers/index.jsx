import { createBrowserRouter, redirect } from 'react-router-dom';
import LandingPage from '../views/LandingPage';
import Login from '../views/Login';
import Register from '../views/Register';
import BaseLayout from '../layout/BaseLayout';
import Home from '../views/Home';

const url = 'http://localhost:3000';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage url={url} />,
  },
  {
    path: '/login',
    element: <Login url={url} />,
  },
  {
    path: '/register',
    element: <Register url={url} />,
  },
  {
    element: <BaseLayout url={url} />,
    loader: async () => {
      if (!localStorage.access_token) {
        Toastify({
          text: 'Please Login First',
          duration: 3000,
          destination: 'https://github.com/apvarun/toastify-js',
          newWindow: true,
          close: true,
          gravity: 'top', // `top` or `bottom`
          position: 'left', // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        return redirect('/login');
      }
      return null;
    },
    children: [
      {
        path: '/home',
        element: <Home url={url} />,
      },
    ],
  },
]);

export default router;
