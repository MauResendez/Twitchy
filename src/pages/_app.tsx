import Footer from "@app/components/footer";
import Header from "@app/components/header";
import Mobile from "@app/components/mobile";
import { ThemeProvider } from "@app/components/theme";
import "@app/styles/globals.css";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
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
        <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
          <Header />
          <Mobile />
          <Component {...pageProps} />
          <Footer />
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;