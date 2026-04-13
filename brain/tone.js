export function toneAnswer(answer, mood) {
    if (mood === "sad") {
        return answer + " Keep patience 🌿";
    }

    if (mood === "stressed") {
        return answer + " One step at a time ⚡";
    }

    return answer;
}