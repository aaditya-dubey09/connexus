import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/user.thunk";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Password and confirm password do not match");
    }
    const response = await dispatch(registerUserThunk(signupData));
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
          <p>
            <span className="text-indigo-500">
              New Here?&nbsp;
            </span>Create your account to continue.</p>
        </div>
    
        <label className="flex items-center gap-2 px-3 py-2 border border-gray-800 rounded-full">
          <FaUser />
          <input
            type="text"
            name="fullName"
            className="bg-transparent border-0 rounded-full shadow-md outline-none grow"
            placeholder="Full Name"
            onChange={handleInputChange}
          />
        </label>

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

        <label className="flex items-center gap-2 px-3 py-2 border border-gray-800 rounded-full">
          <IoKeySharp />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="bg-transparent border-0 rounded-full shadow-md outline-none grow"
            onChange={handleInputChange}
          />
        </label>

        <div className="flex items-center gap-2 px-3 py-2 border border-gray-800 rounded-full">
          <label htmlFor="male" className="flex items-center gap-2">
            <input
              id="male"
              type="radio"
              name="gender"
              value="male"
              className="bg-black border-violet-700 radio checked:bg-violet-400 checked:text-violet-600 checked:border-violet-700 radio-sm"
              onChange={handleInputChange}
            />
            Male
          </label>

          <label htmlFor="female" className="flex items-center gap-2">
            <input
              id="female"
              type="radio"
              name="gender"
              value="female"
              className="bg-black border-violet-700 radio checked:bg-violet-400 checked:text-violet-600 checked:border-violet-700 radio-sm"
              onChange={handleInputChange}
            />
            Female
          </label>
        </div>

        <div className="flex justify-center">
          <button onClick={handleSignup} className="w-auto px-4 py-2 font-bold rounded-full bg-violet-700 hover:bg-violet-800 active:bg-violet-700">
          Signup
        </button>
        </div>

        <p className="text-xs text-center md:text-sm">
          Already have an account? &nbsp;
          <Link to="/login" className="text-violet-600 hover:text-violet-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
