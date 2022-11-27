import { useRouter } from 'next/router'

const CreateSurvey = () => {
    const router = useRouter();
    const { surveyId } = router.query

    return (
        <>
            <h1>CreateSurvey : {surveyId}</h1>
        </>
    );
};

export default CreateSurvey;

