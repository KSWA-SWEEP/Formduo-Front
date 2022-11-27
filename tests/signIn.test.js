import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SignIn from "../pages/account/signIn";
import { RecoilRoot } from "recoil";

describe("signIn page test", () => {
    it("submit test after entering email and password", () => {

        // SignIn 페이지 렌더링
        const { getByLabelText } = render(
            <RecoilRoot>
                <SignIn />
            </RecoilRoot>
        );

        // label text로 element 가져오기
        const emailInput = getByLabelText("email");
        const pwdInput = getByLabelText("password")

        // change event로 input 값 변경
        fireEvent.change(emailInput, { target: { value: "sweep@test.com" } });
        expect(emailInput.value).toEqual("sweep@test.com");
        fireEvent.change(pwdInput, { target: { value: "test1234" } });
        expect(pwdInput.value).toEqual("test1234");
        
        // 로그인 버튼 찾아서 제출
        const submitBtn = screen.getByText("로그인");
        fireEvent.click(submitBtn);

        screen.logTestingPlaygroundURL();

    });
});

