import { useState, useEffect } from "react";
import { FiSearch, FiBell, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("userAccount");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isAdmin");
        window.location.href = "/login";
    };

    return (
        <nav className="navbar-modern glass-effect">
            <div className="nav-search-section">
                <div className="search-pill">
                    <FiSearch className="search-icon" />
                    <input type="text" placeholder="Search commands or data..." />
                    <span className="search-shortcut">⌘K</span>
                </div>
            </div>

            <div className="nav-actions">
                <button className="upgrade-btn" onClick={() => navigate('/growth')}>
                    Go Growth
                </button>

                <div className="action-icon-group">
                    <div className="icon-badge">
                        <FiBell />
                        <span className="badge-dot"></span>
                    </div>
                </div>

                <div className="profile-dropdown">
                    <div className="profile-content">
                        <div className="profile-text">
                            <span className="profile-name">{user?.name || "Guest"}</span>
                            <span className="profile-role">Business Owner</span>
                        </div>
                        <div className="profile-avatar">
                            {user?.name?.charAt(0) || <FiUser />}
                        </div>
                    </div>
                </div>

                <div className="nav-divider"></div>

                <button
                    onClick={handleLogout}
                    className="nav-logout-btn"
                    title="Logout"
                >
                    <FiLogOut />
                </button>
            </div>

            <style>{`
                .navbar-modern {
                    height: 90px;
                    padding: 0 40px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    margin: 20px 40px;
                    border-radius: 24px;
                }
                .search-pill {
                    display: flex;
                    align-items: center;
                    background: rgba(15, 23, 42, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 10px 18px;
                    border-radius: 14px;
                    width: 320px;
                    gap: 12px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .search-pill:focus-within {
                    width: 400px;
                    border-color: #38bdf8;
                    background: rgba(15, 23, 42, 0.8);
                }
                .search-icon { color: #64748b; font-size: 18px; }
                .search-pill input {
                    background: transparent;
                    border: none;
                    color: white;
                    outline: none;
                    font-size: 14px;
                    width: 100%;
                }
                .search-shortcut {
                    font-size: 10px;
                    color: #475569;
                    background: rgba(255,255,255,0.05);
                    padding: 4px 6px;
                    border-radius: 6px;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }
                .upgrade-btn {
                    background: linear-gradient(135deg, #38bdf8, #818cf8);
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 4px 12px rgba(56, 189, 248, 0.2);
                }
                .upgrade-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(56, 189, 248, 0.3);
                }

                .action-icon-group {
                    display: flex;
                    gap: 16px;
                }
                .icon-badge {
                    width: 44px;
                    height: 44px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #94a3b8;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s;
                }
                .icon-badge:hover { color: #f8fafc; background: rgba(255,255,255,0.06); }
                .badge-dot {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    width: 8px;
                    height: 8px;
                    background: #f43f5e;
                    border-radius: 50%;
                    border: 2px solid #0f172a;
                }

                .profile-content {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding-left: 24px;
                    border-left: 1px solid rgba(255,255,255,0.05);
                    cursor: pointer;
                }
                .profile-text { text-align: right; }
                .profile-name { display: block; font-weight: 700; font-size: 14px; color: #f8fafc; }
                .profile-role { display: block; font-size: 11px; color: #64748b; }
                .profile-avatar {
                    width: 44px;
                    height: 44px;
                    background: #1e293b;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    color: #38bdf8;
                    border: 1px solid rgba(56, 189, 248, 0.2);
                }

                .nav-divider { width: 1px; height: 24px; background: rgba(255,255,255,0.05); }
                
                .nav-logout-btn {
                    background: transparent;
                    color: #f43f5e;
                    border: 1px solid transparent;
                    font-size: 20px;
                    cursor: pointer;
                    display: flex;
                    padding: 8px;
                    border-radius: 10px;
                    transition: all 0.2s;
                }
                .nav-logout-btn:hover { background: rgba(244, 63, 94, 0.1); }
            `}</style>
        </nav>
    );
}
