const chalk = require('chalk')
const buildJS = require('./core')
const buildStyles = require('./styles')

const main = async () => {
  console.log(chalk.blue('[神机]'), chalk.green('开始打包JS文件'))
  await buildJS()
  console.log(chalk.blue('[神机]'), chalk.green('开始打包CSS文件'))
  await buildStyles()
  console.log(chalk.blue('[神机]'), chalk.green('打包完成'))
}

main()
