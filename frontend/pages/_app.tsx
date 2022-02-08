import React from "react";
import { AppProps } from "next/app";
import "antd/dist/antd.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "@components/layout/layout";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </QueryClientProvider>
    );
}

export default MyApp;
