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
import Head from "next/head";

axios.defaults.mode = "cors";
axios.defaults.withCredentials = true;
axios.defaults.headers = {
    withCredentials: true,
    'Content-Type': "application/json"
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>폼듀</title>
        <meta name="naver-site-verification" content="42b5d378293c7ca1532d675450e41b442bc28f5d" />
        <meta name="google-site-verification" content="fZfLUCgFmi1qQTxTes7b93Bidrfrd2Doa8LZp5HqTZI" />
      </Head>
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
