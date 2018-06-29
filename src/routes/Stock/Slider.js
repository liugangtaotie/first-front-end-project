(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd)
    define([], factory);
  else if (typeof exports === 'object')
    exports.Slider = factory();
  else
    root.Slider = factory();
})(typeof self !== 'undefined' ? self : this, () => {
  return /** *** */ (function (modules) { // webpackBootstrap
    /** *** */
    // The module cache
    /** *** */
    const installedModules = {};
    /** *** */
    /** *** */
    // The require function
    /** *** */
    function __webpack_require__(moduleId) {
      /** *** */
      /** *** */
      // Check if module is in cache
      /** *** */
      if (installedModules[moduleId]) {
        /** *** */
        return installedModules[moduleId].exports;
        /** *** */
      }
      /** *** */
      // Create a new module (and put it into the cache)
      /** *** */
      const module = installedModules[moduleId] = {
        /** *** */
        i: moduleId,
        /** *** */
        l: false,
        /** *** */
        exports: {},
        /** *** */
      };
      /** *** */
      /** *** */
      // Execute the module function
      /** *** */
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /** *** */
      /** *** */
      // Flag the module as loaded
      /** *** */
      module.l = true;
      /** *** */
      /** *** */
      // Return the exports of the module
      /** *** */
      return module.exports;
      /** *** */
    }
    /** *** */
    /** *** */
    /** *** */
    // expose the modules object (__webpack_modules__)
    /** *** */
    __webpack_require__.m = modules;
    /** *** */
    /** *** */
    // expose the module cache
    /** *** */
    __webpack_require__.c = installedModules;
    /** *** */
    /** *** */
    // define getter function for harmony exports
    /** *** */
    __webpack_require__.d = function (exports, name, getter) {
      /** *** */
      if (!__webpack_require__.o(exports, name)) {
        /** *** */
        Object.defineProperty(exports, name, {
          /** *** */
          configurable: false,
          /** *** */
          enumerable: true,
          /** *** */
          get: getter,
          /** *** */
        });
        /** *** */
      }
      /** *** */
    };
    /** *** */
    /** *** */
    // getDefaultExport function for compatibility with non-harmony modules
    /** *** */
    __webpack_require__.n = function (module) {
      /** *** */
      const getter = module && module.__esModule ?
        /** *** */
        function getDefault() {
          return module.default;
        } :
        /** *** */
        function getModuleExports() {
          return module;
        };
      /** *** */
      __webpack_require__.d(getter, 'a', getter);
      /** *** */
      return getter;
      /** *** */
    };
    /** *** */
    /** *** */
    // Object.prototype.hasOwnProperty.call
    /** *** */
    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /** *** */
    /** *** */
    // __webpack_public_path__
    /** *** */
    __webpack_require__.p = "";
    /** *** */
    /** *** */
    // Load entry module and return exports
    /** *** */
    return __webpack_require__(__webpack_require__.s = 0);
    /** *** */
  })
  /** ********************************************************************* */
  /** *** */
  ([
    /* 0 */
    /** */
    (function (module, exports, __webpack_require__) {

      const Slider = __webpack_require__(1);
      if (window && !window.G2) {
        console.err('Please load the G2 script first!');
      }

      module.exports = Slider;

      /** */
    }),
    /* 1 */
    /** */
    (function (module, exports, __webpack_require__) {

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      /**
                    * @fileOverview G2's plugin for datazoom.
                    * @author sima.zhang
                    */
      const G2 = window && window.G2;
      let Chart = G2.Chart,
        Util = G2.Util,
        G = G2.G,
        Global = G2.Global;
      let Canvas = G.Canvas,
        DomUtil = G.DomUtil;

      const Range = __webpack_require__(2);

      const Slider = function () {
        Slider.prototype._initProps = function _initProps() {
          this.height = 26;
          this.width = 'auto'; // 榛樿鑷€傚簲
          this.padding = Global.plotCfg.padding;
          this.container = null;
          this.xAxis = null;
          this.yAxis = null;
          // 閫変腑鍖哄煙鐨勬牱寮�
          this.fillerStyle = {
            fill: '#BDCCED',
            fillOpacity: 0.3,
          };
          // 婊戝姩鏉¤儗鏅牱寮�
          this.backgroundStyle = {
            stroke: '#CCD6EC',
            fill: '#CCD6EC',
            fillOpacity: 0.3,
            lineWidth: 1,
          };
          this.range = [0, 100];
          this.layout = 'horizontal';
          // 鏂囨湰棰滆壊
          this.textStyle = {
            fill: '#545454',
          };
          // 婊戝潡鐨勬牱寮�
          this.handleStyle = {
            img: 'https://gw.alipayobjects.com/zos/rmsportal/QXtfhORGlDuRvLXFzpsQ.png',
            width: 5,
          };
          // 鑳屾櫙鍥捐〃鐨勯厤缃紝濡傛灉涓� false 鍒欒〃绀轰笉娓叉煋
          this.backgroundChart = {
            type: ['area'], // 鍥捐〃鐨勭被鍨嬶紝鍙互鏄瓧绗︿覆涔熷彲鏄槸鏁扮粍
            color: '#CCD6EC',
          };
        };

        function Slider(cfg) {
          _classCallCheck(this, Slider);

          this._initProps();
          Util.deepMix(this, cfg);
          const container = this.container;
          if (!container) {
            throw new Error('Please specify the container for the Slider!');
          }
          if (Util.isString(container)) {
            this.domContainer = document.getElementById(container);
          } else {
            this.domContainer = container;
          }

          this.handleStyle = Util.mix({
            width: this.height,
            height: this.height,
          }, this.handleStyle);
          if (this.width === 'auto') {
            // 瀹藉害鑷€傚簲
            window.addEventListener('resize', Util.wrapBehavior(this, '_initForceFitEvent'));
          }
        }

        Slider.prototype._initForceFitEvent = function _initForceFitEvent() {
          const timer = setTimeout(Util.wrapBehavior(this, 'forceFit'), 200);
          clearTimeout(this.resizeTimer);
          this.resizeTimer = timer;
        };

        Slider.prototype.forceFit = function forceFit() {
          if (!this || this.destroyed) {
            return;
          }
          const width = DomUtil.getWidth(this.domContainer);
          const height = this.height;
          if (width !== this.domWidth) {
            const canvas = this.canvas;
            canvas.changeSize(width, height); // 鏀瑰彉鐢诲竷灏哄
            this.bgChart && this.bgChart.changeWidth(width);
            canvas.clear();
            this._initWidth();
            this._initSlider(); // 鍒濆鍖栨粦鍔ㄦ潯
            this._bindEvent();
            canvas.draw();
          }
        };

        Slider.prototype._initWidth = function _initWidth() {
          let width = void 0;
          if (this.width === 'auto') {
            width = DomUtil.getWidth(this.domContainer);
          } else {
            width = this.width;
          }
          this.domWidth = width;
          const padding = Util.toAllPadding(this.padding);

          if (this.layout === 'horizontal') {
            this.plotWidth = width - padding[1] - padding[3];
            this.plotPadding = padding[3];
            this.plotHeight = this.height;
          } else if (this.layout === 'vertical') {
            this.plotWidth = this.width;
            this.plotHeight = this.height - padding[0] - padding[2];
            this.plotPadding = padding[0];
          }
        };

        Slider.prototype.render = function render() {
          this._initWidth();
          this._initCanvas(); // 鍒濆鍖� canvas
          this._initBackground(); // 鍒濆鍖栬儗鏅浘琛�
          this._initSlider(); // 鍒濆鍖栨粦鍔ㄦ潯
          this._bindEvent();
          this.canvas.draw();
        };

        Slider.prototype.changeData = function changeData(data) {
          this.data = data;
          this.repaint();
        };

        Slider.prototype.destroy = function destroy() {
          clearTimeout(this.resizeTimer);
          const rangeElement = this.rangeElement;
          rangeElement.off('sliderchange');
          this.bgChart && this.bgChart.destroy();
          this.canvas.destroy();
          const container = this.domContainer;
          while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
          }
          window.removeEventListener('resize', Util.getWrapBehavior(this, '_initForceFitEvent'));
          this.destroyed = true;
        };

        Slider.prototype.clear = function clear() {
          this.canvas.clear();
          this.bgChart && this.bgChart.destroy();
          this.bgChart = null;
          this.scale = null;
          this.canvas.draw();
        };

        Slider.prototype.repaint = function repaint() {
          this.clear();
          this.render();
        };

        Slider.prototype._initCanvas = function _initCanvas() {
          const width = this.domWidth;
          const height = this.height;
          const canvas = new Canvas({
            width,
            height,
            containerDOM: this.domContainer,
            capture: false,
          });
          const node = canvas.get('el');
          node.style.position = 'absolute';
          node.style.top = 0;
          node.style.left = 0;
          node.style.zIndex = 3;
          this.canvas = canvas;
        };

        Slider.prototype._initBackground = function _initBackground() {
          let _Util$deepMix;

          const data = this.data;
          const xAxis = this.xAxis;
          const yAxis = this.yAxis;
          const scales = Util.deepMix((_Util$deepMix = {}, _Util$deepMix[`${  xAxis}`] = {
            range: [0, 1],
          }, _Util$deepMix), this.scales); // 鐢ㄦ埛鍒楀畾涔�
          if (!data) {
            // 娌℃湁鏁版嵁锛屽垯涓嶅垱寤�
            throw new Error('Please specify the data!');
          }
          if (!xAxis) {
            throw new Error('Please specify the xAxis!');
          }
          if (!yAxis) {
            throw new Error('Please specify the yAxis!');
          }

          const backgroundChart = this.backgroundChart;
          let type = backgroundChart.type;
          const color = backgroundChart.color;
          if (!Util.isArray(type)) {
            type = [type];
          }

          const padding = Util.toAllPadding(this.padding);
          const bgChart = new Chart({
            container: this.container,
            width: this.domWidth,
            height: this.height,
            padding: [0, padding[1], 0, padding[3]],
            animate: false,
          });
          bgChart.source(data);
          bgChart.scale(scales);
          bgChart.axis(false);
          bgChart.tooltip(false);
          bgChart.legend(false);
          Util.each(type, (eachType) => {
            bgChart[eachType]().position(`${xAxis  }*${  yAxis}`).color(color).opacity(1);
          });
          bgChart.render();
          this.bgChart = bgChart;
          this.scale = this.layout === 'horizontal' ? bgChart.getXScale() : bgChart.getYScales()[0];
          if (this.layout === 'vertical') {
            bgChart.destroy();
          }
        };

        Slider.prototype._initRange = function _initRange() {
          const start = this.start;
          const end = this.end;
          const scale = this.scale;
          let min = 0;
          let max = 1;
          if (start) {
            min = scale.scale(scale.translate(start));
          }
          if (end) {
            max = scale.scale(scale.translate(end));
          }

          let minSpan = this.minSpan,
            maxSpan = this.maxSpan;

          let totalSpan = 0;
          if (scale.type === 'time' || scale.type === 'timeCat') {
            // 鏃堕棿绫诲瀷宸叉帓搴�
            const values = scale.values;
            const firstValue = values[0];
            const lastValue = values[values.length - 1];
            totalSpan = lastValue - firstValue;
          } else if (scale.isLinear) {
            totalSpan = scale.max - scale.min;
          }

          if (totalSpan && minSpan) {
            this.minRange = minSpan / totalSpan * 100;
          }

          if (totalSpan && maxSpan) {
            this.maxRange = maxSpan / totalSpan * 100;
          }

          const range = [min * 100, max * 100];
          this.range = range;
          return range;
        };

        Slider.prototype._getHandleValue = function _getHandleValue(type) {
          let value = void 0;
          const range = this.range;
          const min = range[0] / 100;
          const max = range[1] / 100;
          const scale = this.scale;
          if (type === 'min') {
            value = this.start ? this.start : scale.invert(min);
          } else {
            value = this.end ? this.end : scale.invert(max);
          }
          return value;
        };

        Slider.prototype._initSlider = function _initSlider() {
          const canvas = this.canvas;
          const range = this._initRange();
          const scale = this.scale;
          const rangeElement = canvas.addGroup(Range, {
            middleAttr: this.fillerStyle,
            range,
            minRange: this.minRange,
            maxRange: this.maxRange,
            layout: this.layout,
            width: this.plotWidth,
            height: this.plotHeight,
            backgroundStyle: this.backgroundStyle,
            textStyle: this.textStyle,
            handleStyle: this.handleStyle,
            minText: scale.getText(this._getHandleValue('min')),
            maxText: scale.getText(this._getHandleValue('max')),
          });
          if (this.layout === 'horizontal') {
            rangeElement.translate(this.plotPadding, 0);
          } else if (this.layout === 'vertical') {
            rangeElement.translate(0, this.plotPadding);
          }
          this.rangeElement = rangeElement;
        };

        Slider.prototype._bindEvent = function _bindEvent() {
          const self = this;
          const rangeElement = self.rangeElement;
          rangeElement.on('sliderchange', (ev) => {
            const range = ev.range;
            const minRatio = range[0] / 100;
            const maxRatio = range[1] / 100;
            self._updateElement(minRatio, maxRatio);
          });
        };

        Slider.prototype._updateElement = function _updateElement(minRatio, maxRatio) {
          const scale = this.scale;
          const rangeElement = this.rangeElement;
          const minTextElement = rangeElement.get('minTextElement');
          const maxTextElement = rangeElement.get('maxTextElement');
          const min = scale.invert(minRatio);
          const max = scale.invert(maxRatio);
          const minText = scale.getText(min);
          const maxText = scale.getText(max);
          minTextElement.attr('text', minText);
          maxTextElement.attr('text', maxText);

          this.start = minText;
          this.end = maxText;

          if (this.onChange) {
            this.onChange({
              startText: minText,
              endText: maxText,
              startValue: min,
              endValue: max,
            });
          }
        };

        return Slider;
      }();

      module.exports = Slider;

      /** */
    }),
    /* 2 */
    /** */
    (function (module, exports) {

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(`Super expression must either be null or a function, not ${  typeof superClass}`);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ =
          superClass;
      }

      /**
                    * @fileOverview The class of slider
                    * @author sima.zhang
                    */
      const G2 = window && window.G2;
      let Util = G2.Util,
        G = G2.G;
      let Group = G.Group,
        DomUtil = G.DomUtil;

      const OFFSET = 5;

      const Range = function (_Group) {
        _inherits(Range, _Group);

        function Range() {
          _classCallCheck(this, Range);

          return _possibleConstructorReturn(this, _Group.apply(this, arguments));
        }

        Range.prototype.getDefaultCfg = function getDefaultCfg() {
          return {
            /**
                                      * 鑼冨洿
                                      * @type {Array}
                                      */
            range: null,
            /**
                                      * 涓粦鍧楀睘鎬�
                                      * @type {ATTRS}
                                      */
            middleAttr: null,
            /**
                                      * 鑳屾櫙
                                      * @type {G-Element}
                                      */
            backgroundElement: null,
            /**
                                      * 涓嬫粦鍧�
                                      * @type {G-Element}
                                      */
            minHandleElement: null,
            /**
                                      * 涓婃粦鍧�
                                      * @type {G-Element}
                                      */
            maxHandleElement: null,
            /**
                                      * 涓潡
                                      * @type {G-Element}
                                      */
            middleHandleElement: null,
            /**
                                      * 褰撳墠鐨勬縺娲荤殑鍏冪礌
                                      * @type {G-Element}
                                      */
            currentTarget: null,
            /**
                                      * 甯冨眬鏂瑰紡锛� horizontal锛寁ertical
                                      * @type {String}
                                      */
            layout: 'vertical',
            /**
                                      * 瀹�
                                      * @type {Number}
                                      */
            width: null,
            /**
                                      * 楂�
                                      * @type {Number}
                                      */
            height: null,
            /**
                                      * 褰撳墠鐨凱ageX
                                      * @type {Number}
                                      */
            pageX: null,
            /**
                                      * 褰撳墠鐨凱ageY
                                      * @type {Number}
                                      */
            pageY: null,
          };
        };

        Range.prototype._initHandle = function _initHandle(type) {
          const handle = this.addGroup();
          const layout = this.get('layout');
          const handleStyle = this.get('handleStyle');
          const img = handleStyle.img;
          const iconWidth = handleStyle.width;
          const iconHeight = handleStyle.height;

          let text = void 0;
          let handleIcon = void 0;
          let triggerCursor = void 0;

          if (layout === 'horizontal') {
            const _iconWidth = handleStyle.width;
            triggerCursor = 'ew-resize';
            handleIcon = handle.addShape('Image', {
              attrs: {
                x: -_iconWidth / 2,
                y: 0,
                width: _iconWidth,
                height: iconHeight,
                img,
                cursor: triggerCursor,
              },
            });
            text = handle.addShape('Text', {
              attrs: Util.mix({
                x: type === 'min' ? -(_iconWidth / 2 + OFFSET) : _iconWidth / 2 + OFFSET,
                y: iconHeight / 2,
                textAlign: type === 'min' ? 'end' : 'start',
                textBaseline: 'middle',
                text: type === 'min' ? this.get('minText') : this.get('maxText'),
                cursor: triggerCursor,
              }, this.get('textStyle')),
            });
          } else {
            triggerCursor = 'ns-resize';
            handleIcon = handle.addShape('Image', {
              attrs: {
                x: 0,
                y: -iconHeight / 2,
                width: iconWidth,
                height: iconHeight,
                img,
                cursor: triggerCursor,
              },
            });
            text = handle.addShape('Text', {
              attrs: Util.mix({
                x: iconWidth / 2,
                y: type === 'min' ? iconHeight / 2 + OFFSET : -(iconHeight / 2 + OFFSET),
                textAlign: 'center',
                textBaseline: 'middle',
                text: type === 'min' ? this.get('minText') : this.get('maxText'),
                cursor: triggerCursor,
              }, this.get('textStyle')),
            });
          }

          this.set(`${type  }TextElement`, text);
          this.set(`${type  }IconElement`, handleIcon);
          return handle;
        };

        Range.prototype._initSliderBackground = function _initSliderBackground() {
          const backgroundElement = this.addGroup();
          backgroundElement.initTransform();
          backgroundElement.translate(0, 0);
          backgroundElement.addShape('Rect', {
            attrs: Util.mix({
              x: 0,
              y: 0,
              width: this.get('width'),
              height: this.get('height'),
            }, this.get('backgroundStyle')),
          });
          return backgroundElement;
        };

        Range.prototype._beforeRenderUI = function _beforeRenderUI() {
          const backgroundElement = this._initSliderBackground();
          const minHandleElement = this._initHandle('min');
          const maxHandleElement = this._initHandle('max');
          const middleHandleElement = this.addShape('rect', {
            attrs: this.get('middleAttr'),
          });

          this.set('middleHandleElement', middleHandleElement);
          this.set('minHandleElement', minHandleElement);
          this.set('maxHandleElement', maxHandleElement);
          this.set('backgroundElement', backgroundElement);
          backgroundElement.set('zIndex', 0);
          middleHandleElement.set('zIndex', 1);
          minHandleElement.set('zIndex', 2);
          maxHandleElement.set('zIndex', 2);
          middleHandleElement.attr('cursor', 'move');
          this.sort();
        };

        Range.prototype._renderUI = function _renderUI() {
          if (this.get('layout') === 'horizontal') {
            this._renderHorizontal();
          } else {
            this._renderVertical();
          }
        };

        Range.prototype._transform = function _transform(layout) {
          const range = this.get('range');
          const minRatio = range[0] / 100;
          const maxRatio = range[1] / 100;
          const width = this.get('width');
          const height = this.get('height');
          const minHandleElement = this.get('minHandleElement');
          const maxHandleElement = this.get('maxHandleElement');
          const middleHandleElement = this.get('middleHandleElement');
          minHandleElement.initTransform();
          maxHandleElement.initTransform();
          if (layout === 'horizontal') {
            middleHandleElement.attr({
              x: width * minRatio,
              y: 0,
              width: (maxRatio - minRatio) * width,
              height,
            });

            minHandleElement.translate(minRatio * width, 0);
            maxHandleElement.translate(maxRatio * width, 0);
          } else {
            middleHandleElement.attr({
              x: 0,
              y: height * (1 - maxRatio),
              width,
              height: (maxRatio - minRatio) * height,
            });
            minHandleElement.translate(0, (1 - minRatio) * height);
            maxHandleElement.translate(0, (1 - maxRatio) * height);
          }
        };

        Range.prototype._renderHorizontal = function _renderHorizontal() {
          this._transform('horizontal');
        };

        Range.prototype._renderVertical = function _renderVertical() {
          this._transform('vertical');
        };

        Range.prototype._bindUI = function _bindUI() {
          this.on('mousedown', Util.wrapBehavior(this, '_onMouseDown'));
        };

        Range.prototype._isElement = function _isElement(target, name) {
          // 鍒ゆ柇鏄惁鏄鍏冪礌
          const element = this.get(name);
          if (target === element) {
            return true;
          }
          if (element.isGroup) {
            const elementChildren = element.get('children');
            return elementChildren.indexOf(target) > -1;
          }
          return false;
        };

        Range.prototype._getRange = function _getRange(diff, range) {
          let rst = diff + range;
          rst = rst > 100 ? 100 : rst;
          rst = rst < 0 ? 0 : rst;
          return rst;
        };

        Range.prototype._limitRange = function _limitRange(diff, limit, range) {
          range[0] = this._getRange(diff, range[0]);
          range[1] = range[0] + limit;
          if (range[1] > 100) {
            range[1] = 100;
            range[0] = range[1] - limit;
          }
        };

        Range.prototype._updateStatus = function _updateStatus(dim, ev) {
          const totalLength = dim === 'x' ? this.get('width') : this.get('height');
          dim = Util.upperFirst(dim);
          const range = this.get('range');
          const page = this.get(`page${  dim}`);
          const currentTarget = this.get('currentTarget');
          const rangeStash = this.get('rangeStash');
          const layout = this.get('layout');
          const sign = layout === 'vertical' ? -1 : 1;
          const currentPage = ev[`page${  dim}`];
          const diffPage = currentPage - page;
          const diffRange = diffPage / totalLength * 100 * sign;
          let diffStashRange = void 0;

          const minRange = this.get('minRange');
          const maxRange = this.get('maxRange');

          if (range[1] <= range[0]) {
            if (this._isElement(currentTarget, 'minHandleElement') || this._isElement(currentTarget,
                'maxHandleElement')) {
              range[0] = this._getRange(diffRange, range[0]);
              range[1] = this._getRange(diffRange, range[0]);
            }
          } else {
            if (this._isElement(currentTarget, 'minHandleElement')) {
              range[0] = this._getRange(diffRange, range[0]);
              if (minRange) {
                // 璁剧疆浜嗘渶灏忚寖鍥�
                if (range[1] - range[0] <= minRange) {
                  this._limitRange(diffRange, minRange, range);
                }
              }

              if (maxRange) {
                // 璁剧疆浜嗘渶澶ц寖鍥�
                if (range[1] - range[0] >= maxRange) {
                  this._limitRange(diffRange, maxRange, range);
                }
              }
            }
            if (this._isElement(currentTarget, 'maxHandleElement')) {
              range[1] = this._getRange(diffRange, range[1]);

              if (minRange) {
                // 璁剧疆浜嗘渶灏忚寖鍥�
                if (range[1] - range[0] <= minRange) {
                  this._limitRange(diffRange, minRange, range);
                }
              }

              if (maxRange) {
                // 璁剧疆浜嗘渶澶ц寖鍥�
                if (range[1] - range[0] >= maxRange) {
                  this._limitRange(diffRange, maxRange, range);
                }
              }
            }
          }

          if (this._isElement(currentTarget, 'middleHandleElement')) {
            diffStashRange = rangeStash[1] - rangeStash[0];
            this._limitRange(diffRange, diffStashRange, range);
          }

          this.emit('sliderchange', {
            range,
          });

          this.set(`page${  dim}`, currentPage);
          this._renderUI();
          this.get('canvas').draw(); // need delete
          
        };

        Range.prototype._onMouseDown = function _onMouseDown(ev) {
          const currentTarget = ev.currentTarget;
          const originEvent = ev.event;
          const range = this.get('range');
          originEvent.stopPropagation();
          originEvent.preventDefault();
          this.set('pageX', originEvent.pageX);
          this.set('pageY', originEvent.pageY);
          this.set('currentTarget', currentTarget);
          this.set('rangeStash', [range[0], range[1]]);
          this._bindCanvasEvents();
        };

        Range.prototype._bindCanvasEvents = function _bindCanvasEvents() {
          const containerDOM = this.get('canvas').get('containerDOM');
          this.onMouseMoveListener = DomUtil.addEventListener(containerDOM, 'mousemove', Util.wrapBehavior(
            this, '_onCanvasMouseMove'));
          this.onMouseUpListener = DomUtil.addEventListener(containerDOM, 'mouseup', Util.wrapBehavior(this,
            '_onCanvasMouseUp'));
          // @2018-06-06 by blue.lb 娣诲姞mouseleave浜嬩欢鐩戝惉锛岃鐢ㄦ埛鍦ㄦ搷浣滃嚭婊戝潡鍖哄煙鍚庢湁涓€涓€滄甯糕€濈殑鏁堟灉锛屽彲浠ユ甯搁噸鏂拌Е鍙戞粦鍧楃殑鎿嶄綔娴佺▼
          this.onMouseLeaveListener = DomUtil.addEventListener(containerDOM, 'mouseleave', Util.wrapBehavior(
            this, '_onCanvasMouseUp'));
        };

        Range.prototype._onCanvasMouseMove = function _onCanvasMouseMove(ev) {
          const layout = this.get('layout');
          if (layout === 'horizontal') {
            this._updateStatus('x', ev);
          } else {
            this._updateStatus('y', ev);
          }
        };

        Range.prototype._onCanvasMouseUp = function _onCanvasMouseUp() {
          this._removeDocumentEvents();
        };

        Range.prototype._removeDocumentEvents = function _removeDocumentEvents() {
          this.onMouseMoveListener.remove();
          this.onMouseUpListener.remove();
          this.onMouseLeaveListener.remove();
        };

        return Range;
      }(Group);

      module.exports = Range;

      /** */
    }),
    /** *** */
  ]);
});
