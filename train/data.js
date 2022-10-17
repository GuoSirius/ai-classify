const fs = require('fs')
const path = require('path')

const fsExtra = require('fs-extra')
const gracefulFs = require('graceful-fs')

const isEmpty = require('lodash/isEmpty')

const tf = require('@tensorflow/tfjs-node')

async function loadData(dataPath, outputPath) {
  const inputLists = []
  const labelLists = []

  fsExtra.ensureDirSync(dataPath)
  fsExtra.ensureDirSync(outputPath)

  const categoryLists = fs.readdirSync(dataPath)

  fs.writeFileSync(`${outputPath}/category.json`, JSON.stringify(categoryLists))

  categoryLists.forEach((category, categoryIndex) => {
    const categoryPath = path.resolve(dataPath, category)

    const fileLists = fs.readdirSync(categoryPath)

    fileLists.forEach(file => {
      const filename = path.resolve(categoryPath, file)

      const buffer = fs.readFileSync(filename)

      const x = bufferToTensor(buffer)

      inputLists.push(x)
      labelLists.push(categoryIndex)
    })
  })

  const tensorX = isEmpty(inputLists) ? tf.tensor(inputLists) : tf.concat(inputLists)
  const tensorY = tf.tensor(labelLists)

  return { tensorX, tensorY, categoryLists }
}

function bufferToTensor(buffer) {
  return tf.tidy(() => {
    const bufferArray = new Uint8Array(buffer)

    const bufferTensor = tf.node.decodeImage(bufferArray)
    const resizedBufferTensor = tf.image.resizeBilinear(bufferTensor, [224, 224])

    const normalizedBufferTenson = resizedBufferTensor.toFloat().sub(255 / 2).div(255 / 2).reshape([1, 224, 224, 3])

    return normalizedBufferTenson
  })
}

exports = module.exports = loadData
