import { SortingAlgorithm, SortingVisualizer } from "@/types";

// Helper function to generate a random array of numbers
export const generateRandomArray = (size: number, min: number, max: number): number[] => {
  return Array.from({ length: size }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

// Helper function to create a deep copy of the sorting state
const cloneSortingState = (state: SortingVisualizer): SortingVisualizer => {
  return {
    array: [...state.array],
    comparingIndices: [...state.comparingIndices],
    swappedIndices: [...state.swappedIndices],
    sortedIndices: [...state.sortedIndices],
    currentStep: state.currentStep,
    totalSteps: state.totalSteps,
    completed: state.completed,
    message: state.message
  };
};

// Helper function to swap two elements in an array
const swap = (array: number[], i: number, j: number): void => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

// Bubble Sort Algorithm Implementation
// const bubbleSort: SortingAlgorithm = {
//   step: (state: SortingVisualizer): SortingVisualizer => {
//     const newState = cloneSortingState(state);
//     newState.currentStep++;
    
//     // Clear previous comparison and swap highlighting
//     newState.comparingIndices = [];
//     newState.swappedIndices = [];
    
//     const n = newState.array.length;
    
//     // Calculate the number of items that are already sorted (from the end)
//     const sortedCount = newState.sortedIndices.length;
    
//     // If this is the first step or we're starting a new pass
//     if (state.currentStep % (n - sortedCount) === 1) {
//       newState.message = `Starting pass ${Math.floor(state.currentStep / (n - sortedCount)) + 1}`;
//     }
    
//     // Calculate current position in the current pass
//     const currentPos = (state.currentStep - 1) % (n - sortedCount);
    
//     if (currentPos < n - sortedCount - 1) {
//       // Compare and potentially swap adjacent elements
//       const i = currentPos;
//       const j = currentPos + 1;
      
//       newState.comparingIndices = [i, j];
//       newState.message = `Comparing elements at indices ${i} and ${j}: ${newState.array[i]} and ${newState.array[j]}`;
      
//       if (newState.array[i] > newState.array[j]) {
//         swap(newState.array, i, j);
//         newState.swappedIndices = [i, j];
//         newState.message = `${newState.array[j]} > ${newState.array[i]}, swapping elements at indices ${i} and ${j}`;
//       }
//     } else {
//       // End of a pass, mark the largest element as sorted
//       const newSortedIndex = n - sortedCount - 1;
//       if (!newState.sortedIndices.includes(newSortedIndex)) {
//         newState.sortedIndices.push(newSortedIndex);
//         newState.message = `Element at index ${newSortedIndex} is now in its sorted position`;
//       }
//     }
    
//     // Check if sorting is complete
//     if (newState.sortedIndices.length === n - 1) {
//       // Mark the last remaining element as sorted
//       if (!newState.sortedIndices.includes(0)) {
//         newState.sortedIndices.push(0);
//       }
//       newState.completed = true;
//       newState.message = "Sorting completed!";
//     }
    
//     return newState;
//   },
  
//   totalSteps: (arrayLength: number): number => {
//     // For bubble sort, worst case is n passes with n-1, n-2, ..., 1 comparisons
//     return (arrayLength * (arrayLength - 1)) / 2;
//   }
// };
const bubbleSort: SortingAlgorithm = {
  step: (state: SortingVisualizer): SortingVisualizer => {
    const newState = cloneSortingState(state);
    newState.currentStep++;

    // Clear previous highlights
    newState.comparingIndices = [];
    newState.swappedIndices = [];

    const n = newState.array.length;
    
    // Calculate which pass we're on and position within that pass
    const pass = Math.floor(state.currentStep / (n - 1));
    const currentPos = state.currentStep % (n - 1);
    
    // If we've completed all passes
    if (pass >= n - 1) {
      newState.completed = true;
      newState.sortedIndices = Array.from({ length: n }, (_, i) => i);
      newState.message = "Sorting completed!";
      return newState;
    }

    // Compare adjacent elements
    const i = currentPos;
    const j = currentPos + 1;
    
    if (j < n - pass) {
      newState.comparingIndices = [i, j];
      newState.message = `Comparing elements at indices ${i} and ${j}: ${newState.array[i]} and ${newState.array[j]}`;
      
      if (newState.array[i] > newState.array[j]) {
        swap(newState.array, i, j);
        newState.swappedIndices = [i, j];
        newState.message = `${newState.array[j]} < ${newState.array[i]}, swapping elements`;
      }
      
      // Mark elements as sorted when they reach their final position
      if (j === n - 1 - pass) {
        newState.sortedIndices.push(j);
      }
    }

    return newState;
  },
  
  totalSteps: (arrayLength: number): number => {
    return arrayLength * (arrayLength - 1);
  }
};


// Selection Sort Algorithm Implementation
const selectionSort: SortingAlgorithm = {
  step: (state: SortingVisualizer): SortingVisualizer => {
    const newState = cloneSortingState(state);
    newState.currentStep++;
    
    // Clear previous comparison and swap highlighting
    newState.comparingIndices = [];
    newState.swappedIndices = [];
    
    const n = newState.array.length;
    
    // Calculate current outer loop position (sorted boundary)
    const sortedBoundary = Math.floor((state.currentStep - 1) / n);
    
    // If already sorted
    if (sortedBoundary >= n - 1) {
      newState.completed = true;
      newState.sortedIndices = Array.from({ length: n }, (_, i) => i);
      newState.message = "Sorting completed!";
      return newState;
    }
    
    // Calculate current position in the inner loop
    const innerLoopPos = (state.currentStep - 1) % n;
    
    // If we're at the start of the outer loop
    if (innerLoopPos === 0) {
      newState.message = `Starting to find the minimum element for position ${sortedBoundary}`;
      // Mark all elements before sortedBoundary as sorted
      newState.sortedIndices = Array.from({ length: sortedBoundary }, (_, i) => i);
    }
    
    // If we're in the middle of scanning for the minimum
    if (innerLoopPos > 0 && innerLoopPos < n - sortedBoundary) {
      const currentPos = sortedBoundary + innerLoopPos;
      newState.comparingIndices = [sortedBoundary, currentPos];
      newState.message = `Comparing minimum so far (${newState.array[sortedBoundary]}) with element at index ${currentPos} (${newState.array[currentPos]})`;
      
      // Find if there's a new minimum
      let minIndex = sortedBoundary;
      for (let i = sortedBoundary; i < sortedBoundary + innerLoopPos; i++) {
        if (newState.array[i] < newState.array[minIndex]) {
          minIndex = i;
        }
      }
      
      // Compare with the current element
      if (newState.array[currentPos] < newState.array[minIndex]) {
        newState.message = `Found a new minimum: ${newState.array[currentPos]} at index ${currentPos}`;
      }
    }
    
    // If we're at the end of the inner loop, swap the minimum to the sorted boundary
    if (innerLoopPos === n - sortedBoundary - 1) {
      // Find the minimum element in the unsorted portion
      let minIndex = sortedBoundary;
      for (let i = sortedBoundary + 1; i < n; i++) {
        if (newState.array[i] < newState.array[minIndex]) {
          minIndex = i;
        }
      }
      
      // Swap the found minimum element with the first unsorted element
      if (minIndex !== sortedBoundary) {
        swap(newState.array, sortedBoundary, minIndex);
        newState.swappedIndices = [sortedBoundary, minIndex];
        newState.message = `Swapping minimum element (${newState.array[sortedBoundary]}) to position ${sortedBoundary}`;
      } else {
        newState.message = `Minimum element (${newState.array[sortedBoundary]}) is already at position ${sortedBoundary}`;
      }
      
      // Mark the element at sortedBoundary as sorted
      if (!newState.sortedIndices.includes(sortedBoundary)) {
        newState.sortedIndices.push(sortedBoundary);
      }
    }
    
    // Check if sorting is complete after this step
    if (sortedBoundary === n - 2 && innerLoopPos === n - sortedBoundary - 1) {
      newState.completed = true;
      // Mark all elements as sorted
      newState.sortedIndices = Array.from({ length: n }, (_, i) => i);
      newState.message = "Sorting completed!";
    }
    
    return newState;
  },
  
  totalSteps: (arrayLength: number): number => {
    // For selection sort, we need n-1 outer iterations, each with n-i comparisons
    return arrayLength * (arrayLength + 1) / 2 - 1;
  }
};

// Insertion Sort Algorithm Implementation
const insertionSort: SortingAlgorithm = {
  step: (state: SortingVisualizer): SortingVisualizer => {
    const newState = cloneSortingState(state);
    newState.currentStep++;
    
    // Clear previous comparison and swap highlighting
    newState.comparingIndices = [];
    newState.swappedIndices = [];
    
    const n = newState.array.length;
    
    // Calculate which element we're currently inserting
    const elementToInsert = Math.floor((state.currentStep - 1) / n) + 1;
    
    // If we've already inserted all elements, we're done
    if (elementToInsert >= n) {
      newState.completed = true;
      newState.sortedIndices = Array.from({ length: n }, (_, i) => i);
      newState.message = "Sorting completed!";
      return newState;
    }
    
    // Calculate current position in the insertion process
    const insertionStep = (state.currentStep - 1) % n;
    
    // If we're starting to insert a new element
    if (insertionStep === 0) {
      newState.message = `Starting to insert element at index ${elementToInsert} (${newState.array[elementToInsert]})`;
      // Mark all elements before elementToInsert as sorted
      newState.sortedIndices = Array.from({ length: elementToInsert }, (_, i) => i);
    }
    
    // If we're in the middle of the insertion process
    if (insertionStep > 0 && insertionStep <= elementToInsert) {
      const currentPos = elementToInsert - insertionStep + 1;
      const prevPos = currentPos - 1;
      
      newState.comparingIndices = [prevPos, currentPos];
      newState.message = `Comparing elements at indices ${prevPos} and ${currentPos}: ${newState.array[prevPos]} and ${newState.array[currentPos]}`;
      
      if (newState.array[currentPos] < newState.array[prevPos]) {
        swap(newState.array, prevPos, currentPos);
        newState.swappedIndices = [prevPos, currentPos];
        newState.message = `${newState.array[prevPos]} < ${newState.array[currentPos]}, swapping elements at indices ${prevPos} and ${currentPos}`;
      } else {
        // If we don't need to swap, the element is in the right place
        newState.message = `Element ${newState.array[currentPos]} is in the correct position`;
        // Skip remaining comparisons for this element
        newState.currentStep += currentPos;
      }
    }
    
    // After an insertion is complete, mark the element as sorted
    if (insertionStep === elementToInsert) {
      // Mark the newly inserted element as sorted
      if (!newState.sortedIndices.includes(elementToInsert)) {
        newState.sortedIndices.push(elementToInsert);
      }
    }
    
    // Check if sorting is complete
    if (elementToInsert === n - 1 && insertionStep === elementToInsert) {
      newState.completed = true;
      // Mark all elements as sorted
      newState.sortedIndices = Array.from({ length: n }, (_, i) => i);
      newState.message = "Sorting completed!";
    }
    
    return newState;
  },
  
  totalSteps: (arrayLength: number): number => {
    // For insertion sort, we need n-1 elements to insert, each potentially requiring i comparisons
    return arrayLength * (arrayLength - 1) / 2 + (arrayLength - 1);
  }
};

// Merge Sort Algorithm Implementation
const mergeSort: SortingAlgorithm = {
  step: (state: SortingVisualizer): SortingVisualizer => {
    const newState = cloneSortingState(state);
    newState.currentStep++;
    
    // Clear previous comparison and swap highlighting
    newState.comparingIndices = [];
    newState.swappedIndices = [];
    
    const n = newState.array.length;
    
    // Calculate the current subarray size for this merge step
    // Start with size = 1, then 2, 4, 8, etc.
    const totalPhases = Math.ceil(Math.log2(n));
    const currentPhase = Math.min(Math.floor(state.currentStep / n), totalPhases - 1);
    const subarraySize = Math.pow(2, currentPhase);
    
    // Calculate which step we are in the current phase
    const phaseStep = state.currentStep % n;
    
    // If we're just starting a new phase
    if (phaseStep === 0) {
      newState.message = `Phase ${currentPhase + 1}: Merging subarrays of size ${subarraySize}`;
      return newState;
    }
    
    // Calculate the start of the left subarray for this step
    // We want to iterate through all pairs of subarrays in the current phase
    const leftStart = Math.floor((phaseStep - 1) / subarraySize) * subarraySize * 2;
    
    // If we've merged all pairs in this phase
    if (leftStart >= n) {
      // If this is the last phase, we're done
      if (currentPhase >= totalPhases - 1) {
        newState.completed = true;
        newState.sortedIndices = Array.from({ length: n }, (_, i) => i);
        newState.message = "Sorting completed!";
      } else {
        // Otherwise move to the next phase
        newState.message = `Moving to phase ${currentPhase + 2} (merging subarrays of size ${subarraySize * 2})`;
      }
      return newState;
    }
    
    // Calculate middle and right boundary
    const middle = Math.min(leftStart + subarraySize, n);
    const rightEnd = Math.min(leftStart + 2 * subarraySize, n);
    
    // Prepare arrays for merging
    const leftArray = newState.array.slice(leftStart, middle);
    const rightArray = newState.array.slice(middle, rightEnd);
    
    // Visualization: Show which subarrays we're merging
    newState.message = `Merging subarrays [${leftStart}..${middle-1}] and [${middle}..${rightEnd-1}]`;
    
    // Real merge step (not using built-in sort)
    // Create auxiliary array for the merged result
    const merged = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    // Highlight the comparison we're making
    if (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      newState.comparingIndices = [leftStart + leftIndex, middle + rightIndex];
    }
    
    // Merge the arrays by selecting the smaller element each time
    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      if (leftArray[leftIndex] <= rightArray[rightIndex]) {
        merged.push(leftArray[leftIndex]);
        leftIndex++;
      } else {
        merged.push(rightArray[rightIndex]);
        rightIndex++;
      }
    }
    
    // Add remaining elements
    while (leftIndex < leftArray.length) {
      merged.push(leftArray[leftIndex]);
      leftIndex++;
    }
    
    while (rightIndex < rightArray.length) {
      merged.push(rightArray[rightIndex]);
      rightIndex++;
    }
    
    // Copy merged array back to the original
    for (let i = 0; i < merged.length; i++) {
      newState.array[leftStart + i] = merged[i];
    }
    
    // Mark the merged section as sorted for this phase
    const mergedIndices = Array.from(
      { length: rightEnd - leftStart },
      (_, i) => leftStart + i
    );
    
    // Add all merged indices to comparingIndices to highlight them
    newState.comparingIndices = mergedIndices;
    
    // If we're in the final phase, mark these sections as sorted permanently
    if (currentPhase === totalPhases - 1) {
      for (const idx of mergedIndices) {
        if (!newState.sortedIndices.includes(idx)) {
          newState.sortedIndices.push(idx);
        }
      }
    }
    
    // Check if we've completed all merges in the final phase
    if (currentPhase === totalPhases - 1 && rightEnd === n) {
      newState.completed = true;
      newState.sortedIndices = Array.from({ length: n }, (_, i) => i);
      newState.message = "Sorting completed!";
    }
    
    return newState;
  },
  
  totalSteps: (arrayLength: number): number => {
    // For merge sort, we have log₂n phases, each processing about n elements
    return arrayLength * Math.ceil(Math.log2(arrayLength));
  }
};

// Quick Sort Algorithm Implementation
const quickSort: SortingAlgorithm = {
  step: (state: SortingVisualizer): SortingVisualizer => {
    const newState = cloneSortingState(state);
    newState.currentStep++;

    newState.comparingIndices = [];
    newState.swappedIndices = [];
    
    const n = newState.array.length;
    const stack = state.stack || [{start: 0, end: n - 1}];
    newState.stack = stack;

    if (stack.length === 0) {
      newState.completed = true;
      newState.sortedIndices = Array.from({ length: n }, (_, i) => i);
      newState.message = "Sorting completed!";
      return newState;
    }

    const {start, end} = stack[stack.length - 1];
    
    if (start >= end) {
      stack.pop();
      if (!newState.sortedIndices.includes(start)) {
        newState.sortedIndices.push(start);
      }
      return newState;
    }

    const pivot = newState.array[end];
    let i = start - 1;

    for (let j = start; j < end; j++) {
      newState.comparingIndices = [j, end];
      newState.message = `Comparing ${newState.array[j]} with pivot ${pivot}`;
      
      if (newState.array[j] <= pivot) {
        i++;
        swap(newState.array, i, j);
        newState.swappedIndices = [i, j];
        newState.message = `Swapping ${newState.array[i]} with ${newState.array[j]}`;
      }
    }

    const pivotPos = i + 1;
    swap(newState.array, pivotPos, end);
    newState.swappedIndices = [pivotPos, end];
    newState.message = `Placing pivot ${pivot} in final position ${pivotPos}`;
    
    stack.pop();
    if (pivotPos + 1 < end) {
      stack.push({start: pivotPos + 1, end: end});
    }
    if (start < pivotPos - 1) {
      stack.push({start: start, end: pivotPos - 1});
    }

    newState.sortedIndices.push(pivotPos);
    
    return newState;
  },

  totalSteps: (arrayLength: number): number => {
    return arrayLength * Math.ceil(Math.log2(arrayLength));
  }
};

// Heap Sort Algorithm Implementation (simplified for visualization)
const heapSort: SortingAlgorithm = {
  step: (state: SortingVisualizer): SortingVisualizer => {
    const newState = cloneSortingState(state);
    newState.currentStep++;

    newState.comparingIndices = [];
    newState.swappedIndices = [];
    
    const n = newState.array.length;
    const getLeftChild = (i: number) => 2 * i + 1;
    const getRightChild = (i: number) => 2 * i + 2;
    const getParent = (i: number) => Math.floor((i - 1) / 2);

    const heapifyDown = (size: number, root: number) => {
      let largest = root;
      const left = getLeftChild(root);
      const right = getRightChild(root);

      if (left < size && newState.array[left] > newState.array[largest]) {
        largest = left;
      }
      if (right < size && newState.array[right] > newState.array[largest]) {
        largest = right;
      }

      if (largest !== root) {
        swap(newState.array, root, largest);
        newState.swappedIndices = [root, largest];
        heapifyDown(size, largest);
      }
    };

    // Build max heap phase (n steps)
    if (state.currentStep <= n) {
      const i = state.currentStep - 1;
      let current = i;
      
      while (current > 0 && newState.array[current] > newState.array[getParent(current)]) {
        const parent = getParent(current);
        swap(newState.array, current, parent);
        newState.swappedIndices = [current, parent];
        current = parent;
      }
      
      newState.message = `Building heap: inserted ${newState.array[i]}`;
    }
    // Heapify and extract phase (n steps)
    else if (state.currentStep <= 2 * n) {
      const heapSize = n - (state.currentStep - n - 1);
      
      // Extract max element
      swap(newState.array, 0, heapSize - 1);
      newState.swappedIndices = [0, heapSize - 1];
      newState.sortedIndices.push(heapSize - 1);
      
      // Restore heap property
      heapifyDown(heapSize - 1, 0);
      
      newState.message = `Extracting max element: ${newState.array[heapSize - 1]}`;
      
      if (heapSize === 1) {
        newState.completed = true;
        newState.sortedIndices = Array.from({ length: n }, (_, i) => i);
        newState.message = "Sorting completed!";
      }
    }

    return newState;
  },

  totalSteps: (arrayLength: number): number => {
    return 2 * arrayLength;
  }
};

// Export all sorting algorithms
export const sortingAlgorithms: Record<string, SortingAlgorithm> = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
  heap: heapSort
};

// Function to perform a single step of a sorting algorithm
export const performSortingStep = (
  algorithm: SortingAlgorithm,
  state: SortingVisualizer
): SortingVisualizer => {
  if (state.completed) {
    return state;
  }
  
  // If it's the first step, calculate the total number of steps
  if (state.currentStep === 0 && state.totalSteps === 0) {
    state.totalSteps = algorithm.totalSteps(state.array.length);
  }
  
  return algorithm.step(state);
};
