import { Routes, Route } from "react-router-dom";
import Home from "../modules/Home/home-page";
import NotFound from "../components/NotFound/notFound";
import RegisterForm from "../modules/Users/register-form-modal";
import LoginForm from "../modules/Users/login-form-modal";
import Footer from "../components/Footer/footer";
import NavBar from "../components/Nav-bar/navBar";
import { SearchProvider } from "../contexts/SearchContext";
//import RouteGuard from "./route-guard";

const MainRoutes = () => {
  const allRoutes = [
    //Exemplo de rota privada
    /*  {
      key: "home",
      path: "/",
      element: (
        <RouteGuard>
          <Home />
        </RouteGuard>
      ),
    },  */
    {
      key: "home",
      path: "/",
      element: <Home />,
    },
    {
      key: "register",
      path: "/register",
      element: <RegisterForm />,
    },
    {
      key: "login",
      path: "/login",
      element: <LoginForm />,
    },
  ];

  return (
    <SearchProvider>
      <Routes>
        {allRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={
              <>
                <NavBar />
                {route.element}
                <Footer />
              </>
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SearchProvider>
  );
};

export default MainRoutes;
