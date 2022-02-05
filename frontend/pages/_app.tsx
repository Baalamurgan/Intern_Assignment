import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import "antd/dist/antd.css";
import "../src/components/loader/index.css";
import { StyledThemeProvider } from "@definitions/styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import store from "@redux/store";
import { ProvideAuth } from "src/auth/useUser";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const queryClient = new QueryClient();
    return (
        <StyledThemeProvider>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Provider store={store}>
                        <ProvideAuth>
                            <Component {...pageProps} />
                        </ProvideAuth>
                    </Provider>
                </Hydrate>
            </QueryClientProvider>
        </StyledThemeProvider>
    );
}

export default MyApp;
