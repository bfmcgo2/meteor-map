import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import { createContainer } from 'meteor/react-meteor-data';
import { McDonalds } from '../../imports/collections/McDonalds';
import { McDonalds2 } from '../../imports/collections/McDonalds2';
import { Link } from 'react-router-dom';



class Mapbox extends Component{
	constructor(props) {
		super(props);
		this.state={
			coordinates:[]
		}
	}

	

	renderPins(){
		if(!this.props.mcdonalds2){
			return
		}else{
			// console.log(this.props.match)
			var pins = this.props.mcdonalds2.map(pin=>{
				const url = `/pin/${pin._id._str}`;
				// console.log(url)
				if(pin.activeMachine === true){
					console.log("yay")
					return(
						<Marker
						  coordinates={pin.coordinates}
						  anchor="bottom"
						  key= {pin._id._str}
						  >
						  <Link to={url}>

						  	<img className="mcdonalds-img" src="/img/mcdonalds-01.svg"/>	
						  </Link>
						  
						</Marker>
					)
				}else{
					console.log("nay")
					return(
						<Marker
						  coordinates={pin.coordinates}
						  anchor="bottom"
						  key= {pin._id._str}
						  >
						  <Link to={url}>

						  	<img className="mcdonalds-img" src="/img/mcdonalds-01-black.svg"/>	
						  </Link>
						  
						</Marker>
					)
				}
				
			})
			return pins;
		}
		
	}


	render(){
		// console.log(this.props)
		const Map= ReactMapboxGl({
			accessToken: "pk.eyJ1IjoiYmZtY2dvMiIsImEiOiJlS0c1a1drIn0.GNJBFHhd6pqumZDjScZF7Q",
			maxBounds:[
						[-74.04728500751165, 40.68392799015035], // Southwest coordinates
					    [-73.91058699000139, 40.87764500765852]
					    ]
		})

		return(
			<Map
			  style="mapbox://styles/bfmcgo2/cj5a1q7sl052z2rr7wii1xvai"
			  containerStyle={{
			    height: "100vh",
			    width: "100vw"
			  }}
			  center={[ -73.98683155673378,40.74319187080346 ]}

			  >	 
			  
			  {this.renderPins()}
			</Map>
		)

		
		
	}
}

export default createContainer(()=>{
	Meteor.subscribe('mcdonalds');
	Meteor.subscribe('mcdonalds2');

	return{
		mcdonalds:McDonalds.find({}).fetch(),
		mcdonalds2:McDonalds2.find({}).fetch()
	}
}, Mapbox);