const { TRAIN_PATH, OPTPUT_PATH } = require('./constant')

const loadData = require('./data')

main()

async function main() {
  // 加载数据
  loadData(TRAIN_PATH, OPTPUT_PATH)

  // 定义模型
  // 训练模型
}
