<template>
  <div>
    <div v-if="stocksLength === 0" class="text-center">
      <font-awesome-icon :icon="faSmile" size="3x" />
      <p class="mt-2">You are not tracking any stocks yet.</p>
    </div>
    <div v-for="(stock, index) in currentStocks" :key="stock.isin" data-testid="Item">
      <Item
        :current-index="(page - 1) * items + index + 1"
        :isin="stock.isin"
        :price="stock.price"
        :unsubscribe="() => unsubscribe(stock.isin)"
        :is-connected="isConnected"
      />
    </div>
    <Pagination
      v-if="stocksLength > items"
      :prev-page="prevPage"
      :page="page"
      :next-page="nextPage"
      :stocks-length="stocksLength"
      :items="items"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue';
import Item from 'components/Stocks/Item.vue';
import Pagination from 'components/Pagination.vue';
import { usePagination } from 'composables';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

interface Subscription {
  isin: string;
  price: number;
}

export default defineComponent({
  name: 'List',
  components: { Item, Pagination },
  props: {
    stocks: {
      type: Array as () => Subscription[],
      required: true,
    },
    unsubscribe: {
      type: Function,
      required: true,
    },
    isConnected: {
      type: Boolean,
      required: true,
    }
  },
  setup(props) {
    const { stocks, unsubscribe, isConnected } = toRefs(props);
    const { items, page, nextPage, prevPage, startItem, endItem } = usePagination(computed(() => stocks.value.length));

    const currentStocks = computed(() => stocks.value.slice(startItem.value, endItem.value));
    const stocksLength = computed(() => stocks.value.length);

    return {
      currentStocks,
      page,
      nextPage,
      prevPage,
      items,
      stocksLength,
      faSmile,
      unsubscribe,
      isConnected,
    };
  },
});
</script>
