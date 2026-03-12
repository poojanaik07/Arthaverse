import { Link, useLocation } from "react-router-dom";
import { FiGrid, FiTrendingUp, FiCreditCard, FiSettings, FiHelpCircle } from "react-icons/fi";

const userMenuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiGrid /> },
    { name: "Growth", path: "/growth", icon: <FiTrendingUp /> },
    { name: "Credit", path: "/credit", icon: <FiCreditCard /> },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <div className="user-sidebar">
            <div className="sidebar-brand">
                <div className="brand-logo">AV</div>
                <span>ArthaVerse</span>
            </div>

            <div className="sidebar-nav">
                <p className="nav-label">Main Menu</p>
                {userMenuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-text">{item.name}</span>
                    </Link>
                ))}
            </div>

            <div className="sidebar-footer">
                <div className="footer-links">
                    <Link to="/settings" className="footer-item">
                        <FiSettings /> Settings
                    </Link>
                    <Link to="/support" className="footer-item">
                        <FiHelpCircle /> Support
                    </Link>
                </div>

                <div className="pro-card">
                    <p>Upgrade to Pro</p>
                    <span>Get advanced AI insights</span>
                    <button className="pro-btn">Upgrade</button>
                </div>
            </div>

            <style>{`
                .user-sidebar {
                    width: 280px;
                    background: #020617;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    padding: 32px 24px;
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                    position: sticky;
                    top: 0;
                }
                .sidebar-brand {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 48px;
                }
                .brand-logo {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #38bdf8, #818cf8);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 800;
                    font-size: 16px;
                    box-shadow: 0 8px 16px -4px rgba(56, 189, 248, 0.5);
                }
                .sidebar-brand span {
                    font-size: 20px;
                    font-weight: 700;
                    background: linear-gradient(to right, #f8fafc, #94a3b8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .sidebar-nav {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .nav-label {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #475569;
                    margin-bottom: 12px;
                    font-weight: 600;
                    padding-left: 12px;
                }
                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 14px 16px;
                    color: #94a3b8;
                    text-decoration: none;
                    border-radius: 14px;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    font-weight: 500;
                }
                .nav-item:hover {
                    background: rgba(255, 255, 255, 0.03);
                    color: #f8fafc;
                    transform: translateX(4px);
                }
                .nav-item.active {
                    background: rgba(56, 189, 248, 0.1);
                    color: #38bdf8;
                }
                .nav-icon {
                    font-size: 20px;
                    display: flex;
                }
                .nav-text {
                    font-size: 15px;
                }
                .sidebar-footer {
                    margin-top: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .footer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .footer-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: #64748b;
                    text-decoration: none;
                    font-size: 14px;
                    transition: color 0.2s;
                    padding-left: 12px;
                }
                .footer-item:hover {
                    color: #f8fafc;
                }
                .pro-card {
                    background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(129, 140, 248, 0.1));
                    border: 1px solid rgba(56, 189, 248, 0.2);
                    padding: 20px;
                    border-radius: 20px;
                    text-align: center;
                }
                .pro-card p {
                    font-weight: 700;
                    font-size: 14px;
                    margin-bottom: 4px;
                }
                .pro-card span {
                    font-size: 12px;
                    color: #94a3b8;
                    display: block;
                    margin-bottom: 16px;
                }
                .pro-btn {
                    width: 100%;
                    background: white;
                    color: #020617;
                    border: none;
                    padding: 10px;
                    border-radius: 10px;
                    font-weight: 700;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .pro-btn:hover {
                    box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
                    transform: scale(1.02);
                }
            `}</style>
        </div>
    );
}