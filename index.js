import MainContent from '../components/ui/MainContent'
import MainPage from '../components/ui/MainPage'
import Head from "next/head"

// index.js
export default function Home() {
  return (
        <>
          <Head>
            <title>폼듀</title>
            <meta name="naver-site-verification" content="42b5d378293c7ca1532d675450e41b442bc28f5d" />
            <meta name="google-site-verification" content="fZfLUCgFmi1qQTxTes7b93Bidrfrd2Doa8LZp5HqTZI" />
          </Head>
          {/* <MainContent/> */}
          <MainPage/>
        </>
  )
}
