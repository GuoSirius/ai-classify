const tf = require('@tensorflow/tfjs-node')

const { TRAIN_PATH, OPTPUT_PATH, MOBILE_NET_URL } = require('./constant')

const loadData = require('./data')

main()

async function main() {
  // 加载数据
  loadData(TRAIN_PATH, OPTPUT_PATH)

  const mobileNet = await tf.loadLayersModel(MOBILE_NET_URL)
  mobileNet.summary()

  // 定义模型
  // 训练模型
}
