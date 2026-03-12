import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SetTarget() {

    const navigate = useNavigate();

    const [target, setTarget] = useState({
        revenue: "",
        expenses: "",
        timeframe: "1"
    });

    const handleChange = (e) => {
        setTarget({
            ...target,
            [e.target.name]: e.target.value
        });
    };

    const saveTarget = () => {

        localStorage.setItem("targetData", JSON.stringify(target));

        navigate("/dashboard");
    };

    return (
        <div style={{ padding: "40px", width: "100%", display: "flex", justifyContent: "center" }}>

            <div
                style={{
                    width: "400px",
                    background: "#020617",
                    padding: "30px",
                    borderRadius: "12px",
                    border: "1px solid #1e293b"
                }}
            >

                <h2 style={{ color: "#22d3ee", marginBottom: "20px" }}>
                    Set Business Target
                </h2>

                <Input label="Revenue Target" name="revenue" onChange={handleChange} />
                <Input label="Expense Target" name="expenses" onChange={handleChange} />

                <select
                    name="timeframe"
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "#1e293b",
                        color: "white",
                        borderRadius: "6px",
                        border: "none",
                        marginBottom: "20px"
                    }}
                >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                </select>

                <button
                    onClick={saveTarget}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#06b6d4",
                        border: "none",
                        borderRadius: "6px",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    Save Target
                </button>

            </div>

        </div>
    );
}

function Input({ label, name, onChange }) {

    return (
        <div style={{ marginBottom: "15px" }}>
            <p style={{ color: "#94a3b8", marginBottom: "6px" }}>{label}</p>

            <input
                name={name}
                onChange={onChange}
                style={{
                    width: "100%",
                    padding: "10px",
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "6px",
                    color: "white"
                }}
            />
        </div>
    );
}