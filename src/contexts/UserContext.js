import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export default function UserProvider({children}){
    const lsUser = JSON.parse(localStorage.getItem("user"))
    const [user, setUser]= useState(lsUser !== null ? lsUser : {});
    const navigate = useNavigate();
    const currentUrl = window.location.href;
    console.log(lsUser)
    useEffect(() => {
        if (lsUser === null & (currentUrl !== '/login' && currentUrl !== '/registro')){
            navigate("/")
        }else {
            navigate("/home", {state:{lsUser}})
        }
    }, [])
    
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>

    )
};

