import { useState } from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
import { MainLayout } from "@/components/Layouts/Layout";
import { AuthProvider } from "@/contextes/AuthContext/AuthProvider";
import "../styles/index.scss";
import { theme } from "@/styles/theme";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    }),
  );

  return (
    <AuthProvider>
      <ConfigProvider
        theme={{
          ...theme,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </Hydrate>
        </QueryClientProvider>
      </ConfigProvider>
    </AuthProvider>
  );
};

export default appWithTranslation(App);
