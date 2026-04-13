import readline from "readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/* typing effect */
async function typeEffect(text) {
    for (const char of text) {
        process.stdout.write(char);
        await new Promise((resolve) => setTimeout(resolve, 15));
    }

    process.stdout.write("\n");
}

/* chat loop */
async function chatLoop() {
    console.log("Connected to SKY backend ✨");

    while (true) {
        const input = await rl.question("You: ");

        if (input.toLowerCase() === "exit") {
            console.log("AI: Goodbye 👋");
            process.exit();
        }

        try {
            const API_URL =
                import.meta.env.MODE === "development"
                    ? "http://localhost:3001/chat"
                    : "https://YOUR-BACKEND-URL/chat";

            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: input,
                }),
            });

            const data = await res.json();

            process.stdout.write("AI: ");
            await typeEffect(data.reply || "Thinking like SKY ✨");
        } catch (error) {
            console.log("AI: Backend connection failed");
        }
    }
}

chatLoop();