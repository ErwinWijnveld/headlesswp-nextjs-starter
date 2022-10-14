import { AppProps } from "next/app";
import Script from "next/script";
import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            {process?.env?.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
                <>
                    <Script
                        strategy="lazyOnload"
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    />
                    <Script strategy="lazyOnload">
                        {`
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          
                          gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
                        `}
                    </Script>
                </>
            )}
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
