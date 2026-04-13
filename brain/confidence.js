export function confidenceScore(intent) {
    if (
        intent === "dsa" ||
        intent === "coding" ||
        intent === "math"
    ) {
        return "high";
    }

    return "medium";
}