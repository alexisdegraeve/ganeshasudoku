
import { Button, Heading, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";

interface GridProps {
  gridData: number[][];
}

function Grid({gridData}: GridProps) {
    return (
        <>
            My GRID
            {
                gridData.map((row, rowIndex: number) => (
                    <div key={rowIndex}>
                        {
                            row.map((cell: number, colIndex: number) => (
                                <span key={colIndex}>{cell}</span>
                            ))
                        }
                    </div>
                ))
            }
        </>
    )
}

function Game() {
    const [started, setStarted] = useState(false);
    const [grid, setGrid] = useState<number[][]>([]);
    const [userGrid, setUserGrid] = useState<number[][]>([]);
    const [nbSelected, setNbSelected] = useState(-1);

    useEffect(() => {
        console.log("grid ", grid)
    }, [grid]);

    const StopGame = () => {
        console.log("Start Game");
        setStarted(false);
    }

    const changeNbSelected = (nbSelect: number) => {
        setNbSelected(nbSelect);
    }

    // Fill the grid with 0
    const InitGrid = () =>{
        const newGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
        setGrid(newGrid);
        const newUserGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
        setUserGrid(newUserGrid);
    }

    const StartGame = () => {
        console.log("Start Game");
        setStarted(true);
        InitGrid();
        const rand = Math.round(Math.random() * 9);
        console.log(rand);
    }
    return (
        <>
            <Box bg="black" p={5}>
                <Heading mb={4} color="white">Welcome to Ganesha Sudoku!</Heading>
                <Button colorScheme="teal" onClick={StartGame}>Start Game</Button>
                <Button colorScheme="red" onClick={StopGame}>Stop Game</Button>

                { Array.from({length: 9}, (_,i) => (
                    <Button key={i} colorScheme="blue" onClick={() => changeNbSelected(i+1)}>{i + 1}</Button>    
                    ))
                }
            </Box>
            {started && <p>Jeux démarré</p>}
            {!started && <p>Jeux arrêté</p>}

            <Grid   gridData={userGrid} />

            NB: {nbSelected}
        </>
    )

}
export default Game;
