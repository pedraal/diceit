/* eslint-disable no-unused-expressions */

const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('DiceIt', () => {
  it('Should deploy and run', async() => {
    const DiceIt = await ethers.getContractFactory('DiceIt')
    const diceIt = await DiceIt.deploy()
    await diceIt.deployed()

    expect(await diceIt.fetchMyGames()).to.be.an('array').that.is.empty

    const betAmount = ethers.utils.parseUnits('1', 'ether')
    const [owner, challenger] = await ethers.getSigners()

    let tx = await diceIt.connect(owner).createGame(challenger.address, 6, 1, { value: betAmount })
    let receipt = await tx.wait()
    let event = receipt.events[0]
    expect(event.event).to.equal('GameStageChange')
    expect(event.args.index).to.equal(0)
    expect(event.args._stage).to.equal(0)
    expect(event.args._from).to.equal(owner.address)

    tx = await diceIt.connect(owner).createGame(challenger.address, 6, 1, { value: betAmount })
    receipt = await tx.wait()
    event = receipt.events[0]
    expect(event.event).to.equal('GameStageChange')
    expect(event.args.index).to.equal(1)
    expect(event.args._stage).to.equal(0)
    expect(event.args._from).to.equal(owner.address)

    expect((await diceIt.fetchMyGames()).length).to.equal(2)

    tx = await diceIt.connect(challenger).challengerBet(0, { value: betAmount })
    receipt = await tx.wait()
    event = receipt.events[0]
    expect(event.event).to.equal('GameStageChange')
    expect(event.args.index).to.equal(0)
    expect(event.args._stage).to.equal(1)
    expect(event.args._from).to.equal(challenger.address)

    let game = await fetchGame(diceIt, 0)
    expect(game.stage).to.equal(1)
    expect(game.currentPlayer).to.equal(1)
    expect(game.ownerPlayer).to.exist
    expect(game.challengerPlayer).to.exist

    expect(game.ownerPlayer.turn).to.equal(0)
    expect(game.ownerPlayer.score).to.equal(0)
    expect(game.ownerPlayer.stop).to.be.false

    expect(game.challengerPlayer.turn).to.equal(0)
    expect(game.challengerPlayer.score).to.equal(0)
    expect(game.challengerPlayer.stop).to.be.false

    diceIt.connect(owner).playTurn(0, true).then(() => expect(false).to.be.true).catch(() => expect(true).to.be.true)

    await diceIt.connect(challenger).playTurn(0, true)
    game = await fetchGame(diceIt, 0)
    expect(game.stage).to.equal(1)
    expect(game.currentPlayer).to.equal(0)
    expect(game.challengerPlayer.turn).to.equal(1)
    expect(game.challengerPlayer.score).to.be.above(0)

    tx = await diceIt.connect(owner).playTurn(0, true)
    receipt = await tx.wait()
    event = receipt.events[0]
    expect(event.event).to.equal('GameTurnPlayed')
    expect(event.args._from).to.equal(owner.address)
    expect(event.args._turn).to.equal(1)
    expect(event.args._score).to.be.above(0)

    event = receipt.events[1]
    expect(event.event).to.equal('GameStageChange')
    expect(event.args._stage).to.equal(2)
    game = await fetchGame(diceIt, 0)
    expect(game.stage).to.equal(2)
    expect(game.ownerPlayer.turn).to.equal(1)
    expect(game.ownerPlayer.score).to.be.above(0)
    expect([owner.address, challenger.address, '0x0000000000000000000000000000000000000000']).to.include(game.winner)
  })
})

async function fetchGame(contract, index) {
  const games = await contract.fetchMyGames()
  const game = games[index]

  return {
    stage: game.stage,
    currentPlayer: game.currentPlayer,
    maxScore: parseInt(game.maxScore.toString()),
    maxTurn: parseInt(game.maxTurn.toString()),
    owner: game.owner,
    challenger: game.challenger,
    ownerPlayer: {
      turn: parseInt(game.ownerPlayer.turn.toString()),
      score: parseInt(game.ownerPlayer.score.toString()),
      stop: game.ownerPlayer.stop,
    },
    challengerPlayer: {
      turn: parseInt(game.challengerPlayer.turn.toString()),
      score: parseInt(game.challengerPlayer.score.toString()),
      stop: game.challengerPlayer.stop,
    },
    winner: game.winner,
    bet: parseInt(game.bet.toString()),
  }
}
