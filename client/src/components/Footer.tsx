import { Link } from "wouter";
import { ChartBarStacked, Github, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-violet-900 text-violet-100 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <ChartBarStacked size={24} className="text-violet-100" />
              <span className="font-poppins font-bold text-xl">SortViz</span>
            </div>
            <p className="text-violet-200 max-w-xs">
              An interactive platform for learning sorting algorithms through visualization and comprehensive explanations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-medium text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/">
                    <a className="hover:text-white transition duration-300">Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/algorithm/bubble-sort">
                    <a className="hover:text-white transition duration-300">Algorithms</a>
                  </Link>
                </li>
                <li>
                  <Link href="/visualizer">
                    <a className="hover:text-white transition duration-300">Visualizer</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <a className="hover:text-white transition duration-300">About</a>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Algorithms</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/algorithm/bubble-sort">
                    <a className="hover:text-white transition duration-300">Bubble Sort</a>
                  </Link>
                </li>
                <li>
                  <Link href="/algorithm/insertion-sort">
                    <a className="hover:text-white transition duration-300">Insertion Sort</a>
                  </Link>
                </li>
                <li>
                  <Link href="/algorithm/merge-sort">
                    <a className="hover:text-white transition duration-300">Merge Sort</a>
                  </Link>
                </li>
                <li>
                  <Link href="/algorithm/quick-sort">
                    <a className="hover:text-white transition duration-300">Quick Sort</a>
                  </Link>
                </li>
                <li>
                  <Link href="/algorithm/heap-sort">
                    <a className="hover:text-white transition duration-300">Heap Sort</a>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition duration-300">Documentation</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition duration-300">Blog</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition duration-300">FAQs</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition duration-300">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-violet-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-violet-300 mb-4 sm:mb-0">© {new Date().getFullYear()} SortViz. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-violet-300 hover:text-white transition duration-300">
              <Github size={20} />
            </a>
            <a href="#" className="text-violet-300 hover:text-white transition duration-300">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-violet-300 hover:text-white transition duration-300">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-violet-300 hover:text-white transition duration-300">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
