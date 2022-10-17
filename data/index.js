const fs = require('fs')
const path = require('path')

const argv = process.argv

const username = argv[2] || 'gzc'
const trainPath = path.resolve(argv[3] || './')

const pathLists = ['1-训练照片', '2-验证照片']

main()

function main() {
  pathLists.forEach(item => {
    renameFilename(item, true)
    renameFilename(item, false)
  })
}

function renameFilename(pathname = trainPath, needRandom = false) {
  if (typeof pathname === 'boolean') {
    needRandom = pathname
    pathname = trainPath
  }

  const directoryLists = getFileLists(pathname)

  let totalCount = 0

  directoryLists.forEach(item => {
    const fileLists = getFileLists(item, pathname)
    const directory = path.resolve(pathname, item)

    fileLists.forEach((file, index) => {
      const extension = path.extname(file) || ''

      let filename = `${item}-${username}-${index + 1}${extension}`

      if (needRandom) filename = `${Date.now()}${Math.random().toString(36)}${extension}`

      const oldFilename = path.resolve(directory, file)
      const newFilename = path.resolve(directory, filename)

      fs.renameSync(oldFilename, newFilename)

      totalCount++
    })
  })

  console.log(`${needRandom ? '随机' : '重命名'}共计：${totalCount}`)
}

function getFileLists(pathname = '', parentPath = trainPath) {
  pathname = path.resolve(parentPath, pathname)

  if (!fs.existsSync(pathname)) return []

  const pathnameStat = fs.statSync(pathname)

  if (!pathnameStat.isDirectory()) return []

  const fileLists = fs.readdirSync(pathname)

  return fileLists
}
