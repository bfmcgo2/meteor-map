import React, { Component } from 'react';

class Switch extends Component{
	constructor(props) {
		super(props);
		this.toggleSwitch = this.toggleSwitch.bind(this);
		this.state={
			isChecked : true
		}
	}

	toggleSwitch(e){
		const checkState = this.state.isChecked;
		this.setState({
			isChecked: e.target.checked
		})
	}

	updateIceCream(e){
		Meteor.call('McDonalds2.update', this.props.mcdonalds._id, this.state.isChecked);
		console.log("clicked")
	}

	render(){
		console.log(this.state.isChecked, this.props)
		return(
			<div className="switch">
			    <label>
			      Not Working
			      <input type="checkbox" onClick={this.toggleSwitch} checked={this.state.isChecked}/>
			      <span className="lever"></span>
			      Working
			    </label>

			    <br/>
			    <br/>
			    <button onClick={this.updateIceCream.bind(this)} className="btn waves-effect waves-light" type="submit" name="action">Submit
			      </button>
			  </div>
		)
	}
}

export default Switch;