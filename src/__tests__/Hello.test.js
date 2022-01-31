import React from 'react';
import Hello from '../components/Hello';
import {fireEvent, render} from '@testing-library/react'

test("Component should display Hello text", ()=>{
    const view = render(<Hello/>)
    const helloText = view.getByText('Hello')
    expect(helloText).toBeTruthy()
})
test("Component text should be in H1 tag", ()=>{
    const view = render(<Hello/>)
    const helloText = view.getByText('Hello').tagName
    expect(helloText).toBe('H1')
})
test("Component should do some action onclick button", ()=>{
    const {getByRole} = render(<Hello/>)
    const button = getByRole('button')
    expect(fireEvent.click(button)).toBeTruthy()
})
test("Component should change text on input", ()=>{
    const {getByRole} = render(<Hello/>)
    const input = getByRole('textbox')
    const inputedText = 'Hello World'
    expect(input).toHaveValue('')
    fireEvent.change(input, {target: { value: inputedText}})
    expect(input).toHaveValue(inputedText)
})