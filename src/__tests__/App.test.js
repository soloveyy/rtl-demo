import { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import {render, screen, fireEvent, waitForElement, act, waitForElementToBeRemoved} from '@testing-library/react'
import App from '../App'
import { wait } from '@testing-library/user-event/dist/utils';

global.fetch = require('jest-fetch-mock').enableMocks()
enableFetchMocks()

const movies = [
    {
        id: 3,
        title: 'some title',
        description: 'some des',
    },
    {
        id: 4,
        title: 'some second title',
        description: 'some des 2',
    }
]

describe("App component", () =>{
    test("should start and stop loading", async ()=>{
        fetch.mockResponseOnce(null, {status: 500})
        act(()=>{
            render(<App />)
        })
        await waitForElementToBeRemoved(() => screen.queryAllByTestId('loading'))
        expect(screen.queryByText('loading')).toBeFalsy()
    }) 

    test("button should be have right text content", async ()=>{
        fetch.mockResponseOnce(JSON.stringify(movies))
        act(()=>{
            render(<App />)
        })
        await waitForElementToBeRemoved(() => screen.queryAllByTestId('loading'))
        const btn = screen.getByRole('button', {name: 'New movie'})
        expect(btn.textContent).toBe('New movie')
    }) 
    
    test("new movie btn should be present movie form", async ()=>{
        fetch.mockResponseOnce(JSON.stringify(movies))
        act(()=>{
            render(<App />)
        })
        await waitForElementToBeRemoved(() => screen.queryAllByTestId('loading'))
        const btn = screen.getByRole('button', {name: 'New movie'})
        fireEvent.click(btn)
        expect(screen.getByTestId('movie-form')).toBeTruthy()
    }) 
})
