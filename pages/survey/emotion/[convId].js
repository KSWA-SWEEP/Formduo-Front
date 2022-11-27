import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Conversation from '../../../components/ui/survey/emotion/Conversation';
import PageTitle from '../../../components/ui/PageTitle';

export default function ConversationAnalysis() {
    const router = useRouter()
    const queries = router.query;

    useEffect(() => {
        if(!router.isReady) return;
    }, [router.isReady])
    

    return (
        <>
            <Conversation cvId = {queries}/>
        </>
    );
};
