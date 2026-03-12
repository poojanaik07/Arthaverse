import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts";

export default function Analytics() {

    const transactionData = [
        { month: "Jan", transactions: 120 },
        { month: "Feb", transactions: 210 },
        { month: "Mar", transactions: 300 },
        { month: "Apr", transactions: 280 },
        { month: "May", transactions: 390 },
        { month: "Jun", transactions: 420 }
    ];

    const riskData = [
        { level: "Low Risk", businesses: 42 },
        { level: "Medium Risk", businesses: 18 },
        { level: "High Risk", businesses: 7 }
    ];

    return (

        <div style={{ flex: 1, padding: "25px" }}>

            <h1 style={{ color: "#38bdf8", marginBottom: "20px" }}>
                Platform Analytics
            </h1>

            {/* TRANSACTION TREND */}

            <div style={{
                background: "#020617",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #1e293b",
                marginBottom: "25px"
            }}>

                <h3 style={{ color: "#38bdf8", marginBottom: "10px" }}>
                    Transaction Volume Trend
                </h3>

                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={transactionData}>
                        <CartesianGrid stroke="#1e293b" />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Line type="monotone" dataKey="transactions" stroke="#22c55e" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>

            </div>

            {/* RISK DISTRIBUTION */}

            <div style={{
                background: "#020617",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #1e293b"
            }}>

                <h3 style={{ color: "#38bdf8", marginBottom: "10px" }}>
                    Business Risk Distribution
                </h3>

                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={riskData}>
                        <CartesianGrid stroke="#1e293b" />
                        <XAxis dataKey="level" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Bar dataKey="businesses" fill="#38bdf8" />
                    </BarChart>
                </ResponsiveContainer>

            </div>

        </div>

    );
}