import React, { Component }      from 'react';
import { connect }               from 'react-redux';

import {
    Row, 
    Col,
    Form,
    Input,
    TreeSelect
} from 'antd';

import requestCategory           from '../actions/category/requestCategory';
import requestCategoryList       from '../actions/category/requestCategoryList';
import Software                  from './Software';
import utils                     from '../utils';
import analyze                   from '../../sdk/analyze';
import '../../../styles/admin/editCategory.css';

/*
 * 管理后台，新建或添加商品分类
 */
class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            categoryId : this.props.routeParams.id,
            parents    : [] //父分类
        };
        console.log(this.state.categoryId);
    }
    componentDidMount() {
        analyze.pv();
        const { dispatch } = this.props;
        if (this.state.categoryId) {
            dispatch(requestCategory(this.state.categoryId));
        }
        dispatch(requestCategoryList());
    }
    onParentsChange(value) {
        console.log('onChange ', value, arguments);
        this.setState({ value });
    }
    render() {
        let { data }  = this.props;
        let isLoading = data.category ? false : true;
        let editLabel = this.state.categoryId ? '编辑' : '添加';

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
                width: 300,
            }
        };

        return (
            <div>
                <Row gutter={24}>
                    <Col span={24}>
                        <div id="categoryBox" className="category-box">
                            <div className="category-title">{editLabel}商品分类</div>
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

export default connect(mapStateToProps)(EditCategory);

