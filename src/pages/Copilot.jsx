import { useState } from "react";

export default function Copilot() {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([
        {
            role: "ai",
            text: "Hello! I'm ArthaVerse AI Copilot. Ask me about cash flow, growth, or financial risk."
        }
    ]);

    function generateAnswer(q) {

        const question = q.toLowerCase();

        if (question.includes("cash")) {
            return "Maintaining at least 3 months of cash runway improves financial stability. You can improve cash flow by speeding up receivables and reducing unnecessary expenses.";
        }

        if (question.includes("growth")) {
            return "To increase business growth, focus on improving marketing ROI, inventory turnover, and customer retention strategies.";
        }

        if (question.includes("risk")) {
            return "Financial risk can be reduced by maintaining strong liquidity, lowering debt exposure, and ensuring consistent revenue streams.";
        }

        if (question.includes("profit")) {
            return "Improving profit margins usually involves optimizing operational costs and increasing pricing power or sales volume.";
        }

        return "Based on your financial metrics, ArthaVerse AI recommends maintaining healthy cash flow, sustainable growth strategies, and disciplined expense control.";
    }

    function askAI() {

        if (!question.trim()) return;

        const userMessage = {
            role: "user",
            text: question
        };

        const aiMessage = {
            role: "ai",
            text: generateAnswer(question)
        };

        setMessages([...messages, userMessage, aiMessage]);
        setQuestion("");
    }

    const suggestions = [
        "How can I improve cash flow?",
        "Is my business financially risky?",
        "How can I grow revenue faster?",
        "How do I improve profitability?"
    ];

    return (
        <div style={{ padding: "30px", width: "100%", color: "white" }}>

            <h2 style={{ color: "#22d3ee", marginBottom: "10px" }}>
                🤖 ArthaVerse AI Copilot
            </h2>

            <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
                Your AI financial advisor for business intelligence.
            </p>

            {/* Chat Window */}

            <div
                style={{
                    background: "#020617",
                    border: "1px solid #1e293b",
                    borderRadius: "12px",
                    padding: "20px",
                    height: "400px",
                    overflowY: "auto",
                    marginBottom: "20px"
                }}
            >

                {messages.map((msg, index) => (

                    <div
                        key={index}
                        style={{
                            display: "flex",
                            justifyContent:
                                msg.role === "user" ? "flex-end" : "flex-start",
                            marginBottom: "12px"
                        }}
                    >

                        <div
                            style={{
                                background:
                                    msg.role === "user" ? "#06b6d4" : "#111827",
                                padding: "10px 14px",
                                borderRadius: "10px",
                                maxWidth: "70%",
                                color: "white"
                            }}
                        >
                            {msg.text}
                        </div>

                    </div>
                ))}

            </div>

            {/* Suggested Questions */}

            <div style={{ marginBottom: "15px" }}>

                {suggestions.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => setQuestion(s)}
                        style={{
                            marginRight: "10px",
                            marginBottom: "10px",
                            padding: "6px 12px",
                            background: "#111827",
                            border: "1px solid #1e293b",
                            borderRadius: "20px",
                            color: "#94a3b8",
                            cursor: "pointer"
                        }}
                    >
                        {s}
                    </button>
                ))}

            </div>

            {/* Input */}

            <div style={{ display: "flex", gap: "10px" }}>

                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask something about your business..."
                    style={{
                        flex: 1,
                        padding: "12px",
                        background: "#111827",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                        color: "white"
                    }}
                />

                <button
                    onClick={askAI}
                    style={{
                        padding: "12px 18px",
                        background: "#22c55e",
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Ask
                </button>

            </div>

        </div>
    );
}