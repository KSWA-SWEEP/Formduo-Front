import React from 'react';
import LazyShow from '../common/LazyShow';
import Product from './temp/Product';
import Features from './temp/Features';
import MainContent from './MainContent';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';

const MainPage = () => {
  return (
    <div> 
      <div>
        <LazyShow>
          <>
            <MainContent />
          </>
        </LazyShow>
        {/* <div className='flex w-full place-content-center'>
          <ChevronDoubleDownIcon className='w-16 animate-bounce text-neutral-300'/>
        </div> */}
      </div>
    </div>
  );
};

export default MainPage;
