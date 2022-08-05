const chalk = require('chalk')
const buildJS = require('./core')
const buildStyles = require('./styles')

const main = async () => {
  console.log(chalk.blue('[神机]'), chalk.green('开始打包JS文件'))
  const StartTime = +new Date()
  await buildJS()
  console.log(chalk.blue('[神机]'), chalk.green('开始打包CSS文件'))
  await buildStyles()
  const EndTime = +new Date()
  console.log(chalk.blue('[神机]'), chalk.green('打包完成 总计耗时：'), chalk.yellow((EndTime - StartTime) / 1000), chalk.green('秒'))
}

main()
