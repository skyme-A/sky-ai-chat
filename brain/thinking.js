export function think(message, intent) {
    const lower = message.toLowerCase();

    if (lower.includes("what")) {
        return "definition";
    }

    if (lower.includes("how")) {
        return "stepwise";
    }

    if (lower.includes("why")) {
        return "explanation";
    }

    return "normal";
}