import { useState } from "react";

export default function Transactions() {
    const [transactions] = useState([
        { id: "TXN001", user: "Aman Traders", amount: 2500, category: "Marketing", date: "Today", risk: "Low" },
        { id: "TXN002", user: "Neha Tech", amount: 15000, category: "Inventory", date: "Today", risk: "Medium" },
        { id: "TXN003", user: "Mehta Manufacturing", amount: 90000, category: "Equipment", date: "Yesterday", risk: "High" },
        { id: "TXN004", user: "Priya Foods", amount: 1200, category: "Subscription", date: "Yesterday", risk: "Low" },
    ]);

    return (
        <div style={{ flex: 1, padding: "25px" }}>
            <h1 style={{ color: "#38bdf8", marginBottom: "20px" }}>
                Transaction Monitoring
            </h1>

            <div
                style={{
                    background: "#020617",
                    border: "1px solid #1e293b",
                    borderRadius: "14px",
                    overflow: "hidden"
                }}
            >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#021b22" }}>
                        <tr>
                            <th style={th}>Transaction ID</th>
                            <th style={th}>Business</th>
                            <th style={th}>Amount</th>
                            <th style={th}>Category</th>
                            <th style={th}>Date</th>
                            <th style={th}>Risk Flag</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((t) => (
                            <tr key={t.id} style={{ borderTop: "1px solid #1e293b" }}>
                                <td style={td}>{t.id}</td>
                                <td style={td}>{t.user}</td>
                                <td style={td}>₹{t.amount.toLocaleString()}</td>
                                <td style={td}>{t.category}</td>
                                <td style={td}>{t.date}</td>
                                <td style={{ ...td, color: getRiskColor(t.risk) }}>{t.risk}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const th = {
    textAlign: "left",
    padding: "14px",
    color: "#94a3b8",
    fontWeight: "600",
};

const td = {
    padding: "14px",
    color: "#cbd5f5",
};

function getRiskColor(level) {
    if (level === "High") return "#ef4444";
    if (level === "Medium") return "#f59e0b";
    return "#22c55e";
}