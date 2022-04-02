import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";

// CK editor
import CKEditor from "@ckeditor/ckeditor5-vue";

// 3rd parties libs
import Antd from "ant-design-vue";

// css
import "./tailwind.css";
// import './styles/app.css';

import "ant-design-vue/dist/antd.css";

// Components
import App from "./App.vue";

// App Routes
import router from "@/router";

// Store
import store from "./store";

// i18n
import { createI18n } from "./i18n/i18n";
const i18n = createI18n();

// Global Styles
import "./styles/app.scss";

const app = createApp(App);
app.config.productionTip = false;

app.use(router);
app.use(store);
app.use(i18n);
app.use(Antd);
app.use(CKEditor);
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios);

router.isReady().then(() => {
  app.mount("#app");
});
