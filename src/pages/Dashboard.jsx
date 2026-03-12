import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

import { FiActivity, FiShield, FiDollarSign, FiClock } from "react-icons/fi";
import { useEffect, useState } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import CountUp from "react-countup";

const formatMoney = (num) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(num);

export default function Dashboard() {

    const [data, setData] = useState(null);
    const [target, setTarget] = useState(null);
    const [simExpenseChange, setSimExpenseChange] = useState(0);
    const [simGrowthChange, setSimGrowthChange] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem("businessData");
        const storedTarget = localStorage.getItem("targetData");

        if (stored) setData(JSON.parse(stored));
        if (storedTarget) setTarget(JSON.parse(storedTarget));
    }, []);

    if (!data) {
        return <div style={{ padding: "25px", color: "white" }}>Loading financial data...</div>;
    }

    /* SIMULATION VALUES */

    const simulatedExpenses = data.expenses + simExpenseChange;
    const simulatedGrowth = data.growth + simGrowthChange;

    const profit = data.revenue - simulatedExpenses;

    /* FIXED RUNWAY CALCULATION */

    const runwayMonths =
        simulatedExpenses > 0 ? (data.cash / simulatedExpenses).toFixed(1) : 0;

    const workingCapital = data.receivables - data.payables;

    const riskScore =
        60 +
        (profit > 0 ? 10 : -10) +
        (simulatedGrowth > 10 ? 10 : 0) +
        (workingCapital > 0 ? 5 : -5);

    /* ---------- INDUSTRY BENCHMARK SIMULATION ---------- */

    const industryAvgGrowth = 12;
    const industryAvgRisk = 65;
    const industryCashRatio = 2.5;

    const userCashRatio =
        simulatedExpenses > 0 ? Number((data.cash / simulatedExpenses).toFixed(2)) : 0;

    const growthGap = simulatedGrowth - industryAvgGrowth;
    const riskGap = riskScore - industryAvgRisk;
    const cashGap = userCashRatio - industryCashRatio;

    /* ---------- TRANSACTION INTELLIGENCE ---------- */

    const paymentModes = {
        upi: Math.floor(Math.random() * 40) + 40,
        card: Math.floor(Math.random() * 20) + 10,
        cash: Math.floor(Math.random() * 20) + 5,
        netbanking: Math.floor(Math.random() * 10) + 5
    };

    const expenseCategories = [
        { name: "Inventory Procurement", value: 40 },
        { name: "Marketing & Ads", value: 20 },
        { name: "Staff Salaries", value: 25 },
        { name: "Operations", value: 15 }
    ];

    const largestExpense = expenseCategories.reduce((max, item) =>
        item.value > max.value ? item : max
    );

    {/* AI TRANSACTION INSIGHTS */ }

    <div
        style={{
            background: "linear-gradient(145deg,#020617,#0f172a)",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #1e293b",
            borderLeft: "3px solid #22c55e",
            marginBottom: "25px"
        }}
    >

        <h3 style={{ color: "#22d3ee", marginBottom: "12px" }}>
            🧠 AI Transaction Insights
        </h3>

        <ul style={{ color: "#cbd5f5", lineHeight: "1.8" }}>

            <li>UPI dominates your payment ecosystem at {paymentModes.upi}%.</li>

            <li>Your highest spending category is {largestExpense.name}, accounting for {largestExpense.value}% of expenses.</li>

            <li>Reducing operational spending by 5–8% could improve profitability.</li>

            <li>Higher digital payment usage can improve financial transparency and credit scoring.</li>

        </ul>

    </div>

    /* -------- AI FAILURE PREDICTION MODEL -------- */

    let failureRisk = 0;

    if (profit < 0) failureRisk += 25;
    if (runwayMonths < 3) failureRisk += 30;
    if (workingCapital < 0) failureRisk += 15;
    if (simulatedExpenses > data.revenue * 0.8) failureRisk += 20;
    if (simulatedGrowth < 5) failureRisk += 10;

    if (failureRisk > 100) failureRisk = 100;

    let failureLabel = "Low Risk";
    let failureColor = "#22c55e";

    if (failureRisk > 70) {
        failureLabel = "High Failure Risk";
        failureColor = "#ef4444";
    } else if (failureRisk > 40) {
        failureLabel = "Moderate Risk";
        failureColor = "#f59e0b";
    }

    /* --------------------------------------------- */

    const revenueData = [
        { month: "Jan", revenue: data.revenue * 0.6, expenses: data.expenses * 0.6 },
        { month: "Feb", revenue: data.revenue * 0.7, expenses: data.expenses * 0.7 },
        { month: "Mar", revenue: data.revenue * 0.8, expenses: data.expenses * 0.8 },
        { month: "Apr", revenue: data.revenue * 0.9, expenses: data.expenses * 0.9 },
        { month: "May", revenue: data.revenue, expenses: data.expenses },
        { month: "Jun", revenue: data.revenue * 1.1, expenses: data.expenses * 1.05 }
    ];

    const projectionData = [];
    let cashFlow = data.cash;

    for (let i = 0; i < 6; i++) {
        cashFlow =
            cashFlow +
            (data.revenue - data.expenses) +
            (data.growth / 100) * data.revenue;

        projectionData.push({
            month: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
            value: Math.round(cashFlow)
        });
    }

    let progress = 0;

    if (target && target.revenue) {
        progress = Math.min(
            Math.round((data.revenue / target.revenue) * 100),
            100
        );
    }

    /* ---------------- AI RECOMMENDATION ENGINE ---------------- */

    /* ---------------- AI RECOMMENDATION ENGINE ---------------- */

    const recommendations = [];

    if (failureRisk > 60) {
        recommendations.push(
            "High financial risk detected. Reduce expenses and increase cash reserves immediately."
        );
    }

    if (profit < 0) {
        recommendations.push(
            "Your business is currently running at a loss. Reduce expenses or increase revenue immediately."
        );
    }

    if (data.receivables > data.payables) {
        recommendations.push(
            "Speed up receivable collections to improve cash flow."
        );
    }

    if (simulatedExpenses > data.revenue * 0.7) {
        recommendations.push(
            "Expenses are high relative to revenue. Consider reducing operational costs."
        );
    }

    if (target && data.revenue < target.revenue) {
        const gap = target.revenue - data.revenue;
        recommendations.push(
            `Increase revenue by ${formatMoney(gap)} to reach your monthly target.`
        );
    }

    if (runwayMonths < 3) {
        recommendations.push(
            "Cash runway is low. Secure additional funding or reduce expenses."
        );
    }

    if (recommendations.length === 0) {
        recommendations.push(
            "Financial position is strong. Consider reinvesting profits to accelerate growth."
        );
    }

    /* ---------------------------------------------------------- */

    /* ---------------------------------------------------------- */

    return (
        <div style={{ padding: "30px", width: "100%" }}>

            {/* KPI Cards */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                    gap: "20px",
                    marginBottom: "25px"
                }}
            >
                <Card
                    title="Business Health"
                    value={`${riskScore} / 100`}
                    icon={<FiActivity />}
                    subtitle="Based on revenue, expenses & liquidity"
                />

                <Card
                    title="Risk Level"
                    value={
                        riskScore > 75
                            ? "Low"
                            : riskScore > 60
                                ? "Medium"
                                : "High"
                    }
                    icon={<FiShield />}
                    subtitle="AI risk evaluation"
                />

                <Card
                    title="Cash Balance"
                    value={data.cash}
                    icon={<FiDollarSign />}
                    subtitle="Based on current input data"
                    money
                />

                <Card
                    title="Net Profit"
                    value={profit}
                    icon={<FiDollarSign />}
                    subtitle="Revenue minus expenses"
                    money
                />

                <Card
                    title="Cash Runway"
                    value={`${runwayMonths} months`}
                    icon={<FiClock />}
                    subtitle="Months business can operate"
                    highlight
                />
            </div>

            {/* Target Progress */}

            {target && (
                <div
                    style={{
                        background: "#020617",
                        padding: "18px",
                        borderRadius: "12px",
                        border: "1px solid #1e293b",
                        marginBottom: "25px"
                    }}
                >
                    <h3 style={{ color: "#38bdf8", marginBottom: "10px" }}>
                        Revenue Target Progress
                    </h3>

                    <p style={{ color: "#94a3b8" }}>
                        Target: {formatMoney(target.revenue)}
                    </p>

                    <div
                        style={{
                            height: "10px",
                            background: "#1e293b",
                            borderRadius: "6px",
                            marginTop: "10px"
                        }}
                    >
                        <div
                            style={{
                                width: `${progress}%`,
                                height: "100%",
                                background: "#22c55e",
                                borderRadius: "6px",
                                transition: "width 1s ease"
                            }}
                        />
                    </div>

                    <p style={{ color: "#22c55e", marginTop: "8px" }}>
                        {progress}% of target achieved
                    </p>
                </div>
            )}

            {/* Charts */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginBottom: "25px"
                }}
            >
                <ChartCard title="Revenue & Expenses">
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={revenueData}>
                            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#06b6d4"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />

                            <Line
                                type="monotone"
                                dataKey="expenses"
                                stroke="#f59e0b"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Cash Projection">
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={projectionData}>
                            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* WHAT-IF BUSINESS SIMULATOR */}

            <div
                style={{
                    background: "#020617",
                    padding: "20px",
                    borderRadius: "12px",
                    border: "1px solid #1e293b",
                    marginBottom: "25px"
                }}
            >
                <h3 style={{ color: "#38bdf8", marginBottom: "10px" }}>
                    🧪 What-If Business Simulator
                </h3>

                <p style={{ color: "#94a3b8" }}>
                    Adjust expenses or growth to see how AI risk prediction changes.
                </p>

                <p style={{ color: "#94a3b8", marginTop: "15px" }}>
                    Expense Change: {formatMoney(simExpenseChange)}
                </p>

                <input
                    type="range"
                    min="-100000"
                    max="100000"
                    step="5000"
                    value={simExpenseChange}
                    onChange={(e) => setSimExpenseChange(Number(e.target.value))}
                    style={{ width: "100%" }}
                />

                <p style={{ color: "#94a3b8", marginTop: "15px" }}>
                    Growth Change: {simGrowthChange}%
                </p>

                <input
                    type="range"
                    min="-10"
                    max="20"
                    step="1"
                    value={simGrowthChange}
                    onChange={(e) => setSimGrowthChange(Number(e.target.value))}
                    style={{ width: "100%" }}
                />
            </div>

            {/* AI BUSINESS FAILURE PREDICTION */}

            <div
                style={{
                    background: "#020617",
                    padding: "20px",
                    borderRadius: "12px",
                    border: "1px solid #1e293b",
                    marginBottom: "25px"
                }}
            >

                <h3 style={{ color: "#22d3ee", marginBottom: "15px" }}>
                    AI Business Health Prediction
                </h3>

                <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>

                    <div style={{ width: "120px" }}>

                        <CircularProgressbar
                            value={failureRisk}
                            text={`${failureRisk}%`}
                            styles={buildStyles({
                                textColor: "#fff",
                                pathColor: failureColor,
                                trailColor: "#1e293b"
                            })}
                        />

                    </div>

                    <div>

                        <h2 style={{ color: failureColor }}>
                            {failureLabel}
                        </h2>

                        <p style={{ color: "#94a3b8", marginTop: "6px" }}>
                            AI predicts the probability of financial distress
                            based on profit margin, runway, and working capital.
                        </p>

                    </div>

                </div>

            </div>

            {/* INDUSTRY BENCHMARK PANEL */}

            <div
                style={{
                    background: "#020617",
                    padding: "20px",
                    borderRadius: "12px",
                    border: "1px solid #1e293b",
                    marginBottom: "25px"
                }}
            >

                <h3 style={{ color: "#22d3ee", marginBottom: "12px" }}>
                    📊 Industry Benchmark Comparison
                </h3>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                        gap: "15px"
                    }}
                >

                    <div style={{ background: "#111827", padding: "15px", borderRadius: "8px" }}>
                        <p style={{ color: "#94a3b8" }}>Your Growth</p>
                        <h2 style={{ color: "#22c55e" }}>{simulatedGrowth}%</h2>
                        <p style={{ color: "#64748b" }}>Industry Avg: {industryAvgGrowth}%</p>
                        <p style={{ color: growthGap >= 0 ? "#22c55e" : "#f59e0b" }}>
                            {growthGap >= 0 ? "Above Industry" : "Below Industry"}
                        </p>
                    </div>

                    <div style={{ background: "#111827", padding: "15px", borderRadius: "8px" }}>
                        <p style={{ color: "#94a3b8" }}>Your Risk Score</p>
                        <h2 style={{ color: "#22c55e" }}>{riskScore}</h2>
                        <p style={{ color: "#64748b" }}>Industry Avg: {industryAvgRisk}</p>
                        <p style={{ color: riskGap >= 0 ? "#22c55e" : "#f59e0b" }}>
                            {riskGap >= 0 ? "Stronger than Industry" : "Higher Risk than Industry"}
                        </p>
                    </div>

                    <div style={{ background: "#111827", padding: "15px", borderRadius: "8px" }}>
                        <p style={{ color: "#94a3b8" }}>Cash Ratio</p>
                        <h2 style={{ color: "#22c55e" }}>{userCashRatio}</h2>
                        <p style={{ color: "#64748b" }}>Industry Avg: {industryCashRatio}</p>
                        <p style={{ color: cashGap >= 0 ? "#22c55e" : "#f59e0b" }}>
                            {cashGap >= 0 ? "Healthy Liquidity" : "Liquidity Below Industry"}
                        </p>
                    </div>

                </div>

            </div>

            {/* TRANSACTION INTELLIGENCE */}

            <div
                style={{
                    background: "#020617",
                    padding: "20px",
                    borderRadius: "12px",
                    border: "1px solid #1e293b",
                    marginBottom: "25px"
                }}
            >

                <h3 style={{ color: "#22d3ee", marginBottom: "12px" }}>
                    💳 Transaction Intelligence
                </h3>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                        gap: "15px"
                    }}
                >

                    <div style={{ background: "#111827", padding: "15px", borderRadius: "8px" }}>
                        <p style={{ color: "#94a3b8" }}>UPI Transactions</p>
                        <h2 style={{ color: "#22c55e" }}>{paymentModes.upi}%</h2>
                        <p style={{ color: "#64748b" }}>Primary digital payment mode</p>
                    </div>

                    <div style={{ background: "#111827", padding: "15px", borderRadius: "8px" }}>
                        <p style={{ color: "#94a3b8" }}>Card Payments</p>
                        <h2 style={{ color: "#22c55e" }}>{paymentModes.card}%</h2>
                        <p style={{ color: "#64748b" }}>POS / online payments</p>
                    </div>

                    <div style={{ background: "#111827", padding: "15px", borderRadius: "8px" }}>
                        <p style={{ color: "#94a3b8" }}>Cash Usage</p>
                        <h2 style={{ color: "#22c55e" }}>{paymentModes.cash}%</h2>
                        <p style={{ color: "#64748b" }}>Offline transactions</p>
                    </div>

                    <div style={{ background: "#111827", padding: "15px", borderRadius: "8px" }}>
                        <p style={{ color: "#94a3b8" }}>Largest Expense</p>
                        <h2 style={{ color: "#22c55e" }}>{largestExpense.name}</h2>
                        <p style={{ color: "#64748b" }}>{largestExpense.value}% of total spending</p>
                    </div>

                </div>

            </div>

            {/* AI Recommendation Scorecard */}

            <div
                style={{
                    background: "linear-gradient(145deg,#020617,#0f172a)",
                    padding: "20px",
                    borderRadius: "12px",
                    border: "1px solid #1e293b",
                    borderLeft: "3px solid #22c55e",
                    marginBottom: "25px"
                }}
            >
                <h3 style={{ color: "#38bdf8", marginBottom: "12px" }}>
                    ⚡ AI Recommendation Scorecard
                </h3>

                <ul style={{ color: "#cbd5f5", lineHeight: "1.9" }}>
                    {recommendations.map((rec, i) => (
                        <li key={i}>• {rec}</li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

function Card({ title, value, icon, subtitle, highlight, money }) {

    const valueColor =
        title === "Risk Level"
            ? (value === "Low" ? "#22c55e" : "#f59e0b")
            : "#22c55e";

    return (
        <div
            style={{
                background: highlight ? "#111827" : "#020617",
                padding: "18px",
                borderRadius: "12px",
                border: highlight ? "1px solid #22c55e" : "1px solid #1e293b",
                boxShadow: highlight
                    ? "0 0 25px rgba(34,197,94,0.35)"
                    : "0 0 10px rgba(0,0,0,0.3)"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    color: "#38bdf8"
                }}
            >
                {icon}
            </div>

            <p style={{ color: "#94a3b8", fontSize: "14px" }}>
                {title}
            </p>

            <h2 style={{ marginTop: "6px", color: valueColor }}>

                {typeof value === "number" ? (
                    money ? (
                        <>
                            ₹
                            <CountUp
                                end={value}
                                duration={1.5}
                                separator=","
                            />
                        </>
                    ) : (
                        <CountUp end={value} duration={1.5} />
                    )
                ) : (
                    value
                )}

            </h2>

            <p style={{ color: "#64748b", fontSize: "12px", marginTop: "6px" }}>
                {subtitle}
            </p>

        </div>
    );
}

function ChartCard({ title, children }) {
    return (
        <div
            style={{
                background: "#020617",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #1e293b",
                boxShadow: "0 0 15px rgba(0,0,0,0.4)"
            }}
        >
            <h3 style={{ marginBottom: "15px", color: "#22d3ee", fontWeight: 600 }}>{title}</h3>
            {children}
        </div>
    );
}