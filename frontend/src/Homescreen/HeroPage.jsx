import { useSelector } from "react-redux";
import UserHomePage from "./UserHomePage";
const HeroPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? (
    <><UserHomePage prop={userInfo}/></>
  ) : (
    <>
      <div className="container mt-3">
        <div className="card">
          <h5 className="card-header">Featured</h5>
          <div className="card-body text-center">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text  ">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" className="m-3 btn btn-secondary">
              sign up
            </a>
            <a href="#" className="btn btn-secondary">
              sign in
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroPage;
