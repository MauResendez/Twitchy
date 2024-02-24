import Footer from "@app/components/footer";
import Header from "@app/components/header";
import Mobile from "@app/components/mobile";
import { ThemeProvider } from "@app/components/theme";
import { persistor, store } from "@app/store";
import "@app/styles/globals.css";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient()

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>       
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProvider session={session}>
              <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className} bg-white dark:bg-gray`}>
                <Header />
                <Mobile />
                <Component {...pageProps} />
                <Footer />
              </main>
            </SessionProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;