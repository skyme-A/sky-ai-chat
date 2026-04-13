import fs from "fs";

const file = "./memory/memory.json";

export function getMemory() {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(
            file,
            JSON.stringify({
                lastTopic: "",
                lastQuestion: ""
            })
        );
    }

    return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function updateMemory(data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}