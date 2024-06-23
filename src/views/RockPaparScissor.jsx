import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa';
import { useState, useEffect} from 'react';

const Game=()=>{
    const hands=[<FaHandRock style={{cursor:'pointer'}}/>, <FaHandPaper style={{cursor:'pointer'}}/>, <FaHandScissors style={{cursor:'pointer'}}/>]
    const selectGame = ['Rock','Paper','Scissors']
    const [playerChoice, setPlayerChoice] = useState(null)
    const [computerChoice, setComputerChoice] = useState(null)
    const [goal, setGoal] = useState('')
    const [scoreBoard,setScoreBoard] =useState(JSON.parse(localStorage.getItem('scoreBoard')) || {
        Wins: 0,
        Loses: 0,
        Draws: 0
    })

    useEffect(() => {
        handleMove();
    }, [playerChoice, computerChoice]);

    const handleChoice = (index) => {
        setPlayerChoice(index);
        const randomIndex = Math.floor(Math.random() * 3);
        setComputerChoice(randomIndex);
    };

    
    const handleMove=()=>{
        let updatedScoreObject;
        if (playerChoice !== null && computerChoice!==null){
       if((playerChoice===computerChoice)){
        updatedScoreObject = { ...scoreBoard, Draws: scoreBoard.Draws + 1 };
        setGoal('Draws')
    }

       else if((playerChoice===0 && computerChoice===1) ||                  
       (playerChoice===1 && computerChoice===2) || 
       (playerChoice===2 && computerChoice===0))
       {
        updatedScoreObject = { ...scoreBoard, Loses: scoreBoard.Loses + 1 };
        setGoal('Loses')
    }

       else if((playerChoice===1 && computerChoice===0) || (playerChoice===2 && computerChoice===1) || 
       (playerChoice===0 && computerChoice===2)){
        updatedScoreObject = { ...scoreBoard, Wins: scoreBoard.Wins + 1 };
        setGoal('Wins')
       }
        setScoreBoard(updatedScoreObject)
        localStorage.setItem('scoreBoard',JSON.stringify(updatedScoreObject))
        }
    }
    
    
    return(
        <>
        <main className="gameTime">
            <h1>Rock Paper Scissor Game</h1>
            
            <div className="gameContainer">
                {hands.map((item, index)=>
                  <button key={index} onClick={() => {
                    handleChoice(index);}}>{item} </button>   
                )}
            </div>
            
            {playerChoice!==null&&(
                <div className="playerContainer2">
                Player chose: {hands[playerChoice]}
           </div>
            )}

            {computerChoice!==null&&(
                <div className="playerContainer2">
                Computer chose: {hands[computerChoice]}
           </div>
            )}
           
        
           {goal !== '' && (
            <>
                    <p>{`Player chose ${selectGame[playerChoice]}! Computer chose ${selectGame[computerChoice]}! Player ${goal}!!`}</p>
                    <div className="scoreBoard">
                    <p>Wins: {scoreBoard.Wins}</p>
                    <p>Loses: {scoreBoard.Loses}</p>
                    <p>Draws: {scoreBoard.Draws}</p>
                </div> </>
                )}

                <button className='btnRestart' onClick={()=>{
                    localStorage.removeItem('scoreBoard');
                    setScoreBoard({ Wins: 0, Loses: 0, Draws: 0 });
                    setPlayerChoice(null);
                    setComputerChoice(null);
                    setGoal('');
                }}>Restart</button>
        </main>
           
        </>
    )
}
export default Game