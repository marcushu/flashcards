import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../Login';

describe("Login", () => {
    const mockLogin = jest.fn();
    const mockSignup = jest.fn();

    it("renders", () => {
        const { asFragment } = render(
            <Login login={mockLogin} signUp={mockSignup} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("calls login with correct name", () => {
        const { getByAltText, getByRole } = render(
            <Login login={mockLogin} signUp={mockSignup} />
        );

        fireEvent.change(getByAltText(/login/i), { target: {value: "myname"}});
        
        fireEvent.click(getByRole('button', {  name: /log in/i}));

        expect(mockLogin).toHaveBeenCalledWith("myname");
    });

    it("calls sign up with correct name", () => {
        const { getByAltText, getByRole } = render(
            <Login login={mockLogin} signUp={mockSignup} />
        );

        fireEvent.change(getByAltText(/signup/i), { target: {value: "newname"}});
        
        fireEvent.click(getByRole('button', {  name: /sign up/i}));

        expect(mockSignup).toHaveBeenCalledWith("newname");
    });
})