import { useEffect } from "react";
import { useLocation } from "wouter";
import Visualizer from "@/components/Visualizer";

const VisualizerPage = () => {
  const [location] = useLocation();

  // Parse algorithm from URL query parameters
  const queryParams = new URLSearchParams(location.split("?")[1] || "");
  const algorithmParam = queryParams.get("algorithm");

  useEffect(() => {
    document.title = "Algorithm Visualizer - SortViz";
  }, []);

  return (
    <Visualizer initialAlgorithm={algorithmParam || undefined} />
  );
};

export default VisualizerPage;