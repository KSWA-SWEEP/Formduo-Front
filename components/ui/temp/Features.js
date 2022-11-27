import React from 'react';
import { PencilSquareIcon, DocumentCheckIcon, ListBulletIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';

const featuresList = [
  {
    "name": "설문 생성",
    "description": "다양한 유형의 질문들로 설문을 제작할 수 있습니다",
    "icon": PencilSquareIcon
  },
  {
    "name": "설문 분석",
    "description": "설문 응답자들의 답변 데이터를 분석 페이지에서 확인할 수 있습니다.",
    "icon": PresentationChartLineIcon
  },
  {
    "name": "설문 목록",
    "description": "제작한 설문들의 목록을 한 눈에 확인할 수 있습니다.",
    "icon": ListBulletIcon
  },
  {
    "name": "설문 참여",
    "description": "다른 사람들이 제작한 설문에 참여할 수 있습니다.",
    "icon": DocumentCheckIcon
  }
]

const Features = () => {
  return (
    <div className="py-12 bg-background md:h-70v" id="features">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2
            className="text-base font-semibold tracking-wide uppercase text-fdblue dark:text-fdyellowlight"
          >
            Features 
          </h2>
          <p className="mt-2 text-xl font-extrabold leading-8 tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            폼듀에서는 이런 것들이 가능합니다!
          </p>
        </div>

        <div className="flex sm:mt-10 place-content-center">
          <dl className="mt-10 space-y-10 md:w-10/12 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {featuresList.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div
                    className="absolute flex items-center justify-center w-12 h-12 rounded-md bg-fdblue bg-background text-tertiary border-fdblue dark:bg-fdyellowlight"
                  >
                    <feature.icon className="inline-block w-6 h-6 text-white dark:text-neutral-700"/>
                  </div>
                  <p className="ml-16 text-lg font-semibold leading-6 text-neutral-900 dark:text-fdyellowlight">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-neutral-500 dark:text-neutral-400">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
