import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiURL from "../utils/apiURL";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
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
        const loginObject = {
            email: email,
            password: password,
        };
        try {
            const request = await fetch(`${apiURL}/user/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginObject),
            });
            if (!request.ok) {
                throw new Error("login failed at Login.jsx");
            }
            const data = await request.json();
            console.log(data);
            sessionStorage.setItem("user", data._id);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form
                            className="space-y-6"
                            onSubmit={(e) => handleSubmit(e)}
                        >
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
                                        value={email}
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6 px-2"
                                        onChange={(e) =>
                                            handleChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div>
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
                                        value={password}
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            handleChange(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 accent-green-400 rounded border-gray-300 text-teal-600 focus:ring-indigo-600"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-3 block text-sm leading-6 text-gray-900"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm leading-6">
                                    <a
                                        href="#"
                                        className="font-semibold text-teal-600 hover:text-teal-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
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
                        Not a member?{" "}
                        <a
                            href="/signup"
                            className="font-semibold leading-6 text-teal-600 hover:text-teal-500"
                        >
                            Sign up here
                        </a>
                    </p>
                    <p className="text-center text-sm text-gray-500">
                        {"Don't want to?"}{" "}
                        <a
                            href="/"
                            className="font-semibold leading-6 text-teal-600 hover:text-teal-500"
                        >
                            Try a demo
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
