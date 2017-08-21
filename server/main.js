import { Meteor } from 'meteor/meteor';
import { McDonalds } from '../imports/collections/McDonalds';
import { McDonalds2 } from '../imports/collections/McDonalds2';
import { Subways } from '../imports/collections/Subways';

Meteor.startup(() => {
	Meteor.publish('mcdonalds', function(){
		return McDonalds.find();
	})
	Meteor.publish('mcdonalds2', function(){
		return McDonalds2.find();
	})
	Meteor.publish('subways', function(){
		return Subways.find();
	})
});
