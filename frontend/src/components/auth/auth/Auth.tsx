import { useState, type PropsWithChildren } from "react";
import AuthContext from "./AuthContext";

export default function Auth({ children }: PropsWithChildren) {

    const storedJwt = localStorage.getItem("jwt") || ""
    let initialRole = "";

    try {
        if (storedJwt) {
            const payload = JSON.parse(atob(storedJwt.split(".")[1]))
            initialRole = payload.role
        }
    } catch {
        initialRole = ""
    }

    const [jwt, setJwt] = useState(storedJwt)
    const [role, setRole] = useState(initialRole)

    function newJwt(jwt: string) {
        setJwt(jwt);
        localStorage.setItem("jwt", jwt)

        try {
            const payload = JSON.parse(atob(jwt.split(".")[1]))
            const roleFromJwt = payload.role
            setRole(roleFromJwt)
        } catch {
            setRole("")
        }
    }

    return (
        <AuthContext.Provider value={{ jwt, role, newJwt }}>
            {children}
        </AuthContext.Provider>
    );
}
