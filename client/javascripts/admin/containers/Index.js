import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Row, Col }         from 'antd';
import requestSystemIndex   from '../actions/requestSystemIndex';
import '../../../styles/admin/index.css';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(requestSystemIndex());
	}
    render() {
    	let { systemIndex } = this.props;
        return (
            <div>
                <Row gutter={24}>
                    <Col span={6}>
                        <div className="index-overview" style={{backgroundColor: '#3598dc'}}>
                            <div className="index-overview-numberwrap">
                                <p className="index-overview-number">{systemIndex.todayOrderCount}</p>
                                <p className="index-overview-desc">今日订单数</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="index-overview" style={{backgroundColor: '#e7505a'}}>
                            <div className="index-overview-numberwrap">
                                <p className="index-overview-number"><span>¥</span>{systemIndex.todayTotalSale}</p>
                                <p className="index-overview-desc">今日销售额</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="index-overview" style={{backgroundColor: '#32c5d2'}}>
                            <div className="index-overview-numberwrap">
                                <p className="index-overview-number">{systemIndex.totalOrderCount}</p>
                                <p className="index-overview-desc">总订单数</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="index-overview" style={{backgroundColor: '#8E44AD'}}>
                            <div className="index-overview-numberwrap">
                                <p className="index-overview-number"><span>¥</span>{systemIndex.totalSale}</p>
                                <p className="index-overview-desc">总销售额</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div>
                    <Row gutter={24}>
                        <Col span={12}>
                            <div className="index-box">
                                <div className="index-box-title">平台访客</div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="index-box">
                                <div className="index-box-title">最近订单</div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row gutter={24}>
                        <Col span={12}>
                            <div className="index-box">
                                <div className="index-box-title">最近评论</div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="index-box">
                                <div className="index-box-title">活跃用户</div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="index-platform">
                    <div className="index-platform-title">平台信息</div>
                    <div className="index-platform-info">
                        <span className="index-platform-label">程序名称:</span>
                        <span>{systemIndex.software.name}</span>
                    </div>
                    <div className="index-platform-info">
                        <span className="index-platform-label">程序版本:</span>
                        <span>{systemIndex.software.version}</span>
                    </div>
                    <div className="index-platform-info">
                        <span className="index-platform-label">最新版本:</span>
                        <span></span>
                    </div>
                    <div className="index-platform-info">
                        <span className="index-platform-label">官方网址:</span>
                        <span>{systemIndex.software.officialURL}</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemIndex: state.systemIndex
    };
}

export default connect(mapStateToProps)(Index);

