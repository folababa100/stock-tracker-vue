<template>
  <header class="header container flex-justify-end flex-center">
    <button
        type="button"
        class="button-theme flex flex-center"
        aria-label="Toggle theme"
        title="Toggle theme"
        @click="toggleTheme"
    >
      <component
          :is="iconComponent"
          data-testid="icon"
          size="30"
          :color="iconColor"
      />
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
// You'll need to find Vue equivalents for these icons or use a Vue-compatible icon library
import MdOutlineLightMode from 'vue-icons/icon-name'; // Placeholder import, adjust based on actual import path
import MdOutlineNightlight from 'vue-icons/icon-name'; // Placeholder import, adjust based on actual import path

export default defineComponent({
  name: 'Header',
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
  emits: ['toggleTheme'],
  setup(props, { emit }) {
    const toggleTheme = () => {
      emit('toggleTheme');
    };

    const isLight = computed(() => props.theme === 'light');
    const iconComponent = computed(() =>
        isLight.value ? MdOutlineLightMode : MdOutlineNightlight
    );
    const iconColor = computed(() => (isLight.value ? '#212121' : '#fff'));

    return {
      toggleTheme,
      isLight,
      iconComponent,
      iconColor,
    };
  },
});
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  background-color: var(--color-background);
  z-index: 1000;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  max-width: var(--max-width);
  border-bottom: 1px solid var(--color-white);
  transition: all 0.3s ease;
}

.button-theme {
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: var(--border-radius-circle);
  width: 40px;
  height: 40px;
  background-color: transparent;
  transition: background-color 0.2s ease;
}

.button-theme:hover {
  background-color: var(--color-background3);
}

.button-theme:active {
  background-color: var(--color-background4);
}
</style>
