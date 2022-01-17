import jwtDecode from "jwt-decode";

export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";



export const authenticate = ( email, token) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      email: email,

      token: token,
    });
  };
};



export const login = (email, password) => {
  return async (dispatch) => {
    let requestBody = {
      query: `
            query{
              login(email :"${email}" , password :"${password}"){
                token
                tokenExpiration
               }
            }
          `,
    };

    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    // console.log(resData);
    const decodedToken = jwtDecode(resData.data.login.token);

    dispatch(
      authenticate(
    
        decodedToken.email,
       
        resData.data.login.token
      )
      // resData.data.login.token,
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.data.login.tokenExpiration) * 1000
    );
    saveDataToLocalStorage(resData.data.login.token);
  };
};

export const logout = () => {
  //   clearLogoutTimer();
  localStorage.removeItem("userData");
  return { type: LOGOUT };
};

const saveDataToLocalStorage = (token) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
    })
  );
};

export const signIn = () => {
  return (dispatch) => {
    if (localStorage.getItem("userData")) {
      let tokenGot = localStorage.getItem("userData");
      let parsedToken = JSON.parse(tokenGot);
      // console.log(parsedToken?.token);
      const decodedToken = jwtDecode(tokenGot);

      // let token1 = JSON.parse(tokenGot);
      // console.log(token1);
      // console.log(tokenGot);

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("userData");
      } else {
        dispatch(
          authenticate(
           
            decodedToken.email,
            
            parsedToken?.token
          )
        );
      }
    }
  };
};

export const signup = (
  email,
  password,
 
) => {
  return async (dispatch, getState) => {
    const requestBody = {
      query: `
            mutation CreateUser($email:String!, $password:String! ){
              createUser(userInput: {email :$email , password:$password  }){
                _id
                email
              }
            }
          `,
      variables: {
        email: email,
        password: password,
        
      },
    };

    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch(login(email, password));
  };
};



