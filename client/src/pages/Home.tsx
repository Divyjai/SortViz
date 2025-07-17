import { useEffect } from "react";
import Hero from "@/components/Hero";
import FeaturedAlgorithms from "@/components/FeaturedAlgorithms";
import Features from "@/components/Features";

const Home = () => {
  useEffect(() => {
    document.title = "SortViz - Learn Sorting Algorithms through Visualization";
  }, []);

  return (
    <>
      <Hero />
      <FeaturedAlgorithms />
      <Features />
    </>
  );
};

export default Home;
