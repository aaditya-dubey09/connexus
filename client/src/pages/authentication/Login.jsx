import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/slice/user/user.thunk";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-black">
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-3xl shadow-xl bg-transparent border border-gray-900">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-semibold">Welcome to&nbsp;
            <span className="text-violet-600">Connexus
            </span></h2>
        <p>Please login to continue.</p>
        </div>

        <label className="flex items-center gap-2 px-3 py-2 border border-gray-800 rounded-full">
          <FaUser />
          <input
            type="text"
            name="username"
            className="bg-transparent border-0 rounded-full shadow-md outline-none grow"
            placeholder="Username"
            onChange={handleInputChange}
          />
        </label>

        <label className="flex items-center gap-2 px-3 py-2 border border-gray-800 rounded-full">
          <IoKeySharp />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-transparent border-0 rounded-full shadow-md outline-none grow"
            onChange={handleInputChange}
          />
        </label>

        <div className="flex justify-center">
        <button onClick={handleLogin} className="w-auto px-4 py-2 font-bold rounded-full bg-violet-700 hover:bg-violet-800 active:bg-violet-700">
          Login
        </button>
        </div>

        <p className="text-xs text-center md:text-sm">
          Don&apos;t have an account? &nbsp;
          <Link to="/signup" className="text-violet-600 hover:text-violet-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
