<template>
  <div class="py-6 sm:py-8 lg:py-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div class="mb-10 md:mb-16">
        <h2 class="font-bold text-center mb-4 text-2xl md:mb-6 lg:text-3xl">
          How To Play
        </h2>

        <p class="mx-auto max-w-screen-md text-center text-muted md:text-lg">
          <strong>DiceIt</strong> is unexpectedly a dice game, where two players roll the dice after each other and the player that get the closest of the max score without going above wins.
        </p>
      </div>

      <div class="grid gap-8 sm:grid-cols-2 md:gap-12 xl:gap-16 xl:grid-cols-3">
        <Feature class="flex gap-4 md:gap-6">
          <template #icon>
            <carbon-network-3 />
          </template>
          <template #title>
            Create
          </template>
          <template #caption>
            Create a game by sending your challenger address, the max score, the max round of the game and your bet to the DiceIt smart contract.
          </template>
        </Feature>
        <Feature class="flex gap-4 md:gap-6">
          <template #icon>
            <carbon-login />
          </template>
          <template #title>
            Register
          </template>
          <template #caption>
            The challenger sends his bet to the smart contract. It as to be the same amount the owner bet.
          </template>
        </Feature>
        <Feature class="flex gap-4 md:gap-6">
          <template #icon>
            <carbon-shuffle />
          </template>
          <template #title>
            Play
          </template>
          <template #caption>
            Each players roll the dice after each other and can stop whenever they want.
          </template>
        </Feature>
        <Feature class="flex gap-4 md:gap-6">
          <template #icon>
            <carbon-warning />
          </template>
          <template #title>
            Carefull
          </template>
          <template #caption>
            You have a limited number of rolls for each game and if you go beyond the max score, you loose !
          </template>
        </Feature>
        <Feature class="flex gap-4 md:gap-6">
          <template #icon>
            <carbon-currency />
          </template>
          <template #title>
            Claim
          </template>
          <template #caption>
            Withdraw your bearly deserved coins from the game you won composed of your opponent's bet.
          </template>
        </Feature>
        <Feature class="flex gap-4 md:gap-6">
          <template #icon>
            <carbon-edt-loop />
          </template>
          <template #title>
            Repeat
          </template>
          <template #caption>
            Get caught in a storm of fun and hapiness and start unconsciously spending all your ethers in gaz fee.
          </template>
        </Feature>
      </div>
    </div>
  </div>
</template>
