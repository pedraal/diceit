<script setup lang="ts">
const props = defineProps<{content: string; pinned?: 'left' | 'right'}>()
</script>

<template>
  <div class="group relative">
    <span
      class="rounded-lg bg-black/50 text-sm py-2 px-4 -top-10 absolute hidden group-hover:block"
      :class="{ '-right-0': props.pinned === 'right' }"
    >{{ props.content }}</span>
    <slot></slot>
  </div>
</template>
