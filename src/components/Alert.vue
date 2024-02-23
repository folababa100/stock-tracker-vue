<template>
  <div v-if="show" :class="`alert alert-${type}`">
    <div class="alert-container">
      {{ message }}
      <Button
          variant="secondary"
          class="btn-sm mt-2"
          :disabled="isConnecting"
          @click="onClick"
      >
        Reconnect
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from './Button.vue';

export default defineComponent({
  name: 'Alert',
  components: {
    Button,
  },
  props: {
    show: Boolean,
    type: {
      type: String as PropType<'warning'>, // Add other types as needed
      default: 'warning',
    },
    isConnecting: Boolean,
    onClick: Function as PropType<() => void>,
  },
  computed: {
    message(): string {
      return this.isConnecting
          ? 'Connecting...'
          : 'Oops! Something went wrong. Please connect again.';
    },
  },
});
</script>

<style lang="scss">
.alert {
  padding: 15px 60px 15px 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  position: relative;

  &-warning {
    color: var(--color-warning);
    background-color: var(--color-warning-bg);
    border-color: var(--color-warning-border);
  }
}

</style>
