<script setup lang="ts">
import { ethers } from 'ethers'
import { isDark, toggleDark } from '~/logic'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

const connectedToMetamask = computed(() => {
  return window.ethereum.selectedAddress && window.ethereum.selectedAddress
})

const routeIsApp = computed(() => {
  return window.location.pathname.includes('app')
})

async function connectToMetamask() {
  await window.ethereum.request({ method: 'eth_requestAccounts' })
  await signer.getAddress()
  window.location.reload()
}
</script>

<template>
  <header class="flex py-4 justify-between items-center md:py-8">
    <a href="/" class="font-bold text-black-800 text-2xl gap-2.5 inline-flex items-center md:text-3xl dark:text-gray-200" aria-label="logo">
      <Logo class="fill-secondary w-6 dark:fill-primary"></Logo>
      DiceIt
    </a>

    <div class="flex gap-3 items-center">
      <button class="mx-2 !outline-none" @click="toggleDark()">
        <carbon-moon v-if="isDark" class="hover:text-secondary" />
        <carbon-sun v-else class="hover:text-primary" />
      </button>
      <router-link v-if="connectedToMetamask && !routeIsApp" to="/app">
        <Button :variant="isDark ? 'primary' : 'secondary'">
          Launch app
        </Button>
      </router-link>
      <Button v-else-if="!connectedToMetamask" variant="secondary" @click="connectToMetamask">
        <carbon-wallet class="inline" />
        Connect to Metamask
      </Button>
    </div>
  </header>
</template>
