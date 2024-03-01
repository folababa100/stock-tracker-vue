import { ref, computed, onUnmounted } from "vue";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { Stock, SubscriptionType, WebSocketState } from "../types";

const WS_ENDPOINT = import.meta.env.VITE_WS_ENDPOINT as string;

type Subscription = Stock & {
  [key: string]: string | undefined;
  subscribe?: string;
  unsubscribe?: string;
};

export function useWebSocket() {
  const stocks = ref<Stock[]>([]);
  const value = ref("");
  const webSocketState = ref<WebSocketState>(WebSocketState.Open);
  let webSocketSubject: WebSocketSubject<Stock> | null = null;

  const updateWatchList = (stockData: Stock) => {
    const stockIndex = stocks.value.findIndex(
      (item) => item.isin === stockData.isin,
    );
    if (stockIndex !== -1) {
      stocks.value[stockIndex].price = stockData.price;
    } else {
      value.value = "";
      stocks.value = [stockData, ...stocks.value];
    }
  };

  const manageSubscription = (
    isin: string,
    mode: string = SubscriptionType.Subscribe,
  ) => {
    if (!webSocketSubject || webSocketSubject.closed) return;

    webSocketSubject.next({ [mode]: isin } as Subscription);

    if (mode === SubscriptionType.Unsubscribe) {
      stocks.value = stocks.value.filter((item) => item.isin !== isin);
    }
  };

  const connectWebSocket = () => {
    webSocketSubject = webSocket<Stock>(WS_ENDPOINT);
    webSocketSubject.subscribe({
      next: updateWatchList,
      error: () => (webSocketState.value = WebSocketState.Closed),
      complete: () => (webSocketState.value = WebSocketState.Closed),
    });
  };

  connectWebSocket();

  onUnmounted(() => {
    webSocketSubject?.unsubscribe();
    webSocketState.value = WebSocketState.Closed;
    webSocketSubject = null;
  });

  const isDuplicate = computed(() =>
    stocks.value.some(
      (item) => item.isin.toLowerCase() === value.value.toLowerCase(),
    ),
  );

  const reconnect = () => {
    if (!webSocketSubject || webSocketSubject.closed) {
      window.location.reload();
      return;
    }
    webSocketState.value = WebSocketState.Connecting;
    setTimeout(() => {
      connectWebSocket();
      stocks.value.forEach((item) => {
        webSocketSubject?.next({ subscribe: item.isin } as Subscription);
      });
      webSocketState.value = WebSocketState.Open;
    }, 5000);
  };

  const isReload = computed(() => !webSocketSubject || webSocketSubject.closed);

  return {
    stocks,
    webSocketState,
    subscribe: (isin: string) =>
      manageSubscription(isin, SubscriptionType.Subscribe),
    unsubscribe: (isin: string) =>
      manageSubscription(isin, SubscriptionType.Unsubscribe),
    value,
    setValue: (v: string) => (value.value = v),
    isDuplicate,
    reconnect,
    isReload,
  };
}
