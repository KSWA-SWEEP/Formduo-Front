import Header from './Header'
import Footer from './Footer'
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <Header />
        <div className='min-h-screen px-4 mx-auto my-8 max-w-7xl sm:px-6 lg:px-8'>
          {children}
        </div>
      <Footer/>
    </>
  )
}