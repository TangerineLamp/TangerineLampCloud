Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**是否显示工具栏 */
    showTabBar: {
      type: 'Boolean',
      value: true
    },
    placeholder: {
      type: 'String',
      value: '请输入相关内容'
    },
    name: {
      type: 'String',
      value: ''
    },
    // uploadImageURL: {
    //   type: 'String',
    //   value: ''
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    _onEditorReady: function () {
      const that = this;
      that.createSelectorQuery().select('#editor').context(function (res) {
        that.editorCtx = res.context
      }).exec()
    },
    //设置斜体
    _addItalic: function () {
      this.editorCtx.format("italic")
    },
    //添加粗体样式
    _addBold: function () {
      this.editorCtx.format("bold")
    },
    //设置标题
    _addHeader: function (e) {
      let headerType = e.currentTarget.dataset.header;
      this.editorCtx.format("header", headerType)
    },
    //设置文字的排列方式
    _addAlign: function (e) {
      let alignType = e.currentTarget.dataset.align;
      this.editorCtx.format("align", alignType);
    },
    //设置列表
    _addList: function (e) {
      let listType = e.currentTarget.dataset.list;
      console.log(listType)
      this.editorCtx.format("list", listType);
    },
    //撤销
    _undo: function () {
      this.editorCtx.undo();
    },
    //监控输入
    _onInputting: function (e) {
      let html = e.detail.html;
      let text = e.detail.text;
      this.triggerEvent("input", { html: html, text: text }, {});
    }
  }
})