import React, { Component }      from 'react';
import { connect }               from 'react-redux';
import { Link }                  from 'react-router';
import { Row, Col, Table }       from 'antd';
import Software                  from './Software';
import requestHotProducts        from '../actions/requestHotProducts';
import analyze                   from '../../sdk/analyze';
import '../../../styles/admin/productAnalyze.css';

/*
 * 管理后台，商品分析
 */
class ProductAnalyze extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            columns: [
                {
                    title: '商品名称',
                    dataIndex: 'name'
                },
                {
                    title: '浏览量',
                    dataIndex: 'browseCount'
                },
                {
                    title: '购买量',
                    dataIndex: 'buyCount'
                },
                {
                    title: '销售额',
                    dataIndex: 'totalSale'
                },
                {
                    title: '操作',
                    render: (text, record) => (
                        <Link to={{ pathname: '/product', query: { id: record.id } }}>
                            <span>查看</span>
                        </Link>
                    )
                }
            ]
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(requestHotProducts());
        analyze.pv();
    }
    render() {
        let { data }    = this.props;
        let { columns } = this.state;
        let isLoading   = data.hotProducts.length > 0 ? false : true;
        return (
            <div>
                <Row gutter={24}>
                    <Col span={24}>
                        <div className="product-hot-box">
                            <div className="product-hot-title">热销商品</div>
                            <Table rowKey="id" columns={columns} 
                                loading={isLoading} pagination={false}
                                dataSource={data.hotProducts} bordered /> 
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
        data: state.productAnalyze
    };
}

export default connect(mapStateToProps)(ProductAnalyze);

