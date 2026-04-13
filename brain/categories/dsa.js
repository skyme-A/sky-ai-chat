export function dsaAnswer(lower, memory) {
    if (lower.includes("binary search")) {
        memory.lastTopic = "binary search";
        return "Binary Search works on sorted arrays in O(log n).";
    }

    if (lower.includes("array")) {
        memory.lastTopic = "array";
        return "Array stores elements in contiguous memory.";
    }

    if (lower.includes("stack")) {
        memory.lastTopic = "stack";
        return "Stack follows LIFO.";
    }

    if (lower.includes("queue")) {
        memory.lastTopic = "queue";
        return "Queue follows FIFO.";
    }

    return "DSA concept detected.";
}