import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button, Heading, Box } from "@chakra-ui/react"
import './App.css'

function StartGame() {
  console.log("Start Game");

  // Fill the grid
  const grid = Array.from({length: 9} , () => Array(9).fill(0));
  const rand = Math.round(Math.random() *  9) ;
  console.log(grid, rand);
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Box  bg="black" p={5}>
      <Heading mb={4} color="white">Welcome to Ganesha Sudoku!</Heading>
      <Button colorScheme="teal" onClick={StartGame}>Start Game</Button>
    </Box>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
