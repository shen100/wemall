import React, { Component } from 'react';
import { connect }   from 'react-redux';

class Index extends Component {
    render() {
    	console.log(212121)
        return (
            <div>Index2222</div>
        );
    }
}

console.log('=====')
//module.exports = connect()(Index);

export default connect()(Index);