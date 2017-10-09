import $ from 'jquery';

const pageData = {
  data() {
    return {
      loading: true,
      page: {
        currentPage: 1, //当前页
        pageSize: 10, //每页条数
        total: 0, //数据总条数
        pageCount: 0 //总页数
      },
      pageData: []
    }
  },
  methods: {
    handleCurrentPageChange() {
      this.getPageData();
    },
  },
  mounted() {
    this.getPageData();
  }
};

const dateTimePickerOption = {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  }
};

const elSelectWidth = {
  mounted() {
    var elInput = $('.search-form .el-form-item__content>.el-input:not(.el-date-editor)')[0];
    if (Boolean(elInput)) {
      var elInputWidth = elInput.offsetWidth;
      $('.search-form .el-select').each(function () {
        $(this).width(elInputWidth);
      });
    }
  }
};

const elDateEditorWidth = {
  mounted() {
    var elInput = $('.search-form .el-form-item__content>.el-input:not(.el-date-editor)')[0];
    if (Boolean(elInput)) {
      var elInputWidth = elInput.offsetWidth;
      $('.search-form .el-date-editor').each(function () {
        $(this).width(elInputWidth);
      });
    }
  }
};

export {
  pageData,
  dateTimePickerOption,
  elSelectWidth,
  elDateEditorWidth
};


