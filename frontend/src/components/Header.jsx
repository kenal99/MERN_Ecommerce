import React from "react";
import { Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark bg-gradient ">
        <div className="container">
          <Text fontSize="3xl" fontWeight="extrabold" color="whitesmoke" py={2}>
            <Link to="/">Ecommerce</Link>
          </Text>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
              <li>
                <SearchBox />
              </li>
              <li className="nav-item">
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color="whitesmoke"
                  pr={5}
                  className="nav-link active"
                >
                  <Link to="/cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    &nbsp;Cart
                  </Link>
                </Text>
              </li>
              {userInfo ? (
                <li class="nav-item dropdown">
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    color="whitesmoke"
                    className="nav-link active dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-user"></i>
                    &nbsp;{userInfo.name}
                  </Text>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Text className="dropdown-item">
                        <Link to="/profile">Profile</Link>
                      </Text>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Text className="dropdown-item" onClick={logoutHandler}>
                        Logout
                      </Text>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    color="whitesmoke"
                    className="nav-link active"
                  >
                    <Link to="/login">
                      <i className="fa-solid fa-user"></i>
                      &nbsp;SignIn
                    </Link>
                  </Text>
                </li>
              )}
              {userInfo && userInfo.isAdmin && (
                <li class="nav-item dropdown">
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    color="whitesmoke"
                    className="nav-link active dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-user"></i>
                    &nbsp;Admin Links
                  </Text>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Text className="dropdown-item">
                        <Link to="/admin/userlist">Users</Link>
                      </Text>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Text className="dropdown-item">
                        <Link to="/admin/productlist">Products</Link>
                      </Text>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Text className="dropdown-item">
                        <Link to="/admin/orderlist">Orders</Link>
                      </Text>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
