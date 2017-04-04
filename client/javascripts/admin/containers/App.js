import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Layout }           from "antd";
import HeaderNavbar         from '../components/HeaderNavbar';
import SiderMenu            from '../components/SiderMenu';
import '../../../styles/admin/app.css';

const { Content, Sider } = Layout;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			mode: 'inline'
		};
	}
	onToggle() {
		console.log(this.state.collapsed);
		let collapsed = !this.state.collapsed;
        this.setState({
            collapsed: collapsed,
            mode: collapsed ? 'vertical' : 'inline'
        });
    }
    onCollapse(collapsed) {
    	console.log(collapsed);
	    this.setState({
	      collapsed,
	      mode: collapsed ? 'vertical' : 'inline',
	    });
    }
    render() {
    	const location = this.props.location;
        return (
        	<Layout>
        		<HeaderNavbar collapsed={this.state.collapsed}
        			onToggle={this.onToggle.bind(this)}/>
	            <Layout>
	        		<Sider
	        			trigger={null}
			          	collapsible
				        collapsed={this.state.collapsed}
				        onCollapse={this.onCollapse.bind(this)}
		        	>
		        		<SiderMenu mode={this.state.mode} 
		        			location={location} 
		        			collapsed={this.state.collapsed}/>
		        	</Sider>
	                <Layout>
	                    <Content className="content">
	                        {this.props.children}
	                    </Content>
	                </Layout>
	            </Layout>
            </Layout>
        );
    }
}

export default connect()(App);