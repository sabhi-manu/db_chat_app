import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { registerAction } from "../../features/Actions/AuthAction";
import { useNavigate } from "react-router-dom";




const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
 const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);

  if (data.avatar && data.avatar[0]) {
    formData.append("avatar", data.avatar[0]);
  }

  for (let pair of formData.entries()) {
    console.log(pair[0] + ":", pair[1]);
  }

 let response = await dispatch(registerAction(formData));
 console.log("register user response ==>",response)
  if(response.status == 200 || response.status== 201){
    navigate("/chat")
  }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container"  encType="multipart/form-data">
<div className="form-wrapper">
     <h2 className="mb-3 text-center ">Register</h2>

      {/* NAME */}
      <input
        type="text"
        placeholder="Enter Name"
        {...register("name", { required: "Name is required" })}
        className="form-control mb-2"
      />
      {errors.name && <p className="text-danger">{errors.name.message}</p>}

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
        className="form-control mb-2"
      />
      {errors.password && <p className="text-danger">{errors.password.message}</p>}

      {/* AVATAR */}
      <input
        type="file"
      accept="image/*"
        {...register("avatar")}
        className="form-control mb-3"
         name="avatar"
           onChange={(e) => {
    console.log("selected file:", e.target.files[0]);
  }}
      />
    

      <button className="btn btn-primary w-100" type="submit">Register</button>
</div>
     
    </form>
  );
};

export default RegisterForm;
