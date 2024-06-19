import { SessionProvider } from "next-auth/react";
import GeneralContext from '../context/GeneralContext'
import { useState } from "react";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import RootLayout from "@/components/layout/layout";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [generalContext, setGeneralContext] = useState({
    playingEpisode: {},
  theme: "light",
  })
  return (
    <RootLayout>
      <GeneralContext.Provider value={{generalContext, setGeneralContext}}>
        <SessionProvider session={pageProps.session}>
          <Head>
            <title>سبک ۲۴</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
          <Toaster position="bottom-center" />
        </SessionProvider>
      </GeneralContext.Provider>
    </RootLayout>
  );
}
