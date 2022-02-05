import { useRouter } from "next/router";
import React, { useState, useEffect, useContext, createContext } from "react";

export const AuthContext = createContext<any>(null);
export function ProvideAuth({ children }: { children: any }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth?.user}>{children}</AuthContext.Provider>;
}
export function useAuth(): any {
    const auth = useContext(AuthContext);
    return auth
}

function assertNever(): never {
    throw new Error('Cannot use useConfig outside of ConfigProvider');
}

function useProvideAuth() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    // const signin = (email, password) => {
    // };
    const signup = (email: any, password: string) => {
        localStorage.setItem("userId", email);
        setUser(email);
        router.push("/dashboard");
    };
    const signout = () => {

    };
    //   useEffect(() => {
    //     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //       if (user) {
    //         setUser(user);
    //       } else {
    //         setUser(false);
    //       }
    //     });
    //     return () => unsubscribe();
    //   }, []);
    return {
        user,
        // signin,
        signup,
        signout,
    };
}

export default useProvideAuth