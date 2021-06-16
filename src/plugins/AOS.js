import AOS from "aos";
import Vue from 'vue';

Vue.use(AOS);

 export default new AOS.init({
    duration: 600,
    once: true
});