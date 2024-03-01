import { computed } from "vue";
import { useWebSocket } from "./useWebSocket";
import { WebSocketState } from "../types";

const MAX_LENGTH = 12;
const REGEX = new RegExp(/[a-zA-Z]{2}[a-zA-Z0-9]{9}\d/);

export function useStock() {
  const { stocks, subscribe, isDuplicate, webSocketState, value, ...rest } =
    useWebSocket();

  const isInvalid = computed(
    () => value.value.length === MAX_LENGTH && !REGEX.test(value.value),
  );

  const onSubscribe = (e: Event) => {
    e.preventDefault();
    if (
      isInvalid.value ||
      isDuplicate.value ||
      value.value.length !== MAX_LENGTH
    ) {
      return;
    }
    subscribe(value.value);
  };

  const isConnected = computed(
    () => webSocketState.value === WebSocketState.Open,
  );
  const isConnecting = computed(
    () => webSocketState.value === WebSocketState.Connecting,
  );

  const error = computed(() => {
    if (isInvalid.value) {
      return "Incorrect ISIN code. Please try again.";
    } else if (isDuplicate.value) {
      return "Already subscribed, please try another ISIN code.";
    } else if (!isConnected.value) {
      return "Please reconnect to track your stocks.";
    }
    return "";
  });

  return {
    stocks,
    onSubscribe,
    maxLength: MAX_LENGTH,
    isConnected,
    isConnecting,
    error,
    value,
    ...rest,
  };
}
