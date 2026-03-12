import { Link, useLocation } from "react-router-dom";
import { FiGrid, FiUsers, FiDollarSign, FiShield, FiBarChart2, FiBell } from "react-icons/fi";

const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FiGrid /> },
    { name: "Users", path: "/admin/users", icon: <FiUsers /> },
    { name: "Transactions", path: "/admin/transactions", icon: <FiDollarSign /> },
    { name: "Risk Monitoring", path: "/admin/risk", icon: <FiShield /> },
    { name: "Analytics", path: "/admin/analytics", icon: <FiBarChart2 /> },
    { name: "Alerts", path: "/admin/alerts", icon: <FiBell /> },
];

export default function AdminSidebar() {
    const location = useLocation();

    return (
        <div className="admin-sidebar">
            <div className="sidebar-logo">
                <div className="logo-box">AV</div>
                <span>Panel</span>
            </div>

            <div className="sidebar-menu">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="item-icon">{item.icon}</span>
                        <span className="item-name">{item.name}</span>
                    </Link>
                ))}
            </div>

            <style>{`
                .admin-sidebar {
                    width: 260px;
                    background: #020617;
                    height: 100vh;
                    padding: 30px 20px;
                    border-right: 2px solid #1e293b;
                    display: flex;
                    flex-direction: column;
                }
                .sidebar-logo {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 40px;
                    padding: 0 10px;
                }
                .logo-box {
                    background: linear-gradient(135deg, #38bdf8, #818cf8);
                    color: white;
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 14px;
                }
                .sidebar-logo span {
                    color: white;
                    font-size: 18px;
                    font-weight: 700;
                    letter-spacing: 1px;
                }
                .sidebar-menu {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .menu-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    color: #94a3b8;
                    text-decoration: none;
                    border-radius: 12px;
                    transition: all 0.2s;
                    font-weight: 500;
                }
                .menu-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                }
                .menu-item.active {
                    background: rgba(56, 189, 248, 0.1);
                    color: #38bdf8;
                }
                .item-icon {
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                }
                .item-name {
                    font-size: 15px;
                }
            `}</style>
        </div>
    );
}