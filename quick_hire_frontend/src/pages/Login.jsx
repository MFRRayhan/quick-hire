import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

export default function Login() {
  const { login, loginWithGoogle, createUser, updateUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password)
      .then((result) => {
        Swal.fire("Success", "Logged in successfully!", "success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire("Error", "Invalid email or password.", "error");
      });
  };

  const handleDemoLogin = async (type) => {
    const demoEmail =
      type === "admin" ? "admin@quickhire.com" : "user@quickhire.com";
    const demoPassword = "password123";
    const demoName = type === "admin" ? "Demo Admin" : "Demo User";

    try {
      await login(demoEmail, demoPassword);
      Swal.fire("Success", `Logged in as ${demoName}!`, "success");
      navigate(from, { replace: true });
    } catch (error) {
      try {
        const result = await createUser(demoEmail, demoPassword);
        await updateUser(result.user, { displayName: demoName });

        const userInfo = { email: demoEmail, name: demoName };
        await fetch(`${import.meta.env.VITE_API_URL || ""}/api/users`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInfo),
        });

        Swal.fire(
          "Success",
          `Created and logged in as ${demoName}!`,
          "success",
        );
        navigate(from, { replace: true });
      } catch (createError) {
        Swal.fire("Error", "Could not initialize demo account.", "error");
      }
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/users`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInfo),
        }).then(() => {
          Swal.fire("Success", "Logged in with Google!", "success");
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        Swal.fire("Error", "Could not log in with Google.", "error");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>

        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-6 text-sm border border-blue-100">
          <p className="font-semibold mb-2">Demo Access:</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="btn btn-sm btn-primary flex-1"
            >
              Login as Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("user")}
              className="btn btn-sm btn-outline btn-primary flex-1"
            >
              Login as User
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="input input-bordered w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              className="input input-bordered w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Log In
          </button>
        </form>

        <div className="divider my-6">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
