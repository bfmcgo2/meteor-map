import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'McDonalds2.update':function(pinId, active){
		return McDonalds2.update({_id:pinId},{
			$set:{activeMachine:active}
		})
	}

})

export const McDonalds2 = new Mongo.Collection('mcdonalds2');