import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  Car,
  FileText,
  Users,
  PaintBucket,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useCaptain } from "../../context/CaptainContext";

export function DriverRegisterPage() {
  const { login } = useCaptain();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {},
  });

  const handleRegister = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/captain/register",
        data,
        { withCredentials: true },
      );

      // Mock Driver Registration
      if (response.status == 201) {
        login({
          captain: response.data.captain,
          role: "driver",
        });

        toast.success(
          "Driver application submitted! Welcome to UCab Partners.",
        );
        navigate("/captain-dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50 py-1 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 py-[-50%] space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Drive with UCab
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Earn money on your own schedule. Sign up today.
          </p>
        </div>

        <form
          className="mt-6 space-y-5"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                  placeholder="John"
                  {...register("fullname.firstname", { required: true })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                  placeholder="Doe"
                  {...register("fullname.lastname", { required: true })}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                placeholder="driver@example.com"
                {...register("email", { required: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone", { required: true })}
                />
              </div>
            </div>

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
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5 mt-5">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-gray-500" />
              Vehicle Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Colour
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PaintBucket className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black sm:text-sm"
                    placeholder="colour"
                    {...register("vehicle.color", { required: true })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Car className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black sm:text-sm uppercase"
                    placeholder="ABC 1234"
                    {...register("vehicle.plate", { required: true })}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Capacity
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    className="..."
                    placeholder="4" // Updated placeholder
                    {...register("vehicle.capacity", {
                      required: true,
                      valueAsNumber: true, // Ensures it's sent as an Int, not a String
                    })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Type
                </label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm bg-white"
                  {...register("vehicle.vehicletype", { required: true })}
                >
                  <option value="car">car</option>
                  <option value="motorcycle">motorcycle</option>
                  <option value="bike">bike</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
          >
            Submit Application
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Already a partner?{" "}
            <Link
              to="/captain-login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
