import { FiLogOut, FiActivity, FiUser } from "react-icons/fi";

export default function AdminNavbar() {
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isAdmin");
        window.location.href = "/login";
    };

    return (
        <div className="admin-navbar">
            <div className="admin-nav-left">
                <FiActivity className="admin-icon" />
                <h3>ArthaVerse <span>Admin</span></h3>
            </div>

            <div className="admin-nav-right">
                <div className="admin-status">
                    <span className="status-dot"></span>
                    System Monitoring Active
                </div>

                <div className="admin-user">
                    <FiUser />
                    <span>System Admin</span>
                </div>

                <button onClick={handleLogout} className="admin-logout">
                    <FiLogOut /> Logout
                </button>
            </div>

            <style>{`
                .admin-navbar {
                    height: 70px;
                    background: #020617;
                    border-bottom: 2px solid #1e293b;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 30px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                }
                .admin-nav-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .admin-icon {
                    color: #38bdf8;
                    font-size: 24px;
                }
                .admin-nav-left h3 {
                    color: white;
                    margin: 0;
                    font-size: 20px;
                    font-weight: 700;
                }
                .admin-nav-left span {
                    color: #38bdf8;
                    font-weight: 400;
                    font-size: 16px;
                }
                .admin-nav-right {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }
                .admin-status {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #22c55e;
                    font-size: 14px;
                    background: rgba(34, 197, 94, 0.1);
                    padding: 8px 16px;
                    border-radius: 20px;
                }
                .status-dot {
                    width: 8px;
                    height: 8px;
                    background: #22c55e;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #22c55e;
                }
                .admin-user {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #94a3b8;
                    font-size: 14px;
                }
                .admin-logout {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    color: #ef4444;
                    padding: 8px 16px;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                .admin-logout:hover {
                    background: #ef4444;
                    color: white;
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
}