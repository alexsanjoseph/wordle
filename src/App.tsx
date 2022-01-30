import { InformationCircleIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import { useState, useEffect, useRef } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { WinModal } from './components/modals/WinModal'
import { StatsModal } from './components/modals/StatsModal'
// import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { isWordInWordList, isWinningWord, getWordOfDay } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'

function App() {

  const startDate = new Date()
  //   const [startDate, setStartDate] = useState(new Date())
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)
  const [wordEntered, setWordEntered] = useState(false)

  const [guesses, setGuesses] = useState<string[]>(() => {
    // const loaded = {guesses.}
    return []
  })

  // const maxGuesses = 10;

  const [maxGuesses, setMaxGuesses] = useState(2)
  const keyboardRef = useRef<null | HTMLDivElement>(null);

  const [stats, setStats] = useState(() => loadStats())
  const [solution, setSolution] = useState(getWordOfDay(startDate).solution)

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true)
    }
  }, [isGameWon])

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < maxGuesses + 1) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (currentGuess.length !== 5 && guesses.length > maxGuesses) {
      console.log(guesses)
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, 2000)
    }

    if (!isWordInWordList(currentGuess) && guesses.length > 0) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, 2000)
    }

    if (keyboardRef.current !== null) {
      keyboardRef.current.scrollIntoView({ behavior: "smooth" });
    }


    const winningWord = isWinningWord(currentGuess, solution)


    if (currentGuess.length === 5 && guesses.length < maxGuesses + 1 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === maxGuesses) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
        return setTimeout(() => {
          setIsGameLost(false)
        }, 2000)
      }
    }
  }

  const [input, setInput] = useState("")
  const handleSolutionSubmit = (e) => {
    e.preventDefault()
    setSolution(input.toUpperCase())
    setWordEntered(true)
    setInput("")
  }


  const refreshPage = () => {
    window.location.reload();
  }

  const buttonClassAbout = "mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  const buttonClassSubmit = "ml-5 px-3.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-48"

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">

      <Alert message="Invalid letter length" isOpen={isNotEnoughLetters} />
      <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
      <Alert
        message={`You lost, the word was ${solution}`}
        isOpen={isGameLost}
      />
      <Alert
        message="Game copied to clipboard"
        isOpen={shareComplete}
        variant="success"
      />
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">Wordle for Kids!</h1>
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsStatsModalOpen(true)}
        />
      </div>

      {/* <DatePicker className='datePicker' selected={startDate} onChange={(date: Date) => {
          setStartDate(date)
          log(solution)
        }
          }/> */}
      <form onSubmit={handleSolutionSubmit} style={{ "padding": "0px 10px 30px 10px", "justifyContent": "center", "display": wordEntered ? "none" : "flex", "flexDirection": "column", alignItems: "center" }}>
        <div>
          <label>
            Input:
            <input
              id="textInput" type="text"
              style={{ "textTransform": 'uppercase', "border": "solid 1px", "margin": "5px", width: "200px", paddingLeft: "5px" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Enter 5-Letter Word' />
          </label>
        </div>
        <label>
          Max Guesses:
          <input
            id="guessInput" type="number"
            style={{ "textTransform": 'uppercase', "border": "solid 1px", "margin": "15px", width: "50px", paddingLeft: "5px", }}
            value={maxGuesses}
            onChange={(e) => setMaxGuesses(parseInt(e.target.value))}
          />
        </label>
        <input className={buttonClassSubmit} type="submit" value="Submit" />
      </form>

      <div style={{ "display": wordEntered ? "" : "none" }} >
        <Grid guesses={guesses} currentGuess={currentGuess} solution={solution} maxGuesses={maxGuesses} />
        <div ref={keyboardRef}>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            guesses={guesses}
            solution={solution}

          />
        </div>
        <button
          type="button"
          className={buttonClassAbout}
          onClick={() => refreshPage()}
          style={{ background: "lightpink" }}

        >
          Refresh for new game
        </button>

        <button
          type="button"
          className={buttonClassAbout}
          onClick={() => setIsAboutModalOpen(true)}
        >
          About this game
        </button>
      </div>



      <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
        solution={solution}
        startDate={startDate}
        handleShare={() => {
          setIsWinModalOpen(false)
          setShareComplete(true)
          return setTimeout(() => {
            setShareComplete(false)
          }, 2000)
        }}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        gameStats={stats}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />


    </div>
  )
}

export default App
