
import { Button, Heading, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import './game.css';

interface GridProps {
    gridData: number[][];
}

function Grid({ gridData }: GridProps) {

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
                                    <div className="grid-cell" key={colIndex} onClick={() => selectCase(rowIndex, colIndex)}>{cell}</div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}

function checkRow({ grid, row, value }: { grid: number[][], row: number, value: number }): boolean {
    if (!grid[row]) return false;
    return grid[row].some(cell => cell === value);
}

function checkCol({ grid, col, value }: { grid: number[][], col: number, value: number }): boolean {
    if (!grid[col]) return false;
    return grid.some(row => row[col] === value);
}

function checkBlock({ grid, row, col, value }: { grid: number[][], row: number, col: number, value: number }): boolean {
    if (grid.length === 0) return false;
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (grid[r][c] === value) return true;
        }
    }
    return false;
}

function isValid({ grid, row, col, value }: { grid: number[][], row: number, col: number, value: number }): boolean {
    return !checkRow({ grid, row, value }) &&
        !checkCol({ grid, col, value }) &&
        !checkBlock({ grid, row, col, value });
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
    const InitGrid = () => {
        const newGrid: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
        const value = Math.round(Math.random() * 9) + 1;
        newGrid[0][0] = value;
        console.log(0, 0, value);
        let startRow = 0;
        let startCol = 1;

        while (startRow < 9) {
            while (startCol < 9) {
                let value = Math.round(Math.random() * 8) + 1;
                console.log('value ', value);

                if (isValid({ grid: grid, row: startRow, col: startCol, value })) {
                    startCol++;
                }
                else {
                    value = -1;
                    startCol++;
                }

                newGrid[startRow][startCol] = value;

            }
            startCol = 0;
            startRow++;
        }


        setGrid(newGrid);
        const newUserGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
        setUserGrid(newUserGrid);
    }

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

                {Array.from({ length: 9 }, (_, i) => (
                    <Button key={i} colorScheme="blue" onClick={() => changeNbSelected(i + 1)}>{i + 1}</Button>
                ))
                }
            </Box>
            {started && <p>Jeux démarré</p>}
            {!started && <p>Jeux arrêté</p>}

            <Grid gridData={userGrid} />

            <Grid gridData={grid} />

            NB: {nbSelected}
        </>
    )

}
export default Game;
