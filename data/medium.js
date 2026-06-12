// data/medium.js
const MEDIUM_TEXTS = {
    programming: [
        "int main() { std::cout << \"Hello World\"; return 0; }",
        "const calculateWpm = (chars, time) => (chars / 5) / (time / 60);",
        "for (let i = 0; i < array.length; i++) { console.log(array[i]); }",
        "if (accuracy >= 95 && speed > 60) { unlockAchievement('pro'); }",
        "class TypingEngine { constructor() { this.isActive = false; } }"
    ],
    technology: [
        "Modern cloud infrastructure scales dynamically using containerized microservices.",
        "Asynchronous non-blocking events allow high throughput in modern networking stacks.",
        "Responsive fluid typography alters its baseline layout smoothly using CSS container queries.",
        "The Document Object Model handles recursive element mutations natively via observers.",
        "Hardware acceleration channels visual layers into GPU graphic cards for optimal performance."
    ],
    quotes: [
        "Programs must be written for people to read, and only incidentally for machines to execute.",
        "Walking on water and developing software from a specification are easy if both are frozen.",
        "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
    ]
};

window.MEDIUM_TEXTS = MEDIUM_TEXTS;