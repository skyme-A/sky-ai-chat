export function detectMood(lower) {
    if (lower.includes("sad")) return "sad";
    if (lower.includes("stress")) return "stressed";

    return "neutral";
}