/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react'; 

React.render(React.DOM.h1({
							id: "myUniqueID",
							className: "pretty",
							style: {
								background: "black",
								color: "white",
								fontFamily: "Verdana"
							}
						}, React.DOM.span(null, 
							React.DOM.em(null, "Hello")
						)), 
	document.getElementById("app"));
	