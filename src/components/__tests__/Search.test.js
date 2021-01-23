import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Search from '../Search';

describe("Search", () => {
    const mockSetFn = jest.fn();

    it("renders", () => {
        const { asFragment } = render(
            <Search setTopic={mockSetFn} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("calls the set function with the correct text", () => {
        const { getByRole } = render(
            <Search setTopic={mockSetFn} />
        );

        fireEvent.change(getByRole('textbox'), { target: {value: "searchtext"}});
        fireEvent.click(getByRole('button'));

        expect(mockSetFn).toHaveBeenCalledWith("searchtext");
    });
})