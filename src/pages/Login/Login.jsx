import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import SocialLogin from "../../component/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../component/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const { signIn, user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const redirectToPage = () => {
        const redirectTo = location.state?.from?.pathname || "/";
        navigate(redirectTo, { replace: true });
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;

        signIn(email, password)
            .then(() => {
                form.reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500,
                });
                redirectToPage();
            })
            .catch((error) => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${error.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    // 🔥 Quick Login Handler
    const handleQuickLogin = (role) => {
        const credentials = {
            user: { email: "partho@gmail.com", password: "123Aa!" },
            admin: { email: "test@gmail.com", password: "123Aa!" },
        };

        const { email, password } = credentials[role];
        setEmail(email);

        signIn(email, password)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${role === "admin" ? "Admin" : "User"} Login Successful`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                redirectToPage();
            })
            .catch((error) => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${error.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    return (
        <section>
            <Helmet><title>Insightly | Sign In</title></Helmet>
            <div className="min-h-screen flex justify-center bg-background transform">
                {loading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                ) : (
                    <div className="card w-full max-w-xl shadow-2xl p-10 transform rounded-lg my-10">
                        <SectionTitle heading="sign in" subHeading="Welcome! Log into your account"></SectionTitle>

                        {/* 💥 Quick Login Buttons */}
                        <div className="flex justify-center gap-4 mb-6">
                            <button
                                onClick={() => handleQuickLogin("user")}
                                className="btn btn-primary"
                            >
                                Login as User
                            </button>
                            <button
                                onClick={() => handleQuickLogin("admin")}
                                className="btn btn-primary"
                            >
                                Login as Admin
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="">Email</span>
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered bg-white text-black"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-control relative">
                                <label className="label">
                                    <span className="">Password</span>
                                </label>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="input input-bordered bg-white text-black"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-xs absolute right-2 top-12 bg-white text-black"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                                <label className="label">
                                    <p className="label-text-alt link link-hover text-black">
                                        Forgot password?
                                    </p>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </form>

                        <p className="text-center font-semibold">
                            Don't Have An Account?{" "}
                            <span className="text-blue-600">
                                <Link to="/register">Register</Link>
                            </span>
                        </p>
                        <SocialLogin />
                    </div>
                )}
            </div>
        </section>
    );
};

export default Login;
