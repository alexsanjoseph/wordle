import { getGuessStatuses } from './statuses'
import { getWordOfDay } from './words'

export const shareStatus = (guesses: string[], startDate: Date) => {
  navigator.clipboard.writeText(
    'Wordle ' +
      getWordOfDay(startDate).solutionIndex +
      ' ' +
      guesses.length +
      '/6\n\n' +
      generateEmojiGrid(guesses, startDate)
  )
}

export const generateEmojiGrid = (guesses: string[], startDate: Date) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess, startDate)
      return guess
        .split('')
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
