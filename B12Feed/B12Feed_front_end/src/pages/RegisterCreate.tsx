import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Input from "../components/Input";

const RegisterCreate: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    orgName: "",
    orgAddress: "",
    phone: "",
  });

  // Function to format phone: (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const finalValue = name === "phone" ? formatPhoneNumber(value) : value;
    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    
    try {
      // Connecting to your Node.js backend route
      const response = await fetch("http://localhost:5000/users/signup/organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        // Redirect to the success screen you built
        navigate("/signup/success");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Failed to connect to the server. Is your backend running?");
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-6 font-sans text-center">
      <Logo />

      <div className="w-full max-w-xl">
        <div className="mt-8 mb-10">
          <h1 className="text-3xl font-bold text-neutral-800 tracking-tight">
            Create your organization
          </h1>
          <p className="text-neutral-500 mt-3 font-medium">
            Set up your organization to start using B12Feed.
          </p>
        </div>

        <form className="space-y-5 text-left" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              placeholder="e.g. John"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="e.g. Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="name@organization.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Organization name"
            name="orgName"
            placeholder="e.g. Parkdale Community Kitchen"
            value={formData.orgName}
            onChange={handleChange}
            required
          />

          <Input
            label="Organization address"
            name="orgAddress"
            placeholder="Street address, City"
            value={formData.orgAddress}
            onChange={handleChange}
            required
          />

          <Input
            label="Primary contact phone"
            name="phone"
            type="tel"
            placeholder="e.g. (416) 555-0123"
            value={formData.phone}
            onChange={handleChange}
            maxLength={14}
            required
          />

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading} 
            className="w-full py-4 rounded-2xl font-bold text-lg mt-6"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCreate;