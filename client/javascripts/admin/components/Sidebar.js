import React, { Component }   from 'react';
import { Layout, Menu, Icon } from 'antd';
import { hashHistory }        from 'react-router';
import config                 from '../config';
import utils                  from '../utils';

const { Sider } = Layout;
const SubMenu   = Menu.SubMenu;

class Sidebar extends React.Component {
    constructor(props) {
  	    super(props);
  	    this.state = {
	        theme            : 'dark',
	        inlineOpenKeys   : [],
	        verticalOpenKeys : [],
	        current          : '',
	        sidebarData      : []
	    };
    }
    componentDidMount() {
    	var curData = utils.getSidebarCurData(config.sidebarData, this.props.location);
    	
    	let theState = {
    		current     : curData.parent.id + '-' + curData.menuItem.id + '-' + curData.menuItem.url,
    		sidebarData : config.sidebarData
    	};
    	if (this.props.mode == 'inline') {
    		theState.inlineOpenKeys = [curData.openKey];
    	}
    	this.setState(theState);
    }
    onOpenChange(openKeys) {
    	console.log("onOpenChange", openKeys);
    	if (this.props.mode != 'inline') {
    		return;
    	}
	    let state = this.state;
		if (!openKeys || openKeys.length <= 0) {
	    	return this.setState({ inlineOpenKeys: [] });
	    }

	    let latestOpenKey = openKeys.find(function(item) {
	    	return !(state.inlineOpenKeys.indexOf(item) > -1);
	    });

	    if (latestOpenKey) {
			return this.setState({
				inlineOpenKeys: [latestOpenKey] 
			});
	    }
  	}
    handleClick(event) {
    	let arr      = event.key.split('-');
        let parentId = arr[0];
        let url      = arr[2];

    	if (this.props.mode != 'inline') {
    		this.setState({
    			inlineOpenKeys   : [parentId],
				verticalOpenKeys : [] 
			});
    	}
        this.setState({
            current: event.key
        });

		hashHistory.push(url.substr(1));
    }
    onMouseEnterSubMenu(event) {
    	console.log(this.props.mode);
    	console.log(event);
    	if (this.props.mode != 'inline') {
    		this.setState({
				verticalOpenKeys: [event.key] 
			});
    	}
    }
    onMouseLeaveSubMenu(event) {
    	console.log("onMouseLeaveSubMenu");
    	if (this.props.mode != 'inline') {
    		this.setState({
				verticalOpenKeys: [] 
			});
    	}
    }
    render() {
    	let self = this;
    	let openKeys;
    	if (this.props.mode != 'inline') {
    		openKeys = this.state.verticalOpenKeys;
    	} else {
    		openKeys = this.state.inlineOpenKeys;
    	}
        return (
            <Menu
                theme={this.state.theme}
                onOpenChange={this.onOpenChange.bind(this)}
	            selectedKeys={[this.state.current]}
	            openKeys={openKeys}
	            mode={this.props.mode}
	            onClick={this.handleClick.bind(this)}
            >
                {this.state.sidebarData.map(function(subMenu) {
	                return (
	                    <SubMenu key={subMenu.id} 
	                    	onMouseEnter={self.onMouseEnterSubMenu.bind(self)}
	                    	onMouseLeave={self.onMouseLeaveSubMenu.bind(self)}
	                    	title={<span><Icon type="team" /><span className="nav-text">{subMenu.title}</span></span>}>
	                        {subMenu.children.map(function(item) {
	                            return (
	                                <Menu.Item key={subMenu.id + '-' + item.id + '-' + item.url}>{item.title}</Menu.Item>
	                            );
	                        })}
	                    </SubMenu>
	                );
	            })}
            </Menu>
        );
    }
}

export default Sidebar;