
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, RotateCcw, Shuffle, SkipForward
} from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { performSortingStep, sortingAlgorithms, generateRandomArray } from "@/lib/visualizer";
import { SortingVisualizer } from "@/types";

interface VisualizerProps {
  initialAlgorithm?: string;
}

const Visualizer = ({ initialAlgorithm }: VisualizerProps) => {
  const [algorithmId, setAlgorithmId] = useState(initialAlgorithm || "bubble");
  const [arraySize, setArraySize] = useState(25);
  const [arraySizeOption, setArraySizeOption] = useState("25");
  const [customSizeInput, setCustomSizeInput] = useState("");
  const [array, setArray] = useState<number[]>([]);
  const [sortingState, setSortingState] = useState<SortingVisualizer>({
    array: [],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [],
    currentStep: 0,
    totalSteps: 0,
    completed: false,
    message: "",
  });
  const [speed, setSpeed] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const animationRef = useRef<number>();
  const speedInMs = useRef(150);
  const currentStateRef = useRef(sortingState);

  useEffect(() => {
    speedInMs.current = 800 / Math.pow(1.5, speed);
  }, [speed]);

  useEffect(() => {
    randomizeArray();
  }, [arraySize]);

  useEffect(() => {
    if (initialAlgorithm && initialAlgorithm !== algorithmId) {
      setAlgorithmId(initialAlgorithm);
      resetVisualization();
    }
  }, [initialAlgorithm]);

  useEffect(() => {
    currentStateRef.current = sortingState;
  }, [sortingState]);

  useEffect(() => {
    if (isPlaying) {
      runAnimation();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (sortingState.completed && sortingState.sortedIndices.length !== sortingState.array.length) {
        setSortingState(prev => ({
          ...prev,
          sortedIndices: Array.from({ length: prev.array.length }, (_, i) => i),
          message: "Sorting completed!"
        }));
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, sortingState.completed]);

  const randomizeArray = () => {
    const newArray = generateRandomArray(arraySize, 5, 95);
    setArray(newArray);
    
    setSortingState({
      array: [...newArray],
      comparingIndices: [],
      swappedIndices: [],
      sortedIndices: [],
      currentStep: 0,
      totalSteps: 0,
      completed: false,
      message: "Array randomized. Ready to start sorting.",
    });
    
    setIsInitialized(true);
    setIsPlaying(false);
  };

  const resetVisualization = () => {
    if (array.length > 0) {
      setSortingState({
        array: [...array],
        comparingIndices: [],
        swappedIndices: [],
        sortedIndices: [],
        currentStep: 0,
        totalSteps: 0,
        completed: false,
        message: "Ready to start sorting.",
      });
    } else {
      randomizeArray();
    }
    setIsPlaying(false);
  };

  const runAnimation = () => {
    if (currentStateRef.current.completed) {
      setIsPlaying(false);
      return;
    }

    let lastTime = 0;
    
    const animate = (time: number) => {
      if (!isPlaying) return;
      
      if (!lastTime || time - lastTime > speedInMs.current) {
        lastTime = time;
        
        const currentState = currentStateRef.current;
        
        const nextState = performSortingStep(
          sortingAlgorithms[algorithmId],
          currentState
        );
        
        setSortingState(nextState);
        
        if (nextState.completed) {
          setIsPlaying(false);
          return;
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const togglePlay = () => {
    if (!isInitialized) {
      randomizeArray();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = () => {
    if (!isInitialized) {
      randomizeArray();
      return;
    }
    
    setIsPlaying(false);
    
    const algorithm = sortingAlgorithms[algorithmId];
    let currentState = { ...sortingState };
    
    while (!currentState.completed) {
      currentState = performSortingStep(algorithm, currentState);
    }
    
    setSortingState(currentState);
  };

  const getBarColor = (index: number) => {
    if (sortingState.sortedIndices.includes(index)) {
      return "bg-violet-800"; // Sorted
    }
    if (sortingState.swappedIndices.includes(index)) {
      return "bg-cyan-400"; // Being swapped
    }
    if (sortingState.comparingIndices.includes(index)) {
      return "bg-cyan-400"; // Being compared
    }
    return "bg-violet-300"; // Unsorted
  };

  return (
    <section id="visualizer" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-violet-600 mb-4">
            Algorithm Visualizer
          </h2>
          <p className="text-violet-700 max-w-2xl mx-auto">
            See sorting algorithms in action with our interactive visualizer. Control the speed,
            generate random data, and observe how different algorithms perform.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-violet-100 max-w-6xl mx-auto">
          <div className="p-6 border-b border-violet-100 bg-violet-50">
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-full sm:w-auto">
                <label htmlFor="algorithm-select" className="block text-sm font-medium text-violet-600 mb-1">
                  Algorithm
                </label>
                <Select 
                  value={algorithmId}
                  onValueChange={(value) => {
                    setAlgorithmId(value);
                    resetVisualization();
                  }}
                >
                  <SelectTrigger className="w-full sm:w-48 bg-white border border-violet-200 text-violet-700 rounded-md px-3 py-2 h-[38px]">
                    <SelectValue placeholder="Select algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bubble">Bubble Sort</SelectItem>
                    <SelectItem value="insertion">Insertion Sort</SelectItem>
                    <SelectItem value="selection">Selection Sort</SelectItem>
                    <SelectItem value="merge">Merge Sort</SelectItem>
                    <SelectItem value="quick">Quick Sort</SelectItem>
                    <SelectItem value="heap">Heap Sort</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-auto">
                <label htmlFor="array-size" className="block text-sm font-medium text-violet-600 mb-1">
                  Array Size
                </label>
                <div className="flex items-center space-x-2">
                  <Select 
                    value={arraySizeOption}
                    onValueChange={(value) => {
                      setArraySizeOption(value);
                      if (value !== "custom") {
                        setArraySize(Number(value));
                      }
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-32 bg-white border border-violet-200 text-violet-700 rounded-md px-3 py-2 h-[38px]">
                      <SelectValue placeholder="Array size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="75">75</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {arraySizeOption === "custom" && (
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="number"
                          min="5"
                          max="200"
                          placeholder="Size (5-200)"
                          value={customSizeInput}
                          onChange={(e) => setCustomSizeInput(e.target.value)}
                          className="w-28 border border-violet-200 rounded-md px-3 py-2 h-[38px] focus:outline-none focus:ring-2 focus:ring-violet-300 text-violet-700"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const value = parseInt(customSizeInput);
                              if (!isNaN(value) && value >= 5 && value <= 200) {
                                setArraySize(value);
                              }
                            }
                          }}
                        />
                      </div>
                      <button
                        className="h-[38px] px-3 bg-violet-400 text-white rounded-md hover:bg-violet-500 transition-colors"
                        onClick={() => {
                          const value = parseInt(customSizeInput);
                          if (!isNaN(value) && value >= 5 && value <= 200) {
                            setArraySize(value);
                          } else {
                            const input = document.querySelector('input[type="number"]') as HTMLInputElement;
                            if (input) {
                              input.focus();
                            }
                            if (isNaN(value) || value < 5 || value > 200) {
                              setCustomSizeInput("");
                            }
                          }
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-full sm:w-auto flex-1 min-w-[200px] relative">
                <label htmlFor="speed-slider" className="block text-sm font-medium text-violet-600 mb-1">
                  Animation Speed
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-100 rounded-full -z-10"></div>
                  <Slider
                    id="speed-slider"
                    className="speed-slider"
                    min={1}
                    max={7}
                    step={1}
                    value={[speed]}
                    onValueChange={(value) => setSpeed(value[0])}
                  />
                </div>
              </div>
              
              <div className="w-full sm:w-auto flex sm:justify-end space-x-2">
                <motion.button
                  className="bg-violet-100 text-violet-600 hover:bg-violet-200 px-4 py-2 rounded-md font-medium text-sm transition duration-300 flex items-center"
                  onClick={randomizeArray}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isPlaying}
                >
                  <Shuffle size={16} className="mr-1" /> Randomize
                </motion.button>
                <motion.button
                  className={`${isPlaying ? 'bg-violet-300' : 'bg-violet-400'} text-white hover:bg-violet-500 px-4 py-2 rounded-md font-medium text-sm transition duration-300 flex items-center`}
                  onClick={togglePlay}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <><Pause size={16} className="mr-1" /> Pause</>
                  ) : (
                    <><Play size={16} className="mr-1" /> Start</>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="relative bg-violet-50 rounded-lg h-96 flex items-end justify-around p-4">
              <AnimatePresence>
                {sortingState.array.map((value, index) => (
                  <motion.div
                    key={index}
                    className={`${getBarColor(index)} rounded-t-md relative group`}
                    style={{ 
                      height: `${value}%`,
                      width: arraySize <= 25 ? '20px' : arraySize <= 50 ? '10px' : '5px',
                      marginLeft: arraySize <= 25 ? '3px' : '2px',
                      marginRight: arraySize <= 25 ? '3px' : '2px',
                    }}
                    initial={{ height: 0 }}
                    animate={{ 
                      height: `${value}%`,
                      transition: { duration: 0.3 }
                    }}
                    exit={{ height: 0 }}
                    layout
                  >
                    {arraySize <= 25 && (
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-violet-600">
                        {value}
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="p-6 border-t border-violet-100 bg-violet-50">            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-violet-300 rounded-full mr-2"></span>
                <span className="text-sm text-violet-600">Unsorted</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-cyan-400 rounded-full mr-2"></span>
                <span className="text-sm text-violet-600">Currently Comparing</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-violet-800 rounded-full mr-2"></span>
                <span className="text-sm text-violet-600">Sorted</span>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-violet-100">
              <h4 className="font-medium text-violet-600 mb-2">Status</h4>
              <p className="text-violet-700 font-code text-sm">
                {sortingState.message || "Ready to begin sorting..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visualizer;
