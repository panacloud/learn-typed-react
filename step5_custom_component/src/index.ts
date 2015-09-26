/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react'; 

interface MyComponentProps extends React.Props<any> {
  name: string;
}

class MyComponent extends React.Component<MyComponentProps, {}>{
	render(){
		return React.DOM.span(null, this.props.name);
	}
}

React.render(React.createElement(MyComponent, {name: "I'm so custom" }), 
	document.getElementById("app"));
	

	