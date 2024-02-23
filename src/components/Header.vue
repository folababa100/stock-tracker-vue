<template>
  <header class="header container flex-justify-end flex-center">
    <button
      type="button"
      class="button-theme flex flex-center"
      aria-label="Toggle theme"
      title="Toggle theme"
      @click="toggleTheme"
    >
      <font-awesome-icon
        :icon="iconComponent"
        :style="{ color: iconColor }"
      />
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export default defineComponent({
  name: 'Header',
  props: {
    theme: {
      type: String,
      required: true,
    },
    toggleTheme: {
      type: Function,
      required: true,
    },
  },
  emits: ['toggleTheme'],
  setup({ toggleTheme, theme }) {
    const toggle = () => {
      toggleTheme();
    };

    console.log('theme', theme);

    const isLight = computed(() => theme === 'light');
    const iconComponent = computed(() => {
      return isLight.value ? faMoon : faSun;
    });
    const iconColor = computed(() => (isLight.value ? '#212121' : '#fff'));

    return {
      toggleTheme: toggle,
      isLight,
      iconComponent,
      iconColor,
    };
  },
});
</script>

<style>
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

  .header-logo {
    width: 60px;
  }
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

  &:hover {
    background-color: var(--color-background3);
  }

  &:active {
    background-color: var(--color-background4);
  }
}

</style>
