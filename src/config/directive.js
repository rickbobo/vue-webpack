import vue from 'vue';

const FOCUS = 'focus';

vue.directive(FOCUS, {
  inserted: function (el) {
    el.focus();
  }
});
