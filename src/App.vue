<template>
  <div>
    <a href="#main" class="skip-link">Skip to content</a>
    <Header :toggle-theme="toggleTheme" :theme="theme" />
    <main id="main" class="container">
      <h1>My stock tracker.</h1>
      <p>Get the latest updates on the stocks you are interested in.</p>
      <p>
        Enter the ISIN code of the stock you want to track and click
        subscribe.<br />
        Example: DE000BASF111
      </p>
      <Form
          :value="value"
          :set-value="setValue"
          :on-submit="onSubscribe"
          :error="error"
          :max-length="maxLength"
          :is-connected="isConnected"
      />
      <Alert
          :show="!isConnected"
          :on-click="reconnect"
          :is-connecting="isConnecting"
      />
      <Stocks
          :stocks="stocks"
          :unsubscribe="unsubscribe"
          :is-connected="isConnected"
      />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Alert from '@/components/Alert.vue';
import Form from '@/components/Form.vue';
import Stocks from '@/components/Stocks/List.vue';

import { useStock, useTheme } from '@/composables';
import './styles/normalize.css';
import './App.css';
import './styles/utility.scss';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Stocks,
    Alert,
    Form,
  },
  setup() {
    const { theme, toggleTheme } = useTheme();
    const {
      value,
      setValue,
      stocks,
      error,
      onSubscribe,
      unsubscribe,
      maxLength,
      reconnect,
      isConnected,
      isConnecting,
    } = useStock();

    return {
      theme,
      toggleTheme,
      value,
      setValue,
      stocks,
      error,
      onSubscribe,
      unsubscribe,
      maxLength,
      reconnect,
      isConnected,
      isConnecting,
    };
  },
});
</script>
