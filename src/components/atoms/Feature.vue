<template>
  <div>
    <div class="bg-secondary rounded-lg flex flex-shrink-0 h-12 shadow-lg text-white w-12 justify-center items-center md:rounded-xl md:h-14 md:w-14 dark:bg-primary">
      <slot name="icon"></slot>
    </div>
    <div>
      <h3 class="font-semibold text-lg mb-2 md:text-xl">
        <slot name="title"></slot>
      </h3>
      <p class="text-muted mb-2">
        <slot name="caption"></slot>
      </p>
    <!-- <a href="#" class="font-bold transition text-indigo-500 duration-100 hover:text-indigo-600 active:text-indigo-700">More</a> -->
    </div>
  </div>
</template>
