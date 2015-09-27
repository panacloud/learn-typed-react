/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react'; 

interface TextAreaCounterProps extends React.Props<any> {
  text: string;
}

interface TextAreaCounterState {
	
}

class TextAreaCounter extends React.Component<TextAreaCounterProps, TextAreaCounterState>{
	render(){
		return React.DOM.div(null, React.DOM.textarea({
			defaultValue: this.props.text
		}), React.DOM.h3(null, this.props.text.length));
	}
}

React.render(React.createElement(TextAreaCounter, {text: "Bob" }), 
	document.getElementById("app"));
	

	