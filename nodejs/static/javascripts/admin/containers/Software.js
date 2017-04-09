import React, { Component } from 'react';
import { connect }          from 'react-redux';

class Platform extends Component {
    render() {
        let { software } = this.props;
        return (
            <div className="platform">
                <div className="platform-title">平台信息</div>
                <div className="platform-info">
                    <span className="platform-label">程序名称:</span>
                    <span>{software.name}</span>
                </div>
                <div className="platform-info">
                    <span className="platform-label">程序版本:</span>
                    <span>{software.version}</span>
                </div>
                <div className="platform-info">
                    <span className="platform-label">最新版本:</span>
                    <span></span>
                </div>
                <div className="platform-info">
                    <span className="platform-label">官方网址2:</span>
                    <span>{software.officialURL}</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        software: state.software
    };
}

export default connect(mapStateToProps)(Platform);