import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUSerAction } from "../../features/Actions/AuthAction";

const LoginForm = () => {
const dispatch=  useDispatch()
  const navigate =  useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async(data) => {
    console.log(data);

   let response =await dispatch(loginUSerAction(data))
   console.log("response ==>",response)
   if(response.status == 200 || response.status == 201){
    navigate("/chat")
   }else{
    alert("enter correct details.")
   }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container   ">

   <div className="form-wrapper ">
       <h2 className="mb-3 text-center">Login</h2>

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Enter Email"
        {...register("email", { required: "Email is required" })}
        className="form-control mb-2"
      />
      {errors.email && <p className="text-danger">{errors.email.message}</p>}

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Enter Password"
        {...register("password", { required: "Password is required" })}
        className="form-control mb-3"
      />
      {errors.password && <p className="text-danger">{errors.password.message}</p>}

      <button className="btn btn-success w-100" type="submit">Login</button>
   </div>
    </form>
  );
};

export default LoginForm;
