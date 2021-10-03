const fs = require('fs')
const hre = require('hardhat')

async function main() {
  const [deployer] = await hre.ethers.getSigners()

  console.log(
    'Deploying contracts with the account:',
    deployer.address,
  )

  const DiceIt = await hre.ethers.getContractFactory('DiceIt')
  const diceIt = await DiceIt.deploy()

  await diceIt.deployed()

  console.log('DiceIt deployed to:', diceIt.address)

  const config = `export const diceItAddress = '${diceIt.address}'\n`

  const data = JSON.stringify(config)
  fs.writeFileSync('src/config.ts', JSON.parse(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
