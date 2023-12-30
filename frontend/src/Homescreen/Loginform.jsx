import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slice/userApiSlice";
import { setCredentials } from "../slice/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import Loader from "../component/Loader";

const Loginform = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login,{isLoading}] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if userInfo is updated
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt login
      const res = await login({ email, password }).unwrap();
      toast.success("Login successful");
      dispatch(setCredentials({...res}));
      navigate('/');

      // Log for debugging

      // Navigate to home page
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <Container>
      <div
        style={{ display: "grid", placeContent: "center", marginTop: "50px" }}
      >
        <div className="" style={{ minWidth: "400px" }}>
          <form onSubmit={handleSubmit}>
            {/* <!-- Email input --> */}
            <div className="form-outline mb-4">
              <label className="form-label">Email address</label>
              <input
                type="email"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>

            {/* <!-- Password input --> */}
            <div className="form-outline mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                placeholder="enter password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
             {isLoading && <Loader/>}
            <Button type="submit" className="btn btn-primary btn-block mb-4">
              Sign in
            </Button>

            <div className="text-center">
              <p>
                Not a member? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Loginform;
