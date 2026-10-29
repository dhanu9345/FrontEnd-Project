import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Profile.css";

export default function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userDetails = Cookies.get("userDetails");

        if (!userDetails) {
            navigate("/login");
            return;
        }

        try {
            setUser(JSON.parse(userDetails));
        } catch (error) {
            Cookies.remove("userDetails");
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        Cookies.remove("userDetails");
        window.dispatchEvent(new Event("loginStatusChanged"));
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-avatar">
                    {user.Name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <h1>My Profile</h1>

                <div className="profile-info">
                    <p><strong>Name:</strong> {user.Name}</p>
                    <p><strong>Email:</strong> {user.Email}</p>
                    <p><strong>User ID:</strong> {user._id}</p>
                </div>

                <button onClick={handleLogout} className="profile-logout">
                    Logout
                </button>

                <button
                    onClick={() => navigate("/")}
                    className="profile-home"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}