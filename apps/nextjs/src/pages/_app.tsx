import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "../../src/utils/api";
import "../styles/globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { Poppins } from "@next/font/google";
//import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";
import JadenScreen from "./components/swoopMain";

const poppins = Poppins({ weight: "300", subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <div className={poppins.className}>
        <SignedIn>
          <Component {...pageProps} />
        </SignedIn>
        <SignedOut>
          {router.pathname === "/" ? (
            <JadenScreen signInNeed={false} />
          ) : (
            <Component {...pageProps} />
          )}
        </SignedOut>
      </div>
      {/*<Analytics />*/}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
