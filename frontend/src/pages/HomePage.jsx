import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const isLogin = location.pathname === "/login";
const isRegister = location.pathname === "/register";
// console.log(isLogin,isRegister)

  return (
    <div className="container myContainer">

      <div className="text-center mb-4">
        <h2>Talk-A-Tive</h2>
        <p>
          <span  className={`mx-2 px-3 py-1 rounded ${isLogin ? "bg-primary text-white" : "text-primary"}`} onClick={() => navigate('/login')}>Login</span>
          <span   className={`mx-2 px-3 py-1 rounded  ${isRegister ? "bg-success text-white" : "text-success"}`} onClick={() => navigate('/register')}>Register</span>
        </p>
      </div>

      {/* The nested route will render here */}
      <Outlet />
    </div>
  );
};

export default HomePage;
