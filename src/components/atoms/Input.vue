<script setup lang="ts">
defineProps<{ modelValue: string | number; placeholder?: string; label: string; type: string }>()
const emit = defineEmits(['update:modelValue'])

function updateValue(event: Event) {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}

</script>

<template>
  <div class="text-left">
    <label class="pl-1">{{ label }}</label>
    <input
      :type="type"
      class="bg-transparent border rounded-lg border-gray-500 w-full py-2 px-4"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>
