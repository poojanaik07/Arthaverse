import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiPhone, FiLock, FiArrowRight } from "react-icons/fi";

export default function Login() {
    const [formData, setFormData] = useState({
        mobile: "",
        pin: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Check for Hardcoded Admin Credentials
            if (formData.mobile === "9898989898" && formData.pin === "9999") {
                localStorage.setItem("userAccount", JSON.stringify({ name: "System Admin", mobile: "9898989898", role: "admin" }));
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("isAdmin", "true");
                window.location.href = "/admin";
                return;
            }

            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: formData.mobile,
                    pin: formData.pin
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                return;
            }

            // Successful login
            // Store user data and session flag
            localStorage.setItem("userAccount", JSON.stringify(data.user));
            localStorage.setItem("isLoggedIn", "true");

            // Full reload to update App state (standard practice for simple auth)
            window.location.href = "/dashboard";
        } catch (err) {
            console.error("Login error:", err);
            setError("Cannot connect to server. Please try again later.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="login-header">
                    <div className="logo">ArthaVerse</div>
                    <h2>Welcome Back</h2>
                    <p>Enter your credentials to access your dashboard</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <FiPhone className="input-icon" />
                        <input
                            type="text"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            maxLength={10}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FiLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="4-digit PIN"
                            value={formData.pin}
                            onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                            maxLength={4}
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn-primary">
                        Login <FiArrowRight />
                    </button>
                </form>

                <div className="auth-footer">
                    Don't have an account? <Link to="/register">Register Now</Link>
                </div>
            </div>

            <style>{`
                .auth-page {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: radial-gradient(circle at top right, #0f172a, #020617);
                    color: white;
                    font-family: 'Inter', sans-serif;
                }
                .auth-card {
                    width: 400px;
                    background: rgba(15, 23, 42, 0.8);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                    padding: 40px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .login-header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .logo {
                    font-size: 28px;
                    font-weight: 800;
                    background: linear-gradient(135deg, #38bdf8, #818cf8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 16px;
                }
                .login-header h2 {
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 8px;
                }
                .login-header p {
                    color: #94a3b8;
                    font-size: 14px;
                }
                .input-group {
                    position: relative;
                    margin-bottom: 20px;
                }
                .input-icon {
                    position: absolute;
                    left: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #38bdf8;
                }
                .input-group input {
                    width: 100%;
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 14px 14px 14px 48px;
                    color: white;
                    font-size: 16px;
                    outline: none;
                    transition: all 0.2s;
                    box-sizing: border-box;
                }
                .input-group input:focus {
                    border-color: #38bdf8;
                    background: rgba(56, 189, 248, 0.05);
                }
                .btn-primary {
                    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    padding: 14px;
                    font-size: 16px;
                    font-weight: 600;
                    width: 100%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.2s;
                    margin-top: 10px;
                }
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(56, 189, 248, 0.4);
                }
                .error-message {
                    color: #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                    padding: 10px;
                    border-radius: 8px;
                    font-size: 13px;
                    margin-bottom: 20px;
                    text-align: center;
                }
                .auth-footer {
                    margin-top: 24px;
                    text-align: center;
                    font-size: 14px;
                    color: #94a3b8;
                }
                .auth-footer a {
                    color: #38bdf8;
                    text-decoration: none;
                    font-weight: 600;
                }
                .auth-footer a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
}
