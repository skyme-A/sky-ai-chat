export function detectIntent(lower) {
    if (
        lower.includes("binary search") ||
        lower.includes("array") ||
        lower.includes("stack") ||
        lower.includes("queue")
    ) {
        return "dsa";
    }

    if (
        lower.includes("react") ||
        lower.includes("javascript") ||
        lower.includes("node")
    ) {
        return "coding";
    }

    if (
        lower.includes("sad") ||
        lower.includes("career") ||
        lower.includes("motivation")
    ) {
        return "life";
    }

    if (
        lower.includes("add") ||
        lower.includes("multiply")
    ) {
        return "math";
    }

    return "general";
}