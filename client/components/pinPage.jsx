import React, { Component } from 'react';
import Switch from './materialize-switch';
import { createContainer } from 'meteor/react-meteor-data';
import { McDonalds2 } from '../../imports/collections/McDonalds2';

class PinPage extends Component{

	render(){
		console.log(this.props)
		return(
			<div className="pin-page">
				<h1>Is There Ice Cream?</h1>
				<Switch mcdonalds={this.props.mcdonalds2}/>
				
			</div>
		)
	}
}

export default createContainer((props)=>{
	const { pinId } = props.match.params;

	Meteor.subscribe('mcdonalds2');

	return {
		mcdonalds2:McDonalds2.findOne({_id:new Meteor.Collection.ObjectID(pinId)})
	}
},PinPage);