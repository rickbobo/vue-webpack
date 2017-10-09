import vue from 'vue';

const component = {};

Object.keys(component).forEach((key) => {
  var name = _.upperFirst(key);
  vue.component(`v${name}`, () => import(component[key] + '.vue'));
});
