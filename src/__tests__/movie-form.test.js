import React from 'react';
import {fireEvent, getByRole, render, screen} from '@testing-library/react'
import MovieForm from '../components/movie-form'
import { wait } from '@testing-library/user-event/dist/utils';

global.fetch = require('jest-fetch-mock')

const empty_movie = {
    title: '',
    description: ''
}

const movie = {
    id: 1,
    title: 'This is a first title',
    description: "This is a description"
}

describe('MovieForm component', () =>{
    test('should have some elements', ()=>{
        const {getByLabelText} = render(<MovieForm movie={empty_movie} />)
        expect(screen.getByLabelText(/title/i)).toBeTruthy();
        expect(screen.getByLabelText(/description/i)).toBeTruthy();
        expect(screen.getAllByPlaceholderText(/description/i)).toBeTruthy()
        expect(screen.getByRole('button', {name: /create/i})).toBeTruthy()
    })

    test('should display form elements with movie data', ()=>{
        const {getByLabelText, debug} = render(<MovieForm movie={movie} />)
        expect(screen.getByLabelText(/title/i)).toBeTruthy();
        expect(screen.getByLabelText(/description/i)).toBeTruthy();
        expect(screen.getAllByPlaceholderText(/description/i)).toBeTruthy()
        expect(screen.getByRole('button', {name: /update/i})).toBeTruthy()
        expect(screen.getByLabelText(/title/i).value).toBe(movie.title);
        expect(screen.getByLabelText(/description/i).value).toBe(movie.description);
    })

    it('should do API request than click on button', async ()=>{
        const updatedMovie = jest.fn()

        jest.spyOn(global, 'fetch').mockImplementationOnce( ()=>
            Promise.resolve({
                json: () => Promise.resolve(movie)
            })
        )

        const {getByRole} = render(<MovieForm movie={movie} updatedMovie={updatedMovie} />)
        const submitBtn = screen.getByRole('button', {name: /update/i})
        fireEvent.click(submitBtn)
        await wait (()=>{
            expect(updatedMovie).toBeCalledTimes(1)
        })
    })

    test("shouldn't do API request than click on button with empty form", async ()=>{
        const updatedMovie = jest.fn()

        fetch.mockImplementationOnce(JSON.stringify(empty_movie))

        const {getByRole} = render(<MovieForm movie={empty_movie} updatedMovie={updatedMovie} />)
        const submitBtn = screen.getByRole('button', {name: /create/i})
        fireEvent.click(submitBtn)
        await wait (()=>{
            expect(updatedMovie).toBeCalledTimes(0)
        })
    })
})