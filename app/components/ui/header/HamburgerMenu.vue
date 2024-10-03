<template>
  <button class="menu-container md:hidden" :class="{ active: isMenuOpen }" @click="toggleMenu">
    <div class="line line-1">
      <div class="line-inner line-inner-1"></div>
    </div>
    <div class="line line-2">
      <div class="line-inner line-inner-2"></div>
    </div>
  </button>
</template>

<script setup>
const { isMenuOpen = false } = defineProps({
  isMenuOpen: {
    type: Boolean,
  },
});

const emit = defineEmits(["toggleMenu"]);

const toggleMenu = () => {
  // isMenuOpen.value = !isMenuOpen.value;
  emit("toggleMenu");
};
</script>

<style scoped>
.menu-container {
  height: 40px;
  width: 40px;
  cursor: pointer;
  position: relative;
}

.menu-container .line {
  height: 30px;
  width: 30px;
  position: absolute;
  left: 4px;
  top: 4px;
  transition: transform 300ms ease-in-out;
}

.menu-container .line-inner {
  height: 4px;
  width: 32px;
  background: theme("colors.neutral.500");
  border-radius: 4px;
  position: absolute;
  transition: transform 200ms ease-in-out;
  transition-delay: 200ms;
}

.menu-container .line-inner-1 {
  top: 12px;
  transform: translateY(-5px);
}

.menu-container .line-inner-2 {
  bottom: 12px;
  transform: translateY(5px);
}

.menu-container.active .line-1 {
  transform: rotateZ(45deg);
}

.menu-container.active .line-2 {
  transform: rotateZ(-45deg);
}

.menu-container.active .line-inner {
  transform: none;
  transition: transform 200ms ease-in-out;
}

.menu-container.active .line {
  transition-delay: 200ms;
}
</style>
