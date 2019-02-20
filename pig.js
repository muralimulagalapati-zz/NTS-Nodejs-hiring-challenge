/**
 * Created by: Murali Mulagalapati * 
 */

'use strict'

// Listen for input from parent
process.on('message', lines => {
  lines = lines.map(pig)
  process.send(lines.join('\n'))
})

const vowels = ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u']
const puncts = [',', '.', '!', '?', ';', '[', ']', ':', ';', '|']

const processWord = word => {
  const len = word.length
  for (const i in word) {
    if (vowels.includes(word[i])) {
      return puncts.includes(word[0]) && puncts.includes(word[len-1]) ?
        word[0] + word.slice(i, len - 1) + word.slice(1, i) + 'ay' + word[len - 1] :
          puncts.includes(word[len-1]) ?
          word.slice(i, len - 1) + word.slice(0, i) + 'ay' + word[len - 1] :
            puncts.includes(word[0]) ?
            word[0] + word.slice(i) + word.slice(1, i) + 'ay' :
            word.slice(i) + word.slice(0, i) + 'ay'
    }
  }
}

const pig = line => {
  let words = line.split(/\s/)
  words = words ? words.map(processWord) : words
  return words.join(' ')
}

