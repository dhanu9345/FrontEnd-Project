import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./login.css"
import Cookies from "js-cookie";

export default function Login() {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();
    // let [message, setMessage] = useState("");

  
    function handleSubmit(e) {
        e.preventDefault();

        axios.post(url, {
            Email: email,
            Password: password
        },
            {
                withCredentials: true
            })
            .then((res) => {
                toast.success("Login successful");
                console.log(res)
                // Cookies.setItem("User Deatils",res.user)
                Cookies.set("userDetails", JSON.stringify(res.data.user), {
                    expires: 1
                });
                window.dispatchEvent(new Event("loginStatusChanged"))

                setTimeout(() => {
                    navigate("/");
                }, 1500);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Login failed");
            });
    }

    return (
        <>
            <div className="login-page">
                <div className="logincontainer">

                    <div className="login-logo">
                        <span>Amaze</span>
                        <span className="logo-sub">
                            <span className="logo-smile">↗</span> mania
                        </span>
                    </div>

                    <p className="login-tag">
                        YOUR NEXT FAVORITE THING
                    </p>

                    <h2>
                        Welcome <span>Back.</span>
                    </h2>

                    <p className="login-description">
                        Sign in to continue your shopping journey.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="login-email">
                            Email address
                        </label>

                        <input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div className="password-label">
                            <label htmlFor="login-password">
                                Password
                            </label>
                            <span>Keep it secure</span>
                        </div>

                        <div className="password-wrapper">
                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? "🙈" : "👁"}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                        >
                            Login <span>→</span>
                        </button>
                    </form>

                    <div className="login-bottom">
                        <span>New to Amaze mania?</span>

                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                        >
                            Create account
                        </button>
                    </div>

                    <p className="login-footer">
                        SECURE LOGIN · SHOP WITH CONFIDENCE
                    </p>

                </div>
            </div>

            <ToastContainer position="top-right" />
        </>

    )
}

