import { Footer } from "@components/footer";
import { Header } from "@components/header";
import Loader from "@components/loader";
import { useRouter } from "next/router";
import Posts from "pages/posts";
import { useEffect, useState } from "react";
import { useAuth } from "src/auth/useUser";

const Dashboard: React.FC<any> = () => {
    const auth = useAuth();
    const Route = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<string>();
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (!userId) {
            Route.push("/login");
        }
        else {
            setIsLoggedIn(userId);
        }
    }, [])

    if (!isLoggedIn) {
        return <Loader />
    }

    return (
        <>
            <Header />
            <div style={{
                backgroundColor: "#fff",
                textAlign: "center"
            }}
            >
                <h1>Dashboard</h1>
                <h2>{isLoggedIn}</h2>
            </div>
            <Posts />
            <Footer />
        </>
    );
};



export default Dashboard;