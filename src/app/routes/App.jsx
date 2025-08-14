import { Header } from "../../components/header/Header";
import { CardPage } from "../../pages/cardPage/CardPage";
import { DetailPage } from "../../pages/detailPage/DetailPage";
import { HomePage } from "../../pages/homePage/HomePage";
import { Register } from '../../assets/register/Register';
import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "../../assets/login/Login";
import { ProfilePage } from "../../pages/profilePage/ProfilePage";
import { Footer } from "../../components/footer/Footer";
import { useEffect } from "react";
import { SavePage } from "../../pages/savePage/SavePage";


function App() {

  const arrRoutes = [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/card/:id',
      element: <CardPage />
    },
    {
      path: '/auth/register',
      element: <Register />
    },
    {
      path: '/auth/login',
      element: <Login />
    },
    {
      path: '/auth/profile',
      element: <ProfilePage />
    },
    {
      path: '/detail/:genreId',
      element: <DetailPage />
    },
    {
      path: '/save',
      element: <SavePage />
    }
  ];

  const ScrollTop = ({ children }) => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, [pathname]);
    return children;
  };

  return (
    <>
      <Header />
      <ScrollTop>
        <Routes>
          {arrRoutes.map((obj, i) => {
            return <Route key={i} {...obj} />
          })}
        </Routes>
      </ScrollTop>
      <Footer />
    </>
  )
}

export default App
