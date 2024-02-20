<template>
  <form @submit.prevent="onSubmit" class="mt-4 mb-4 form-card" data-testid="form">
    <div class="flex flex-align-end gap-10">
      <TextField
          placeholder="Enter ISIN"
          id="isin"
          :value="isConnected ? value : ''"
          @update:value="setValue"
          :maxlength="maxLength"
          label="ISIN"
          :disabled="!isConnected"
      />
      <Button
          type="submit"
          title="Subscribe"
          :disabled="!!error || value?.length !== maxLength || !isConnected"
      >
        <FaRegBell size="20" />
        <span class="ml-2 hidden-xs">Subscribe</span>
      </Button>
    </div>
    <p v-if="error" class="error-text">{{ error }}</p>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../Button/Button.vue';
import TextField from './TextField/TextField.vue';

export default defineComponent({
  name: 'Form',
  components: {
    Button,
    TextField,
    // FaRegBell: You need to find a Vue equivalent or use a different approach
  },
  props: {
    value: String,
    error: String,
    maxLength: Number,
    isConnected: Boolean,
  },
  emits: ['update:value', 'submit'],
  methods: {
    setValue(value: string) {
      this.$emit('update:value', value);
    },
    onSubmit(e: Event) {
      this.$emit('submit', e);
    },
  },
});
</script>

<style scoped>
.form-card {
  background-color: var(--color-white);
  color: var(--color-black);
  padding: 1rem;
  border-radius: 0.5rem;
}

.error-text {
  color: var(--color-error);
  margin-bottom: 0;
  margin-top: 0.25rem;
  font-size: var(--font-size-s);
}
</style>
