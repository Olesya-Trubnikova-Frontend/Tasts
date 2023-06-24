import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { useAuthContext } from './context/AuthProvider';
import { Header } from './components/Layout/Header/Header';
import { LeftSideBar } from './components/Layout/LeftSideBar/LeftSideBar';
import { RightSideBar } from './components/Layout/RightSideBar/RightSideBar';
import { Footer } from './components/Layout/Footer/Footer';

function App() {
  const getCurrentUserData = useAuthContext();

  useEffect(() => {
    getCurrentUserData.checkToken();
    getCurrentUserData.getUserData();
  }, [getCurrentUserData]);

  return (
    <div className="grid-container">
      <Header />
      <LeftSideBar />
      <Outlet />
      <RightSideBar />
      <Footer />
    </div>
  );
}

export default App;
