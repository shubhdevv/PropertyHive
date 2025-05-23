import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(res.data)

      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;

// import { useContext, useState } from "react";
// import "./login.scss";
// import { Link, useNavigate } from "react-router-dom";
// import apiRequest from "../../lib/apiRequest";
// import { AuthContext } from "../../context/AuthContext";
// import { GoogleLogin } from '@react-oauth/google';
// import jwtDecode from 'jwt-decode';

// function Login() {
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const { updateUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");
//     const formData = new FormData(e.target);

//     const username = formData.get("username");
//     const password = formData.get("password");

//     try {
//       const res = await apiRequest.post("/auth/login", {
//         username,
//         password,
//       });

//       updateUser(res.data);
//       navigate("/");
//     } catch (err) {
//       setError(err.response.data.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLoginSuccess = async (credentialResponse) => {
//     try {
//       const { credential } = credentialResponse;
//       const decoded = jwtDecode(credential);

//       // Here you can either:
//       // 1. Directly updateUser(decoded); 
//       // OR 
//       // 2. Send token to your backend for verification and login/signup flow
      
//       const res = await apiRequest.post("/auth/google-login", {
//         token: credential,
//       });

//       updateUser(res.data);
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       setError("Google login failed");
//     }
//   };

//   const handleGoogleLoginError = () => {
//     setError("Google login failed");
//   };

//   return (
//     <div className="login">
//       <div className="formContainer">
//         <form onSubmit={handleSubmit}>
//           <h1>Welcome back</h1>
//           <input
//             name="username"
//             required
//             minLength={3}
//             maxLength={20}
//             type="text"
//             placeholder="Username"
//           />
//           <input
//             name="password"
//             type="password"
//             required
//             placeholder="Password"
//           />
//           <button disabled={isLoading}>Login</button>
//           {error && <span>{error}</span>}
//           <Link to="/register">{"Don't"} you have an account?</Link>

//           {/* Google Login Button */}
//           <div style={{ marginTop: "20px" }}>
//             <GoogleLogin
//               onSuccess={handleGoogleLoginSuccess}
//               onError={handleGoogleLoginError}
//             />
//           </div>

//         </form>
//       </div>
//       <div className="imgContainer">
//         <img src="/bg.png" alt="" />
//       </div>
//     </div>
//   );
// }

// export default Login;
