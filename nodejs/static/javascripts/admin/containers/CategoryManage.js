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

import requestCategoryList       from '../actions/requestCategoryList';
import changeCategoryStatus      from '../actions/changeCategoryStatus';
import Software                  from './Software';
import analyze                   from '../../sdk/analyze';
import '../../../styles/admin/categoryManage.css';

/*
 * 管理后台，商品分类管理
 */
class CategoryManage extends Component {
    constructor(props) {
        super(props);
        var self = this;
        this.state =  {
            columns: [
                {
                    title: '分类名称',
                    dataIndex: 'name'
                },
                {
                    title: '排序',
                    dataIndex: 'order'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createdAt'
                },
                {
                    title: '操作',
                    render: (text, record) => {
                        let openEnabled  = false;
                        let closeEnabled = false;
                        //1: 已开启
                        //2: 已关闭
                        if (record.status == 1) {
                            closeEnabled = true;
                        } else if (record.status == 2) {
                            openEnabled = true;
                        }
                        return (
                            <span>
                                <a>
                                    <Icon type="eye"/>
                                    <span>查看</span>
                                </a>
                                <span className="ant-divider category-manage-divider" />
                                <a>
                                    <Icon type="edit"/>
                                    <span>编辑</span>
                                </a>
                                <span className="ant-divider category-manage-divider" />
                                {
                                    openEnabled ?
                                    <Popconfirm title="确定要开启？" okText="确定" cancelText="取消"
                                        onConfirm={self.onMenuOpen.bind(self, record)}> 
                                        <a>
                                            <Icon type="arrow-up"/>
                                            <span>开启</span>
                                        </a>
                                    </Popconfirm>
                                    : 
                                    (
                                        closeEnabled ?
                                        <Popconfirm title="确定要关闭？" okText="确定" cancelText="取消" 
                                            onConfirm={self.onMenuClose.bind(self, record)}>
                                            <a>
                                                <Icon type="arrow-down"/>
                                                <span>关闭</span>
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
        dispatch(requestCategoryList());
        analyze.pv();
    }
    onMenuOpen(record) {
        const { dispatch } = this.props;
        //1: 已开启
        //2: 已关闭
        dispatch(changeCategoryStatus({
            id     : record.id,
            status : 1
        }));
    }
    onMenuClose(record) {
        const { dispatch } = this.props;
        //1: 已开启
        //2: 已关闭
        dispatch(changeCategoryStatus({
            id     : record.id,
            status : 2
        }));
    }
    render() {
        let { data }    = this.props;
        let { columns } = this.state;
        let isLoading   = data.categories.length > 0 ? false : true;
        return (
            <div>
                <Row gutter={24}>
                    <Col span={24}>
                        <div className="category-list-box">
                            <div className="category-list-title">商品分类列表</div>
                            <Table rowKey="id" columns={columns} 
                                loading={isLoading} pagination={false}
                                dataSource={data.categories} bordered /> 
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
        data: state.category
    };
}

export default connect(mapStateToProps)(CategoryManage);

