import logo from "../assets/logo.png";
import bg from "../assets/background_banner.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/fire-base";
import Loader from "../components/Loader";
const Register = () => {
  const [info, setInfo] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    email: string;
    password: string;
    name: string;
  }>({
    email: "",
    password: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      if (e.target.value.length == 0) {
        setErrors({ ...errors, [e.target.name]: "This field is required" });
      } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
        setErrors({ ...errors, [e.target.name]: "Invalid Email" });
      } else {
        setErrors({ ...errors, [e.target.name]: "" });
      }
    }

    if (e.target.name === "password") {
      if (e.target.value.length == 0) {
        setErrors({ ...errors, [e.target.name]: "This field is required" });
      } else if (e.target.value.length < 6) {
        setErrors({ ...errors, [e.target.name]: "Password must be 6" });
      } else {
        setErrors({ ...errors, [e.target.name]: "" });
      }
    }

    if (e.target.name === "name") {
      if (e.target.value.length == 0) {
        setErrors({ ...errors, [e.target.name]: "This field is required" });
      } else if (e.target.value.length < 3) {
        setErrors({ ...errors, [e.target.name]: "Name must be 3" });
      } else {
        setErrors({ ...errors, [e.target.name]: "" });
      }
    }
  };
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      /\S+@\S+\.\S+/.test(info.email) &&
      info.name.length >= 3 &&
      info.password.length >= 6
    ) {
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, info.email, info.password);
        const user = auth.currentUser as User;
        await updateProfile(user, {
          displayName: info.name,
        });
        navigate("/Netflix-Clone");
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (info.name.length < 3) {
          newErrors.name = "Name must be 3";
        }
        if (!/\S+@\S+\.\S+/.test(info.email)) {
          newErrors.email = "Invalid Email";
        }
        if (info.password.length < 6) {
          newErrors.password = "Password must be 6";
        }
        return newErrors;
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
            <h1 className="text-3xl mb-7  font-semibold text-white">Sign up</h1>
            <form onSubmit={handelSubmit} className="space-y-6">
              <fieldset>
                <input
                  type="text"
                  onChange={handelChange}
                  value={info.name}
                  placeholder="Your name"
                  name="name"
                  className="w-full border border-gray bg-[#333] text-white  py-4 text-base px-5 rounded"
                />

                <p className="text-red pt-2 text-sm">{errors.name}</p>
              </fieldset>
              <fieldset>
                <input
                  type="email"
                  className="w-full bg-[#333] border border-gray text-white  py-4 text-base px-5 rounded"
                  placeholder="Email"
                  name="email"
                  value={info.email}
                  onChange={handelChange}
                />
                <p className="text-red text-sm pt-2">{errors.email}</p>
              </fieldset>
              <fieldset>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray bg-[#333] text-white  py-4 text-base px-5 rounded"
                  name="password"
                  value={info.password}
                  onChange={handelChange}
                />

                <p className="text-red pt-2 text-sm">{errors.password}</p>
              </fieldset>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red text-white py-4 px-5 rounded capitalize text-lg"
              >
                Sign up
              </button>
            </form>
            <p className="text-white mt-5">
              Already have an account?{" "}
              <Link to={"/Netflix-Clone/login"} className="text-red cursor-pointer">
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
