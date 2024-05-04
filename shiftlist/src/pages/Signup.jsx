import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiURL from "../utils/apiURL";
export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleChange = (type, value) => {
        if (type === "email") {
            setEmail(value);
        }
        if (type === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            email: email,
            password: password,
        };

        try {
            const request = await fetch(`${apiURL}/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!request.ok) {
                throw new Error("sign up failed @ Signup");
            }
            const data = await request.json();
            console.log(data);
            setEmail("");
            setPassword("");
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up for an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12 pb-4">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            handleChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="pb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            handleChange(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="">
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>

                        <div>
                            <div className="relative mt-10">
                                <div
                                    className="absolute inset-0 flex items-center"
                                    aria-hidden="true"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{" "}
                        <a
                            href="/login"
                            className="font-semibold leading-6 text-teal-600 hover:text-teal-500"
                        >
                            Sign in here
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
