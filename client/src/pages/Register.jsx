import { useState } from "react";
import API from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    interest: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("REGISTER DATA SENT:", formData);

      const res = await API.post("/auth/register", formData);

      console.log("REGISTER SUCCESS:", res.data);

      alert("Registration Successful");
      window.location.href = "/login";

      // clear form after success
      setFormData({
        name: "",
        email: "",
        password: "",
        interest: "",
      });
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data || error);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register Page</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          required
        >
          <option value="">Select Interest</option>
          <option value="Web Development">Web Development</option>
          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>
          <option value="Cybersecurity">Cybersecurity</option>
        </select>

        <button
          type="submit"
          style={{
            backgroundColor: "#282c34",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;