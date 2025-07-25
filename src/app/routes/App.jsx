import { Header } from "../../components/header/Header";
import { CardPage } from "../../pages/cardPage/CardPage";
import { DetailPage } from "../../pages/detailPage/DetailPage";
import { HomePage } from "../../pages/homePage/HomePage";
import {Register} from '../../assets/register/Register';
import { Routes, Route } from "react-router-dom";
import { Login } from "../../assets/login/Login";
import { ProfilePage } from "../../pages/profilePage/ProfilePage";
import { Footer } from "../../components/footer/Footer";

function App() {

  const arrRoutes = [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/detail/:id',
      element: <DetailPage />
    },
    {
      path: '/card/:id',
      element: <CardPage />
    },
    {
      path: '/auth/register',
      element: <Register/>
    },
    {
      path: '/auth/login',
      element: <Login/>
    },
    {
      path: '/auth/profile',
      element: <ProfilePage/>
    },
  ];

  return (
    <>
      <Header />
      <Routes>
        {arrRoutes.map((obj, i) => {
          return <Route key={i} {...obj}/>
        })}
      </Routes>
      <Footer/>
    </>
  )
}

export default App
