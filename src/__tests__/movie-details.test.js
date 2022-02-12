import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
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
        render(<MovieDetails movie={selectedMovie}/>)
        expect(screen.getByText(selectedMovie.title)).toBeTruthy()
        expect(screen.getByText(selectedMovie.description)).toBeTruthy()
    })

    test('should display number of ratings', ()=>{
        const { container } = render(<MovieDetails movie={selectedMovie}/>)
        const selected_stars = container.querySelectorAll('.orange');
        expect(selected_stars.length).toBe(3)
        expect(selected_stars.length).toBe(selectedMovie.avg_rating)
    })

    test('mouseover should highlight the stars', ()=>{
        const { container } = render(<MovieDetails movie={selectedMovie}/>)
        const stars = container.querySelectorAll('.rate-container svg');
        stars.forEach((star,idx)=>{
            fireEvent.mouseOver(star)
            const highlighted_stars = container.querySelectorAll('.purple');
            expect(highlighted_stars.length).toBe(idx+1)
        })
    })

    test('should be called stars length time', ()=>{
        const loadMovie = jest.fn()
        const { container } = render(<MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>)
        const stars = container.querySelectorAll('.rate-container svg');
        stars.forEach(star=>{
            fireEvent.click(star)
        })
        setTimeout((()=>expect(loadMovie).toBeCalledTimes(stars.length)))
    })
})