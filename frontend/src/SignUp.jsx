import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    pan: "",
    file: null, // New state for file
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("pan", formData.pan);
      formDataToSend.append("file", formData.file); // Append file to FormData

      const res = await fetch("http://localhost:8000/api/auth/upload", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError("Username or PAN Number already exists. Please try again.");
        setSuccessMessage(null);
        return;
      }

      setLoading(false);
      setError(null);
      setSuccessMessage("User data received successfully!");
      navigate("/home");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(`Something went wrong`);
      setSuccessMessage(null);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Pan Number"
          className="border p-3 rounded-lg"
          id="pan"
          onChange={handleChange}
        />
        <input
          type="file" // Input field for file
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-5">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mt-5">{successMessage}</p>
      )}
    </div>
  );
};

export default SignUp;
