import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import SurveyModify from '../../../components/ui/survey/SurveyModify'
import PageTitle from '../../../components/ui/PageTitle';

export default function Modify() {
    const router = useRouter();
    const { modifyid } = router.query;
    
    // console.log("Modify Console : " + modifyid)

    return (
        <>
            <PageTitle title="설문 수정하기"/>
            <SurveyModify svyId = {modifyid} />
        </>
    );
};
