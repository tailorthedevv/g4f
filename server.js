const { G4F } = require("g4f");
const g4f = new G4F();
const messages = [
    { role: "user", content: "Hi, what's up?"}
];
g4f.chatCompletion(messages).then(console.log);
