import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Subways } from '../../imports/collections/Subways';


class LandingPage extends Component{
	constructor(){
		super()
		this.state={
			destination:null
		}
	}

	// findStop(){
	// 	const randNumber=  Math.ceil(473*(Math.random()) ) ;
	// 	console.log(this.props.subways[randNumber].geometry.coordinates)
	// 	this.setState({
	// 		destination: this.props.subways[randNumber].geometry.coordinates
	// 	})

	// }

	onButtonClick(){
		this.props.findStop();
		document.querySelector('.LandingPage').style.display="none";
	}

	render(){

		// onClick={ this.findStop.bind(this) }
		console.log(this.props)

		return(
			<div className="LandingPage">
				<div className="row LandingPage__CTA">
					<div className="card-panel teal">
					  <a onClick={ this.onButtonClick.bind(this) } className="waves-effect waves-light btn-large">Let's Go For A Fuckin' Ride, Bruh!</a>
					</div>   
			    </div>
			</div>
				
		)
	}
}
export default createContainer(()=>{
	Meteor.subscribe('subways');

	return{
		subways: Subways.find({}).fetch()
	}
}, LandingPage );