import Layout from '../components/common/Layout'
import '../styles/globals.css'
import axios from 'axios';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import {getCookie} from "cookies-next";
import Head from 'next/head';
import Script from 'next/script'
import {useEffect} from "react";
import * as gtag from '../lib/gtag'
import {useRouter} from "next/router";


axios.defaults.mode = "cors";
axios.defaults.withCredentials = true;
axios.defaults.headers = {
    withCredentials: true,
    'Content-Type': "application/json"
}


export default function App({
  Component,
  pageProps: { session, ...pageProps },
 })
{
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        router.events.on('hashChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
            router.events.off('hashChangeComplete', handleRouteChange)
        }
    }, [router.events])

  return (
    <>
      <Head>
        <title>폼듀(Form Duo)</title>
        <meta name="naver-site-verification" content="42b5d378293c7ca1532d675450e41b442bc28f5d" />
        <meta name="google-site-verification" content="fZfLUCgFmi1qQTxTes7b93Bidrfrd2Doa8LZp5HqTZI" />
      </Head>
        <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
        />
      <RecoilRoot>
          {/*<SessionProvider session={session}>*/}
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
          {/*</SessionProvider>*/}
      </RecoilRoot>
    </>
  )
}
