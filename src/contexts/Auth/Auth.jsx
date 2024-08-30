import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken }  from '../../services/Api/index';
import {api} from "../../services/Api/index";

const AuthContext = createContext({});

export function useAuth(){
  const context = useContext(AuthContext);
 
  return context;
 }

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const storagedUser = localStorage.getItem('@App:user');
      const storagedToken = localStorage.getItem('@App:token');
      const storagedEmail= localStorage.getItem('@App:email');
      const storagedPassword = localStorage.getItem('@App:password');

      if (storagedToken && storagedUser && storagedEmail && storagedPassword) {
        setUser(JSON.parse(storagedUser));
        
      }
      setLoading(false);
    }, []);

    async function Login(email,password) {
      try {
        
        await getAccessToken(email, password).then((token) =>{
          localStorage.setItem('@App:email', email);
          localStorage.setItem('@App:password', password);
          localStorage.setItem('@App:token', token);
        }); 
        await api.get('/users/me').then((result) => {
          setUser(result.data)
          localStorage.setItem('@App:user', JSON.stringify(result.data));
        })

        return true
      } catch(err){
        console.log(err)
        return false
      }
    
    };

    function Logout() {
      setUser(null);
      localStorage.removeItem('@App:email');
      localStorage.removeItem('@App:password');
      localStorage.removeItem('@App:user');
      localStorage.removeItem('@App:token');
    }

    return (
      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <AuthContext.Provider value={{ user, Login, Logout }}>
            {children}
          </AuthContext.Provider>
        )}
      </>
    );
   };