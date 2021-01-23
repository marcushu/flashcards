import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TopicList from '../TopicList';

describe("TopicList", () => {
    const mockDeleteFn = jest.fn();
    const mockSetFn = jest.fn();

    it("renders", () => {
        const { asFragment } = render(
            <TopicList currentTopic={"java"}
                usersTopics={["java", "c", "fortran"]}
                deleteTopic={mockDeleteFn}
                setTopic={mockSetFn}
                userStatus={"user"} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("displays the list of topics", () => {
        const { getByRole } = render(
            <TopicList currentTopic={"java"}
                usersTopics={["java", "c", "fortran"]}
                deleteTopic={mockDeleteFn}
                setTopic={mockSetFn}
                userStatus={"user"} />
        );

        expect(getByRole('button', {  name: /java/i})).toBeInTheDocument();
        expect(getByRole('button', {  name: /c/i})).toBeInTheDocument();
        expect(getByRole('button', {  name: /fortran/i})).toBeInTheDocument();
    });

    it("displays the correct element as selected", () => {
        const { getByRole } = render(
            <TopicList currentTopic={"java"}
                usersTopics={["java", "c", "fortran"]}
                deleteTopic={mockDeleteFn}
                setTopic={mockSetFn}
                userStatus={"user"} />
        );

        expect(getByRole('button', {  name: /java/i})).toHaveClass("selected");
    });

    it("calls delete and set functions with the correct argument", () => {
        const { getByRole } = render(
            <TopicList currentTopic={"java"}
                usersTopics={["java", "c", "fortran"]}
                deleteTopic={mockDeleteFn}
                setTopic={mockSetFn}
                userStatus={"user"} />
        );
        
        fireEvent.click(getByRole('button', {  name: /delete/i}));
        expect(mockDeleteFn).toHaveBeenCalledWith("java");

        fireEvent.click(getByRole('button', {  name: /c/i}));
        expect(mockSetFn).toHaveBeenCalledWith("c");
    })
});