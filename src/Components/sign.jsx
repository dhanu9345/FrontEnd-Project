import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./sign.css"
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"
export default function Signup() {
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [confirmpassword, setConfirmPassword] = useState("")
    let nameRegex = /^[A-Za-z ]{3,}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()

        if (!nameRegex.test(name)) {
            console.error("wrong Name")
            return
        }
        if (!emailRegex.test(email)) {
            console.error("wrong email password")
            return
        }
        if (!passwordRegex.test(password)) {
            console.error("wrong password format")
            return
        }
        if (confirmpassword !== password) {
            console.error("wrong confirm password")
            return
        }

        console.log("form successfully  submitted")

        axios.post("http://localhost:2025/user/register", {
            Name: name,
            Email: email,
            Password: password,
        }).then((res) => {
            toast.success("Signup successful!");
            setTimeout(() => {
                navigate("/");
            }, 1500);

        })
            .catch((err) => {
                toast.error(err.respones?.data?.message || "Signup Failed")

            })

    }
    return (
        <> 
         <div className="signup-page">
            <div className="signcontainer">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="Enter tha name"
                        value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder=" Enter you password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" placeholder="Enter your confirm password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="submit"> Sign up</button>
                </form>
            </div>
             </div>
            <ToastContainer />
        </>
    )
}