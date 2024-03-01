import { computed, ref } from "vue";

const ITEMS_PER_PAGE = 1;

export function usePagination(totalItems: number) {
  const page = ref(1);

  const totalPages = computed(() => {
    return Math.ceil(totalItems / ITEMS_PER_PAGE);
  });

  const setCurrentPage = (newPage: number) => {
    page.value = Math.max(1, Math.min(newPage, totalPages.value));
  };

  const nextPage = () => {
    console.log("nextPage");
    setCurrentPage(page.value + 1);
  };

  const prevPage = () => {
    setCurrentPage(page.value - 1);
  };

  // Vue's watchEffect is used to reactively perform side effects when dependencies change.
  // watchEffect(() => {
  //   // Adjust the current page if it exceeds the total pages due to a decrease in totalItems.
  //   if (totalItems > 0 && page.value > totalPages.value) {
  //     setCurrentPage(totalPages.value);
  //   }
  // });

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
