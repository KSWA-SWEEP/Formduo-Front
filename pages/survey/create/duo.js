import PageTitle from "../../../components/ui/PageTitle";
import DuoSurveyCreate from "../../../components/ui/survey/DuoSurveyCreate"

const Duo = () => {
    return (
        <>
            <PageTitle title="Duo 설문 제작"/>
            <div className="mx-3 sm:mx-8">
                <DuoSurveyCreate/>
            </div>
        </>
    );
};

export default Duo;
