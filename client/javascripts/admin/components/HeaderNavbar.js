import React, { Component } from 'react';
import { Layout, Icon }     from 'antd';

const { Header } = Layout;

export default class extends React.Component {
    render() {
    	let logoStyle = {
    		display: this.props.collapsed ? 'none' : 'block'
    	};
    	let togglerStyle = {};
    	if (this.props.collapsed) {
    		togglerStyle.marginLeft = '22px';
    	}
        return (
        	<div className="header-navbar">
        		<div className="header-navbar-logo" style={logoStyle}></div>
            	<div className="sidebar-toggler" style={togglerStyle} onClick={this.props.onToggle}>
            		<span></span>
               	</div>
            </div>
        );
    }
}