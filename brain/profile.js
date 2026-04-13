import fs from "fs";

const file = "./memory/userProfile.json";

export function getProfile() {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(
            file,
            JSON.stringify({
                answerLength: "normal",
                mode: "simple"
            })
        );
    }

    return JSON.parse(fs.readFileSync(file, "utf-8"));
}