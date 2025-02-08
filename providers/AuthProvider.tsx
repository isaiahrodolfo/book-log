import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  // profile: any | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  // const [profile, setProfile] = useState<any | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      console.log("fetching session")
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log(session);
        setSession(session);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

  }, []);

  return (
    // Added an exclamation here
    <AuthContext.Provider value={{ session, user: session?.user!, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);