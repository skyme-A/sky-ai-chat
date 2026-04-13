export function adaptAnswer(answer, profile) {
    if (profile.answerLength === "short") {
        return answer.split(".")[0] + ".";
    }

    if (profile.answerLength === "long") {
        return answer + " More detail added.";
    }

    return answer;
}