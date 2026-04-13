import { detectIntent } from "./intent.js";
import { getMemory, updateMemory } from "./memory.js";

import { dsaAnswer } from "./categories/dsa.js";
import { codingAnswer } from "./categories/coding.js";
import { lifeAnswer } from "./categories/life.js";
import { mathAnswer } from "./categories/math.js";
import { generalAnswer } from "./categories/general.js";

export function answerEngine(message) {
    const lower = message.toLowerCase();

    const memory = getMemory();

    const intent = detectIntent(lower);

    let reply = "";

    if (intent === "dsa") {
        reply = dsaAnswer(lower, memory, message);
    } else if (intent === "coding") {
        reply = codingAnswer(lower, memory);
    } else if (intent === "life") {
        reply = lifeAnswer(lower, memory);
    } else if (intent === "math") {
        reply = mathAnswer(lower, message);
    } else {
        reply = generalAnswer(message, memory);
    }

    memory.lastQuestion = message;

    updateMemory(memory);

    return reply;
}