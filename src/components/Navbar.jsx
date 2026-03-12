import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    return (
        <div
            style={{
                padding: "15px 25px",
                borderBottom: "1px solid #1f2937",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#020617",
                color: "white"
            }}
        >
            <input
                placeholder="Search transactions..."
                style={{
                    padding: "8px",
                    width: "300px",
                    borderRadius: "6px",
                    border: "none"
                }}
            />

            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

                <button
                    onClick={() => navigate("/set-target")}
                    style={{
                        background: "#06b6d4",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    Set Target
                </button>

                <div>User</div>

            </div>
        </div>
    );
}