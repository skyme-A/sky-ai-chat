export function selectBest(candidates) {
    if (!candidates || candidates.length === 0) {
        return "No answer available";
    }

    return candidates[0];
}