'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  var _super = _createSuper(_class);

  function _class() {
    var _this;

    _classCallCheck(this, _class);

    _this = _super.call(this);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">illustrator.js documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"changelog.html\"  data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>CHANGELOG\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"contributing.html\"  data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>CONTRIBUTING\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"license.html\"  data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>LICENSE\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/BackgroundColorTool.html\" data-type=\"entity-link\" >BackgroundColorTool</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/BaseShapeTool.html\" data-type=\"entity-link\" >BaseShapeTool</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Colors.html\" data-type=\"entity-link\" >Colors</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ColorSwatches.html\" data-type=\"entity-link\" >ColorSwatches</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ColorUtil.html\" data-type=\"entity-link\" >ColorUtil</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ConvolutionTool.html\" data-type=\"entity-link\" >ConvolutionTool</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/DataSource.html\" data-type=\"entity-link\" >DataSource</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/EllipseTool.html\" data-type=\"entity-link\" >EllipseTool</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/EraserTool.html\" data-type=\"entity-link\" >EraserTool</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/FilterTool.html\" data-type=\"entity-link\" >FilterTool</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Illustrator.html\" data-type=\"entity-link\" >Illustrator</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/IllustratorAnimation.html\" data-type=\"entity-link\" >IllustratorAnimation</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/IllustratorCollection.html\" data-type=\"entity-link\" >IllustratorCollection</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/IllustratorColor.html\" data-type=\"entity-link\" >IllustratorColor</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/IllustratorImage.html\" data-type=\"entity-link\" >IllustratorImage</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/IllustratorImageManager.html\" data-type=\"entity-link\" >IllustratorImageManager</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ImageLoader.html\" data-type=\"entity-link\" >ImageLoader</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ImageTool.html\" data-type=\"entity-link\" >ImageTool</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Layer.html\" data-type=\"entity-link\" >Layer</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/LayerManager.html\" data-type=\"entity-link\" >LayerManager</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/LayerTools.html\" data-type=\"entity-link\" >LayerTools</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/LayerUtils.html\" data-type=\"entity-link\" >LayerUtils</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/LineTool.html\" data-type=\"entity-link\" >LineTool</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/PixelsTool.html\" data-type=\"entity-link\" >PixelsTool</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/RectangleTool.html\" data-type=\"entity-link\" >RectangleTool</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ShadowTool.html\" data-type=\"entity-link\" >ShadowTool</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/SharpenTool.html\" data-type=\"entity-link\" >SharpenTool</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/TextTool.html\" data-type=\"entity-link\" >TextTool</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ToolBox.html\" data-type=\"entity-link\" >ToolBox</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/TransformTool.html\" data-type=\"entity-link\" >TransformTool</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/ArcToPoint.html\" data-type=\"entity-link\" >ArcToPoint</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ColorConfig.html\" data-type=\"entity-link\" >ColorConfig</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ConvolutionOptions.html\" data-type=\"entity-link\" >ConvolutionOptions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/CreateLayerOptions.html\" data-type=\"entity-link\" >CreateLayerOptions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/CubicBezierCurveOptions.html\" data-type=\"entity-link\" >CubicBezierCurveOptions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/DrawArcOptions.html\" data-type=\"entity-link\" >DrawArcOptions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/DrawEllipseOptions.html\" data-type=\"entity-link\" >DrawEllipseOptions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/EraserOptions.html\" data-type=\"entity-link\" >EraserOptions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/FrameLayer.html\" data-type=\"entity-link\" >FrameLayer</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IllustratorColorData.html\" data-type=\"entity-link\" >IllustratorColorData</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IllustratorDataSource.html\" data-type=\"entity-link\" >IllustratorDataSource</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IllustratorExportConfig.html\" data-type=\"entity-link\" >IllustratorExportConfig</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ImageDataSource.html\" data-type=\"entity-link\" >ImageDataSource</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/LayerToolConfig.html\" data-type=\"entity-link\" >LayerToolConfig</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/LayerTransformationData.html\" data-type=\"entity-link\" >LayerTransformationData</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/LayerWrapper.html\" data-type=\"entity-link\" >LayerWrapper</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/PixelTransformerContext.html\" data-type=\"entity-link\" >PixelTransformerContext</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/PixelTransformerRenderContext.html\" data-type=\"entity-link\" >PixelTransformerRenderContext</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/QuadraticBezierCurveOptions.html\" data-type=\"entity-link\" >QuadraticBezierCurveOptions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/RawImageData.html\" data-type=\"entity-link\" >RawImageData</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/RectangleOptions.html\" data-type=\"entity-link\" >RectangleOptions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/RoundedRectangleOptions.html\" data-type=\"entity-link\" >RoundedRectangleOptions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/TextDataSource.html\" data-type=\"entity-link\" >TextDataSource</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/TransformOptions.html\" data-type=\"entity-link\" >TransformOptions</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/typealiases.html\" data-type=\"entity-link\">Type aliases</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);

  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));