<script setup lang="ts">
import { diceItAddress } from '../../config'
import { isDark } from '~/logic'
</script>

<template>
  <div class="pt-6 sm:pt-8 lg:pt-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div class="flex flex-col mx-auto max-w-xl text-center items-center">
        <p class="font-semibold text-primary mb-4 md:text-lg md:mb-6 xl:text-xl dark:text-secondary">
          Live on Ropsten Testnet
        </p>

        <h1 class="font-bold text-heading mb-8 text-3xl sm:text-4xl md:mb-12 md:text-5xl dark:text-light">
          Revolutionary way to play dices
        </h1>

        <div class="flex flex-col w-full gap-2.5 sm:flex-row sm:justify-center">
          <router-link to="/app">
            <Button :variant="isDark ? 'primary' : 'secondary'">
              Go to app
            </Button>
          </router-link>

          <a :href="`https://ropsten.etherscan.io/address/${diceItAddress}`" target="_blank">
            <Button>See contract</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
