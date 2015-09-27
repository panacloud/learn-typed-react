/// <reference path="../typings/tsd.d.ts" />
import * as React from 'react';
class TextAreaCounter extends React.Component {
    render() {
        return React.DOM.div(null, React.DOM.textarea({
            defaultValue: this.props.text
        }), React.DOM.h3(null, this.props.text.length));
    }
}
React.render(React.createElement(TextAreaCounter, { text: "Bobh" }), document.getElementById("app"));
