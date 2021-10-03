<script setup lang="ts">
import { computed } from 'vue'
import { ethers } from 'ethers'
import Button from '../atoms/Button.vue'
import * as DiceItTypes from '../../diceit-types'

const emit = defineEmits(['played'])
const props = defineProps<{ game: DiceItTypes.Game; address: string; contract: ethers.Contract }>()

const betInEther = computed(() => {
  return ethers.utils.formatEther(props.game.bet)
})

const myRole = computed(() => {
  if (props.game.owner.toLowerCase() === props.address)
    return DiceItTypes.CurrentPlayer.Owner

  else if (props.game.challenger.toLowerCase() === props.address)
    return DiceItTypes.CurrentPlayer.Challenger

  else return ''
})

const myTurn = computed(() => {
  if (props.game.stage !== DiceItTypes.Stage.Run) return false
  else if (props.game.currentPlayer === myRole.value) return true
  else return false
})

const myResult = computed(() => {
  if (props.game.winner.toLowerCase() === props.address) return true
  else return false
})

async function playTurn(draw: boolean) {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const transaction = await props.contract.playTurn(props.game.id, draw)
      await transaction.wait()
      emit('played')
    }
  }
  catch (error) {
    console.error(error)
  }
}

async function challengerBet() {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const transaction = await props.contract.challengerBet(props.game.id, { value: props.game.bet })
      await transaction.wait()
      emit('played')
    }
  }
  catch (error) {
    console.error(error)
  }
}

</script>

<template>
  <article class="rounded-lg bg-gray-100 p-6 relative dark:bg-true-gray-900">
    <div class="flex w-full bottom-0 left-0 z-0 absolute justify-center items-center">
      <Logo class="mx-auto my-8 top-0 fill-gray-200 w-48 dark:fill-gray-700/25" />
    </div>
    <div class="z-1 relative">
      <div class="flex min-h-8 justify-between ">
        <h2 class="font-bold text-xl">
          Game #{{ props.game.id }}
        </h2>
        <div v-if="props.game.stage == DiceItTypes.Stage.Run">
          <carbon-in-progress v-if="myTurn" class="text-xl animate-ping text-green-600 absolute inline-block dark:text-green-300" />
          <carbon-in-progress class="text-xl inline-block" :class="`${myTurn ? 'text-green-600 dark:text-green-300' : 'text-yellow-500 dark:text-yellow-300'}`" />
        </div>
        <div v-else-if="props.game.stage == DiceItTypes.Stage.Done">
          <carbon-piggy-bank v-if="myResult" class="text-xl text-green-600 inline-block" />
          <carbon-piggy-bank-slot v-else class="text-xl text-red-600 inline inline-block" />
        </div>
      </div>
    </div>
    <div class="z-1 relative">
      <p class="flex text-left gap-2 truncate items-center">
        <img src="/ether.svg" class="h-5 inline">
        {{ betInEther }}
      </p>
    </div>
    <div class="flex space-x-4 mt-4 min-h-15 z-1 duration-100 justify-center items-center relative">
      <template v-if="props.game.stage === DiceItTypes.Stage.Reg">
        <p v-if="myRole === DiceItTypes.CurrentPlayer.Owner" class="text-muted animate-pulse">
          Waiting for challenger's bet
        </p>
        <Button v-else variant="secondary" @click="challengerBet()">
          Place my bet
        </Button>
      </template>
      <template v-if="props.game.stage === DiceItTypes.Stage.Run">
        <Button :disabled="!myTurn" variant="primary" @click="playTurn(true)">
          Roll
        </Button>
        <Button :disabled="!myTurn" variant="danger" @click="playTurn(false)">
          Stop
        </Button>
      </template>
      <template v-else-if="props.game.stage === DiceItTypes.Stage.Done">
        <p v-if="props.game.winner === ethers.constants.AddressZero" class="font-bold text-lg">
          Bet refounded
        </p>
        <p v-else-if="myResult" class="font-bold text-lg">
          Reward sent to your wallet
        </p>
        <p v-else class="font-bold text-lg">
          You lost your bet
        </p>
      </template>
    </div>
    <div class="flex mt-4 z-1 justify-between relative">
      <Player
        :game="props.game"
        :player="props.game.ownerPlayer"
        :role="DiceItTypes.CurrentPlayer.Owner"
        :my-role="myRole"
      />
      <Player
        :game="props.game"
        :player="props.game.challengerPlayer"
        :role="DiceItTypes.CurrentPlayer.Challenger"
        :my-role="myRole"
      />
    </div>
  </article>
</template>
