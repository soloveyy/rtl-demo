import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { render, fairEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock
const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.json({greeting: 'hello there'}))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greetings', async () => {
    //Arange
    //Act
    //Assert
})