import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import GuestLogin from '../GuestLogin';

describe("GuestLogin", () => {
    const mockFunk = jest.fn();

    it("renders", () => {
        const { asFragment } = render(
            <GuestLogin loginHandler={mockFunk} />
        );

        expect(asFragment()).toMatchSnapshot()
    });

    it("calls the login function with 'GUEST'", () => {
        const { getByRole } = render(
            <GuestLogin loginHandler={mockFunk} />
        );

        fireEvent.click(getByRole('button', {  name: /continue as guest/i}));

        expect(mockFunk).toHaveBeenCalledWith("GUEST");
    })
});