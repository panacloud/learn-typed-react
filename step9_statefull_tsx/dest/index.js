/// <reference path="../typings/tsd.d.ts" />
import * as React from 'react';
class TextAreaCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: props.text };
    }
    render() {
        return (React.createElement("div", null, React.createElement("textarea", {"onChange": this.textChange.bind(this), "value": this.state.text}), React.createElement("h3", null, this.state.text.length)));
    }
    textChange(ev) {
        this.setState({
            text: ev.target.value
        });
    }
}
React.render(React.createElement(TextAreaCounter, { text: "Bobz" }), document.getElementById("app"));
