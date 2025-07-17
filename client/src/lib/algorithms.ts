import { Algorithm } from "@/types";

export const algorithms: Algorithm[] = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    shortDescription: "A simple comparison-based algorithm that repeatedly steps through the list and swaps adjacent elements if they're in the wrong order.",
    description: {
      part1: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
      part2: "The pass through the list is repeated until the list is sorted. The algorithm gets its name because smaller elements \"bubble\" to the top of the list."
    },
    steps: [
      "Start at the beginning of the array",
      "Compare adjacent elements, if the left element is greater than the right element, swap them",
      "Move to the next pair of adjacent elements and repeat step 2",
      "After reaching the end of the array, if any swaps were made, repeat from step 1",
      "If no swaps were made in a complete pass, the array is sorted"
    ],
    timeComplexity: "O(n²)",
    bestCase: "O(n)",
    bestCaseExplanation: "(already sorted)",
    spaceComplexity: "O(1)",
    stability: "Stable",
    analogy: "Imagine you have a row of books on a shelf, arranged by height. To sort them, you start at one end and look at pairs of adjacent books. If a book is taller than the one to its right, you swap them. You continue this process, making multiple passes through the shelf until all books are in order.",
    pseudocode: 
`procedure bubbleSort(A: list of sortable items)
    n = length(A)
    repeat
        swapped = false
        for i = 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped = true
            end if
        end for
        n = n - 1
    until not swapped
end procedure`,
    previewBars: [40, 80, 20, 60, 30, 70, 50, 90],
    highlightIndex: 2
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    shortDescription: "An efficient, stable, divide-and-conquer algorithm that splits, sorts, and merges arrays to achieve a sorted result.",
    description: {
      part1: "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.",
      part2: "The key operation is the merging of two sorted subarrays into a single sorted array. This algorithm has a guaranteed worst-case performance, making it reliable for various data sets."
    },
    steps: [
      "Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted)",
      "Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining",
      "During the merge step, compare the elements of both sublists and place the smaller element into the result list",
      "Continue this process until one sublist is empty",
      "Append the remaining elements of the non-empty sublist to the result list"
    ],
    timeComplexity: "O(n log n)",
    bestCase: "O(n log n)",
    bestCaseExplanation: "(consistent)",
    spaceComplexity: "O(n)",
    stability: "Stable",
    analogy: "Imagine you're organizing a deck of cards. You split the deck in half, and then split each half again, and so on until you have individual cards. Then you start merging them back together in sorted order, always comparing the two cards at the top of each pile and selecting the smaller one first.",
    pseudocode: 
`procedure mergeSort(A: list of sortable items)
    if length(A) <= 1 then
        return A
    
    // Divide
    middle = length(A) / 2
    left = mergeSort(A[0...middle-1])
    right = mergeSort(A[middle...length(A)-1])
    
    // Merge
    return merge(left, right)
end procedure

procedure merge(left, right: list of sortable items)
    result = empty list
    while left is not empty and right is not empty do
        if first(left) <= first(right) then
            append first(left) to result
            left = rest(left)
        else
            append first(right) to result
            right = rest(right)
        end if
    end while
    
    // Append what's left
    append remaining elements of left to result
    append remaining elements of right to result
    return result
end procedure`,
    previewBars: [20, 30, 40, 50, 60, 70, 80, 90],
    highlightIndex: -1
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    shortDescription: "A highly efficient divide-and-conquer algorithm that selects a pivot element and partitions the array around it.",
    description: {
      part1: "Quick Sort is a divide-and-conquer algorithm that picks an element as a pivot and partitions the array around the chosen pivot. Different versions of quicksort select the pivot in different ways.",
      part2: "After partitioning, the pivot is in its final position, with all smaller elements to the left and all greater elements to the right. The algorithm is then recursively applied to both subarrays."
    },
    steps: [
      "Choose a pivot element from the array",
      "Partition the array: reorder it so that elements less than the pivot come before it, and elements greater than the pivot come after it",
      "The pivot is now in its final sorted position",
      "Recursively apply the above steps to the sub-array of elements less than the pivot",
      "Recursively apply the above steps to the sub-array of elements greater than the pivot"
    ],
    timeComplexity: "O(n log n)",
    bestCase: "O(n log n)",
    bestCaseExplanation: "(balanced partitions)",
    spaceComplexity: "O(log n)",
    stability: "Unstable",
    analogy: "Imagine you are organizing a group of people by height. You pick one person (the pivot) and have everyone shorter stand to the left and everyone taller stand to the right. The pivot is now in the correct position. You then repeat this process with the left and right groups independently.",
    pseudocode: 
`procedure quickSort(A: list of sortable items, low, high: indices)
    if low < high then
        // Partition the array and get the pivot index
        pivotIndex = partition(A, low, high)
        
        // Sort the elements before and after the pivot
        quickSort(A, low, pivotIndex - 1)
        quickSort(A, pivotIndex + 1, high)
    end if
end procedure

procedure partition(A: list of sortable items, low, high: indices)
    pivot = A[high]  // Choose the rightmost element as pivot
    i = low - 1
    
    for j = low to high - 1 do
        if A[j] <= pivot then
            i = i + 1
            swap A[i] with A[j]
        end if
    end for
    
    swap A[i + 1] with A[high]
    return i + 1
end procedure`,
    previewBars: [70, 30, 90, 20, 80, 50, 40, 60],
    highlightIndex: 2
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    shortDescription: "A simple sorting algorithm that builds the final sorted array one item at a time, efficient for small data sets.",
    description: {
      part1: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is efficient for small data sets and is often used as part of more sophisticated algorithms.",
      part2: "The algorithm works by taking one element from the input array and inserting it into the correct position in a growing sorted array, similar to how we sort playing cards in our hands."
    },
    steps: [
      "Start with the second element (consider the first element as already sorted)",
      "Compare the current element with the previous elements",
      "If the previous element is greater than the current element, move the previous element one position up",
      "Repeat step 3 until you find the correct position for the current element",
      "Insert the current element at the correct position",
      "Repeat steps 2-5 for all elements in the array"
    ],
    timeComplexity: "O(n²)",
    bestCase: "O(n)",
    bestCaseExplanation: "(already sorted)",
    spaceComplexity: "O(1)",
    stability: "Stable",
    analogy: "Imagine you're sorting a hand of playing cards. You start with one card and then pick up one card at a time, inserting each new card into its proper position among the cards you've already sorted. You compare the new card with each card in your hand, moving from right to left, until you find the right place for it.",
    pseudocode: 
`procedure insertionSort(A: list of sortable items)
    for i = 1 to length(A) - 1 inclusive do
        current = A[i]
        j = i - 1
        
        // Move elements of A[0...i-1] that are greater than current
        // to one position ahead of their current position
        while j >= 0 and A[j] > current do
            A[j + 1] = A[j]
            j = j - 1
        end while
        
        A[j + 1] = current
    end for
end procedure`,
    previewBars: [50, 30, 10, 80, 40, 60, 90, 20],
    highlightIndex: 4
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    shortDescription: "A simple comparison sort that finds the minimum element and swaps it with the first unsorted element.",
    description: {
      part1: "Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist.",
      part2: "The algorithm repeatedly selects the smallest (or largest) element from the unsorted sublist and moves it to the sorted sublist. This process continues until the entire list is sorted."
    },
    steps: [
      "Find the minimum element in the unsorted part of the array",
      "Swap it with the first element of the unsorted part",
      "Move the boundary between the sorted and unsorted parts one element to the right",
      "Repeat until the entire array is sorted"
    ],
    timeComplexity: "O(n²)",
    bestCase: "O(n²)",
    bestCaseExplanation: "(always the same)",
    spaceComplexity: "O(1)",
    stability: "Unstable",
    analogy: "Imagine you have a list of numbers written on a whiteboard. To sort them, you first find the smallest number in the entire list and swap it with the first number. Then you find the smallest number in the remaining unsorted list (starting from the second position) and swap it with the second number. You continue this process until the entire list is sorted.",
    pseudocode: 
`procedure selectionSort(A: list of sortable items)
    n = length(A)
    for i = 0 to n - 2 do
        // Find the minimum element in the unsorted part
        minIndex = i
        for j = i + 1 to n - 1 do
            if A[j] < A[minIndex] then
                minIndex = j
            end if
        end for
        
        // Swap the found minimum element with A[i]
        if minIndex != i then
            swap A[i] with A[minIndex]
        end if
    end for
end procedure`,
    previewBars: [60, 20, 80, 10, 70, 30, 90, 40],
    highlightIndex: 3
  },
  {
    id: "heap-sort",
    name: "Heap Sort",
    shortDescription: "An efficient comparison-based sorting algorithm that uses a binary heap data structure.",
    description: {
      part1: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It is similar to selection sort where we first find the maximum element and place it at the end.",
      part2: "The algorithm works by first building a max-heap from the input array, then repeatedly extracting the maximum element and rebuilding the heap until the array is sorted."
    },
    steps: [
      "Build a max heap from the input data",
      "Swap the root (maximum element) with the last element of the heap",
      "Reduce the heap size by 1",
      "Heapify the root element to ensure the heap property is maintained",
      "Repeat steps 2-4 until the heap size is 1"
    ],
    timeComplexity: "O(n log n)",
    bestCase: "O(n log n)",
    bestCaseExplanation: "(always the same)",
    spaceComplexity: "O(1)",
    stability: "Unstable",
    analogy: "Imagine organizing a tournament where the winner (largest element) of each round is moved to the end of the line and can't compete anymore. You reorganize the remaining contestants into a new tournament structure after each round. The process continues until all contestants are lined up in order.",
    pseudocode: 
`procedure heapSort(A: list of sortable items)
    n = length(A)
    
    // Build max heap
    for i = n/2 - 1 down to 0 do
        heapify(A, n, i)
    end for
    
    // Extract elements from heap one by one
    for i = n - 1 down to 0 do
        swap A[0] with A[i]
        heapify(A, i, 0)
    end for
end procedure

procedure heapify(A: list of sortable items, n: size of heap, i: index)
    largest = i
    left = 2*i + 1
    right = 2*i + 2
    
    // See if left child of root exists and is greater than root
    if left < n and A[left] > A[largest] then
        largest = left
    end if
    
    // See if right child of root exists and is greater than root
    if right < n and A[right] > A[largest] then
        largest = right
    end if
    
    // Change root if needed
    if largest != i then
        swap A[i] with A[largest]
        heapify(A, n, largest)
    end if
end procedure`,
    previewBars: [75, 35, 65, 15, 55, 25, 85, 45],
    highlightIndex: -1
  }
];
