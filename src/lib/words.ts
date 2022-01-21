import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string, startDate: Date) => {
  return getWordOfDay(startDate).solution === word
}

export const getWordOfDay = (startDate: Date) => {
  // January 1, 2022 Game Epoch
  const epochMs = 1641013200000 - 86400 * 1000 * 197
  const now = startDate.valueOf()
  const msInDay = 86400 * 1000
  const index = Math.floor((now - epochMs) / msInDay)
 console.log(index)
  return {
    solution: WORDS[index].toUpperCase(),
    solutionIndex: index,
  }
}

// export const { solution, solutionIndex } = getWordOfDay()
