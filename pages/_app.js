import { SessionProvider } from "next-auth/react";
import GeneralContext from "../context/GeneralContext";
import { createContext, useState } from "react";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import RootLayout from "@/components/layout/layout";
import Head from "next/head";
import usePersistentContext from "@/context/usePersistentContext";
import useIsClient from "@/context/useIsClient";

export default function App({ Component, pageProps }) {
  const isClient = useIsClient();
  const [generalContext, setGeneralContext] = usePersistentContext(
    "generalContext",
    {
      playingEpisode: {},
      theme: "light",
    }
  );

  if (!isClient) {
    return null;
  }

  return (
    <RootLayout>
      <GeneralContext.Provider value={{ generalContext, setGeneralContext }}>
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
