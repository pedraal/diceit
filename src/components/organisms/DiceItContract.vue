<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ethers } from 'ethers'
import DiceIt from '../../artifacts/contracts/DiceIt.sol/DiceIt.json'
import { diceItAddress } from '../../config'
import * as DiceItTypes from '../../diceit-types'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contract = new ethers.Contract(diceItAddress, DiceIt.abi, signer)

const myGames = ref<DiceItTypes.Game[]>([])
const myGamesSorted = computed(() => {
  return myGames.value.sort((a: DiceItTypes.Game, b: DiceItTypes.Game) => b.id - a.id)
})
const myGamesFetched = ref(false)
const showNewGameForm = ref(false)

async function fetchMyGames() {
  myGamesFetched.value = false
  if (typeof window.ethereum !== 'undefined') {
    try {
      myGames.value = []
      const data: DiceItTypes.Game[] = await contract.fetchMyGames()
      setTimeout(() => {
        myGames.value = [...data]
      }, 300)
    }
    catch (err) {
      console.error('Error: ', err)
    }
  }
  setTimeout(() => {
    myGamesFetched.value = true
  }, 300)
}

const connectedToMetamask = computed(() => {
  return window.ethereum.selectedAddress
})

onMounted(async() => {
  if (connectedToMetamask.value)
    await fetchMyGames()
})
</script>

<template>
  <div v-if="!connectedToMetamask" class="py-6 sm:py-8 lg:py-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div class="rounded-lg bg-gray-100 p-4 gap-4  md:p-8 dark:bg-gray-900">
        <h2 class="font-bold text-xl text-secondary md:text-2xl dark:text-primary">
          Start playing now
        </h2>

        <div class="animate-pulse">
          <Logo class="mx-auto my-8 fill-gray-300 w-48 dark:fill-gray-800" />
          <p class="font-bold text-lg text-muted">
            Waiting for Metamask connection
          </p>
        </div>
      </div>
    </div>
  </div>
  <template v-else>
    <div class="flex space-x-2 mt-6 mb-4 justify-end">
      <Button class="rounded-full" @click="showNewGameForm = !showNewGameForm">
        <carbon-add-alt class="text-xl" />
      </Button>
      <Button class="rounded-full" @click="fetchMyGames">
        <carbon-rotate class="text-xl" />
      </Button>
    </div>

    <NewGame v-if="showNewGameForm" :contract="contract" class="my-4" @created="fetchMyGames" @close="showNewGameForm = false" />

    <div class="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Game
        v-for="game in myGamesSorted"
        :key="game.id"
        :game="game"
        :address="connectedToMetamask"
        :contract="contract"
        @played="fetchMyGames"
      />
      <template v-if="myGames.length === 0 && !myGamesFetched">
        <GameSkeleton v-for="i in 5" :key="i" />
      </template>
    </div>
    <div v-if="myGames.length === 0 && myGamesFetched" class="py-6 sm:py-8 lg:py-12">
      <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div class="rounded-lg bg-gray-100 p-4 gap-4  md:p-8 dark:bg-gray-900">
          <h2 class="font-bold text-xl text-secondary md:text-2xl dark:text-primary">
            Start playing now
          </h2>

          <div>
            <Logo class="mx-auto my-8 fill-gray-300 w-48 dark:fill-gray-800" />
            <p class="font-bold text-lg text-muted">
              Create your first game by clicking the <carbon-add-alt class="inline"></carbon-add-alt> button
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
