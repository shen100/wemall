import React, { Component } from 'react';
import { connect }   from 'react-redux';
import requestUserAnalyze from '../actions/requestUserAnalyze'

class UserAnalyze extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(requestUserAnalyze());
	}

  	render() {
		const { dispatch, userAnalyze } = this.props;
		console.log(this.props);
	    return (
	    	<div>
	        	<div>{userAnalyze.todayNewUser}</div>
	        	<div>{userAnalyze.yesterdayNewUser}</div>
	        </div>
	    )
	}
}

function mapStateToProps(state) {
	console.log(111);
	console.log(state);
    return {
        userAnalyze: state.userAnalyze
    };
}

export default connect(mapStateToProps)(UserAnalyze);