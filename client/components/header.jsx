import React, { Component } from 'react';


class Header extends Component{

	render(){
		console.log(this.refs)
		return(
			<div className="header">
				<nav>
				    <div className="nav-wrapper container">
				      <a href="/" className="brand-logo">WacArnolds</a>
				    </div>
				  </nav>	
			</div>
			
		)
	}
}

export default Header;