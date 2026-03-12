import { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend
} from "recharts";

export default function Growth() {

    const [inputs, setInputs] = useState({
        revenue: 450000,
        expenses: 340000,
        cash: 620000,
        receivables: 180000,
        payables: 120000,
        inventory: 250000,
        growth: 15
    });

    const [riskScore, setRiskScore] = useState(72);
    const [reinvest, setReinvest] = useState(20000);

    const [marketingSpend, setMarketingSpend] = useState(0);
    const [inventorySpend, setInventorySpend] = useState(0);
    const [displayRevenue, setDisplayRevenue] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem("businessData");
        if (stored) {
            setInputs(JSON.parse(stored));
        }
    }, []);

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: Number(e.target.value)
        });
    };

    function runAnalysis() {

        const profit = inputs.revenue - inputs.expenses;
        const workingCapital = inputs.receivables - inputs.payables;

        let score = 50;

        if (profit > 0) score += 15;
        if (inputs.cash > 50000) score += 10;
        if (workingCapital > 0) score += 10;
        if (inputs.growth > 10) score += 10;

        if (score > 100) score = 100;

        const suggestedInvestment = Math.round(profit * 0.2);

        setRiskScore(score);
        setReinvest(suggestedInvestment);

        localStorage.setItem("businessData", JSON.stringify(inputs));
    }

    const projectionData = [];
    let cashFlow = inputs.cash;

    for (let i = 0; i < 6; i++) {

        const marketingImpact = marketingSpend * 0.2;
        const inventoryImpact = inventorySpend * 0.15;

        const projectedRevenue =
            inputs.revenue +
            (inputs.revenue * inputs.growth) / 100 +
            marketingImpact +
            inventoryImpact;

        const projectedExpenses =
            inputs.expenses + marketingSpend + inventorySpend;

        cashFlow = cashFlow + (projectedRevenue - projectedExpenses);

        const marketPulse = projectedRevenue * (0.9 + Math.random() * 0.2);
        const competitor = projectedRevenue * (0.95 + Math.random() * 0.1);

        projectionData.push({
            month: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
            business: Math.round(projectedRevenue),
            market: Math.round(marketPulse),
            competitor: Math.round(competitor)
        });
    }

    const targetRevenue = inputs.revenue * (1 + inputs.growth / 100);
    const projectedRevenue = projectionData[5]?.business || 0;
    const marketRevenue = projectionData[5]?.market || 0;
    const competitorRevenue = projectionData[5]?.competitor || 0;

    let recommendedMarketing = 0;

    if (projectedRevenue < competitorRevenue) {
        const gap = competitorRevenue - projectedRevenue;
        recommendedMarketing = Math.ceil(gap / 0.2);
    }

    const marketAdvantage = projectedRevenue - marketRevenue;

    useEffect(() => {
        let start = 0;
        const end = projectedRevenue;
        const duration = 800;
        const step = end / (duration / 16);

        const counter = setInterval(() => {
            start += step;

            if (start >= end) {
                start = end;
                clearInterval(counter);
            }

            setDisplayRevenue(Math.floor(start));
        }, 16);

        return () => clearInterval(counter);

    }, [projectedRevenue]);

    let marketInsight = "";

    if (marketAdvantage > 0) {
        marketInsight = "🚀 Your projected growth is outperforming the market trend.";
    } else if (marketAdvantage < 0) {
        marketInsight = "⚠ Your growth may fall below market trend. Consider increasing marketing or optimizing expenses.";
    } else {
        marketInsight = "📊 Your growth is aligned with the market.";
    }

    let growthScore = 50;

    if (inputs.revenue > inputs.expenses) growthScore += 15;
    if (inputs.cash > inputs.expenses * 3) growthScore += 10;
    if (inputs.growth > 10) growthScore += 10;
    if (marketingSpend > 0) growthScore += 5;
    if (inventorySpend > 0) growthScore += 5;

    if (growthScore > 100) growthScore = 100;

    const healthStatus =
        growthScore > 80
            ? "Strong Growth Potential 🚀"
            : growthScore > 60
                ? "Moderate Growth 📈"
                : "Growth Risk ⚠";

    const signals = [];

    if (inputs.cash / inputs.expenses < 3)
        signals.push("⚠ Cash runway below 3 months — reduce expenses.");

    if (inputs.receivables > inputs.payables)
        signals.push("💰 Speed up receivable collections.");

    if (marketingSpend > 50000)
        signals.push("📈 Marketing investment may increase demand.");

    if (inventorySpend > 50000)
        signals.push("📦 Inventory expansion recommended for growth.");

    if (signals.length === 0)
        signals.push("✅ Financial health stable for expansion.");

    const advisor = [];

    if (projectedRevenue < competitorRevenue) {
        advisor.push(
            `Increase marketing by approximately ₹${recommendedMarketing.toLocaleString()} to outperform competitors.`
        );
    }

    if (inputs.expenses > inputs.revenue * 0.8) {
        advisor.push("Reduce expenses by 8% to reach target profitability.");
    }

    if (inputs.cash < inputs.expenses * 2) {
        advisor.push("Increase cash reserves to maintain a safer runway.");
    }

    if (marketingSpend === 0) {
        advisor.push("Consider investing in marketing to accelerate growth.");
    }

    if (advisor.length === 0) {
        advisor.push("Your business metrics look strong for expansion.");
    }

    return (
        <div style={{ padding: "25px", width: "100%" }}>

            {/* Top Metrics */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: "20px",
                    marginBottom: "25px"
                }}
            >

                <div className="card">
                    <div className="title">Growth Score</div>
                    <div className="metric">{growthScore}/100</div>
                    <p>{healthStatus}</p>
                </div>

                <div className="card">
                    <div className="title">Projected Revenue</div>
                    <div className="metric">₹{displayRevenue}</div>
                    <p>6-month projection</p>
                </div>

                <div className="card">
                    <div className="title">AI Reinvestment</div>
                    <div className="metric">₹{reinvest}</div>
                    <p>Recommended capital</p>
                </div>

            </div>

            {/* AI Recommendation */}
            <div className="card" style={{ marginBottom: "20px" }}>
                <h3 className="title">AI Growth Recommendation</h3>

                <p style={{ color: "#cbd5f5", marginTop: "5px" }}>
                    Based on your financial data, your business can safely grow
                    <span style={{ color: "#22c55e" }}> {inputs.growth}% </span>
                    over the next 6 months if expenses remain stable.
                </p>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px"
            }}>

                {/* LEFT SIDE */}

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                    {/* Financial Inputs */}
                    <div className="card">

                        <h3 className="title">
                            Financial Inputs
                        </h3>

                        <Input label="Revenue" name="revenue" value={inputs.revenue} onChange={handleChange} />
                        <Input label="Expenses" name="expenses" value={inputs.expenses} onChange={handleChange} />
                        <Input label="Cash" name="cash" value={inputs.cash} onChange={handleChange} />
                        <Input label="Receivables" name="receivables" value={inputs.receivables} onChange={handleChange} />
                        <Input label="Payables" name="payables" value={inputs.payables} onChange={handleChange} />
                        <Input label="Inventory" name="inventory" value={inputs.inventory} onChange={handleChange} />
                        <Input label="Growth %" name="growth" value={inputs.growth} onChange={handleChange} />

                        <button
                            onClick={runAnalysis}
                            className="primary-btn"
                            style={{ width: "100%", marginTop: "15px" }}
                        >
                            Run AI Analysis
                        </button>

                    </div>

                    {/* Growth Drivers */}
                    <div className="card">
                        <h3 style={{ color: "#22d3ee" }}>Growth Drivers</h3>

                        <p style={{ color: "#94a3b8" }}>
                            Marketing impact: +{Math.round((marketingSpend * 0.2) / inputs.revenue * 100)}%
                        </p>

                        <p style={{ color: "#94a3b8" }}>
                            Inventory impact: +{Math.round((inventorySpend * 0.15) / inputs.revenue * 100)}%
                        </p>
                    </div>

                    {/* AI Signals */}
                    <div style={{
                        background: "#021b22",
                        padding: "20px",
                        borderRadius: "12px",
                        border: "1px solid #134e4a"
                    }}>
                        <h3 style={{ color: "#14b8a6" }}>AI Growth Signals</h3>

                        <ul style={{ color: "#cbd5f5", marginTop: "10px", lineHeight: "1.8" }}>
                            {signals.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>

                        <p style={{ marginTop: "10px", color: "#22c55e" }}>
                            Suggested reinvestment: ₹{reinvest}
                        </p>
                    </div>

                    {/* AI Advisor */}
                    <div style={{
                        background: "#021b22",
                        padding: "20px",
                        borderRadius: "12px",
                        border: "1px solid #134e4a"
                    }}>
                        <h3 style={{ color: "#14b8a6" }}>AI Business Advisor</h3>

                        <ul style={{ color: "#cbd5f5", marginTop: "10px", lineHeight: "1.8" }}>
                            {advisor.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                    {/* Simulator */}
                    <div className="card">
                        <h3 style={{ color: "#22d3ee" }}>Growth Scenario Simulator</h3>

                        <p style={{ color: "#94a3b8" }}>
                            Marketing Spend: ₹{marketingSpend}
                        </p>

                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="5000"
                            value={marketingSpend}
                            onChange={(e) => setMarketingSpend(Number(e.target.value))}
                            style={{ width: "100%" }}
                        />

                        <p style={{ color: "#94a3b8", marginTop: "15px" }}>
                            Inventory Investment: ₹{inventorySpend}
                        </p>

                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="5000"
                            value={inventorySpend}
                            onChange={(e) => setInventorySpend(Number(e.target.value))}
                            style={{ width: "100%" }}
                        />
                    </div>

                    {/* Chart */}
                    <div className="card">

                        <h3 style={{ color: "#22d3ee", marginBottom: "10px" }}>
                            Business Growth vs Market Trend
                        </h3>

                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={projectionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="business"
                                    stroke="#22c55e"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="market"
                                    stroke="#38bdf8"
                                    strokeWidth={2}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="competitor"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>

                        <p style={{ color: "#94a3b8", marginTop: "10px" }}>
                            {marketInsight}
                        </p>
                    </div>

                    {/* Target vs Projection */}
                    <div className="card">
                        <h3 style={{ color: "#22d3ee" }}>Target vs Projection</h3>

                        <p style={{ color: "#94a3b8" }}>
                            Target Revenue: ₹{Math.round(targetRevenue)}
                        </p>

                        <p style={{ color: "#94a3b8" }}>
                            Projected Revenue: ₹{displayRevenue}
                        </p>

                        <p style={{ color: marketAdvantage > 0 ? "#22c55e" : "#f59e0b" }}>
                            Market Advantage: ₹{Math.abs(marketAdvantage)}
                        </p>

                        <p style={{ color: projectedRevenue >= targetRevenue ? "#22c55e" : "#f59e0b" }}>
                            {projectedRevenue >= targetRevenue
                                ? "On Track for Target"
                                : "Slightly Below Target"}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

function Input({ label, name, value, onChange }) {

    return (
        <div style={{ marginBottom: "15px" }}>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>
                {label}
            </p>

            <input
                name={name}
                value={value}
                onChange={onChange}
                style={{
                    width: "100%",
                    padding: "10px",
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "6px",
                    color: "white",
                    marginTop: "6px"
                }}
            />
        </div>
    )
}
