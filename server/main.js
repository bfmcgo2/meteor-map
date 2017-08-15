import { Meteor } from 'meteor/meteor';
import { McDonalds } from '../imports/collections/McDonalds';
import { McDonalds2 } from '../imports/collections/McDonalds2';

Meteor.startup(() => {
	Meteor.publish('mcdonalds', function(){
		return McDonalds.find();
	})
	Meteor.publish('mcdonalds2', function(){
		return McDonalds2.find();
	})
});
