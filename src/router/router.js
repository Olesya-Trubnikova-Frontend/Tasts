import { createBrowserRouter } from 'react-router-dom';
import App from '../App.js';
import { MainContent } from '../components/Layout/MainContent/MainContent.jsx';
import { Login } from '../components/Authtorization/Login/Login.jsx';
import { Registration } from '../components/Authtorization/Registration/Registration.jsx';
import { TaskPageUser } from '../components/User/TaskPageUser/TaskPageUser.jsx';

import { UserPageAdministration } from '../components/Administration/UserPageAdministration/UserPageAdministration.jsx';
import { TaskPageAdministration } from '../components/Administration/TaskPageAdministration/TaskPageAdministration.jsx';
import { HardwarePageAdministration } from '../components/Administration/HardwarePageAdministration/HardwarePageAdministration.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainContent />,
      },
      // ----AUTH----start
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Registration />,
      },
      {
        path: '/logout',
        element: <Login />,
      },
      // ----AUTH----end
      // ----USER----start
      {
        path: '/TaskPageUser',
        element: <TaskPageUser />,
      },
      // ----USER----end
      // ----ADMIN----start
      {
        path: '/UserPageAdministration',
        element: <UserPageAdministration />,
      },
      {
        path: '/TaskPageAdministration',
        element: <TaskPageAdministration />,
      },
      {
        path: '/HardwarePageAdministration',
        element: <HardwarePageAdministration />,
      },
      // ----ADMIN----end
    ],
  },
], {basename: "/Tasks"});
