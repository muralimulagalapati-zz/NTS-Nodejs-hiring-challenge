/**
 * Created by: Murali Mulagalapati * 
 */

'use strict'

const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const { fork } = require('child_process')

const input = readFileSync(join(__dirname, 'input.txt')).toString()
const block_length = 1000

// Split and prepare input
let lines = input.split('\n')
const totalLines = lines.length
const blocks = []
for (let i=0; i<totalLines; i=i+block_length) {
  blocks.push(lines.slice(i, i+block_length))
}

// Get the output from children
let data = []
for (const block of blocks) {
  const child = fork('pig.js')
  child.send(block)
  child.on('message', msg => {
    data.push(msg)
    verifyAndWrite()
  })
}

// Write the output to a file and exit the process
const verifyAndWrite = () => {
  if (blocks.length === data.length) {
    writeFileSync(join(__dirname, 'output.txt'), data.join('\n'))
    process.exit()
  }
}
