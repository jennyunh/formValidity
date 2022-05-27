import React from 'react';


//React.createContext returns an object that contains a component. 
//So AuthContext is an object that has a component
const AuthContext = React.createContext(

    
);

export default AuthContext;


//Wrap the components that need access to this context with this component (AuthContext)