import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

      const [session, setSession] = useState(null);
      const [loading, setLoading] = useState(true); 

      const user = session?.user ?? null;
       
     useEffect(() => { 
      const loadSession = async () => {
          try {
            const { data, error } = await supabase.auth.getSession();
                        
            if (error) throw error;
            setSession(data.session)}
            
            catch (error) {console.error("Session error:", error.message);
            setSession(null); }
          
          finally {setLoading(false);}
      }
      loadSession();
                  
      }, []);

      useEffect(() => { 
      
            
      }, [session, loading]);

    return (
    <AuthContext.Provider value={{ session, loading,  user }}>
      {children}
    </AuthContext.Provider>
  );
 

};

export const useAuth = () => useContext(AuthContext);




