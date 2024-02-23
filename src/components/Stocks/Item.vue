<template>
  <div class="StockItem">
    <div class="StockItem-data">
      <span class="StockItem-isin">
        {{ currentIndex }}: {{ isin }}
      </span>
      <span class="StockItem-price">{{ price }}</span>
    </div>
    <Button
        @click="unsubscribe"
        :title="`Unsubscribe from ${isin}`"
        aria-label="`Unsubscribe from ${isin}`"
        variant="secondary"
        :disabled="!isConnected"
    >
      <template #default>
        <FontAwesomeIcon :icon="fa" />
        <span class="ml-2 hidden-xs">Unsubscribe</span>
      </template>
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'components/Button.vue';
import { FontAwesomeIcon, fa } from '@fortawesome/vue-fontawesome';

export default defineComponent({
  name: 'StockItem',
  components: {
    Button,
    FontAwesomeIcon,
  },
  props: {
    isin: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
    unsubscribe: Function,
    isConnected: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped>
.StockItem {
  display: flex;
  justify-content: space-between;
  background-color: var(--color-white);
  color: var(--color-black);
  padding: 1rem;
  border-radius: var(--border-radius-large);
  margin-bottom: 1rem;
}

.StockItem-data {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-start;
}

.StockItem-isin {
  font-size: var(--font-size-xs);
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--color-grey8);
}

.StockItem-price {
  font-size: var(--font-size-l);
  font-weight: 600;
}

@media (min-width: 576px) {
  .StockItem-isin {
    font-size: var(--font-size-s);
  }

  .StockItem-price {
    font-size: var(--font-size-xl);
  }
}
</style>
