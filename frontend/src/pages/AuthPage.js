import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";


//utitilites
import "./Auth.scss";
import image1 from "../assets/bg_6.jpeg";

//actions
import * as authActions from "../redux/actions/auth";

//components
import Section from "../components/Section/Section";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleModeChange = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = values.email;
    const password = values.password;

    if (!isLogin) {
      let action = authActions.signup(email, password);
      try {
        await dispatch(action);
        // await dispatch(bookingActions.fetchBookings());
        // props.navigation.navigate('Shop');
      } catch (err) {
        console.log(err.message);
      }
    } else {
      // dispatch(login({ email: email, password: password }));
      let action = authActions.login(email, password);
      try {
        await dispatch(action);

        // props.navigation.navigate('Shop');
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <div>
      <div>
        <Section
          image={image1}
          page={!isLogin ? "Sign Up" : "Sign In"}
          name={!isLogin ? "Sign Up" : "Sign In"}
        />
      </div>
      <div className="container">
        <div className="log-form">
          <form className="col-md-12" onSubmit={handleSubmit}>
            <h2>{isLogin ? "Please  Sign In" : "Please Sign Up"}</h2>
            <hr className="divisor" />
            {isLogin ? (
              <>
                <div className="form-control">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  {/* <label htmlFor="password"> Password </label> */}
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-control">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  {/* <label htmlFor="password"> Password </label> */}
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <div className="form-actions">
              <button type="button" className="btn" onClick={handleModeChange}>
                Switch to {isLogin ? "Signup" : "Login"}
              </button>
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default AuthPage;
