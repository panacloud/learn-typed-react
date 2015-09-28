/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react'; 

interface TextAreaCounterProps extends React.Props<any> {
  initialText: string;
}

interface TextAreaCounterState {
	text: string;
}

class TextAreaCounter extends React.Component<TextAreaCounterProps, TextAreaCounterState>{
	
	constructor(props: TextAreaCounterProps) {
    	super(props);
    	this.state = {text: props.initialText};
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
	
	componentWillMount(){
		//executed before the node is inserted into the DOM
		console.log("componentWillMount is called");
	}
	
	componentDidMount(){
		//after the node is inserted into the DOM
		console.log("componentDidMount is called");
	}
	
	componentWillUnmount(){
		//right before the component is removed from the DOM
		console.log("componentWillUnmount is called");
	}
	
	componentWillUpdate(){
		//executed before the render() method of your component
		//is called again (as a result to changes to the properties or state)
		console.log("componentWillUpdatet is called");
	}
	
	componentDidUpdate(){
		//executed after the render() method is done and the new
		//changes to the underlying DOM have been applied
		console.log("componentDidUpdate is called");
	}
	
	shouldComponentUpdate(newProps: TextAreaCounterProps, newState: TextAreaCounterState): boolean{
		//this method is called before componentWillUpdate() and gives you a chance to return false; and cancel the
		//update. It’s useful in performance-critical areas of the app when you think nothing
		//interesting changed and no rerendering is necessary. You make this decision based
		//on comparing the newState argument with the existing this.state or comparing
		//newProps with this.props or just simply knowing that this component is static
		//and doesn’t change.
		console.log("shouldComponentUpdate is called");
		return true;
	}
	
	
	
	
}

React.render(<TextAreaCounter initialText="Babu"></TextAreaCounter>, 
				document.getElementById("app"));
	

	