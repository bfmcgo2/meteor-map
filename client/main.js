import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/app';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import PinPage from './components/pinPage';
import { McDonalds2 } from '../imports/collections/McDonalds2'
import Mapbox from './components/mapbox';

const routes = (
	<BrowserRouter>
		<div>
			<App />
			<Switch>

				<Route exact path="/" component={Mapbox}/>
				<Route path='/pin/:pinId' component={PinPage}/>
			</Switch>
		</div>
	</BrowserRouter>
)


Meteor.startup(()=>{
	ReactDOM.render(routes , document.querySelector('.render-target'));
	
});