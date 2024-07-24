import logo from "../assets/logo.png";
import bg from "../assets/background_banner.jpg";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/fire-base";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";
import { FirebaseError } from "firebase/app";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [signError, setSignError] = useState<string>("");
  const navigate = useNavigate();

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      if (e.target.value.length == 0) {
        setErrors({ ...errors, [e.target.name]: "This field is required" });
      } else {
        setErrors({ ...errors, [e.target.name]: "" });
      }
    }

    if (e.target.name === "password") {
      if (e.target.value.length == 0) {
        setErrors({ ...errors, [e.target.name]: "This field is required" });
      } else {
        setErrors({ ...errors, [e.target.name]: "" });
      }
    }
  };
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (info.email && info.password) {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, info.email, info.password);
        navigate("/Netflix-Clone");
      } catch (err) {
        setSignError((err as FirebaseError).code);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors((prev) => {
        if (info.email.length == 0) {
          prev.email = "This field is required";
        }
        if (info.password.length == 0) {
          prev.password = "This field is required";
        }
        return prev;
      });
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      className="relative py-5 before:absolute before:inset-0 origin-center before:bg-gradient-to-r before:from-[rgba(0,0,0,0.4)] before:to-[rgba(0,0,0,0.4)]"
    >
      <div className="container min-h-screen z-50 relative">
        <img src={logo} className="w-[150px]" alt="logo" />
        {loading ? (
          <Loader />
        ) : (
          <div className="max-w-[500px] mx-auto bg-black bg-opacity-75 rounded max-md:p-10 p-16 mt-12 ">
          <h1 className="text-3xl mb-7  font-semibold text-white">Sign in</h1>
          <form onSubmit={handelSubmit} className="space-y-6">
            {signError && <h2 className="text-red tet-xl py-2">{signError}</h2>}
            <fieldset>
              <input
                onChange={handelChange}
                value={info.email}
                type="email"
                className="w-full bg-[#333] border border-gray text-white  py-4 text-base px-5 rounded"
                placeholder="Email"
                name="email"
              />
              {errors.email && <p className="text-red  pt-2">{errors.email}</p>}
            </fieldset>
            <fieldset>
              <input
                onChange={handelChange}
                value={info.password}
                type="password"
                placeholder="Password"
                className="w-full border border-gray bg-[#333] text-white  py-4 text-base px-5 rounded"
                name="password"
                id=""
              />
              {errors.password && (
                <p className="text-red pt-2">{errors.password}</p>
              )}
            </fieldset>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red text-white py-4 px-5 rounded capitalize text-lg"
            >
              Sign in
            </button>
          </form>
          <p className="text-white mt-5">
            Don't have an account?{" "}
            <Link to={"/Netflix-Clone/register"} className="text-red cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>
        )}
     
      </div>
    </div>
  );
};

export default Login;
