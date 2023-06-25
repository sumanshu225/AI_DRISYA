import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const UserContext = createContext()

const UserProvider = ({ children }) => {


    const [changer, setChanger] = useState(false);

    return (

        <UserContext.Provider value={{ changer,setChanger}}>
            {children}
        </UserContext.Provider>
    )

}

export const UserState = () => {
    return useContext(UserContext)
}



export default UserProvider