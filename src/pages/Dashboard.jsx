import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainDashboard from "../components/MainDashboard";

const Dashboard = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <main>
        {location.pathname === "/myrecipes" ? <MainDashboard /> : <Outlet />}
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
