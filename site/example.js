var React = require('react');
var babel = require('babel-core');

var Grid = require('../react/grid');
var Button = require('../react/button');
var ButtonGroup = require('../react/button-group');
var Form = require('../react/form');
var Card = require('../react/card');
var Slat = require('../react/slat');
var Field = require('../react/field');
var Checkbox = require('../react/checkbox');
var Label = require('../react/label');
var Tabs = require('../react/tabs');
var Spinner = require('../react/spinner');
var Dropdown = require('../react/dropdown');
var Dialog = require('../react/dialog');
var Avatar = require('../react/avatar');
var Markdown = require('../react/markdown');

var Code = require('./code');

module.exports = React.createClass({
  displayName: 'Example',

  getDefaultProps() {
    return {
      html: true
    };
  },

  getInitialState() {
    return {
      active: 0
    };
  },

  render() {
    var showHtml = this.props.html;
    var code = this.props.children;
    var active = this.state.active;

    var transformed = babel.transform(code, {presets: ['react']}).code;
    var el = eval(transformed);

    return (
      <div {... this.props} className="m-example">
        <div className="preview">
          {el}
        </div>

        <Tabs.Tabs className="codes">
          <Tabs.Nav>
            <Tabs.Tab active={active === 0} onClick={this.changeTab.bind(null, 0)}>React</Tabs.Tab>
            {showHtml ? <Tabs.Tab
              active={active === 1}
              onClick={this.changeTab.bind(null, 1)}>Html</Tabs.Tab> : null}
          </Tabs.Nav>

          <Tabs.Contents>
            <Tabs.Content active={active === 0}>
              <Code code={code}/>
            </Tabs.Content>

            {showHtml ?
            <Tabs.Content active={active === 1}>
              <Code code={React.renderToStaticMarkup(el)} format/>
            </Tabs.Content> : null}
          </Tabs.Contents>
        </Tabs.Tabs>
      </div>
    );
  },

  changeTab(i) {
    this.setState({
      active: i
    });
  }
});
