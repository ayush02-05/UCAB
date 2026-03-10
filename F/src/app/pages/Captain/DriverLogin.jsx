import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarFront, Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCaptain } from "../../context/CaptainContext";

export function DriverLogin() {
  const { login } = useCaptain();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/captain/login",
        data,
        { withCredentials: true },
      );

      if (response.status === 200) {
        login(response.data.captain);
        toast.success("Captain Login successful!");
        navigate("/captain-dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-4 space-y-8">
        <div>
          <div className="flex justify-center  p-3 rounded-2xl text-zinc-900 ">
            <CarFront size={52} />{" "}
          </div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Driver Login
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your driver account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <div className="rounded-md space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>

              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>

                <input
                  type="email"
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                  placeholder="driver@example.com"
                  {...register("email", { required: true })}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>

                <input
                  type="password"
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                />
              </div>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
            >
              Login as Driver
              <span className=" inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-gray-400 group-hover:text-gray-300" />
              </span>
            </button>
          </div>
        </form>

        {/* Register */}
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Want to drive with us?{" "}
            <Link
              to="/captain-register"
              className="font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center mt-2"
            >
              Register as Driver <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
