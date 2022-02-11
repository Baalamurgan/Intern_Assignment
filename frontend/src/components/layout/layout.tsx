import React, { ReactElement } from "react";
import { Footer, Header } from "..";

const Layout: React.FC<any> = ({
    children,
}: {
    children: ReactElement<any, any>;
}) => {
    return (
        <div>
            <Header />
            <div
                style={{
                    minHeight: "90vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
