export function selfCorrect(answer, intent) {
    if (intent === "dsa" && !answer.includes("O(")) {
        return answer + " Time complexity matters.";
    }

    if (intent === "coding") {
        return answer + " Practical understanding helps.";
    }

    return answer;
}