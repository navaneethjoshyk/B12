import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/slices/authSlice"; 
import Logo from "../components/Logo";
import Button from "../components/Button";
import Input from "../components/Input";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState(""); 

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError = false;

    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address.");
      hasError = true;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      hasError = true;
    }
    if (hasError) return;

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", 
      });

      const data = await response.json();

      if (response.ok) {
        // data.user should match your AuthUser type
        dispatch(setAuth(data.user)); 
        navigate("/discover");
      } else {
        setGeneralError(data.message || "Login failed.");
      }
    } catch (err) {
      setGeneralError("Cannot connect to server. Is the backend running?");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      <Logo />
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">Welcome Back</h1>
          <p className="text-neutral-500 mt-3 font-medium">Helping good food reach the right hands.</p>
        </div>

        {generalError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-5 text-center font-medium">
            {generalError}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSignIn}>
          <Input
            label="Email"
            type="email"
            value={email}
            placeholder="name@organization.com"
            error={emailError}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            error={passwordError}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError(""); 
            }}
          />

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 accent-[#058177]" />
              <span className="text-sm font-medium text-neutral-600 group-hover:text-black transition-colors">Remember me</span>
            </label>
            <span onClick={() => navigate("/forgot-password")} className="text-sm font-bold text-[#058177] cursor-pointer hover:underline">Forgot password?</span>
          </div>

          <Button type="submit" variant="primary" className="w-full py-4 rounded-2xl font-bold text-lg mt-4">Sign in</Button>
        </form>

        <p className="text-center text-sm text-neutral-500 mt-8">
          New to B12Feed? <span onClick={() => navigate("/signup")} className="font-bold text-[#058177] cursor-pointer hover:underline">Get started</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;