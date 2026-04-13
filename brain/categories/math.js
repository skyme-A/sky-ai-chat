export function mathAnswer(lower, message) {
    if (lower.includes("add")) {
        const nums = message.match(/\d+/g);

        if (nums && nums.length >= 2) {
            return `Sum = ${Number(nums[0]) + Number(nums[1])}`;
        }
    }

    if (lower.includes("multiply")) {
        const nums = message.match(/\d+/g);

        if (nums && nums.length >= 2) {
            return `Multiply = ${Number(nums[0]) * Number(nums[1])}`;
        }
    }

    return "Math question detected.";
}