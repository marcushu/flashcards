import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Newquestion from '../Newquestion';

describe("Newquestion", () => {
    const mockFunc = jest.fn();
    const mockFunc2 = jest.fn();

    it("renders", () => {
        const { asFragment } = render(
            <Newquestion 
                setNewQuestion={mockFunc}
                hideMe={mockFunc2} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("calls the hideme function on 'cancel'", () => {
        const { getByRole } = render(
            <Newquestion 
                setNewQuestion={mockFunc}
                hideMe={mockFunc2} />
        );

        fireEvent.click(getByRole('button', {  name: /cancel/i}));
        expect(mockFunc2).toHaveBeenCalled();
    });

    it("loads correct text in the callback", () => {
        const { getByRole, getByTestId } = render(
            <Newquestion 
                setNewQuestion={mockFunc}
                hideMe={mockFunc2} />
        );

        fireEvent.change(getByTestId('newQuestion'), { target: {value: "new question"}});
        fireEvent.change(getByTestId('newAnswer'), { target: {value: "new answer"}});
        fireEvent.click(getByRole('button', {  name: /submit/i}));
        
        expect(mockFunc).toHaveBeenCalledWith("new question", "new answer");
    });
})