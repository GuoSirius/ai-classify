const path = require('path')

const TEST_PATH = path.resolve('data/test')
const TRAIN_PATH = path.resolve('data/train')

const OPTPUT_PATH = path.resolve('output')

// const MOBILE_NET_URL = path.resolve('train/mobile-net.json')
const MOBILE_NET_URL = 'http://127.0.0.1:8083/train/mobile-net.json'
// const MOBILE_NET_URL = 'http://ai-sample.oss-cn-hangzhou.aliyuncs.com/pipcook/models/mobilenet/web_model/model.json'

exports = module.exports = {
  TEST_PATH,
  TRAIN_PATH,
  OPTPUT_PATH,
  MOBILE_NET_URL
}
