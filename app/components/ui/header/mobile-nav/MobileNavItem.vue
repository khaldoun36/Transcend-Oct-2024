<template>
  <li>
    <PopoverButton class="block py-2">
      <slot />
    </PopoverButton>
  </li>
</template>

<script setup>
import { PopoverButton } from "@headlessui/vue";
</script>

<style scoped></style>
