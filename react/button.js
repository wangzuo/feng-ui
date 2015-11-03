var blacklist = require('blacklist');
var cx = require('classnames');
var React = require('react');
var Spinner = require('./spinner');

module.exports = React.createClass({
  displayName: 'Button',

  getDefaultProps() {
    return {
      block: false,
      active: false,
      hover: false,
      disabled: false,
      loading: false,
      type: 'button'
    };
  },

  renderSpinner() {
    if(!this.props.loading) return null;
    var color = this.props.color;
    var inverted = ['yellow', 'red', 'blue'].indexOf(color) >= 0;

    return <Spinner className="spinner" inverted={inverted}/>;
  },

  render() {
    var color = this.props.color;
    var size = this.props.size;
    var block = this.props.block;
    var icon = this.props.icon;
    var active = this.props.active;
    var hover = this.props.hover;
    var disabled = this.props.disabled;
    var loading = this.props.loading;
    var href = this.props.href;
    var type = this.props.type;

    var props = blacklist(this.props,
      'children', 'color', 'size', 'block', 'type',
      'icon', 'active', 'hover', 'disabled', 'loading');

    props.className = cx(
      'u-btn',
      color ? `u-btn-${color}` : null,
      size ? `u-btn-${size}` : null,
      icon, {
        'u-btn-blk': block,
        'u-btn-icon': icon && this.props.children,
        'is-hover': hover,
        'is-active': active,
        'is-disabled': disabled,
        'is-loading': loading
      },
      this.props.className
    );

    if(href) {
      return (
        <a role="button" {... props}>
          {this.renderSpinner()}
          {this.props.children}
        </a>
      )
    }

    return (
      <button {... props} type={this.props.type}>
        {this.renderSpinner()}
        {this.props.children}
      </button>
    );
  }
});