import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Eye } from "lucide-react";
import { Algorithm } from "@/types";

interface AlgorithmDetailProps {
  algorithm: Algorithm;
}

const AlgorithmDetail = ({ algorithm }: AlgorithmDetailProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [algorithm.id]);

  return (
    <section id={algorithm.id} className="py-16 bg-violet-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="font-poppins font-bold text-3xl text-violet-600 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {algorithm.name} Explained
          </motion.h2>
          
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full lg:w-1/2 px-4 mb-6 lg:mb-0">
                  <h3 className="font-poppins font-semibold text-xl text-violet-600 mb-4">How It Works</h3>
                  <p className="text-violet-700 mb-4">
                    {algorithm.description.part1}
                  </p>
                  <p className="text-violet-700 mb-4">
                    {algorithm.description.part2}
                  </p>
                  <div className="mb-6">
                    <h4 className="font-medium text-violet-600 mb-2">Step-by-Step Process:</h4>
                    <ol className="list-decimal list-inside text-violet-700 space-y-2 ml-2">
                      {algorithm.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 px-4">
                  <div className="bg-violet-50 p-5 rounded-lg mb-6">
                    <h4 className="font-medium text-violet-600 mb-3">Complexity Analysis</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="inline-block w-32 font-medium text-violet-600">Time Complexity:</span>
                        <span className="font-code text-violet-700">{algorithm.timeComplexity}</span>
                      </div>
                      <div>
                        <span className="inline-block w-32 font-medium text-violet-600">Best Case:</span>
                        <span className="font-code text-violet-700">{algorithm.bestCase}</span>
                        <span className="text-xs text-violet-500 ml-2">{algorithm.bestCaseExplanation}</span>
                      </div>
                      <div>
                        <span className="inline-block w-32 font-medium text-violet-600">Space Complexity:</span>
                        <span className="font-code text-violet-700">{algorithm.spaceComplexity}</span>
                      </div>
                      <div>
                        <span className="inline-block w-32 font-medium text-violet-600">Stability:</span>
                        <span className="text-violet-700">{algorithm.stability}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-violet-50 p-5 rounded-lg">
                    <h4 className="font-medium text-violet-600 mb-3">Real-world Analogy</h4>
                    <p className="text-violet-700">
                      {algorithm.analogy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-violet-50 p-6 border-t border-violet-100">
              <h4 className="font-medium text-violet-600 mb-4">Pseudocode Implementation</h4>
              <pre className="bg-violet-900 text-violet-100 p-4 rounded-lg overflow-x-auto font-code text-sm">
                <code>{algorithm.pseudocode}</code>
              </pre>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href={`/visualizer?algorithm=${algorithm.id}`}>
              <motion.a 
                className="inline-flex items-center justify-center bg-violet-400 text-white hover:bg-violet-500 transition duration-300 font-medium px-6 py-3 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Visualize {algorithm.name}
                <Eye size={18} className="ml-2" />
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AlgorithmDetail;
