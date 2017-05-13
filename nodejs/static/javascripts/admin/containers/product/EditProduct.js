import React, { Component }      from 'react';
import { connect }               from 'react-redux';

import {
    Row, 
    Col,
    Form,
    Input,
    TreeSelect
} from 'antd';

import requestProduct            from '../actions/product/requestProduct';
import requestCategoryList       from '../actions/category/requestCategoryList';
import Software                  from './Software';
import utils                     from '../utils';
import analyze                   from '../../sdk/analyze';
import '../../../styles/admin/editProduct.css';

/*
 * 管理后台，新建或编辑商品
 */
class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            productId  : this.props.routeParams.id,
            parents    : [] //父分类
        };
    }
    componentDidMount() {
        analyze.pv();
        const { dispatch } = this.props;
        if (this.state.productId) {
            dispatch(requestProduct(this.state.productId));
        }
        dispatch(requestCategoryList());
    }
    onParentsChange(value) {
        console.log('onChange ', value, arguments);
        this.setState({ value });
    }
    render() {
        let { data }  = this.props;
        let isLoading = this.state.productId && !data.category ? true : false;
        let editLabel = this.state.productId ? '编辑' : '添加';

        const FormItem = Form.Item;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            }
        };

        let treeData = utils.parseCategoryTree(data.categories);

        const treeProps = {
            treeData,
            value    : this.state.value,
            onChange : this.onParentsChange.bind(this),
            multiple : true,
            treeCheckable: true,
            showCheckedStrategy: TreeSelect.SHOW_PARENT,
            searchPlaceholder: '选择父分类',
            style: {
                width: '100%',
            }
        };

        return (
            <div>
                <Row gutter={24}>
                    <Col span={24}>
                        <div id="productBox" className="product-box">
                            <div className="product-title">{editLabel}商品</div>
                            <Form>
                                <FormItem {...formItemLayout} label="父分类">
                                  <TreeSelect {...treeProps} />
                                </FormItem>
                            </Form>

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

export default connect(mapStateToProps)(EditProduct);

