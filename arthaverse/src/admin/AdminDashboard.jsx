import { FiUsers, FiActivity, FiAlertTriangle, FiDatabase } from "react-icons/fi";

export default function AdminDashboard() {

    const stats = [
        { title: "Total Users", value: "124", icon: <FiUsers />, color: "#22c55e" },
        { title: "Transactions", value: "14,562", icon: <FiDatabase />, color: "#38bdf8" },
        { title: "Active Businesses", value: "89", icon: <FiActivity />, color: "#a855f7" },
        { title: "High Risk Alerts", value: "7", icon: <FiAlertTriangle />, color: "#ef4444" },
    ];

    return (

        <div style={{ flex: 1, padding: "25px" }}>

            <h1 style={{
                color: "#38bdf8",
                fontSize: "28px",
                marginBottom: "20px"
            }}>
                ArthaVerse Admin Control Center
            </h1>

            {/* STAT CARDS */}

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "20px"
            }}>

                {stats.map((s, i) => (
                    <Card key={i} {...s} />
                ))}

            </div>

            {/* SYSTEM STATUS */}

            <div style={{
                marginTop: "30px",
                background: "#020617",
                padding: "20px",
                borderRadius: "14px",
                border: "1px solid #1e293b"
            }}>

                <h2 style={{ color: "#38bdf8" }}>System Status</h2>

                <p style={{ color: "#94a3b8", marginTop: "8px" }}>
                    All services operational. AI monitoring active.
                </p>

                <div style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "20px"
                }}>

                    <Status label="Bank API" status="Online" />
                    <Status label="Risk Engine" status="Active" />
                    <Status label="Prediction AI" status="Running" />
                    <Status label="Data Stream" status="Healthy" />

                </div>

            </div>

        </div>

    );
}

function Card({ title, value, icon, color }) {

    return (

        <div style={{
            background: "linear-gradient(145deg,#020617,#021b22)",
            padding: "20px",
            borderRadius: "14px",
            border: "1px solid #1e293b",
            boxShadow: "0 0 20px rgba(0,255,255,0.05)",
            transition: "0.3s"
        }}>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>

                <div style={{
                    fontSize: "22px",
                    color: color
                }}>
                    {icon}
                </div>

            </div>

            <p style={{
                color: "#94a3b8",
                marginTop: "10px"
            }}>
                {title}
            </p>

            <h2 style={{
                color: color,
                marginTop: "5px"
            }}>
                {value}
            </h2>

        </div>

    );
}

function Status({ label, status }) {

    return (

        <div style={{
            background: "#020617",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #1e293b"
        }}>

            <p style={{ color: "#94a3b8" }}>{label}</p>

            <p style={{
                color: "#22c55e",
                fontWeight: "bold"
            }}>
                {status}
            </p>

        </div>

    );
}