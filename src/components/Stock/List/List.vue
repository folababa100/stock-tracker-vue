<template>
  <div>
    <div v-if="stocksLength === 0" class="text-center">
      <!-- Use a Vue-compatible icon library or component for FaRegSmile -->
      <FaRegSmile data-testid="FaRegSmile" size="35" />
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
import Item from '../Item.vue'; // Adjust the import path as needed
import Pagination from 'components/Pagination.vue'; // Adjust the import path as needed
import usePagination from 'hooks/usePagination'; // Adjust based on your Vue composable

export default defineComponent({
  name: 'List',
  components: { Item, Pagination, FaRegSmile }, // Ensure FaRegSmile is imported correctly
  props: {
    stocks: Array as () => Subscription[],
    unsubscribe: Function as () => (isin: string) => void,
    isConnected: Boolean,
  },
  setup(props) {
    // Adapt usePagination hook logic into Vue's Composition API
    const { stocks } = toRefs(props);
    const { items, page, nextPage, prevPage, startItem, endItem } = usePagination(stocks.value.length);

    const currentStocks = computed(() => stocks.value.slice(startItem.value, endItem.value));
    const stocksLength = computed(() => stocks.value.length);

    return {
      currentStocks,
      page,
      nextPage,
      prevPage,
      items,
      stocksLength,
    };
  },
});
</script>
