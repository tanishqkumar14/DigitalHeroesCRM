import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import logo from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser(form);

    login(
    res.data.token,
    res.data.user
);

      toast.success("Login Successful!");

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-white to-blue-50 px-6">

      {/* Background Blur */}

      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"></div>

      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-blue-100 blur-3xl"></div>

      {/* Main Container */}

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-2xl lg:grid-cols-2">

        {/* Left Section */}

        <div className="hidden flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-12 py-16 text-center lg:flex">

          <img
            src={logo}
            alt="Digital Heroes"
            className="mb-8 h-44 w-44 object-contain drop-shadow-xl"
          />

          <h1 className="text-4xl font-bold text-white">
            Digital Heroes CRM
          </h1>

          <p className="mt-6 max-w-sm text-lg leading-8 text-slate-300">
            Manage your customer leads efficiently.
          </p>

        </div>

        {/* Right Section */}

        <div className="flex items-center justify-center px-8 py-12 sm:px-12">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}

            <div className="mb-8 flex flex-col items-center lg:hidden">

              <img
                src={logo}
                alt="Digital Heroes"
                className="mb-5 h-28 w-28 object-contain"
              />

              <h1 className="text-3xl font-bold text-gray-900">
                Digital Heroes CRM
              </h1>

            </div>

            <h2 className="text-4xl font-bold text-gray-900">
              Welcome Back 👋
            </h2>

            <p className="mt-3 text-gray-500">
              Sign in to continue
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >

              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 outline-none transition-all duration-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-14 outline-none transition-all duration-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-blue-600"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>
                            {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <div className="flex items-center gap-3">

                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>

                    Logging in...

                  </div>
                ) : (
                  "Login to Dashboard"
                )}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;