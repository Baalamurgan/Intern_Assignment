import { Footer } from "@components/footer";
import { Header } from "@components/header";
import Loader from "@components/loader";
import { useRouter } from "next/router";
import Posts from "pages/contents";
import { useEffect, useState } from "react";

const Dashboard: React.FC<any> = () => {
    const Route = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<any>();
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        const userName = localStorage.getItem("userName")
        if (!userId) {
            Route.push("/login");
        }
        else {
            setIsLoggedIn(userName);
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
                <h2>Hello, {isLoggedIn}</h2>
            </div>
            <Posts />
            <Footer />
        </>
    );
};



export default Dashboard;