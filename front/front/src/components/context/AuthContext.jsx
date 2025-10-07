import { createContext, useContext, useState,useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () =>{
    const context = useContext(AuthContext);
    return context;
}

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [isLoading,setIsLoading] =useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is logged in on app start
    useEffect(() => {
      checkAuthStatus();
    }, []);
  
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/session/current', {
          method: 'GET',
          credentials: 'include' // This is important for cookies
        });
  
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    const login = async (credentials) => {
        try {
          const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Important for cookies
            body: JSON.stringify(credentials)
          });
    
          if (response.ok) {
            // After successful login, check the session to get user data
            await checkAuthStatus();
            return { success: true };
          } else {
            const errorText = await response.text();
            return { success: false, error: errorText || 'Login failed' };
          }
        } catch (error) {
          console.error('Login failed:', error);
          return { success: false, error: 'Login failed' };
        }
      };
    
      const register = async (userData) => {
        try {
          const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userData)
          });
    
          if (response.ok) {
            // Registration successful, now login the user
            const loginResult = await login({
              email: userData.email,
              password: userData.password
            });
            return loginResult;
          } else {
            const errorText = await response.text();
            return { success: false, error: errorText || 'Registration failed' };
          }
        } catch (error) {
          console.error('Registration failed:', error);
          return { success: false, error: 'Registration failed' };
        }
      };
      const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        checkAuthStatus
      }
      return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
      )
    }
