import vue from 'vue';

const filter = {
  formatRMB(val) {
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    const head = val < 0 ? '（负数）' : '';
    val = Math.abs(val);
    var str = '';
    for (let i = 0; i < fraction.length; i++) {
      str += (digit[Math.floor(val * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    str = str || '整';
    val = Math.floor(val);
    for (let i = 0; i < unit[0].length && val > 0; i++) {
      var p = '';
      for (var j = 0; j < unit[1].length && val > 0; j++) {
        p = digit[val % 10] + unit[1][j] + p;
        val = Math.floor(val / 10);
      }
      str = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + str;
    }
    return head + str.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
  },
  formatCurrency(val){
    val = val.toString().replace(/\$|\,/g, '');
    if (isNaN(val)) {
      val = '0';
    }
    var sign = (val == (val = Math.abs(val)));
    val = Math.floor(val * 100 + 0.50000000001);
    var cents = val % 100;
    val = Math.floor(val / 100).toString();
    if (cents < 10) {
      cents = '0' + cents;
    }
    for (let i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
      val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
    }
    return (((sign) ? '' : '-') + val + '.' + cents);
  },
  toFixed(val, digits = 2){
    if (val !== '') {
      if (isNaN(val)) {
        return '';
      } else {
        return Number.parseFloat(val).toFixed(digits);
      }
    } else {
      return '';
    }

  }
};

Object.keys(filter).forEach(key => {
  vue.filter(key, filter[key]);
});
