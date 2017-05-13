import React, { Component }      from 'react';
import { connect }               from 'react-redux';
import { Link }                  from 'react-router';

import { 
    Icon, 
    Row, 
    Col, 
    Popconfirm, 
    Table 
} from 'antd';

import requestProductList        from '../actions/requestProductList';
import changeProductStatus       from '../actions/changeProductStatus';
import Software                  from './Software';
import analyze                   from '../../sdk/analyze';
import '../../../styles/admin/productManage.css';

/*
 * 管理后台，商品管理
 */
class ProductManage extends Component {
    constructor(props) {
        super(props);
        var self = this;
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
                    title: '创建时间',
                    dataIndex: 'createdAt'
                },
                {
                    title: '销售额',
                    dataIndex: 'totalSale'
                },
                {
                    title: '操作',
                    render: (text, record) => {
                        let upEnabled   = false;
                        let downEnabled = false;
                        //1: 商品已上架
                        //2: 商品已下架
                        //3: 商品未上架
                        if (record.status == 2 || record.status == 3) {
                            upEnabled = true;
                        } else if (record.status == 1) {
                            downEnabled = true;
                        }
                        return (
                            <span>
                                <a>
                                    <Icon type="eye"/>
                                    <span>查看</span>
                                </a>
                                <span className="ant-divider product-manage-divider" />
                                <Link href={"#product/edit/" + record.id}>
                                    <Icon type="edit"/>
                                    <span>编辑</span>
                                </Link>
                                {
                                    upEnabled || downEnabled ?
                                    <span className="ant-divider product-manage-divider" />
                                    :
                                    null
                                }
                                {
                                    upEnabled ?
                                    <Popconfirm title="确定要上架？" okText="确定" cancelText="取消"
                                        onConfirm={self.onProductUp.bind(self, record)}> 
                                        <a>
                                            <Icon type="arrow-up"/>
                                            <span>上架</span>
                                        </a>
                                    </Popconfirm>
                                    : 
                                    (
                                        downEnabled ?
                                        <Popconfirm title="确定要下架？" okText="确定" cancelText="取消" 
                                            onConfirm={self.onProductDown.bind(self, record)}>
                                            <a>
                                                <Icon type="arrow-down"/>
                                                <span>下架</span>
                                            </a>
                                        </Popconfirm>
                                        : 
                                        null
                                    )
                                }
                            </span> 
                        );
                    }
                }
            ]
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(requestProductList());
        analyze.pv();
    }
    onProductUp(record) {
        const { dispatch } = this.props;
        //1: 商品已上架
        //2: 商品已下架
        //3: 商品未上架
        dispatch(changeProductStatus({
            id     : record.id,
            status : 1
        }));
    }
    onProductDown(record) {
        const { dispatch } = this.props;
        //1: 商品已上架
        //2: 商品已下架
        //3: 商品未上架
        dispatch(changeProductStatus({
            id     : record.id,
            status : 2
        }));
    }
    render() {
        let { data }    = this.props;
        let { columns } = this.state;
        let isLoading   = data.products.length > 0 ? false : true;
        return (
            <div>
                <Row gutter={24}>
                    <Col span={24}>
                        <div className="product-list-box">
                            <div className="product-list-title">商品列表</div>
                            <Table rowKey="id" columns={columns} 
                                loading={isLoading} pagination={false}
                                dataSource={data.products} bordered /> 
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
        data: state.product
    };
}

export default connect(mapStateToProps)(ProductManage);

