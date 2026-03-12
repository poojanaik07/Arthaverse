import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

    const location = useLocation();



    const menu = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Growth", path: "/growth" },
        { name: "Credit", path: "/credit" },
        { name: "Copilot", path: "/copilot" }
    ];

    return (
        <div className="sidebar">

            <h2 className="sidebar-title">ArthaVerse</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {menu.map((item) => (

                    <Link
                        key={item.name}
                        to={item.path}
                        className="sidebar-link"
                        style={{
                            background:
                                location.pathname === item.path ? "#111827" : "transparent",
                            color:
                                location.pathname === item.path ? "#22c55e" : "#94a3b8"
                        }}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

        </div>
    );
}