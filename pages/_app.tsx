import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";

import { MainLayout } from "@/components/Layouts/Layout";
import { AuthProvider } from "@/contextes/AuthContext/AuthProvider";

import "../styles/index.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <ConfigProvider
        theme={{
          token: { colorPrimary: "#ffffff" },
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

export default App;
