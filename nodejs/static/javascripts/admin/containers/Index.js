import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Row, Col }         from 'antd';
import LineChart            from '../components/LineChart';
import Software             from './Software';
import requestSystemIndex   from '../actions/requestSystemIndex';
import requestRecentPV      from '../actions/requestRecentPV';
import analyze              from '../../sdk/analyze';
import '../../../styles/admin/index.css';

/*
 * 管理后台首页
 */
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(requestSystemIndex());
        dispatch(requestRecentPV());
        analyze.pv();
	}
    render() {
    	let { data } = this.props;
        return (
            <div>
                <Row gutter={24}>
                    <Col span={6}>
                        <div className="index-overview" style={{backgroundColor: '#3598dc'}}>
                            <div className="index-overview-numberwrap">
                                <p className="index-overview-number">{data.todayOrderCount}</p>
                                <p className="index-overview-desc">今日订单数</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="index-overview" style={{backgroundColor: '#e7505a'}}>
                            <div className="index-overview-numberwrap">
                                <p className="index-overview-number"><span>¥</span>{data.todayTotalSale}</p>
                                <p className="index-overview-desc">今日销售额</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="index-overview" style={{backgroundColor: '#32c5d2'}}>
                            <div className="index-overview-numberwrap">
                                <p className="index-overview-number">{data.totalOrderCount}</p>
                                <p className="index-overview-desc">总订单数</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="index-overview" style={{backgroundColor: '#8E44AD'}}>
                            <div className="index-overview-numberwrap">
                                <p className="index-overview-number"><span>¥</span>{data.totalSale}</p>
                                <p className="index-overview-desc">总销售额</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <div className="index-box">
                            <div className="index-box-title">平台访客</div>
                            <div className="index-box-chart">
                                <LineChart collapsed={this.props.collapsed} 
                                    title="PV" xName="date" yName="pv" 
                                    yLabel="PV"
                                    data={data.recentPV}></LineChart>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="index-box">
                            <div className="index-box-title">最近订单</div>
                        </div>
                    </Col>
                </Row>
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
                <Software />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.systemIndex
    };
}

export default connect(mapStateToProps)(Index);

