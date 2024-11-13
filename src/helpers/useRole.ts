import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useRole = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser debe usarse dentro de un UserProvider");
    return context;
};