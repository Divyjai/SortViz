import { motion } from "framer-motion";
import { Link } from "wouter";
import { Clock, Database, ChevronRight } from "lucide-react";
import { algorithms } from "@/lib/algorithms";

const FeaturedAlgorithms = () => {
  return (
    <section id="algorithms" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-violet-600 mb-4">
            Popular Sorting Algorithms
          </h2>
          <p className="text-violet-700 max-w-2xl mx-auto">
            Explore different sorting algorithms, understand their mechanics, complexities, and real-world applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {algorithms.map((algorithm) => (
            <motion.div 
              key={algorithm.id}
              className="algorithm-card bg-white rounded-xl overflow-hidden shadow-lg border border-violet-100"
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(123, 44, 191, 0.2)" }}
            >
              <div className="h-40 gradient-bg flex items-center justify-center p-4">
                <div className="h-28 w-full flex items-end justify-center space-x-2">
                  {algorithm.previewBars.map((height, index) => (
                    <motion.div
                      key={index}
                      className={`w-4 ${index === algorithm.highlightIndex ? 'bg-white' : 'bg-violet-100'} rounded-t`}
                      style={{ height: `${height}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    />
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-poppins font-semibold text-xl text-violet-600 mb-2">
                  {algorithm.name}
                </h3>
                <p className="text-violet-700 text-sm mb-4">
                  {algorithm.shortDescription}
                </p>
                <div className="flex items-center text-xs text-violet-500 space-x-4 mb-4">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{algorithm.timeComplexity}</span>
                  </div>
                  <div className="flex items-center">
                    <Database size={14} className="mr-1" />
                    <span>{algorithm.spaceComplexity}</span>
                  </div>
                </div>
                <Link href={`/algorithm/${algorithm.id}`}>
                  <a className="text-violet-400 hover:text-violet-600 font-medium flex items-center text-sm">
                    Learn more
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/visualizer">
            <motion.a 
              className="inline-flex items-center justify-center bg-violet-100 text-violet-600 hover:bg-violet-200 transition duration-300 font-medium px-6 py-3 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Algorithms
              <ChevronRight size={18} className="ml-2" />
            </motion.a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAlgorithms;
