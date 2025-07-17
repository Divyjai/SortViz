import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const About = () => {
  useEffect(() => {
    document.title = "About - SortViz";
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-poppins font-bold text-4xl text-violet-600 mb-8 text-center">
            About SortViz
          </h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <h2 className="font-poppins font-semibold text-2xl text-violet-600 mb-4">
              Our Mission
            </h2>
            <p className="text-violet-700 mb-6">
              SortViz was created with a simple goal in mind: to make learning sorting algorithms
              intuitive, engaging, and accessible to everyone. We believe that visualizing the
              step-by-step process of these algorithms is the most effective way to understand how they work.
            </p>
            <p className="text-violet-700 mb-6">
              Whether you're a computer science student, a professional developer looking to refresh your knowledge,
              or simply curious about how computers organize data, SortViz provides a hands-on learning 
              experience that makes complex concepts easier to grasp.
            </p>
            
            <h2 className="font-poppins font-semibold text-2xl text-violet-600 mb-4 mt-10">
              Why Sorting Algorithms Matter
            </h2>
            <p className="text-violet-700 mb-6">
              Sorting algorithms are fundamental to computer science and are used in countless applications.
              From organizing your email inbox to powering database searches, these algorithms are essential
              building blocks in software development.
            </p>
            <p className="text-violet-700 mb-6">
              Understanding different sorting techniques and their trade-offs helps developers make
              informed decisions about which algorithm to use in different scenarios. It's not just
              about knowing how to implement them—it's about knowing when and why to use each one.
            </p>
            
            <h2 className="font-poppins font-semibold text-2xl text-violet-600 mb-4 mt-10">
              How to Use SortViz
            </h2>
            <ul className="list-disc list-inside text-violet-700 space-y-2 mb-6 ml-4">
              <li>
                <span className="font-medium">Explore Algorithms:</span> Browse detailed explanations of popular sorting
                algorithms, including their time and space complexity, and real-world applications.
              </li>
              <li>
                <span className="font-medium">Visualize Sorting:</span> Use our interactive visualizer to see algorithms
                in action. Control the speed, generate random data sets, and observe the sorting process step by step.
              </li>
              <li>
                <span className="font-medium">Compare Performance:</span> Try different algorithms on the same data set
                to understand their relative strengths and weaknesses.
              </li>
              <li>
                <span className="font-medium">Learn on Any Device:</span> SortViz is fully responsive and works on
                desktops, tablets, and mobile phones.
              </li>
            </ul>
            
            <div className="mt-8 text-center">
              <Link href="/visualizer">
                <motion.a 
                  className="inline-flex items-center justify-center gradient-bg text-white font-medium px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Visualizing Now
                </motion.a>
              </Link>
            </div>
          </div>
          
          <div className="bg-violet-50 rounded-xl p-8 border border-violet-100">
            <h2 className="font-poppins font-semibold text-2xl text-violet-600 mb-4 text-center">
              Get in Touch
            </h2>
            <p className="text-violet-700 text-center mb-6">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
            <div className="text-center">
              <a 
                href="mailto:contact@sortviz.com" 
                className="text-violet-500 hover:text-violet-600 font-medium"
              >
                contact@sortviz.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
