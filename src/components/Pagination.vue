<template>
  <div class="pagination" data-testid="Pagination">
    <button
      title="Previous page"
      class="pagination-button"
      type="button"
      :disabled="page === 1"
      @click="prevPage"
    >
      Prev
    </button>
    <span class="pagination-current">{{ page }}</span>
    <button
      title="Next page"
      class="pagination-button"
      type="button"
      :disabled="page === lastPage"
      @click="nextPage"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from "vue";

  export default defineComponent({
    name: "Pagination",
    props: {
      prevPage: {
        type: Function as PropType<() => void>,
        required: true,
      },
      page: {
        type: Number,
        required: true,
      },
      nextPage: {
        type: Function as PropType<() => void>,
        required: true,
      },
      stocksLength: {
        type: Number,
        required: true,
      },
      items: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const lastPage = computed(() =>
        Math.ceil(props.stocksLength / props.items),
      );

      return { lastPage };
    },
  });
</script>

<style lang="scss">
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;

    &-button {
      background-color: var(--color-grey4);
      color: var(--color-white);
      font-size: var(--font-size-s);
      font-weight: var(--font-weight-medium);
      border-radius: var(--border-radius-medium);
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.2s;
      border: 1px solid var(--color-white);

      &:hover {
        background-color: var(--color-background5);
      }

      &:active {
        background-color: var(--color-background4);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        pointer-events: none;
      }
    }

    &-current {
      font-size: var(--font-size-s);
      font-weight: var(--font-weight-medium);
      margin: 0 1rem;
    }
  }
</style>
