const FtpDeploy = require('ftp-deploy')
const ftpDeploy = new FtpDeploy()

const config = {
  user: process.env.deployUser,
  password: process.env.deployPassword,
  host: process.env.deployHost,
  port: process.env.deployPort,
  localRoot: __dirname + '/build',
  remoteRoot: process.env.deployRemoteRoot,
  include: ['*.*'],
  exclude: ['static/**/*.map'],
  deleteRemote: false,
  forcePasv: true,
}

console.log('Deploy ftp...')

ftpDeploy
  .deploy(config)
  .then((res) => console.log('finished:', res))
  .catch((err) => console.log(err))
