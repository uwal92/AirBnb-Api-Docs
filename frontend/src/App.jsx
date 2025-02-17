import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import * as sessionActions from "./store/session";
import AllSpots from './componenets/AllSpots/AllSpots.jsx';
import Home from './componenets/Home/Home.jsx';
import SpotDetails from './componenets/SpotDetails/SpotDetails.jsx';
import CreateNewSpot from './componenets/CreateNewSpot/CreatenewSpot.jsx';
import ManageSpots from './componenets/ManageSpots/ManageSpots.jsx';
import UpdateSpots from './componenets/UpdateSpots/UpdateSpots.jsx';

function Layout() {
  const dispatch = useDispatch();
  const [isUserRestored, setIsUserRestored] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsUserRestored(true)
    });
  }, [dispatch]);

  return (
    <>
      <Home isUserRestored={isUserRestored} />
      {isUserRestored && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <AllSpots />
      },
      {
        path: `/spots/:spotId`,
        element: <SpotDetails />
      }, 
      {
        path: '/spots/new',
        element: <CreateNewSpot />
      }, 
      {
        path: '/spots/current',
        element: <ManageSpots />
      }, 
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpots />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
