import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiPhone, FiLock, FiCheckCircle, FiArrowRight, FiArrowLeft, FiUser, FiAlertCircle } from "react-icons/fi";
import { RiBankLine } from "react-icons/ri";

const banks = [
    { name: "HDFC Bank", icon: "🏦" },
    { name: "ICICI Bank", icon: "🏦" },
    { name: "SBI", icon: "🏦" },
    { name: "Axis Bank", icon: "🏦" },
    { name: "Kotak Bank", icon: "🏦" },
    { name: "Bank of Baroda", icon: "🏦" },
];

export default function Register() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        mobile: "",
        otp: "",
        name: "",
        pin: "",
        confirmPin: "",
        bank: ""
    });
    const [error, setError] = useState("");
    const [showUserExistsPopup, setShowUserExistsPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleNext = async () => {
        setError("");

        // Validation for Step 1 (Mobile Check)
        if (step === 1) {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/check-user/${formData.mobile}`);
                const data = await response.json();

                if (data.exists) {
                    setShowUserExistsPopup(true);
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.error("Check user error:", err);
            }
            setLoading(false);
        }

        setStep(step + 1);
    };

    const handleBack = () => {
        setError("");
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: formData.mobile,
                    pin: formData.pin,
                    name: formData.name,
                    bank: formData.bank
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Registration failed");
                setLoading(false);
                return;
            }

            // Save to localStorage for immediate UI update
            localStorage.setItem("userAccount", JSON.stringify({
                mobile: formData.mobile,
                pin: formData.pin,
                bank: formData.bank,
                name: formData.name
            }));

            // Add some dummy initial data for the dashboard if it doesn't exist
            if (!localStorage.getItem("businessData")) {
                localStorage.setItem("businessData", JSON.stringify({
                    revenue: 500000,
                    expenses: 350000,
                    cash: 620000,
                    growth: 12,
                    receivables: 150000,
                    payables: 80000
                }));
            }

            setStep(6);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error("Registration error:", err);
            setError("Cannot connect to server. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="auth-step-container">
                        <FiPhone className="auth-icon" />
                        <h2>Welcome to ArthaVerse</h2>
                        <p>Enter your mobile number to get started</p>
                        <div className="input-group">
                            <span>+91</span>
                            <input
                                type="text"
                                placeholder="Mobile Number"
                                value={formData.mobile}
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                maxLength={10}
                            />
                        </div>
                        {error && <div className="error-text">{error}</div>}
                        <button className="btn-primary" onClick={handleNext} disabled={formData.mobile.length < 10 || loading}>
                            {loading ? "Checking..." : "Get OTP"} <FiArrowRight />
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div className="auth-step-container">
                        <FiLock className="auth-icon" />
                        <h2>Verify OTP</h2>
                        <p>We've sent a 6-digit code to {formData.mobile}</p>
                        <div className="otp-container">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength={1}
                                    className="otp-input"
                                    onChange={(e) => {
                                        if (i === 6) handleNext();
                                    }}
                                />
                            ))}
                        </div>
                        <button className="btn-secondary" onClick={handleBack}>
                            <FiArrowLeft /> Back
                        </button>
                    </div>
                );
            case 3:
                return (
                    <div className="auth-step-container">
                        <FiUser className="auth-icon" />
                        <h2>What's your name?</h2>
                        <p>This will be displayed on your profile</p>
                        <div className="input-field">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <button className="btn-primary" onClick={handleNext} disabled={!formData.name}>
                            Continue <FiArrowRight />
                        </button>
                        <button className="btn-secondary" onClick={handleBack} style={{ marginTop: '12px' }}>
                            <FiArrowLeft /> Back
                        </button>
                    </div>
                );
            case 4:
                return (
                    <div className="auth-step-container">
                        <FiLock className="auth-icon" />
                        <h2>Set Security PIN</h2>
                        <p>This PIN will be used for all your logins and transactions</p>
                        <div className="input-field">
                            <input
                                type="password"
                                placeholder="Enter 4-digit PIN"
                                value={formData.pin}
                                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                                maxLength={4}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                placeholder="Confirm PIN"
                                value={formData.confirmPin}
                                onChange={(e) => setFormData({ ...formData, confirmPin: e.target.value })}
                                maxLength={4}
                            />
                        </div>
                        <button className="btn-primary" onClick={handleNext} disabled={formData.pin !== formData.confirmPin || formData.pin.length < 4}>
                            Set PIN <FiArrowRight />
                        </button>
                        <button className="btn-secondary" onClick={handleBack} style={{ marginTop: '12px' }}>
                            <FiArrowLeft /> Back
                        </button>
                    </div>
                );
            case 5:
                return (
                    <div className="auth-step-container">
                        <RiBankLine className="auth-icon" />
                        <h2>Select Your Bank</h2>
                        <p>Link your bank account to sync financial data</p>
                        <div className="bank-grid">
                            {banks.map((bank) => (
                                <div
                                    key={bank.name}
                                    className={`bank-card ${formData.bank === bank.name ? 'active' : ''}`}
                                    onClick={() => setFormData({ ...formData, bank: bank.name })}
                                >
                                    <div className="bank-logo">{bank.icon}</div>
                                    <span>{bank.name}</span>
                                </div>
                            ))}
                        </div>
                        {error && <div className="error-text" style={{ marginBottom: '16px' }}>{error}</div>}
                        <div className="action-buttons">
                            <button className="btn-secondary" onClick={handleBack}>
                                <FiArrowLeft /> Back
                            </button>
                            <button className="btn-primary" onClick={handleSubmit} disabled={!formData.bank || loading}>
                                {loading ? "Registering..." : "Finish Registration"}
                            </button>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="auth-step-container success">
                        <FiCheckCircle className="success-icon animate-pop" />
                        <h2>Registration Successful!</h2>
                        <p>Welcome to ArthaVerse, {formData.name}. Redirecting to login...</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-progress">
                    <div className="progress-bar" style={{ width: `${(step / 6) * 100}%` }}></div>
                </div>
                {renderStep()}
            </div>

            {/* User Exists Popup */}
            {showUserExistsPopup && (
                <div className="popup-overlay">
                    <div className="popup-card animate-pop">
                        <FiAlertCircle className="popup-icon" />
                        <h3>User Already Exists</h3>
                        <p>The mobile number <b>+91 {formData.mobile}</b> is already registered with ArthaVerse.</p>
                        <div className="popup-actions">
                            <button className="btn-primary" onClick={() => navigate("/login")}>
                                Go to Login
                            </button>
                            <button className="btn-link" onClick={() => setShowUserExistsPopup(false)}>
                                Use different number
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                    position: relative;
                    overflow: hidden;
                }
                .auth-progress {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.05);
                }
                .progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #38bdf8, #22c55e);
                    transition: width 0.3s ease;
                }
                .auth-step-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .auth-icon {
                    font-size: 48px;
                    color: #38bdf8;
                    margin-bottom: 20px;
                }
                .auth-step-container h2 {
                    font-size: 24px;
                    margin-bottom: 8px;
                    font-weight: 700;
                }
                .auth-step-container p {
                    color: #94a3b8;
                    font-size: 14px;
                    margin-bottom: 30px;
                }
                .error-text {
                    color: #ef4444;
                    font-size: 13px;
                    margin-bottom: 16px;
                }
                .input-group {
                    display: flex;
                    align-items: center;
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid rgba(56, 189, 248, 0.3);
                    border-radius: 12px;
                    padding: 12px 16px;
                    width: 100%;
                    margin-bottom: 24px;
                }
                .input-group span {
                    margin-right: 12px;
                    font-weight: 600;
                    color: #38bdf8;
                }
                .input-group input, .input-field input {
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 16px;
                    outline: none;
                    width: 100%;
                }
                .input-field {
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid rgba(56, 189, 248, 0.1);
                    border-radius: 12px;
                    padding: 12px 16px;
                    width: 100%;
                    margin-bottom: 16px;
                }
                .input-field:focus-within {
                    border-color: #38bdf8;
                }
                .otp-container {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 30px;
                }
                .otp-input {
                    width: 45px;
                    height: 55px;
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: 700;
                    color: white;
                    outline: none;
                }
                .otp-input:focus {
                    border-color: #38bdf8;
                    background: rgba(56, 189, 248, 0.1);
                }
                .btn-primary {
                    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    padding: 14px 24px;
                    font-size: 16px;
                    font-weight: 600;
                    width: 100%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.2s;
                }
                .btn-primary:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(56, 189, 248, 0.4);
                }
                .btn-primary:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .btn-secondary {
                    background: transparent;
                    color: #94a3b8;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 14px 24px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .btn-link {
                    background: transparent;
                    border: none;
                    color: #38bdf8;
                    margin-top: 12px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                }
                .btn-link:hover {
                    text-decoration: underline;
                }
                .bank-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                    width: 100%;
                    margin-bottom: 24px;
                }
                .bank-card {
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 16px;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }
                .bank-card:hover {
                    background: rgba(56, 189, 248, 0.1);
                    border-color: rgba(56, 189, 248, 0.3);
                }
                .bank-card.active {
                    background: rgba(56, 189, 248, 0.2);
                    border-color: #38bdf8;
                }
                .bank-logo {
                    font-size: 24px;
                }
                .action-buttons {
                    display: flex;
                    gap: 12px;
                    width: 100%;
                }
                .action-buttons button {
                    flex: 1;
                    margin-top: 0;
                }
                .success-icon {
                    font-size: 80px;
                    color: #22c55e;
                    margin-bottom: 24px;
                }
                
                /* Popup Styles */
                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .popup-card {
                    background: #0f172a;
                    border: 1px solid rgba(56, 189, 248, 0.2);
                    border-radius: 24px;
                    padding: 40px;
                    width: 380px;
                    text-align: center;
                    box-shadow: 0 0 50px rgba(56, 189, 248, 0.15);
                }
                .popup-icon {
                    font-size: 60px;
                    color: #fbbf24;
                    margin-bottom: 20px;
                }
                .popup-card h3 {
                    font-size: 22px;
                    font-weight: 700;
                    margin-bottom: 12px;
                }
                .popup-card p {
                    color: #94a3b8;
                    font-size: 15px;
                    line-height: 1.5;
                    margin-bottom: 30px;
                }
                .popup-actions {
                    display: flex;
                    flex-direction: column;
                }

                .animate-pop {
                    animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                @keyframes pop {
                    0% { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
