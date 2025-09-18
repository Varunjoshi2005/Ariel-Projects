import styles from "../styles/user.module.css";
import { useNavigate } from "react-router-dom";
import Config from "../config";
import { useUserContext } from "../context/UserContext";
import { ACTIONS } from "../types";
import { useEffect, useState } from "react";
function Login() {

  const navigate = useNavigate();
  const { dispatch } = useUserContext();

  const [message, setMessage] = useState<{ msg: string, type: "ERR" | "MSG" } | null>(null);

  useEffect(() => {

    const timeoutId = setTimeout(() => {
      setMessage(null);
    }, 1500);


    return () => {
      clearTimeout(timeoutId)
    }

  }, [message])


  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      throw new Error("field's are missing!!!");
    }

    try {
      const res = await fetch(`${Config.BACKEND_URL}/account/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const result = await res.json();
      if (res.ok) {
        setMessage({ msg: result.message, type: "MSG" });
        dispatch({ type: ACTIONS.SET_USER, payload: result.data });
        localStorage.setItem("user-details", JSON.stringify(result.data));
        navigate("/");
        return;
      }
      if (!res.ok) {
        setMessage({ msg: result.error, type: "ERR" });
        console.log(result.error);
      }

    } catch (error) {
      console.log(error);
    }


  }


  return (

    <div className={styles.signContainer}>
      <span style={{ fontSize: "2rem", fontWeight: "bolder" }}>Login</span>

      <form onSubmit={handleLogin} className={styles.formContainer}>
        <input type="email" name="email" placeholder="Email..." required />
        <input type="password" name="password" placeholder="Password..." required />
        <button type="submit">Login</button>
        <span style={{ display : 'flex' , gap : "4px" }}>
          <span>Create an account?</span>
           <a   href="/signup">Sign up</a>
        </span>
      </form>

      <div style={{ height: "30px" }}>
        {message && <span style={{ color: message.type == "MSG" ? "green" : "rgba(253, 48, 48, 1)" }}>{message.msg}</span>}
      </div>

    </div>
  )
}

export default Login