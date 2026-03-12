import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";

import { FiActivity, FiShield, FiDollarSign, FiClock, FiTrendingUp, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useEffect, useState } from "react";

const formatMoney = (num) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(num);

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
    const [target, setTarget] = useState(null);
    const [simExpenseChange, setSimExpenseChange] = useState(0);
    const [simGrowthChange, setSimGrowthChange] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem("businessData");
        const storedTarget = localStorage.getItem("targetData");
        const storedUser = localStorage.getItem("userAccount");

        if (stored) setData(JSON.parse(stored));
        if (storedTarget) setTarget(JSON.parse(storedTarget));
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    if (!data) {
        return <div className="loading-screen">Loading ArthaVerse Intelligence...</div>;
    }

    const simulatedExpenses = data.expenses + simExpenseChange;
    const simulatedGrowth = data.growth + simGrowthChange;
    const profit = data.revenue - simulatedExpenses;
    const runwayMonths = simulatedExpenses > 0 ? (data.cash / simulatedExpenses).toFixed(1) : "∞";
    const workingCapital = data.receivables - data.payables;

    const riskScore = 60 + (profit > 0 ? 10 : -10) + (simulatedGrowth > 10 ? 10 : 0) + (workingCapital > 0 ? 5 : -5);

    let failureRisk = 0;
    if (profit < 0) failureRisk += 25;
    if (runwayMonths !== "∞" && runwayMonths < 3) failureRisk += 30;
    if (workingCapital < 0) failureRisk += 15;
    if (simulatedExpenses > data.revenue * 0.8) failureRisk += 20;
    if (simulatedGrowth < 5) failureRisk += 10;
    failureRisk = Math.min(failureRisk, 100);

    let failureLabel = "Low Risk";
    let failureColor = "#22c55e";

    if (failureRisk > 70) {
        failureLabel = "High Risk";
        failureColor = "#f43f5e";
    } else if (failureRisk > 40) {
        failureLabel = "Moderate Risk";
        failureColor = "#f59e0b";
    }

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
        cashFlow = cashFlow + (data.revenue - data.expenses) + (data.growth / 100) * data.revenue;
        projectionData.push({
            month: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
            value: Math.round(cashFlow)
        });
    }

    let progress = 0;
    if (target && target.revenue) {
        progress = Math.min(Math.round((data.revenue / target.revenue) * 100), 100);
    }

    const recommendations = [];
    if (failureRisk > 60) recommendations.push({ type: 'danger', text: "Critical financial risk. Reduce burn rate immediately." });
    if (profit < 0) recommendations.push({ type: 'warning', text: "Current operations are not profitable. Review pricing or overheads." });
    if (data.receivables > data.payables) recommendations.push({ type: 'info', text: "High receivables. Optimize collection cycle to boost liquidity." });
    if (target && data.revenue < target.revenue) recommendations.push({ type: 'info', text: `Revenue gap of ${formatMoney(target.revenue - data.revenue)} to reach your goal.` });

    if (recommendations.length === 0) recommendations.push({ type: 'success', text: "Excellent financial health. Consider scale-up investments." });

    return (
        <div className="dashboard-container animate-fade">
            <header className="dashboard-header">
                <div className="welcome-section">
                    <h1>Welcome back, {user?.name?.split(' ')[0] || 'Partner'}</h1>
                    <p>Here's what's happening with your business today.</p>
                </div>
                <div className="header-actions">
                    <div className="health-badge">
                        <FiActivity />
                        <span>Health Score: <b>{riskScore}</b></span>
                    </div>
                </div>
            </header>

            <div className="stats-grid">
                <StatCard title="Cash Balance" value={formatMoney(data.cash)} icon={<FiDollarSign />} trend="+12.5%" trendType="up" />
                <StatCard title="Net Profit" value={formatMoney(profit)} icon={<FiTrendingUp />} trend="+5.2%" trendType="up" />
                <StatCard title="Cash Runway" value={`${runwayMonths} Mo`} icon={<FiClock />} subtitle="Est. business life" highlight />
                <StatCard title="Failure Risk" value={failureLabel} icon={<FiShield />} subtitle={`${failureRisk}% Probability`} color={failureColor} />
            </div>

            <div className="main-content-grid">
                <div className="charts-section">
                    <div className="chart-container glass-effect">
                        <div className="chart-header">
                            <h3>Revenue & Burn Rate</h3>
                            <div className="chart-legend">
                                <span className="legend-item rev">Revenue</span>
                                <span className="legend-item exp">Expenses</span>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="month" stroke="#64748b" axisLine={false} tickLine={false} />
                                <YAxis stroke="#64748b" axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#38bdf8" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                                <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="simulator-section glass-effect">
                        <div className="sim-header">
                            <div className="sim-title">
                                <h3>What-If Simulator</h3>
                                <p>Simulate financial scenarios and predict outcomes</p>
                            </div>
                            <div className="sim-output">
                                <div className="sim-stat">
                                    <span>New Profit</span>
                                    <p style={{ color: profit > 0 ? '#10b981' : '#f43f5e' }}>{formatMoney(profit)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="sim-controls">
                            <div className="control-group">
                                <div className="label-row">
                                    <label>Monthly Expense Adjustment</label>
                                    <span>{simExpenseChange > 0 ? '+' : ''}{formatMoney(simExpenseChange)}</span>
                                </div>
                                <input
                                    type="range" min="-200000" max="200000" step="10000"
                                    value={simExpenseChange}
                                    onChange={(e) => setSimExpenseChange(Number(e.target.value))}
                                />
                            </div>
                            <div className="control-group">
                                <div className="label-row">
                                    <label>Anticipated Growth Rate</label>
                                    <span>{simGrowthChange > 0 ? '+' : ''}{simGrowthChange}%</span>
                                </div>
                                <input
                                    type="range" min="-20" max="50" step="1"
                                    value={simGrowthChange}
                                    onChange={(e) => setSimGrowthChange(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sidebar-section">
                    <div className="recommendations-card glass-effect">
                        <div className="card-header">
                            <h3>AI Action Center</h3>
                            <FiActivity className="header-icon" />
                        </div>
                        <div className="rec-list">
                            {recommendations.map((rec, i) => (
                                <div key={i} className={`rec-item ${rec.type}`}>
                                    <div className="rec-icon">
                                        {rec.type === 'danger' && <FiAlertCircle />}
                                        {rec.type === 'warning' && <FiAlertCircle />}
                                        {rec.type === 'success' && <FiCheckCircle />}
                                        {rec.type === 'info' && <FiTrendingUp />}
                                    </div>
                                    <p>{rec.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {target && (
                        <div className="target-card glass-effect">
                            <div className="target-header">
                                <h3>Revenue Goal</h3>
                                <span className={`progress-label ${progress > 80 ? 'active' : ''}`}>{progress}%</span>
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="target-footer">
                                <span>{formatMoney(data.revenue)}</span>
                                <span>Goal: {formatMoney(target.revenue)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .dashboard-container {
                    padding: 40px;
                    width: 100%;
                    max-width: 1600px;
                    margin: 0 auto;
                }
                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 40px;
                }
                .welcome-section h1 {
                    font-size: 32px;
                    font-weight: 800;
                    margin-bottom: 8px;
                    background: linear-gradient(to right, #fff, #94a3b8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .welcome-section p {
                    color: #64748b;
                    font-size: 16px;
                }
                .health-badge {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(56, 189, 248, 0.1);
                    border: 1px solid rgba(56, 189, 248, 0.2);
                    padding: 10px 20px;
                    border-radius: 100px;
                    color: #38bdf8;
                }
                
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    margin-bottom: 40px;
                }
                .stat-card {
                    padding: 24px;
                    border-radius: 24px;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .stat-card:hover { transform: translateY(-5px); }
                .stat-card-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    background: rgba(255,255,255,0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    color: #38bdf8;
                    margin-bottom: 20px;
                }
                .stat-card-title {
                    font-size: 14px;
                    color: #64748b;
                    margin-bottom: 8px;
                    font-weight: 500;
                }
                .stat-card-value {
                    font-size: 24px;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 12px;
                }
                .stat-trend {
                    font-size: 12px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .stat-trend.up { color: #10b981; }
                .stat-trend.down { color: #f43f5e; }
                .stat-subtitle { color: #475569; font-size: 12px; }

                .main-content-grid {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    gap: 32px;
                }
                .charts-section {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }
                .glass-effect {
                    background: rgba(15, 23, 42, 0.6);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 28px;
                    padding: 32px;
                }

                .chart-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 32px;
                }
                .chart-legend {
                    display: flex;
                    gap: 20px;
                }
                .legend-item {
                    font-size: 12px;
                    color: #64748b;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .legend-item::before {
                    content: '';
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }
                .legend-item.rev::before { background: #38bdf8; }
                .legend-item.exp::before { background: #f43f5e; }

                .simulator-section .sim-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 32px;
                }
                .sim-title h3 { font-size: 20px; margin-bottom: 4px; }
                .sim-title p { color: #64748b; font-size: 14px; }
                .sim-stat span { font-size: 12px; color: #64748b; text-transform: uppercase; }
                .sim-stat p { font-size: 20px; font-weight: 700; }

                .sim-controls {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                }
                .control-group label { display: block; font-size: 14px; color: #94a3b8; }
                .label-row { display: flex; justify-content: space-between; margin-bottom: 12px; }
                .label-row span { font-weight: 700; color: #38bdf8; font-family: monospace; }
                
                input[type=range] {
                    width: 100%;
                    accent-color: #38bdf8;
                }

                .sidebar-section {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }
                .recommendations-card .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }
                .header-icon { color: #38bdf8; font-size: 20px; }
                .rec-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .rec-item {
                    display: flex;
                    gap: 16px;
                    padding: 16px;
                    border-radius: 16px;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.03);
                }
                .rec-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .rec-item.danger .rec-icon { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
                .rec-item.warning .rec-icon { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
                .rec-item.success .rec-icon { background: rgba(16, 185, 129, 0.1); color: #10b981; }
                .rec-item.info .rec-icon { background: rgba(56, 189, 248, 0.1); color: #38bdf8; }
                .rec-item p { font-size: 13px; line-height: 1.5; color: #cbd5e1; }

                .target-card .target-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .progress-label {
                    font-size: 12px;
                    font-weight: 700;
                    padding: 4px 10px;
                    border-radius: 100px;
                    background: rgba(255,255,255,0.05);
                }
                .progress-label.active { background: rgba(16, 185, 129, 0.2); color: #10b981; }
                .progress-track {
                    height: 12px;
                    background: rgba(255,255,255,0.05);
                    border-radius: 100px;
                    overflow: hidden;
                    margin-bottom: 16px;
                }
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(to right, #38bdf8, #10b981);
                    border-radius: 100px;
                    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .target-footer {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #64748b;
                }

                .loading-screen {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    color: #38bdf8;
                    background: #020617;
                }
            `}</style>
        </div>
    );
}

function StatCard({ title, value, icon, trend, trendType, subtitle, highlight, color }) {
    return (
        <div className={`stat-card glass-effect ${highlight ? 'highlight' : ''}`}>
            <div className="stat-card-icon" style={{ color: color || '#38bdf8', background: color ? `${color}15` : 'rgba(56,189,248,0.1)' }}>
                {icon}
            </div>
            <p className="stat-card-title">{title}</p>
            <h2 className="stat-card-value" style={{ color: color || '#fff' }}>{value}</h2>
            {trend && (
                <div className={`stat-trend ${trendType}`}>
                    {trend}
                </div>
            )}
            {subtitle && <p className="stat-subtitle">{subtitle}</p>}
        </div>
    );
}