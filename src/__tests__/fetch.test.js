import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render,  waitFor, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Fetch from '../fetch'

// Mock
const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.json({greeting: 'Text Content'}))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greetings', async () => {
    render(<Fetch url="/greeting" />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(()=> screen.findByRole('heading'))

    expect(screen.getByRole('heading')).toHaveTextContent('Text Content')
    expect(screen.getByRole('button')).toBeDisabled()
})

test('handles server error', async ()=> {
    server.use(
        rest.get('/greeting', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    )
    render(<Fetch url="/greeting" />)
    fireEvent.click(screen.getByText('Load Greeting'))
    await waitFor(()=> screen.findByRole('alert'))

    expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
    expect(screen.getByRole('button')).not.toBeDisabled()
})