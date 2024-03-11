<template>
  <form
    class="mt-4 mb-4 form-card"
    data-testid="form"
    @submit.prevent="onSubmit"
  >
    <div class="flex flex-align-end gap-10">
      <TextField
        id="isin"
        placeholder="Enter ISIN"
        :value="isConnected ? value : ''"
        :maxlength="maxLength"
        label="ISIN"
        :disabled="!isConnected"
        @update:value="setValue"
      />
      <Button
        type="submit"
        title="Subscribe"
        :disabled="!!error || value?.length !== maxLength || !isConnected"
      >
        <v-icon name="fa-regular-bell" />
      </Button>
    </div>
    <p v-if="error" class="error-text">{{ error }}</p>
  </form>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue";
  import Button from "./Button.vue";
  import TextField from "./Form/TextField.vue";

  export default defineComponent({
    name: "Form",
    components: {
      Button,
      TextField,
    },
    props: {
      value: String,
      error: String,
      maxLength: Number,
      isConnected: Boolean,
      setValue: {
        type: Function as PropType<(value: string) => void>,
        required: false,
      },
      onSubmit: {
        type: Function as PropType<() => void>,
        required: false,
      },
    },
  });
</script>

<style lang="scss">
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
