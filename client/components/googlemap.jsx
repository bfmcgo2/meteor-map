import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";
import { createContainer } from 'meteor/react-meteor-data';
import { Subways } from '../../imports/collections/Subways';
import { Link } from 'react-router-dom';

class GoogleMapComponent extends Component{
	constructor(){
		super()
		this.state={
			map:null,
			directions:null,
			origin:null,
			destination: null,
			center: {
				lat: 40.74319187080346, lng: -73.98683155673378
			},
			zoom:  14 
		}
	}
	
	// shouldComponentUpdate(nextProps, nextState){


	// 	console.log(nextProps, nextState)
	// 	if(this.props.destination != null){
	// 		this.setState({
	// 			destination: new google.maps.LatLng(this.props.destination[1], this.props.destination[0])
	// 		})

	// 	}
	// 	return false
	// }
	componentWillReceiveProps(nextProps){
		// console.log(nextProps)
		if(nextProps.destination){
			this.setState({
				destination: new google.maps.LatLng(nextProps.destination[1], nextProps.destination[0])
			})
		}

	}


	componentDidUpdate(){
		if(this.state.destination && this.state.origin){

			const DirectionsService = new google.maps.DirectionsService();

			DirectionsService.route({
				origin: this.state.origin,
				destination: this.state.destination,
				travelMode: google.maps.TravelMode.TRANSIT,
				transitOptions:{
					modes: [google.maps.TransitMode.SUBWAY]
				}
			}, (result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					this.setState({
					directions: result,
				});
				} else {
					console.error(`error fetching directions ${result}`);
				}
			});

		}		
	}

	componentDidMount(){
		// Directions Services
		

		// End Directions Services

		// Current Location
		 let geoSuccess = function(position) {
		 	let startPos = position;
		 	this.setState({
		 		center:{
		 			lat:startPos.coords.latitude, lng: startPos.coords.longitude
		 		},
		 		zoom:  17 ,
		 		origin:new google.maps.LatLng(startPos.coords.latitude, startPos.coords.longitude),

		 	})
		}.bind(this)
		if (navigator.geolocation) {
		  console.log('Geolocation is supported!');
		  navigator.geolocation.getCurrentPosition(geoSuccess);
		}
		else {
		  console.log('Geolocation is not supported for this Browser/OS.');
		}  

    }
	    

	mapMoved(){
		console.log('mapMoved: ' + JSON.stringify(this.state.map.getCenter()))
	}

	mapLoaded(map){
		// console.log('mapLoaded: '+ JSON.stringify(map.getCenter()))
		if(this.state.map != null)
			return

		this.setState({
			map:map
		})
	}

	renderDirections(){
		if(this.props.destination != this.state.destination){

			return(
				this.state.directions && <DirectionsRenderer directions={this.state.directions} />
			)
		}
	}



	render(){
		console.log(this.state)
		return(

			<GoogleMap
				ref= { this.mapLoaded.bind(this) }
				onDragEnd={ this.mapMoved.bind(this) }
			    zoom={ this.state.zoom }
			    center={ this.state.center }
			  >
			    {this.props.subways.map(marker => (
			      <Marker 
			      position={{lat:marker.geometry.coordinates[1], lng:marker.geometry.coordinates[0]}} 
			      key={ marker._id }  />
			    ))}

			    {this.renderDirections()}
			</GoogleMap>
		)
		
	}
}

export default createContainer(()=>{
	Meteor.subscribe('subways');

	return{
		subways: Subways.find({}).fetch()
	}
}, withGoogleMap( GoogleMapComponent ) );