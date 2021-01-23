import React from 'react';
import { fireEvent, render } from '@testing-library/react'
import NewTopic from '../NewTopic.tsx';

describe("NewTopic.test", () => {
    const mockFunc = jest.fn();

    it("renders", () => {
        const { asFragment } = render(
            <NewTopic addNewTopic={mockFunc} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("correctly handles click events", () => {
        const { getByRole } = render(
            <NewTopic addNewTopic={mockFunc} />
        );

        fireEvent.change(getByRole('textbox'), { target: {value: "anytext"}});    
        fireEvent.click(getByRole('button', {name: /\+/i})); 

        expect(mockFunc).toHaveBeenCalled();
        expect(mockFunc).toHaveBeenCalledWith("anytext");
    });
})