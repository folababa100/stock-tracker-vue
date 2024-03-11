import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { FaRegularBell } from "oh-vue-icons/icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

// eslint-disable-next-line
app.component("font-awesome-icon", FontAwesomeIcon);
// eslint-disable-next-line
app.component("v-icon", OhVueIcon);
addIcons(FaRegularBell);

app.mount("#app");
