import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default function Alerts() {

    const [alerts] = useState([
        {
            id: 1,
            type: "High Financial Risk",
            business: "Priya Foods",
            message: "Business risk score exceeded 80.",
            time: "2 minutes ago",
            level: "High"
        },
        {
            id: 2,
            type: "Unusual Spending Pattern",
            business: "Neha Tech",
            message: "Expenses increased 40% in the last week.",
            time: "10 minutes ago",
            level: "Medium"
        },
        {
            id: 3,
            type: "Low Cash Runway",
            business: "Aman Traders",
            message: "Cash runway below 3 months.",
            time: "30 minutes ago",
            level: "High"
        },
        {
            id: 4,
            type: "Stable Financial Activity",
            business: "Mehta Manufacturing",
            message: "No abnormal financial patterns detected.",
            time: "1 hour ago",
            level: "Low"
        }
    ]);

    return (
        <div style={{ flex: 1, padding: "25px" }}>

            <h1 style={{ color: "#38bdf8", marginBottom: "20px" }}>
                AI Alert Center
            </h1>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>

                {alerts.map(a => (
                    <div key={a.id} style={{
                        background: "#020617",
                        padding: "18px",
                        borderRadius: "12px",
                        border: "1px solid #1e293b",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>

                        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

                            <FiAlertTriangle size={22} color={getColor(a.level)} />

                            <div>

                                <p style={{ color: "#cbd5f5", fontWeight: "600" }}>
                                    {a.type}
                                </p>

                                <p style={{ color: "#94a3b8" }}>
                                    {a.business} — {a.message}
                                </p>

                            </div>

                        </div>

                        <p style={{ color: "#64748b", fontSize: "13px" }}>
                            {a.time}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    );
}

function getColor(level) {
    if (level === "High") return "#ef4444";
    if (level === "Medium") return "#f59e0b";
    return "#22c55e";
}