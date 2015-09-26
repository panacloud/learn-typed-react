/// <reference path="../typings/tsd.d.ts" />
import * as React from 'react';
class MyComponent extends React.Component {
    render() {
        return React.DOM.span(null, this.props.name);
    }
}
React.render(React.createElement(MyComponent, { name: "I'm so custom" }), document.getElementById("app"));
