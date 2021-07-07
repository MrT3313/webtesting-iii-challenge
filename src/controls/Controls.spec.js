// Test away!
import React from 'react'
import renderer from "react-test-renderer";
import "jest-dom/extend-expect";

import { render, fireEvent, getByTestId } from "@testing-library/react";

import Controls from "./Controls.js";
import Dashboard from "../dashboard/Dashboard";

// import "@testing-library/react/cleanup-after-each";


describe("<Controls />", () => {
    
    it("should match snapshot", () => {
        const tree = renderer.create(<Controls />);
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('testing controls', () => {
        const { getByTestId } = render(<Dashboard />)
        const toggleLock = getByTestId('tgl_lockGate')
        const toggleOpen = getByTestId('tgl_openGate')

        // Unlocked & Open
        expect(toggleLock).toHaveTextContent(/lock gate/i)
        expect(toggleLock).toBeDisabled()
        expect(toggleOpen).toHaveTextContent(/close gate/i)
        expect (toggleOpen).not.toBeDisabled()

        // Unlocked & Closed 
        fireEvent.click(toggleOpen)
        expect(toggleOpen).toHaveTextContent(/open gate/i)
        expect(toggleOpen).not.toBeDisabled()
        expect(toggleLock).toHaveTextContent(/lock gate/i)
        expect(toggleLock).not.toBeDisabled()

        // Locked & Closed
        fireEvent.click(toggleLock)
        expect(toggleOpen).toHaveTextContent(/open gate/i)
        expect(toggleOpen).toBeDisabled()
        expect(toggleLock).toHaveTextContent(/unlock gate/i)
        expect(toggleLock).not.toBeDisabled()
    })

    it('Mock Functions', () => {
        const tgl_Lock_Mock  = jest.fn()
        const tgl_Open_Mock = jest.fn()

        tgl_Lock_Mock()
        expect(tgl_Lock_Mock).toHaveBeenCalled()
        
        tgl_Lock_Mock('TACO')
        expect(tgl_Lock_Mock).toHaveBeenCalledWith('TACO')

        tgl_Open_Mock()
        expect(tgl_Open_Mock).toHaveBeenCalled()
        
        tgl_Open_Mock('MANY TACOS')
        expect(tgl_Open_Mock).toHaveBeenCalledWith('MANY TACOS')
    })
})