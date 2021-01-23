import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import QuestionCard from '../QuestionCard';

describe("question card", () => {
    const mockNextQuestion = jest.fn();
    const mockHideMe = jest.fn();
    const mockQuestion  = {
        question: "fake question",
        answer: "fake answer"
    }

    it("renders", () => {
        const { asFragment } = render(
            <QuestionCard nextQuestion={mockNextQuestion}
                setshowModal={mockHideMe}
                randomQuestion={mockQuestion} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("displays question", () => {
        const { getByText } = render(
            <QuestionCard nextQuestion={mockNextQuestion}
                setshowModal={mockHideMe}
                randomQuestion={mockQuestion} />
        );

        expect(getByText(/fake question/i)).toBeInTheDocument();
    });

    it("has a working 'next' button", () => {
        const { getByRole } = render(
            <QuestionCard nextQuestion={mockNextQuestion}
                setshowModal={mockHideMe}
                randomQuestion={mockQuestion} />
        );

        fireEvent.click(getByRole('button', {  name: />>/i}));
        
        expect(mockNextQuestion).toHaveBeenCalled();
    });

    it("hides a 'new' question", () => {
        const { getByRole } = render(
            <QuestionCard nextQuestion={mockNextQuestion}
                setshowModal={mockHideMe}
                randomQuestion={mockQuestion} />
        );
        expect(getByRole('button', {  name: /\?/i})).toHaveStyle("visibility: visible");
    });

    it("shows the answer when the button is clicked", () => {
        const { getByRole, getByText } = render(
            <QuestionCard nextQuestion={mockNextQuestion}
                setshowModal={mockHideMe}
                randomQuestion={mockQuestion} />
        );

        fireEvent.click(getByRole('button', {  name: /\?/i}));

        expect(getByText(  /fake answer/i  )).toHaveStyle("visibility: visible");       
    });
})