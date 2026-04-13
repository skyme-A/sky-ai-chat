export function lifeAnswer(lower, memory) {
    if (lower.includes("sad")) {
        memory.lastTopic = "sad";
        return "Bad days pass. Stay steady.";
    }

    if (lower.includes("career")) {
        memory.lastTopic = "career";
        return "Projects and consistency build career.";
    }

    if (lower.includes("motivation")) {
        memory.lastTopic = "motivation";
        return "Small progress daily matters.";
    }

    return "Life question detected.";
}