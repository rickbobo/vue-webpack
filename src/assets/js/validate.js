export default {

  /**
   * 校验登录名是否合法
   * @param val
   * @returns {boolean}
   */
  validateUserName(val) {
    var reg = /^[a-zA-z0-9]{2,14}$/;
    return reg.test(val);
  },

  /**
   * 校验登录密码是否合法
   * @param val
   * @returns {boolean}
   */
  validatePassword(val) {
    var reg = /^[\w\s~!@%#$^*+='?\-\\/(){}\[\],.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{6,20}$/;
    return reg.test(val);
  },

  /**
   * 校验公司名称是否合法
   * @param val
   * @returns {boolean}
   */
  validateCompanyName(val) {
    var reg = /^\s*[\u4e00-\u9fa5\w\s~`!@#$^*\(\)_\-+\[\];,.?:\{\}|~·！@#￥……*（）——+\{}|：》？【】、；，。]{1,50}\s*$/;
    return reg.test(val);
  },

  /**
   * 校验购买方名称是否合法
   * @param val
   * @returns {boolean}
   */
  validateBuyerName(val) {
    var reg = /^\s*[\u4e00-\u9fa5\w\s~`!@#$^*\(\)_+\[\];,.?:\{\}|~·！@#￥……*（）——+\{}|：》？【】、；，。]{1,50}\s*$/;
    return reg.test(val);
  },

  /**
   * 校验地址是否合法
   * @param val
   * @returns {boolean}
   */
  validateAddress(val){
    var reg = /^\s*[\u4e00-\u9fa5\w\s~`!@#$^*\(\)_\-+\[\];,.?:\{\}|~·！@#￥……*（）——+\{}|：》？【】、；，。]{1,100}\s*$/;
    return reg.test(val);
  },

  /**
   * 校验开户行是否合法
   * @param val
   * @returns {boolean}
   */
  validateBankName(val){
    var reg = /^[-_——#()（）、，0-9a-zA-Z\u4e00-\u9fa5]{1,50}$/;
    return reg.test(val);
  },

  /**
   * 校验银行账号是否合法
   * @param val
   * @returns {boolean}
   */
  validateBankAccount(val){
    var reg = /^\d{8,30}$/;
    return reg.test(val);
  },

  /**
   * 校验收款人是否合法
   * @param val
   * @returns {boolean}
   */
  validatePayee(val){
    var reg = /^[\sa-zA-Z\u4e00-\u9fa5]{1,10}$/;
    return reg.test(val);
  },

  /**
   * 校验复核人是否合法
   * @param val
   * @returns {boolean}
   */
  validateReviewer(val){
    var reg = /^[\sa-zA-Z\u4e00-\u9fa5]{1,10}$/;
    return reg.test(val);
  },

  /**
   * 校验开票人是否合法
   * @param val
   * @returns {boolean}
   */
  validateDrawer(val){
    var reg = /^[\sa-zA-Z\u4e00-\u9fa5]{1,10}$/;
    return reg.test(val);
  },

  /**
   * 校验纳税人识别号是否合法
   * @param val
   * @returns {boolean}
   */
  validateTaxCode(val){
    var reg = /^[0-9A-Z]{15,20}$/;
    return reg.test(val);
  },

  /**
   * 校验电话（手机号）是否合法
   * @param val
   * @returns {boolean}
   */
  validatePhone(val) {
    var reg = /^(1\d{10}|[0-9-—]{7,20})$/;
    return reg.test(val);
  },

  /**
   * 校验手机号是否合法
   * @param val
   * @returns {boolean}
   */
  validateMobile(val) {
    var reg = /^1\d{10}$/;
    return reg.test(val);
  },

  /**
   * 校验邮箱是否合法
   * @param val
   * @returns {boolean}
   */
  validateEmail(val) {
    var reg = /^[A-Za-z0-9\u4e00-\u9fa5.-]+@[.a-zA-Z0-9-]+$/;
    return reg.test(val);
  },

  /**
   * 校验数量是否合法
   * @param val
   * @returns {boolean}
   */
  validateQuantity(val) {
    var reg = /^[0-9]{1,8}(\.[0-9]{1,8})?$/;
    return reg.test(val);
  },

  /**
   * 校验单价是否合法
   * @param val
   * @returns {boolean}
   */
  validateUnitPrice(val) {
    var reg = /^[0-9]{1,8}(\.[0-9]{1,8})?$/;
    return reg.test(val);
  },

  /**
   * 校验金额是否合法
   * @param val
   * @returns {boolean}
   */
  validateTotalPrice(val) {
    var reg = /^[0-9]{1,8}(\.[0-9]{1,2})?$/;
    return reg.test(val);
  },

  /**
   * 校验税率折扣率是否合法
   * @param val
   * @returns {boolean}
   */
  validateTax(val) {
    var reg = /^([1-9]\d?(\.\d{1,3})?|0\.\d{1,3}|0|100(\.0{1,3})?)$/;
    return reg.test(val);
  },

  /**
   * 校验发票代码是否合法
   * @param val
   * @returns {boolean}
   */
  validateInvoiceCode(val) {
    var reg = /\d{12}$/;
    return reg.test(val);
  },

  /**
   * 校验发票号码是否合法
   * @param val
   * @returns {boolean}
   */
  validateInvoiceNo(val) {
    var reg = /^\d{8}$/;
    return reg.test(val);
  },

  /**
   * 校验销售单据号是否合法
   * @param val
   * @returns {boolean}
   */
  validateTicketNum(val) {
    var reg = /^[\s\S]{1,50}$/;
    return reg.test(val);
  },

  /**
   * 校验发票备注是否合法
   * @param val
   * @returns {boolean}
   */
  validateInvoiceRemark(val) {
    var reg = /^\s*[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{1,100}\s*$/;
    return reg.test(val);
  },

  /**
   * 校验角色编号是否合法
   * @param val
   * @returns {boolean}
   */
  validateRoleNum(val) {
    var reg = /^[0-9a-zA-Z]{1,14}$/;
    return reg.test(val);
  },

  /**
   * 校验角色名称是否合法
   * @param val
   * @returns {boolean}
   */
  validateRoleName(val) {
    var reg = /^[0-9a-zA-Z\u4e00-\u9fa5]{2,14}$/;
    return reg.test(val);
  },

  /**
   * 校验门店编号是否合法
   * @param val
   * @returns {boolean}
   */
  validateStoreNum(val) {
    var reg = /^\s*[\u4e00-\u9fa5\w\s~`!@#$^*\(\)_\-+\[\];,.?:\{\}|~·！@#￥……*（）——+\{}|：》？【】、；，。]{1,100}\s*$/;
    return reg.test(val);
  },

  /**
   * 校验门店名称是否合法
   * @param val
   * @returns {boolean}
   */
  validateStoreName(val) {
    var reg = /^\s*[\u4e00-\u9fa5\w\s~`!@#$^*\(\)_\-+\[\];,.?:\{\}|~·！@#￥……*（）——+\{}|：》？【】、；，。]{1,100}\s*$/;
    return reg.test(val);
  },

  /**
   * 校验门店地址是否合法
   * @param val
   * @returns {boolean}
   */
  validateStoreAddress(val) {
    var reg = /^\s*[\u4e00-\u9fa5\w\s~`!@#$^*\(\)_\-+\[\];,.?:\{\}|~·！@#￥……*（）——+\{}|：》？【】、；，。]{0,100}\s*$/;
    return reg.test(val);
  }
}

