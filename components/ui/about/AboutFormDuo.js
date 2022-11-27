import { BoltIcon, ChatBubbleBottomCenterTextIcon, ChevronDoubleDownIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/react/24/outline'
import logoMixed from '../../../public/img/mixed@3x.png'
import logoIcon from '../../../public/img/icon@3x.png'
import logoyb from '../../../public/img/yellow-blue@3x.png'
import logoby from '../../../public/img/blue-yellow@3x.png'
import logoblack from '../../../public/img/black@3x.png'
import Image from 'next/future/image'
import LazyShow from '../../common/LazyShow'
import Link from "next/link"
import Product from '../temp/Product'
import Features from '../temp/Features'
import Logo from '../temp/Logo'

export default function AboutFormDuo() {

  return (  
      <div> 
        <div>
          <LazyShow>
            <Logo/>
          </LazyShow>
          <LazyShow>
            <>
              <Product/>
            </>
          </LazyShow>
          <LazyShow>
            <>
              <Features />
            </>
          </LazyShow>
        </div>
      </div>
  )
}
  