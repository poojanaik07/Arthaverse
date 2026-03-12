export default function AdminNavbar() {
    return (
        <div
            style={{
                height: "60px",
                background: "#020617",
                borderBottom: "1px solid #1e293b",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px"
            }}
        >
            <h3 style={{ color: "#38bdf8", margin: 0 }}>
                ArthaVerse Admin
            </h3>

            <div style={{ color: "#94a3b8" }}>
                System Monitoring Active
            </div>
        </div>
    );
}