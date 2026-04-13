import fs from "fs";

const file = "./memory/userMode.json";

export function getMode() {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(
            file,
            JSON.stringify({
                mode: "normal",
                mood: "neutral"
            })
        );
    }

    return JSON.parse(fs.readFileSync(file, "utf-8"));
}