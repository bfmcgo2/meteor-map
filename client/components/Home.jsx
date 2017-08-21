import React, { Component } from 'react';
import GoogleMapComponent from './googlemap';
import LandingPage from './LandingPage';
import { createContainer } from 'meteor/react-meteor-data';
import { Subways } from '../../imports/collections/Subways';


class Home extends Component{
	constructor(){
		super()
		this.state={
			destination:null
		}
	}

	findStop(){
		const randNumber=  Math.ceil(473*(Math.random()) ) ;
		console.log(this.props.subways[randNumber].geometry.coordinates)
		this.setState({
			destination: this.props.subways[randNumber].geometry.coordinates
		})
	}

	render(){
		console.log(this.state.destination)
		return(
			<div>
				<GoogleMapComponent
					containerElement={<div style={{height:100+"vh", width:100+"%", position:"fixed", top:0, left:0, zIndex:-1}} />}
					mapElement={ <div style={{height:100+"vh"}} /> }
					destination={ this.state.destination }
				></GoogleMapComponent>
				<LandingPage findStop={this.findStop.bind(this)}></LandingPage>	
			</div>
			
		)
	}
		
}

export default createContainer(()=>{
	Meteor.subscribe('subways');

	return{
		subways: Subways.find({}).fetch()
	}
}, Home );