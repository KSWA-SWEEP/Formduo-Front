import Share from "../pages/survey/share";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("share", () => {
    it("renders a Share page", async () => {

        render(
            <RecoilRoot>
                <Share />
            </RecoilRoot>
        );

        expect(screen.queryByTestId("share")).toBeInTheDocument();

    });
});

