import CtA from "../components/CTA";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Usage from "../components/Usage";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Usage />
        <CtA />
      </main>
      <Footer />
    </>
  );
};

export default Home;
