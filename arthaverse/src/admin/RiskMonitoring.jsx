import { useState } from "react";

export default function RiskMonitoring() {

    const [businesses] = useState([
        {
            id: 1,
            name: "Priya Foods",
            riskScore: 82,
            reason: "Negative profit + low cash runway",
            status: "High"
        },
        {
            id: 2,
            name: "Neha Tech",
            riskScore: 64,
            reason: "Expenses increasing faster than revenue",
            status: "Medium"
        },
        {
            id: 3,
            name: "Aman Traders",
            riskScore: 32,
            reason: "Stable revenue growth",
            status: "Low"
        },
        {
            id: 4,
            name: "Mehta Manufacturing",
            riskScore: 74,
            reason: "High operational expenses",
            status: "High"
        }
    ]);

    return (
        <div style={{ flex: 1, padding: "25px" }}>

            <h1 style={{ color: "#38bdf8", marginBottom: "20px" }}>
                Financial Risk Monitoring
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
                            <th style={th}>Business</th>
                            <th style={th}>Risk Score</th>
                            <th style={th}>Risk Level</th>
                            <th style={th}>Reason</th>
                        </tr>
                    </thead>

                    <tbody>
                        {businesses.map((b) => (
                            <tr key={b.id} style={{ borderTop: "1px solid #1e293b" }}>
                                <td style={td}>{b.name}</td>
                                <td style={{ ...td, color: getRiskColor(b.riskScore) }}>
                                    {b.riskScore}
                                </td>
                                <td style={{ ...td, color: getStatusColor(b.status) }}>
                                    {b.status}
                                </td>
                                <td style={td}>{b.reason}</td>
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
    fontWeight: "600"
};

const td = {
    padding: "14px",
    color: "#cbd5f5"
};

function getRiskColor(score) {
    if (score > 70) return "#ef4444";
    if (score > 40) return "#f59e0b";
    return "#22c55e";
}

function getStatusColor(level) {
    if (level === "High") return "#ef4444";
    if (level === "Medium") return "#f59e0b";
    return "#22c55e";
}