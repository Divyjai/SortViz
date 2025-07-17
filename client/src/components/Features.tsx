import { motion } from "framer-motion";
import { 
  Eye, 
  Gamepad, 
  BookOpen, 
  GitCompare, 
  CodeSquare, 
  Smartphone 
} from "lucide-react";

const features = [
  {
    icon: <Eye />,
    title: "Visual Learning",
    description: "See algorithms in action with step-by-step visual representations that make complex concepts clear and intuitive."
  },
  {
    icon: <Gamepad />,
    title: "Interactive Experience",
    description: "Control the visualization speed, generate random data, and experiment with different algorithms to deepen your understanding."
  },
  {
    icon: <BookOpen />,
    title: "Comprehensive Explanations",
    description: "Detailed descriptions, complexity analyses, and real-world analogies help you understand not just how, but why algorithms work."
  },
  {
    icon: <GitCompare />,
    title: "Algorithm Comparison",
    description: "Compare different sorting algorithms side by side to understand their strengths, weaknesses, and optimal use cases."
  },
  {
    icon: <CodeSquare />,
    title: "Code Implementations",
    description: "Study the actual code behind each algorithm with clean, well-commented implementations in multiple programming languages."
  },
  {
    icon: <Smartphone />,
    title: "Mobile Friendly",
    description: "Learn on the go with our fully responsive design that works seamlessly across desktop, tablet, and mobile devices."
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-violet-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="font-poppins font-bold text-3xl sm:text-4xl text-violet-600 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Learn With SortViz?
          </motion.h2>
          <motion.p 
            className="text-violet-700 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our interactive visualization approach makes understanding complex algorithms easier and more intuitive.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-violet-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(123, 44, 191, 0.15)" }}
            >
              <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mb-4 text-white">
                {feature.icon}
              </div>
              <h3 className="font-poppins font-semibold text-xl text-violet-600 mb-3">
                {feature.title}
              </h3>
              <p className="text-violet-700">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
