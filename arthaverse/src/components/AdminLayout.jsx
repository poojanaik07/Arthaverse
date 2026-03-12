import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="layout-wrapper admin">
            <AdminSidebar />

            <main className="main-content">
                <AdminNavbar />
                <div className="content-inner animate-fade">
                    <Outlet />
                </div>
            </main>

            <style>{`
                .layout-wrapper.admin {
                    display: flex;
                    min-height: 100vh;
                    background-color: #0b1220;
                    color: white;
                }
                .main-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow-x: hidden;
                }
                .content-inner {
                    padding: 0;
                    flex: 1;
                }
            `}</style>
        </div>
    );
}