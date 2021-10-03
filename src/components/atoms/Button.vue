<script setup lang="ts">
const props = defineProps<{disabled?: boolean; variant?: 'default' | 'primary' | 'secondary' | 'danger'}>()

const classes = {
  default: 'bg-gray-300 dark:bg-black hover:bg-gray-400 dark:hover:bg-gray-700',
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
  danger: 'bg-red-600 text-white',
}
</script>

<template>
  <button
    class="rounded-full  py-2 px-5 transition-all duration-200  hover:shadow-lg focus:outline-none active:outline-none disabled:cursor-not-allowed disabled:opacity-55"
    :class="classes[props.variant || 'default']"
    :disabled="props.disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
</style>
