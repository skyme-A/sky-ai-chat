import fs from "fs";

const file = "./memory/level.json";

export function getLevel() {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(
            file,
            JSON.stringify({
                level: "beginner"
            })
        );
    }

    return JSON.parse(fs.readFileSync(file, "utf-8"));
}