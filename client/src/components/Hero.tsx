import { motion } from "framer-motion";
import { Link } from "wouter";
import { Play, Pause, RotateCcw } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="pt-16 pb-24 gradient-bg text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0 md:pr-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
              Learn Sorting Algorithms through Visualization
            </h1>
            <p className="text-violet-100 text-lg mb-8 max-w-lg">
              Understand complex sorting algorithms with interactive, step-by-step visual demonstrations. 
              See how algorithms transform data in real-time.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/visualizer">
                  <a className="bg-violet-100 text-violet-600 font-medium px-6 py-3 rounded-lg shadow-lg hover:bg-white transition duration-300 inline-block">
                    Start Visualizing
                  </a>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/algorithm/bubble-sort">
                  <a className="border-2 border-violet-100 text-violet-100 font-medium px-6 py-3 rounded-lg hover:bg-violet-500 transition duration-300 inline-block">
                    Explore Algorithms
                  </a>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white p-4 rounded-xl shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="font-code text-violet-500 font-medium">Bubble Sort Visualization</span>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="h-60 bg-violet-50 rounded-lg flex items-end justify-around p-4">
                {[40, 80, 30, 90, 50, 65, 20, 75].map((height, index) => (
                  <motion.div 
                    key={index}
                    className={`w-8 rounded-t-md visualization-bar ${
                      index === 3 || index === 4 ? 'bg-violet-400' : 
                      index > 4 ? 'bg-violet-300' : 'bg-violet-500'
                    }`}
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button className="w-10 h-10 flex items-center justify-center bg-violet-100 text-violet-500 rounded-full hover:bg-violet-200 transition duration-300">
                    <Play size={20} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-violet-50 text-violet-400 rounded-full hover:bg-violet-100 transition duration-300">
                    <Pause size={20} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-violet-50 text-violet-400 rounded-full hover:bg-violet-100 transition duration-300">
                    <RotateCcw size={20} />
                  </button>
                </div>
                <span className="text-xs text-violet-500 font-code">Comparing elements 3 & 4</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
