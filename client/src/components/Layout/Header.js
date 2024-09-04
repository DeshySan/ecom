import React from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <Link to='' className='navbar-brand' href='#'>
              🛒 Ecommerce
            </Link>

            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink to='/' className='nav-link '>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/category' className='nav-link'>
                  Category
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  {" "}
                  <li className='nav-item'>
                    <NavLink to='/register' className='nav-link'>
                      Register
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/login' className='nav-link'>
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <div className='dropdown'>
                    <button
                      className='btn btn-secondary dropdown-toggle'
                      type='button'
                      id='dropdownMenuButton1'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'>
                      {auth?.user.name}
                    </button>
                    <ul
                      className='dropdown-menu'
                      aria-labelledby='dropdownMenuButton1'>
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className='dropdown-item nav-link'>
                          Dashboard
                        </NavLink>
                      </li>
                      <li className='dropdown-item'>
                        <NavLink
                          onClick={handleLogout}
                          to='/login'
                          className='nav-link'>
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
              <li className='nav-item'>
                <NavLink to='/login' className='nav-link'>
                  Cart(0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
