import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(() => {
        const data = localStorage.getItem("loginData");
        return data ? JSON.parse(data) : null;
    })


const login = (userData) => {
    setUser(userData);
    localStorage.setItem("loginData", JSON.stringify(userData));
}

const logout = () => {
    setUser(null);
    localStorage.removeItem("loginData");
}

return(
    <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>
)
}

export function useAuth(){
    return useContext(AuthContext);
}