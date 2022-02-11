import React from 'react';
import {render, screen} from '@testing-library/react'
import MovieDetails from '../components/movie-details'

const selectedMovie = {
    id: 1,
    title: 'some title',
    description: 'some des',
    avg_rating: 3,
    np_of_ratings: 2
}

describe('MovieDetails component', () =>{
    test('should match snapshot', ()=>{
        const {container} = render(<MovieDetails movie={selectedMovie}/>)
        expect(container).toMatchSnapshot()
    })

    test('should display title and description', ()=>{
        const { getByText } = render(<MovieDetails movie={selectedMovie}/>)
        expect(screen.getByText(selectedMovie.title)).toBeTruthy()
        expect(screen.getByText(selectedMovie.description)).toBeTruthy()
    })
})