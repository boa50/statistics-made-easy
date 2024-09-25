import { Outlet } from "@remix-run/react"

export default function Layout() {
    return (
        <div className="bg-gray-300 font-sans">
            <Outlet />
        </div >
    );
}
