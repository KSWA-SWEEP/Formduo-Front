import React from 'react';
import CustomizeSvg from '../icon/CustomizeSvg';
import TalkSvg from '../icon/TalkSvg';

const Product = () => {
  return (
    <section className='py-8 mt-10 mb-5 sm:mb-24 sm:mt-20 bg-background' id="product">      <div className='container max-w-5xl m-8 mx-auto'>
        <div className='flex flex-wrap items-center'>
          <div className='p-6 sm:w-1/2'>
            <h3 className='mb-3 text-2xl font-bold leading-snug sm:text-3xl text-neutral-800 dark:text-white'>
              새로운 설문 형식, <span className='text-fdblue dark:text-fdyellowlight'>듀오 설문</span>
            </h3>
            <p className='leading-loose text-neutral-600 dark:text-neutral-400'>
              폼듀는 기존의 텍스트 기반 설문과는 달리 실제 <strong>음성</strong>이나 <strong>영상</strong>으로 설문에 응답하는 새로운 차원의 설문 <strong>듀오 설문</strong>을 제공합니다. 
            </p>
          </div>
          <div className='w-full p-6 sm:w-1/2'>
            <TalkSvg
              className="w-full h-5/6"
              alt="듀오 설문"
            />
          </div>
        </div>
        <div className='flex flex-col-reverse flex-wrap items-center mt-16 sm:flex-row'>
          <div className='w-full p-6 sm:w-1/2'>
            <CustomizeSvg
              className="w-full h-5/6"
              alt="Q-Box"
            />
          </div>
          <div className='w-full p-6 sm:w-1/2'>
            <div className='align-middle'>
              <h3 className='mb-3 text-2xl font-bold leading-snug sm:text-3xl text-neutral-800 dark:text-white'>
                당신의 설문 비서, <span className='text-fdblue dark:text-fdyellowlight'>Q-Box</span>
              </h3>
              <p className='mb-10 leading-loose text-neutral-600 dark:text-neutral-400'>
                Q-Box란 설문에서 자주 쓰이는 질문들을 모아둔 질문 저장소입니다.
                Q-Box를 사용하여 <strong>신속</strong>하고 <strong>편리한</strong> 설문 제작이 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
