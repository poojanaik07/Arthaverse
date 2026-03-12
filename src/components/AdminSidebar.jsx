import { Link } from "react-router-dom";

export default function AdminSidebar() {

    return (

        <div style={{
            width: "230px",
            background: "#020617",
            height: "100vh",
            padding: "20px",
            borderRight: "1px solid #1e293b"
        }}>

            <h2 style={{
                color: "#38bdf8",
                marginBottom: "30px"
            }}>
                ArthaVerse Admin
            </h2>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>

                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/transactions">Transactions</Link>
                <Link to="/admin/risk">Risk Monitoring</Link>
                <Link to="/admin/analytics">Analytics</Link>
                <Link to="/admin/alerts">Alerts</Link>
            </div>

        </div>

    )

}