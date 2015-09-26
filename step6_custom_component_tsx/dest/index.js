/// <reference path="../typings/tsd.d.ts" />
import * as React from 'react';
class MyComponent extends React.Component {
    render() {
        return React.createElement("h1", null, " ", this.props.name, " ");
    }
}
React.render(React.createElement(MyComponent, {"name": "I am so TSX custom"}), document.getElementById("app"));
