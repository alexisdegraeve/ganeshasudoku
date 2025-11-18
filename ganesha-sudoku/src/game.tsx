
import { Button, Heading, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import './game.css';

interface GridProps {
  gridData: number[][];
}

function Grid({gridData}: GridProps) {

    const selectCase = (line: number, row: number) => {
        console.log(line, row);
    };
    return (
        <>
            My GRID
            <div className="grid-full">
            {
                gridData.map((row, rowIndex: number) => (
                    <div key={rowIndex} className="grid-row">
                        {
                            row.map((cell: number, colIndex: number) => (
                                <div className="grid-cell" key={colIndex}  onClick={() => selectCase(rowIndex, colIndex)}>{cell}</div>
                            ))
                        }
                    </div>
                ))
            }
            </div>
        </>
    )
}

function Game() {
    const [started, setStarted] = useState(false);
    const [grid, setGrid] = useState<number[][]>([]);
    const [userGrid, setUserGrid] = useState<number[][]>([]);
    const [nbSelected, setNbSelected] = useState(-1);

    useEffect(() => {
        if (grid.length > 0) {
            // ici grid est bien mis à jour
            console.log("Grid initialisée", grid);
        }
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
        const row = Math.round(Math.random() * 8);
        const col = Math.round(Math.random() * 8);
        const value = Math.round(Math.random() * 9) + 1;
        console.log(row, col, value);
        newGrid[row][col] = value;

        setGrid(newGrid);
        const newUserGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
        setUserGrid(newUserGrid);
    }

    // const FillGrid = () => {
    //     const row = Math.round(Math.random() * 8);
    //     const col = Math.round(Math.random() * 8);
    //     const value = Math.round(Math.random() * 9) + 1;
    //     const newGrid = grid.map(r => [...r]);
    //     console.log(row, col, value);
    //     newGrid[row][col] = value;
    //     setGrid(newGrid);
        

    // }

    const StartGame = () => {
        console.log("Start Game");
        setStarted(true);
        InitGrid();
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

            <Grid   gridData={grid} />

            NB: {nbSelected}
        </>
    )

}
export default Game;
