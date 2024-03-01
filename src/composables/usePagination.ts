import { computed, ComputedRef, ref, watchEffect } from "vue";

const ITEMS_PER_PAGE = 1;

export function usePagination(totalItems: ComputedRef<number>) {
  const page = ref(1);

  const totalPages = computed(() => {
    return Math.ceil(totalItems.value / ITEMS_PER_PAGE);
  });

  const setCurrentPage = (newPage: number) => {
    page.value = Math.max(1, Math.min(newPage, totalPages.value));
  };

  const nextPage = () => {
    setCurrentPage(page.value + 1);
  };

  const prevPage = () => {
    setCurrentPage(page.value - 1);
  };

  watchEffect(() => {
    // Adjust the current page if it exceeds the total pages due to a decrease in totalItems.
    if (totalItems.value > 0 && page.value > totalPages.value) {
      setCurrentPage(totalPages.value);
    }
  });

  const startItem = computed(() => (page.value - 1) * ITEMS_PER_PAGE);
  const endItem = computed(() => startItem.value + ITEMS_PER_PAGE);

  return {
    page,
    setPage: setCurrentPage,
    nextPage,
    prevPage,
    totalPages,
    startItem,
    endItem,
    items: ITEMS_PER_PAGE,
  };
}
