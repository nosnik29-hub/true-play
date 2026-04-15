import "ant-design-vue/dist/reset.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import "vuefinder/dist/style.css";
import "./assets/main.css";
import "./assets/sass/main.sass";
import "vue3-emoji-picker/css";

import i18n from "@/i18n";
import "@vuepic/vue-datepicker/dist/main.css";
import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";
// import "vuefinder/dist/style.css";
// import VueFinder from "vuefinder/dist/vuefinder";
import Antd from "ant-design-vue";
import VueFinder from "vuefinder/dist/vuefinder";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from '@primeuix/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(Antd);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(VueFinder as any);
app.component("v-select", VSelect);
// app.component("VueFinder", VueFinder);
//app.component("Treeselect", VueTreeselect.Treeselect);

app.mount("#app");
