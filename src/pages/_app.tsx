import Footer from "@app/components/footer";
import Header from "@app/components/header";
import { ThemeProvider } from "@app/components/theme";
import "@app/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className} bg-white dark:bg-slate-900`}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;