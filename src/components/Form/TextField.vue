<template>
  <div class="form-control">
    <label :for="id">{{ label }}</label>
    <input
        :id="id"
        :name="id"
        :value="value"
        :maxlength="maxlength"
        @input="$emit('update:value', $event?.target?.value)"
        required
        v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextField',
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    maxlength: Number,
  },
  emits: ['update:value'],
});
</script>

<style scoped>
.form-control {
  display: flex;
  flex-direction: column;
  width: calc(100% - 55px);

  label {
    font-size: var(--font-size-s);
    line-height: 1rem;
    margin-bottom: 0.5rem;
  }

  input {
    border: none;
    padding: 0.75rem 1rem;
    line-height: 1.375rem;
    font-family: inherit;
    font-size: var(--font-size-m);
    background-color: var(--color-black);
    border-radius: var(--border-radius-large);
    color: var(--color-white);
    transition: 0.2s;

    &:focus {
      outline: none;
      border-color: var(--color-white);
      color: var(--color-white);
      background-color: var(--color-black1);
    }

    &::placeholder {
      color: var(--font-size-s);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
}

</style>
