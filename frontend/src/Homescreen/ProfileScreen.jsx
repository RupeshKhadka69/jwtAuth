import { useState, useEffect } from "react";
import { useUpdateMutation } from "../slice/userApiSlice";
import { setCredentials } from "../slice/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../component/Loader";
import { Container, Button } from "react-bootstrap";
const UpdateForm = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const [updateUser, { isLoading }] = useUpdateMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("password unmatch");
    } else {
      try {
        const res = await updateUser({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        toast.success("Updated successful");
        dispatch(setCredentials({ ...res }));
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
      }
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
              <label className="form-label">Name </label>
              <input
                type="name"
                value={name}
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
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
            <div className="form-outline mb-4">
              <label className="form-label">SetPassword</label>
              <input
                type="password"
                value={confirmpassword}
                placeholder="enter password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
              />
            </div>
            {isLoading && <Loader />}

            <Button type="submit" className="btn btn-primary btn-block mb-4">
              Update
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default UpdateForm;
