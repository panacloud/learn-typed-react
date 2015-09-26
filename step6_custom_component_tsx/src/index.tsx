/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react'; 

interface MyComponentProps extends React.Props<any> {
  name: string;
}

class MyComponent extends React.Component<MyComponentProps, {}>{
	render(){
		return <h1> {this.props.name} </h1>;
	}
}

React.render(<MyComponent name="I am so TSX custom"/>, 
	document.getElementById("app"));
	

	