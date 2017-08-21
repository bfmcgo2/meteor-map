import React, { Component } from 'react';


class Header extends Component{

	render(){
		return(
			<div className="header">
				<nav>
				    <div className="nav-wrapper container">
				      <a href="/" className="brand-logo">Subway Roulette</a>
				    </div>
				  </nav>	
			</div>
			
		)
	}
}

export default Header;