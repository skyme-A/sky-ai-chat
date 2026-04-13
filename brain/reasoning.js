export function reason(message) {
    const lower = message.toLowerCase();

    if (lower.includes("why")) {
        return "reasoning";
    }

    if (lower.includes("difference")) {
        return "comparison";
    }

    return "normal";
}