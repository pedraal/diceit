<template>
  <article class="rounded-lg bg-gray-100 p-6 animate-pulse text-gray-300 relative dark:bg-true-gray-900  dark:text-gray-800">
    <div class="flex w-full bottom-0 left-0 z-0 absolute justify-center items-center">
      <Logo class="mx-auto my-8 top-0 fill-gray-300/25 w-48 dark:fill-gray-800/25" />
    </div>
    <div class="z-1 relative">
      <div class="flex min-h-8 justify-between">
        <h2 class="rounded-full font-bold bg-gray-300 text-xl dark:bg-gray-800">
          Game #123
        </h2>
        <div class="rounded-full bg-gray-300 h-6  w-6 dark:bg-gray-800 ">
        </div>
      </div>
    </div>

    <div class="z-1 relative">
      <p class="text-left">
        <span class="rounded-full bg-gray-300 dark:bg-gray-800">
          12 23123.0
        </span>
      </p>
    </div>

    <div class="rounded-full flex space-x-4 mt-4 min-h-15 z-1 relative justify-center items-center ">
      <Button class="bg-gray-300 dark:bg-gray-800">
        Draw
      </Button>
      <Button class="bg-gray-300 dark:bg-gray-800">
        Stop
      </Button>
    </div>
    <div class="flex mt-4 z-1 justify-between relative">
      <div class="p-4">
        <p class="mt-1">
          <span class="rounded-full bg-gray-300 dark:bg-gray-800">
            Owner
          </span>
        </p>
        <p class="mt-1">
          <span class="rounded-full bg-gray-300 dark:bg-gray-800">
            Count : 0
          </span>
        </p>
        <p class="mt-1">
          <span class="rounded-full bg-gray-300 dark:bg-gray-800">
            Score : 0
          </span>
        </p>
        <p class="mt-1">
          <span class="opacity-0">
            Score : 0
          </span>
        </p>
      </div>
      <div class="p-4">
        <p class="mt-1">
          <span class="rounded-full bg-gray-300 dark:bg-gray-800">
            Challenger
          </span>
        </p>
        <p class="mt-1">
          <span class="rounded-full bg-gray-300 dark:bg-gray-800">
            Count : 0
          </span>
        </p>
        <p class="mt-1">
          <span class="rounded-full bg-gray-300 dark:bg-gray-800">
            Score : 0
          </span>
        </p>
        <p class="mt-1">
          <span class="opacity-0">
            Score : 0
          </span>
        </p>
      </div>
    </div>
  </article>
</template>
