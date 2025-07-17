
import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import AlgorithmDetail from "@/components/AlgorithmDetail";
import { algorithms } from "@/lib/algorithms";
import NotFound from "@/pages/not-found";

const AlgorithmPage = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  
  const algorithm = algorithms.find(algo => algo.id === id);
  
  useEffect(() => {
    if (algorithm) {
      document.title = `${algorithm.name} - SortViz`;
    } else if (id) {
      setLocation("/algorithm/bubble-sort");
    }
  }, [algorithm, id, setLocation]);
  
  if (!algorithm) {
    return <NotFound />;
  }
  
  return <AlgorithmDetail algorithm={algorithm} />;
};

export default AlgorithmPage;
