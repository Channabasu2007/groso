


import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SupportedBrands from "@/components/SupportedBrands";
import DishToGroceryRoadmap from "@/components/DishToGroceryRoadmap";
import GroceryOrderRoadmap from "@/components/GroceryOrderRoadmap";
import Reasons from "@/components/Reasons";
import FAQsection from "@/components/FAQsection";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";





const Home = () => {

 


  return (
    <div className="w-[100vw] overflow-x-hidden overflow-y-auto h-[100vh] bg-zinc-950">
      <Navbar />
      <Hero />
      <SupportedBrands />
      <DishToGroceryRoadmap />
      <GroceryOrderRoadmap />
      <Reasons />
      <FAQsection />
      <Footer />
    </div>
  );

}


export default Home;  // export the component