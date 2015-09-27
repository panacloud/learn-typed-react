/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react'; 

interface TextAreaCounterProps extends React.Props<any> {
  text: string;
}

interface TextAreaCounterState {
	text: string;
}

class TextAreaCounter extends React.Component<TextAreaCounterProps, TextAreaCounterState>{
	
	constructor(props: TextAreaCounterProps) {
    	super(props);
    	this.state = {text: props.text};
  	}
	  
	  
	render(){
			return (<div>
						<textarea onChange={this.textChange.bind(this)} value={this.state.text}></textarea>
						<h3>{this.state.text.length}</h3>
			 		</div>);
		
	}
	 
	textChange(ev: any) {
		this.setState({
			text: ev.target.value
		});
	}
}

React.render(React.createElement(TextAreaCounter, {text: "Bobz" }), 
	document.getElementById("app"));
	

	