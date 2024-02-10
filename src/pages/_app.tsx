import Footer from "@app/components/footer";
import Header from "@app/components/header";
import { ThemeProvider } from "@app/components/theme";
import { Toaster } from "@app/components/ui/toaster";
import "@app/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient()

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider session={session}>
          <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className} bg-white dark:bg-slate-900`}>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </main>
          <Toaster />
        </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;