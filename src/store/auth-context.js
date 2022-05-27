import React, {useState, useEffect} from 'react';


//React.createContext returns an object that contains a component. 
//So AuthContext is an object that has a component. This is where all states are stored.
const AuthContext = React.createContext(
{
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: () => {}
}

);


//this defines all state management methods for the states contained in the AuthContext store.
export const AuthContextProvider = (props) =>
{
const [isLoggedIn, setIsLoggedIn] = useState(false);

const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false)
}

const loginHandler = () => {
    localStorage.setItem('isLoggedIn', 1);
    setIsLoggedIn(true)
}


useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedInInfo === '1') {
      setIsLoggedIn(true);
    }
  }, [])


return (<AuthContext.Provider
value={
    {
isLoggedIn: isLoggedIn,
onLogout: logoutHandler,
onLogin: loginHandler
    }
}
>
    {props.children}
    </AuthContext.Provider>)
}



export default AuthContext 



//Wrap the components that need access to this context with this component (AuthContext)