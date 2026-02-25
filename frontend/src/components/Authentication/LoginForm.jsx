import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUSerAction } from "../../features/Actions/AuthAction";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    let response = await dispatch(loginUSerAction(data));

    if (response?.status == 200 || response?.status == 201) {
      navigate("/chat");
    } else {
      alert("enter correct details.");
    }
  };

  const handleGuestLogin = async () => {
    const guestData = {
      email: "example@123gmail.com",
      password: "123",
    };

    let response = await dispatch(loginUSerAction(guestData));

    if (response?.status == 200 || response?.status == 201) {
      navigate("/chat");
    } else {
      alert("Guest login failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <div className="form-wrapper">
        <h2 className="mb-3 text-center">Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          {...register("email", { required: "Email is required" })}
          className="form-control mb-2"
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Enter Password"
          {...register("password", { required: "Password is required" })}
          className="form-control mb-3"
        />
        {errors.password && <p className="text-danger">{errors.password.message}</p>}

        <button className="btn btn-success w-100 mb-2" type="submit">
          Login
        </button>

        <button
          type="button"
          onClick={handleGuestLogin}
          className="btn btn-secondary w-100 mb-2"
        >
          Login as Guest
        </button>

        <div className="text-center">
          <span>Don't have an account? </span>
          <Link to="/register" className="btn btn-link p-0">
            Register
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;