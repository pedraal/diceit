<template>
  <section class="flex flex-col gap-6 justify-between sm:gap-10 md:gap-16 lg:flex-row">
    <div class="flex flex-col justify-center items-center sm:text-center lg:text-left lg:py-12 lg:items-start xl:py-24 xl:w-5/12">
      <h1 class="font-bold mb-8 text-black-800 text-4xl sm:text-5xl md:mb-12 md:text-6xl">
        Enjoy the future of dice games
      </h1>

      <p class="leading-relaxed mb-8 text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
        Pay outrageously high gaz fee to experience the greatness of a super high tech dice game. Duel your friends to DiceIt and share a moment of true waste of decentralized money !
      </p>

      <router-link to="/app" class="flex mx-auto relative justify-center items-center group">
        <div class="bg-gradient-to-r from-primary to-secondary rounded-full opacity-75 -inset-0.5 transition animate-tilt duration-1000 absolute filter blur group-hover:opacity-100 group-hover:duration-200"></div>
        <button class="divide-x rounded-full flex divide-gray-600 bg-gray-200 leading-none py-4 px-8 relative items-center dark:bg-black">
          <span class="flex space-x-5 items-center">
            <!-- <carbon-play-filled class="h-6 w-6 dark:text-primary" /> -->
            <Logo class="fill-secondary w-6 dark:fill-primary"></Logo>

            <span class="pr-6 text-gray-800 dark:text-gray-100">Beta release on Ropsten Testnet</span>
          </span>
          <span class="pl-6 transition duration-200 dark:text-indigo-400 group-hover:text-secondary dark:group-hover:text-gray-100">Roll the dice &rarr;</span>
        </button>
      </router-link>
    </div>

    <div class="rounded-lg bg-gray-100 h-48 shadow-lg overflow-hidden lg:h-auto xl:w-5/12">
      <img src="https://images.unsplash.com/photo-1620204082158-ed7780a38d4c?auto=format&q=75&fit=crop&w=1000" loading="lazy" alt="Photo by Fakurian Design" class="h-full object-cover object-center w-full">
    </div>
  </section>
</template>
