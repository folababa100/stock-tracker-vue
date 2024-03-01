import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
