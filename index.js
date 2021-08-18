/**
 * @author  Milos Janda
 * @licence MIT
 */
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _tweenFunctions = _interopRequireDefault(require("tween-functions"));

var _detectPassiveEvents = require("detect-passive-events");

var _objectAssign = _interopRequireDefault(require("object-assign"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ScrollUp = /*#__PURE__*/function (_React$Component) {
  _inherits(ScrollUp, _React$Component);

  var _super = _createSuper(ScrollUp);

  function ScrollUp(props) {
    var _this;

    _classCallCheck(this, ScrollUp);

    _this = _super.call(this, props); // set default state

    _this.state = {
      show: false
    }; // default property `data`

    _this.data = {
      startValue: 0,
      currentTime: 0,
      // store current time of animation
      startTime: null,
      rafId: null
    }; // bind

    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_this));
    _this.scrollStep = _this.scrollStep.bind(_assertThisInitialized(_this));
    _this.stopScrolling = _this.stopScrolling.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ScrollUp, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.show !== this.state.show;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleScroll(); // initialize state
      // Add all listeners which can start scroll

      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener("wheel", this.stopScrolling, _detectPassiveEvents.supportsPassiveEvents ? {
        passive: true
      } : false);
      window.addEventListener("touchstart", this.stopScrolling, _detectPassiveEvents.supportsPassiveEvents ? {
        passive: true
      } : false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Remove all listeners which was registered
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener("wheel", this.stopScrolling, false);
      window.removeEventListener("touchstart", this.stopScrolling, false);
    }
    /**
     * call onShow callback if passed valid props
     */

  }, {
    key: "notifyOnShow",
    value: function notifyOnShow() {
      if (this.props.onShow && typeof this.props.onShow === "function") {
        this.props.onShow();
      }
    }
    /**
     * call onHide callback if passed valid props
     */

  }, {
    key: "notifyOnHide",
    value: function notifyOnHide() {
      if (this.props.onHide && typeof this.props.onHide === "function") {
        this.props.onHide();
      }
    }
    /**
     * Evaluate show/hide this component, depend on new position
     */

  }, {
    key: "handleScroll",
    value: function handleScroll() {
      if (window.pageYOffset > this.props.showUnder) {
        if (!this.state.show) {
          this.setState({
            show: true
          });
          this.notifyOnShow();
        }
      } else {
        if (this.state.show) {
          this.setState({
            show: false
          });
          this.notifyOnHide();
        }
      }
    }
    /**
     * Handle click on the button
     */

  }, {
    key: "handleClick",
    value: function handleClick() {
      this.stopScrolling();
      this.data.startValue = window.pageYOffset;
      this.data.currentTime = 0;
      this.data.startTime = null;
      this.data.rafId = window.requestAnimationFrame(this.scrollStep);
    }
    /**
     * Calculate new position
     * and scroll screen to new position or stop scrolling
     * @param timestamp
     */

  }, {
    key: "scrollStep",
    value: function scrollStep(timestamp) {
      if (!this.data.startTime) {
        this.data.startTime = timestamp;
      }

      this.data.currentTime = timestamp - this.data.startTime;

      var position = _tweenFunctions["default"][this.props.easing](this.data.currentTime, this.data.startValue, this.props.topPosition, this.props.duration);

      if (window.pageYOffset <= this.props.topPosition) {
        this.stopScrolling();
      } else {
        window.scrollTo(window.pageYOffset, position);
        this.data.rafId = window.requestAnimationFrame(this.scrollStep);
      }
    }
    /**
     * Stop Animation Frame
     */

  }, {
    key: "stopScrolling",
    value: function stopScrolling() {
      window.cancelAnimationFrame(this.data.rafId);
    }
    /**
     * Render component
     */

  }, {
    key: "render",
    value: function render() {
      var propStyle = this.props.style;

      var element = /*#__PURE__*/_react["default"].createElement("div", _extends({
        style: propStyle,
        onClick: this.handleClick
      }, this.props), this.props.children);

      var style = (0, _objectAssign["default"])({}, ScrollUp.defaultProps.style);
      style = (0, _objectAssign["default"])(style, propStyle);
      style.opacity = this.state.show ? 1 : 0;
      style.visibility = this.state.show ? 'visible' : 'hidden';
      style.transitionProperty = 'opacity, visibility';
      return /*#__PURE__*/_react["default"].cloneElement(element, _objectSpread(_objectSpread({}, this.props), {}, {
        style: style
      }));
    }
  }]);

  return ScrollUp;
}(_react["default"].Component); // Set default props


exports["default"] = ScrollUp;
ScrollUp.defaultProps = {
  duration: 250,
  easing: 'easeOutCubic',
  style: {
    position: 'fixed',
    bottom: 50,
    right: 30,
    cursor: 'pointer',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'linear',
    transitionDelay: '0s'
  },
  topPosition: 0
}; // Set validation property types

ScrollUp.propTypes = {
  topPosition: _propTypes["default"].number,
  showUnder: _propTypes["default"].number.isRequired,
  // show button under this position,
  easing: _propTypes["default"].oneOf(['linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc', 'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce']),
  duration: _propTypes["default"].number,
  // seconds
  style: _propTypes["default"].object,
  onShow: _propTypes["default"].func,
  onHide: _propTypes["default"].func
};
