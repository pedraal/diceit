<script setup lang="ts">
import { isDark } from '~/logic'
</script>

<template>
  <div class="py-6 sm:py-8 lg:py-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div class="flex flex-col items-center">
        <p class="font-semibold text-sm text-secondary mb-4 uppercase dark:text-primary">
          That’s a 404
        </p>
        <h1 class="font-bold text-center mb-2 text-2xl md:text-3xl">
          Page not found
        </h1>

        <p class="max-w-screen-md text-center text-muted mb-12 md:text-lg">
          The page you’re looking for doesn’t exist.
        </p>

        <router-link to="/">
          <Button :variant="isDark ? 'primary' : 'secondary'">
            Go home
          </Button>
        </router-link>
      </div>
    </div>
  </div>
</template>
