import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
    return (
        <div className="layout-wrapper">
            <Sidebar />

            <main className="main-content">
                <Navbar />
                <div className="content-inner animate-fade">
                    <Outlet />
                </div>
            </main>

            <style>{`
                .layout-wrapper {
                    display: flex;
                    min-height: 100vh;
                    background-color: #020617;
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