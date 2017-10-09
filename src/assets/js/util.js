import qs from 'qs';

export default {

  /**
   * 处理提交数据
   * @param data
   */
  stringify(data) {
    return qs.stringify(data);
  },

  /**
   * 复制属性方法
   * @param target
   * @param source
   * @returns {{}}
   */
  copyProperties(target = {}, source = {}) {
    Object.keys(target).forEach(e => {
      target[e] = (typeof source[e] !== 'undefined' && source[e] !== '') ? source[e] : target[e];
    });
    return target;
  },

  /**
   * 获取一个随机数
   * @param min 最小值
   * @param max 最大值
   * @returns {number}
   */
  getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },

  /**
   * 获取一个随机颜色
   * @param min 最小值
   * @param max 最大值
   * @returns {string}
   */
  getRandomColor(min, max) {
    let r = this.getRandomNum(min, max);
    let g = this.getRandomNum(min, max);
    let b = this.getRandomNum(min, max);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  },

  /**
   * 判断是否含有中文
   * @param val
   * @returns {boolean}
   */
  isContainChinese(val) {
    var reg = /[\u4e00-\u9fa5]/;
    return reg.test(val);
  },

  /**
   * 下载文件
   * @param url
   */
  downloadFile(url, fileName = '') {
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  }
}
