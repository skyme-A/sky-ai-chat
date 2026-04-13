export function explainByLevel(answer, topic, level) {
    if (level === "advanced") {
        return answer + " Advanced explanation included.";
    }

    return answer;
}