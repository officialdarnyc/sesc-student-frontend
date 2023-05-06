import { useState, useContext, createContext} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem("student"));

  const [student, setStudent] = useState(initialState);

  const navigate = useNavigate();

  const initUser = async (data) => {
    setStudent(data);

    localStorage.setItem(
      "student",
      JSON.stringify({
        ...data,
      })
    );
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem("student");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ student, initUser, logout, setStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
