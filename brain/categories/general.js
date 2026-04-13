
import fs from "fs";

export function generalAnswer(message, memory) {
    const lower = message.toLowerCase();

    if (lower.includes("save note")) {
        const note = message.replace(/save note/i, "").trim();

        fs.writeFileSync("./notes.txt", note + "\n", {
            flag: "a",
        });

        return `Note saved: ${note}`;
    }

    if (
        lower.includes("show notes") ||
        lower.includes("my notes")
    ) {
        if (!fs.existsSync("./notes.txt")) {
            return "No notes saved yet.";
        }

        const notes = fs.readFileSync("./notes.txt", "utf-8");

        return notes || "No notes available.";
    }

    if (
        lower.includes("aur") &&
        memory.lastTopic === "binary search"
    ) {
        return "Binary Search repeatedly halves the search space.";
    }

    if (
        lower.includes("hi") ||
        lower.includes("hello")
    ) {
        return "Hello 👋 I am SKY.";
    }

    return `SKY says: ${message}`;
}