export function codingAnswer(lower, memory) {
    if (lower.includes("react")) {
        memory.lastTopic = "react";
        return "React uses components and virtual DOM.";
    }

    if (lower.includes("javascript")) {
        memory.lastTopic = "javascript";
        return "JavaScript is single-threaded.";
    }

    if (lower.includes("node")) {
        memory.lastTopic = "node";
        return "Node.js runs JavaScript outside browser.";
    }

    return "Coding concept detected.";
}