
import { Button, Heading, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import  LogoSudokuPath from './assets/logo_sudoku.svg';
import  LogoPlayPath from './assets/logo.svg';
import './game.css';


type GridProps = {
    originalGrid: number[][];
    gridData: number[][];
    nbSelected: number;
    wrong: number;
    setWrong: React.Dispatch<React.SetStateAction<number>>;
    setGridData: React.Dispatch<React.SetStateAction<number[][]>>;
    playNumbers: number[];
    setPlayNumbers: React.Dispatch<React.SetStateAction<number[]>>;
};

function Grid({ originalGrid, gridData, nbSelected, wrong, setWrong, setGridData, playNumbers, setPlayNumbers }: GridProps) {

    const selectCase = (line: number, col: number) => {
        console.log(line, col);
        if (gridData[line][col] > -1) return;
        if (nbSelected != originalGrid[line][col]) {
            wrong++;
            setWrong(wrong);
            return;
        } else {
            // OK
            const newPlayNumbers = [...playNumbers];
            newPlayNumbers[nbSelected]--;
            setPlayNumbers(newPlayNumbers);
            const newGrid = gridData.map(r => [...r]); // clone du tableau
            newGrid[line][col] = nbSelected;
            setGridData(newGrid);
        }

    };
    return (
        <>
            My GRID
            <div className="grid-full">
                {gridData.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid-row">
                        {row.map((cell, colIndex) => (
                            <div
                                className={`grid-cell ${cell > -1 ? 'disabled-cell' : ''}`}
                                key={colIndex}
                                onClick={() => selectCase(rowIndex, colIndex)}
                            >
                                {cell > -1 ? cell : ''}
                            </div>
                        ))}
                    </div>
                ))}
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
    const [rules, setRules] = useState(false);
    const [grid, setGrid] = useState<number[][]>([]);
    const [userGrid, setUserGrid] = useState<number[][]>([]);
    const [nbSelected, setNbSelected] = useState(-1);
    const [wrong, setWrong] = useState(0);
    const [playNumbers, setPlayNumbers] = useState<number[]>([]);
    const [time, setTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [totalCell, setTotalCell] = useState(5);
    const [newGame, setNewGame] = useState(false);


    useEffect(() => {
        if (playNumbers.slice(1).every(n => n === 0)) {
            setTimeout(() => {
                setTimerActive(false); // arrêt du timer
                console.log("You Win !");
            }, 0);
        }
        if (grid.length > 0) {
            // ici grid est bien mis à jour
            console.log("Grid initialisée", grid);
            console.log('init playnumbers ', playNumbers);

        }

        if (!timerActive) return;
        const interval = setInterval(() => {
            setTime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [grid, playNumbers, timerActive]);


    const changeNbSelected = (nbSelect: number) => {
        setNbSelected(nbSelect);
    }

    function fillGrid(grid: number[][], row = 0, col = 0): boolean {
        if (row === 9) return true; // toute la grille remplie

        if (col === 9) return fillGrid(grid, row + 1, 0); // passer à la ligne suivante

        if (grid[row][col] !== 0) return fillGrid(grid, row, col + 1); // case déjà remplie

        for (let num = 1; num <= 9; num++) { // ou tableau 1-9 mélangé pour l'aléatoire
            if (isValid({ grid, row, col, value: num })) {
                grid[row][col] = num;

                if (fillGrid(grid, row, col + 1)) return true; // avancer

                grid[row][col] = 0; // pas de solution -> revenir en arrière
            }
        }

        return false; // aucun chiffre possible ici -> backtrack
    }

    function removeCells(grid: number[][], total = 5) {
        const newPlayNumbers: number[] = Array(10).fill(0);
        for (let i = 0; i < total; i++) {
            const row = Math.floor((Math.random() * 9));
            const col = Math.floor((Math.random() * 9));
            if (grid[row][col] === -1) continue;
            console.log(row, col);
            console.log('playNumbers', playNumbers);
            const value = grid[row][col];
            newPlayNumbers[value]++;
            grid[row][col] = -1;
        }
        setPlayNumbers(newPlayNumbers);
        console.log('playNumbers ', newPlayNumbers);
    }


    // Fill the grid with 0
    const InitGrid = () => {
        const newGrid: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
        const value = Math.round(Math.random() * 9) + 1;
        newGrid[0][0] = value;
        console.log(0, 0, value);

        fillGrid(newGrid, 0, 0);

        setGrid(newGrid);

        const newUserGrid = newGrid.map(row => [...row]);
        removeCells(newUserGrid, totalCell);
        setUserGrid(newUserGrid);
    }

    const ShowRules = () => {
        setRules(true);
    }

    const HideRules = () => {
        setRules(false);
    }


    const SetMode = (level: number = 0) => {
        if (level === 0) {
            setTotalCell(35);
        }
        if (level === 1) {
            setTotalCell(45);
        }

        if (level === 2) {
            setTotalCell(55);
        }

        if (level === 3) {
            setTotalCell(60);
        }
        StartGame();
    }

    const StartNewGame = () => {
        setNbSelected(-1);
        setWrong(0);
        setNewGame(true);
        InitGrid();
    }

    const StartGame = () => {
        console.log("Start Game");
        setStarted(true);
        setTime(0);
        setTimerActive(true);
    }

    
    const StopGame = () => {
        console.log("Start Game");
        setTimerActive(false);
        setStarted(false);
        setNewGame(false);
    }

    return (
        <>
            <Box bg="black" p={5}>
                <Heading mb={4} color="white">
                    <img src={LogoSudokuPath} alt="Logo" width={324} height={90} />
                    
                </Heading>
                {!rules && started && newGame &&
                    <p>Time: {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}</p>
                }
                
                 {!started && !newGame && !rules && <div className="logo-play">
                    <img src={LogoPlayPath} alt="Logo" width={148} height={148} className="rotate360" />
                    <Button colorScheme="pink" onClick={() => StartNewGame()}>New Game</Button>
                    <Button colorScheme="pink" onClick={ShowRules}>Rules</Button>
                 </div>}
                {!started && newGame && <div className="levels">
                
                    <Button colorScheme="pink" onClick={() => SetMode()}>Easy</Button>
                    <Button colorScheme="pink" onClick={() => SetMode(1)}>Medium</Button>
                    <Button colorScheme="pink" onClick={() => SetMode(2)}>Hard</Button>
                    <Button colorScheme="pink" onClick={() => SetMode(3)}>Expert</Button>
                </div>
                }
                {started && !playNumbers.slice(1).every(n => n === 0) &&


                    <Button colorScheme="red" onClick={StopGame}>Stop Game</Button>

                }
            </Box>
            {rules && !started && (
                <div className="rules">
                    <h2>Rules</h2>
                    <ul>
                        <li>🔢 Fill the 9×9 grid with numbers 1–9</li>
                        <li>➡️ Each row must contain 1–9 with no duplicates</li>
                        <li>⬇️ Each column must contain 1–9 with no duplicates</li>
                        <li>🟦 Each 3×3 block must contain 1–9 with no duplicates</li>
                        <li>❌ You cannot change the numbers given at the start</li>
                        <li>🏆 You win when the whole grid is correctly filled</li>
                    </ul>
                    <Button colorScheme="pink" onClick={HideRules}>OK</Button>
                </div>
            )
            }

            {wrong < 3 && started ? (




                playNumbers.slice(1).every(n => n === 0) ? (
                    <>
                        <p>You Win !</p>
                        <Button colorScheme="teal" onClick={StopGame}>restart Game</Button>
                    </>
                )
                    : (

                        <>
                            {playNumbers
                                .slice(1)
                                .map((count, i) => ({ index: i + 1, count })) // on garde l'index du chiffre
                                .filter(item => item.count > 0)
                                .map((item) => (
                                    <Button
                                        key={item.index}
                                        className={nbSelected === item.index ? 'button-selected' : 'button-normal'}
                                        onClick={() => changeNbSelected(item.index)}
                                    >
                                        {item.index} ({item.count})
                                    </Button>
                                ))}

                            <Grid originalGrid={grid} gridData={userGrid} nbSelected={nbSelected} setGridData={setUserGrid} wrong={wrong} setWrong={setWrong} playNumbers={playNumbers} setPlayNumbers={setPlayNumbers} />

                            <Grid originalGrid={grid} gridData={grid} nbSelected={nbSelected} setGridData={setGrid} wrong={wrong} setWrong={setWrong} playNumbers={playNumbers} setPlayNumbers={setPlayNumbers} />

                            NB: {nbSelected}
                            wrong : {wrong}
                            {playNumbers}

                        </>
                    )

            ) : (

                started &&
                <>
                    <div>LOSE</div>
                    <Button colorScheme="teal" onClick={StopGame}>restart Game</Button>
                </>


            )
            }

        </>
    )

}
export default Game;
