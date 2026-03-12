import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div style={{ display: "flex", height: "100vh", background: "#0b1220", color: "white" }}>
            <AdminSidebar />

            <div style={{ flex: 1 }}>
                <AdminNavbar />

                <div style={{ padding: "20px" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}