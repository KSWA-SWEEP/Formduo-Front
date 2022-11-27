import '@testing-library/jest-dom'
import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SignIn from '../pages/account/signIn'
import { RecoilRoot } from "recoil";
import {waitFor} from '@testing-library/dom'


describe("signIn page test", () => {
    it('should move to main page when user login succeeded', async () => {

        // 로그인 페이지를 렌더링한다.
        const { getByLabelText } = render(
            <RecoilRoot>
                <SignIn />
            </RecoilRoot>
        );

        // 정상적인 이메일과 패스워드를 입력하고 로그인 버튼을 누른다.
        const emailInput = getByLabelText("email");
        fireEvent.change(emailInput, { target: { value: "formduo@gachon.ac.kr" } });
        fireEvent.blur(emailInput);
        expect(screen.queryByText('로그인 실패')).not.toBeInTheDocument();

        const pwdInput = getByLabelText("password")
        fireEvent.change(pwdInput, { target: { value: "test1234" } });
        fireEvent.blur(pwdInput);
        expect(screen.queryByText('비밀번호를 입력해주세요.')).not.toBeInTheDocument();

        const submitBtn = screen.getByText("로그인");
        fireEvent.click(submitBtn);

        // 로그인 성공 후 페이지 이동을 확인한다.
        await waitFor(() => {
            expect(location.pathname).toBe('/');
        });
    });
});