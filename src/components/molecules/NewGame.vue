<script setup lang="ts">
import { reactive } from 'vue'
import { ethers } from 'ethers'

const props = defineProps<{contract: ethers.Contract}>()
const emit = defineEmits(['created', 'close'])

const newGame = reactive({
  challengerAddress: '',
  maxScore: 12,
  maxCount: 3,
  bet: 0.1,
})
async function createGame() {
  try {
    if (!newGame.challengerAddress || !newGame.maxCount || !newGame.maxScore) return
    if (typeof window.ethereum !== 'undefined') {
      const transaction = await props.contract.createGame(newGame.challengerAddress, newGame.maxScore, newGame.maxCount, { value: ethers.utils.parseEther(newGame.bet.toString()) })
      await transaction.wait()
      emit('created')
      emit('close')
    }
  }
  catch (error) {
    // TODO: Add toast to notify of error
    console.error(error)
  }
}
</script>

<template>
  <div class="rounded-lg bg-gray-100 p-6 relative dark:bg-true-gray-900">
    <div class="flex flex-wrap my-2 gap-4 lg:flex-nowrap">
      <Input
        v-model="newGame.challengerAddress"
        type="text"
        class="w-full"
        label="Challenger address"
      />
      <Input
        v-model="newGame.maxCount"
        type="number"
        class="w-1/3 lg:w-auto"
        label="Max turns"
      />
      <Input
        v-model="newGame.maxScore"
        type="number"
        class="w-1/3 lg:w-auto"
        label="Max Score"
      />
      <Input
        v-model="newGame.bet"
        type="number"
        class="w-1/4 lg:w-auto"
        label="ETH"
      />
    </div>
    <div class="flex gap-4 justify-center">
      <Button variant="primary" class="mt-4" @click="createGame">
        Create game
      </Button>
      <Button class="mt-4" @click="$emit('close')">
        Close
      </Button>
    </div>
  </div>
</template>
