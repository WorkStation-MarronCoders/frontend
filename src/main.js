import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import Card from 'primevue/card';
import FloatLabel from 'primevue/floatlabel';
import SelectButton  from 'primevue/selectbutton';
import i18n from './i18n'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Divider from 'primevue/divider';
import Toolbar from 'primevue/toolbar';
import IconField from 'primevue/iconfield';
import Paginator from 'primevue/paginator';
import InputIcon from 'primevue/inputicon';
import {Avatar} from "primevue";
import SpeedDial from 'primevue/speeddial';

import 'primeicons/primeicons.css'

import router from './router'


const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.component('pv-button', Button);
app.component('pv-paginator', Paginator);
app.component('pv-float-label', FloatLabel); 
app.component('pv-input-text', InputText);
app.component('pv-card', Card);
app.component('select-button', SelectButton);
app.component('pv-divider', Divider);
app.component('pv-toolbar', Toolbar);
app.component('pv-icon-field', IconField);
app.component('pv-input-icon', InputIcon);
app.component('pv-avatar', Avatar);
app.component('pv-speed-dial', SpeedDial);
app.use(i18n);
app.use(router);
app.mount('#app');
