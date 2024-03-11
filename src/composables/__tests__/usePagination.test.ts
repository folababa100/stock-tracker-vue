import { describe, expect, it } from "vitest";
import { ref } from "vue";
import { usePagination } from "../usePagination";

const ITEMS_PER_PAGE = 5;

describe("usePagination", () => {
  it("initializes correctly", () => {
    const totalItems = ref(20);
    const pagination = usePagination(totalItems);

    expect(pagination.page.value).toBe(1);
  });

  it("navigates to next and previous pages", async () => {
    const totalItems = ref(20);
    const pagination = usePagination(totalItems);

    pagination.nextPage();
    expect(pagination.page.value).toBe(2);

    pagination.prevPage();
    expect(pagination.page.value).toBe(1);
  });

  it("sets current page correctly", async () => {
    const totalItems = ref(20);
    const pagination = usePagination(totalItems);

    pagination.setPage(3);
    expect(pagination.page.value).toBe(3);
  });

  it("does not navigate beyond boundaries", async () => {
    const totalItems = ref(20);
    const pagination = usePagination(totalItems);

    pagination.setPage(0);
    expect(pagination.page.value).toBe(1);

    const totalPages = Math.ceil(totalItems.value / ITEMS_PER_PAGE);
    pagination.setPage(totalPages + 1);
    expect(pagination.page.value).toBe(totalPages);
  });

  it("adjusts page if out of bounds due to item count change", async () => {
    const totalItems = ref(20);
    const pagination = usePagination(totalItems);

    pagination.setPage(20);
    const expectedTotalPages = Math.ceil(totalItems.value / ITEMS_PER_PAGE);
    expect(pagination.page.value).toBeLessThanOrEqual(expectedTotalPages);
  });
});
