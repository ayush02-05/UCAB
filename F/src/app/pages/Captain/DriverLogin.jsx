// import React from "react";
// import { Link } from "react-router-dom";
// import { CarFront, Mail, Lock } from "lucide-react";
// import { Button } from "../../components/ui/Button";
// import { Input } from "../../components/ui/Input";
// import { motion } from "motion/react";
// import { useForm } from "react-hook-form";

// export function DriverLogin() {
//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const handleLogin = async (data) => {
//     const { email, password } = data;
//     if (!email || !password) {
//       toast.error("Please fill in all fields");
//       return;
//     }
//     console.log(data);

//     // try {
//     //   const response = await axios.post(
//     //     "http://localhost:4000/api/captain/login",
//     //     data,
//     //     { withCredentials: true },
//     //   );

//     //   // Mock login
//     //   if (response.status == 201) {
//     //     login({
//     //       user: response.data.user,
//     //       role: "user",
//     //     });
//     //     toast.success("Login successful!");
//     //     navigate("/dashboard");
//     //   }
//     // } catch (error) {
//     //   console.log(error);
//     // }
//   };
//   return (
//     <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-zinc-900 py-12 px-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4 }}
//         className="w-full max-w-md bg-zinc-800 rounded-3xl shadow-2xl p-8 border border-zinc-700"
//       >
//         <div className="flex flex-col items-center mb-8">
//           <div className="bg-yellow-400 p-3 rounded-2xl text-zinc-900 mb-4 shadow-lg shadow-yellow-400/20">
//             <CarFront size={32} />
//           </div>
//           <h1 className="text-2xl font-bold text-white">
//             Driver Partner Login
//           </h1>
//           <p className="text-zinc-400 mt-2 text-center">
//             Login to your driver account to accept rides
//           </p>
//         </div>

//         <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
//           <div className="space-y-1.5">
//             <label className="text-sm font-medium text-zinc-300">
//               Email Address
//             </label>
//             <div className="relative">
//               <div className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500">
//                 <Mail size={18} />
//               </div>
//               <Input
//                 type="email"
//                 placeholder="driver@example.com"
//                 className="pl-10 h-12 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-yellow-400"
//                 {...register("email", { required: true })}
//               />
//             </div>
//           </div>

//           <div className="space-y-1.5">
//             <div className="flex items-center justify-between">
//               <label className="text-sm font-medium text-zinc-300">
//                 Password
//               </label>
//               <Link
//                 to="#"
//                 className="text-sm text-yellow-400 hover:underline font-medium"
//               >
//                 Forgot Password?
//               </Link>
//             </div>
//             <div className="relative">
//               <div className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500">
//                 <Lock size={18} />
//               </div>
//               <Input
//                 type="password"
//                 placeholder="••••••••"
//                 className="pl-10 h-12 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-yellow-400"
//                 {...register("password", { required: true })}
//               />
//             </div>
//           </div>

//           <Button
//             type="submit"
//             variant="secondary"
//             className="w-full h-12 text-base font-semibold shadow-md mt-6"
//           >
//             Login as Driver
//           </Button>

//           <p className="text-center text-sm text-zinc-400 mt-6 pt-4 border-t border-zinc-700">
//             Want to drive with us?{" "}
//             <Link
//               to="/driver/signup"
//               className="text-yellow-400 font-semibold hover:underline"
//             >
//               Register as Driver
//             </Link>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

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

      if (response.status === 201) {
        login({
          captain: response.data.captain,
          role: "captain",
        });

        toast.success("Driver login successful!");
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
