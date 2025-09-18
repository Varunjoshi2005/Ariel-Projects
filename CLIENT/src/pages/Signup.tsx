import styles from "../styles/user.module.css";
import { useNavigate } from "react-router-dom";
import Config from "../config";
import React, { useEffect, useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [message, setMessage] = useState<{
    msg: string;
    type: "ERR" | "MSG";
  } | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessage(null);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentData: any = {};
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");

    if (!email || !password || !username) {
      return;
    }
    currentData.username = username;
    currentData.email = email;
    currentData.password = password;

    console.log(currentData);
    try {
      const res = await fetch(`${Config.BACKEND_URL}/account/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentData),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage({ msg: result.message, type: "MSG" });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        return;
      }
      if (!res.ok) {
        setMessage({ msg: result.error, type: "ERR" });
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.signContainer}>
      <form onSubmit={handleSignUp} className={styles.formContainer}>
        <span style={{ fontSize: "2rem", fontWeight: "bolder" }}>Sign Up</span>

        <input type="text" name="username" placeholder="Username..." required />
        <input type="email" name="email" placeholder="Email..." required />
        <input
          type="password"
          name="password"
          placeholder="Password..."
          required
        />
        <button type="submit">Sign up</button>
        <span style={{ display: "flex", gap: "4px" }}>
          <span>Already Registered?</span>
          <a href="/login">Login</a>
        </span>
      </form>

      <div style={{ height: "20px", marginTop: "20px" }}>
        {message && (
          <span
            style={{
              color:
                message.type == "MSG"
                  ? "rgba(43, 255, 0, 1)"
                  : "rgba(253, 48, 48, 1)",
              fontWeight: "bolder",
            }}
          >
            {message.msg}
          </span>
        )}
      </div>
    </div>
  );
}

export default Signup;
