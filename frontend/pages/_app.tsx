import React from "react";
import { AppProps } from "next/app";
import "antd/dist/antd.css";
import { StyledThemeProvider } from "@definitions/styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import store from "@redux/store";
import { ProvideAuth } from "src/auth/useUser";
import Layout from "@components/layout/layout";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const queryClient = new QueryClient();
    return (
        <StyledThemeProvider>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Provider store={store}>
                        <ProvideAuth>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </ProvideAuth>
                    </Provider>
                </Hydrate>
            </QueryClientProvider>
        </StyledThemeProvider>
    );
}

export default MyApp;
