import {
  Button,
  Container,
  Navbar,
  ButtonGroup,
  NavDropdown,
} from "react-bootstrap";
// import Container from "react-boots;
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slice/userApiSlice";
import { logout } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <div className="flex">
          <LinkContainer to="/">
            <Navbar.Brand href="#">mern auth</Navbar.Brand>
          </LinkContainer>

          <div className="">
            {userInfo ? (
              <>
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <ButtonGroup className="mb-2" size="sm">
                  <LinkContainer to="/login">
                    <Button variant="secondary ">Sign In</Button>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Button variant="outline-success">sign Up</Button>
                  </LinkContainer>
                </ButtonGroup>
              </>
            )}
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
