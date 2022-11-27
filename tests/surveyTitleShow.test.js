import SurveyTitleShow from "../components/ui/survey/SurveyTitleShow";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("surveyTitleShow", () => {
    it("renders a SurveyTitleShow component", async () => {

        render(
            <RecoilRoot>
                <SurveyTitleShow />
            </RecoilRoot>
        );

        // check if all components are rendered
        expect(screen.queryByTestId("title")).toBeInTheDocument();
        expect(screen.queryByTestId("intro")).toBeInTheDocument();
    });

});

