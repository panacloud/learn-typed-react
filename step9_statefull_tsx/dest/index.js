/// <reference path="../typings/tsd.d.ts" />
import * as React from 'react';
class TextAreaCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: props.text };
    }
    render() {
        return React.DOM.div(null, React.DOM.textarea({
            value: this.state.text,
            onChange: this.textChange.bind(this)
        }), React.DOM.h3(null, this.state.text.length));
    }
    textChange(ev) {
        this.setState({
            text: ev.target.value
        });
    }
}
React.render(React.createElement(TextAreaCounter, { text: "Bobz" }), document.getElementById("app"));
