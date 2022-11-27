import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../components/common/Header";
import { RecoilRoot } from "recoil";
import {waitFor} from '@testing-library/dom'

describe("Header", () => {
    it("show the text elements correctly", () => {

        // Header 컴포넌트를 렌더링한다.
        render(
            <RecoilRoot>
                <Header />
            </RecoilRoot>
        );
        
        // 화면에 해당 컴포넌트가 렌더링 되는지 확인한다.
        expect(screen.queryByText("폼듀란?")).toBeInTheDocument();
        expect(screen.queryByText("튜토리얼")).toBeInTheDocument();
        expect(screen.queryByText("로그인")).toBeInTheDocument();
        expect(screen.queryByText("회원가입")).toBeInTheDocument();
    });

    it("show the image elements correctly", async () => {

        // Header 컴포넌트를 렌더링한다.
        const { getByAltText } = render(
            <RecoilRoot>
                <Header />
            </RecoilRoot>
        );
        
        // 폼듀 로고 이미지들
        const logoIcon = getByAltText("Form Duo logoIcon");
        const logoMixed = getByAltText("Form Duo logoMixed");
        
        // 화면에 해당 컴포넌트가 렌더링 되는지 확인한다.
        expect(logoIcon).toBeInTheDocument();
        expect(logoMixed).toBeInTheDocument();
        
    });
});

