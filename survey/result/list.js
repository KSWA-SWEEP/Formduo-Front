import { useRouter } from 'next/router'
import SurveyTableList from '../../../components/ui/survey/SurveyTableList';

const ResultList = () => {
    const router = useRouter();
    const { surveyId } = router.query

    return (
        <>
            <SurveyTableList/>
        </>
    );
};

export default ResultList;

