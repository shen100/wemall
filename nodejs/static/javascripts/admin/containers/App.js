import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Layout }           from "antd";
import HeaderNavbar         from '../components/HeaderNavbar';
import Sidebar              from '../components/Sidebar';
import '../../../styles/admin/app.css';

const { Content, Sider } = Layout;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed : false,
			mode      : 'inline'
		};
	}
	onToggle() {
		let collapsed = !this.state.collapsed;
        this.setState({
            collapsed : collapsed,
            mode      : collapsed ? 'vertical' : 'inline'
        });
    }
    render() {
    	let location = this.props.location;
    	let children = this.props.children;
    	let childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, {
			collapsed: this.state.collapsed
		}));
        return (
        	<Layout>
        		<HeaderNavbar 
        			collapsed={this.state.collapsed}
        			onToggle={this.onToggle.bind(this)}/>
	            <Layout>
	        		<Sider 
	        			trigger={null}
			          	collapsible
				        collapsed={this.state.collapsed}>
		        		<Sidebar 
		        			mode={this.state.mode} 
		        			location={location}/>
		        	</Sider>
	                <Layout>
	                    <Content className="content">
	                        {childrenWithProps}
	                    </Content>
	                </Layout>
	            </Layout>
            </Layout>
        );
    }
}

export default connect()(App);