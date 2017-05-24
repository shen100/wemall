import React, { Component }      from 'react';
import { connect }               from 'react-redux';

import {
    Button,
    Row, 
    Col,
    Form,
    Input,
    Switch,
    InputNumber,
    TreeSelect
} from 'antd';

import requestCategory           from '../../actions/category/requestCategory';
import requestSaveCategory       from '../../actions/category/requestSaveCategory';
import requestCategoryList       from '../../actions/category/requestCategoryList';
import Software                  from '../Software';
import utils                     from '../../utils';
import analyze                   from '../../../sdk/analyze';
import '../../../../styles/admin/category/editCategory.css';

/*
 * 管理后台，新建或编辑商品分类
 */
class EitCategory extends Component {
    constructor(props) {
        super(props);
        this.onNameBlur        = this.onNameBlur.bind(this);
        this.onCategoryChange  = this.onCategoryChange.bind(this);
        this.onRemarkBlur      = this.onRemarkBlur.bind(this);
        this.onStatusChange    = this.onStatusChange.bind(this);
        this.onOrderChange     = this.onOrderChange.bind(this);
        this.onSubmit          = this.onSubmit.bind(this);

        this.state = {
            categoryId : this.props.routeParams.id,
            parentId   : '',
            parentKey  : [], //父分类, 初始为数组是为了让树形控件显示placeholder
            name       : '',
            remark     : '',
            treeData   : [],
            checked    : false,
            status     : 2,
            sequence   : 0
        };
    }
    componentDidMount() {
        analyze.pv();
        const { dispatch } = this.props;
        if (this.state.categoryId) {
            dispatch(requestCategory(this.state.categoryId));
        }
        dispatch(requestCategoryList());
    }
    componentWillReceiveProps(nextProps) {
        var category       = nextProps.data.category;
        var categories     = nextProps.data.categories;
        if (category && categories && categories.length > 0) {
            this.setState({
                categoryId    : category.id,
                parentId      : category.parentId,
                parentKey     : utils.parseTreeNodeKey(categories, category.parentId),
                name          : category.name,
                remark        : category.remark,
                treeData      : utils.parseTree(categories, {
                    withRoot: true
                }),
                checked       : category.status == 1,
                status        : category.status,
                sequence      : category.sequence
            });
        }
    }
    onNameBlur(event) {
        this.setState({ name: event.target.value });
    }
    onCategoryChange(value) {
        var arr = value.split('-');
        this.setState({ 
            parentId  : arr[arr.length - 1],
            parentKey : value
        });
    }
    onRemarkBlur(event) {
        this.setState({ remark: event.target.value });
    }
    onStatusChange(value) {
        this.setState({
            status: value ? 1 : 2
        });
    }
    onOrderChange(value) {
        this.setState({
            sequence: value
        });
    }
    onSubmit() {
        var parentId = parseInt(this.state.parentId);
        if (parentId == this.state.categoryId) {
            alert('不能选择自身作为父分类');
            return;
        }
        const { dispatch } = this.props;
        dispatch(requestSaveCategory({
            id       : this.state.categoryId,
            name     : this.state.name,
            parentId : parseInt(this.state.parentId),
            remark   : this.state.remark,
            status   : this.state.status,
            sequence : this.state.sequence
        }));
    }
    render() {
        let { data }  = this.props;
        let editLabel = this.state.categoryId ? '编辑' : '添加';
        let isLoading = this.state.categoryId 
            && (!data.category || !data.categories || data.categories.length <= 0) 
            ? true : false;
        
        let name      = this.state.name;
        let remark    = this.state.remark;
        let treeData  = this.state.treeData;
        let checked   = this.state.checked;
        let sequence  = this.state.sequence;

        const FormItem = Form.Item;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3  },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            }
        };

        return (
            <div>
                <Row gutter={24}>
                    <Col span={24}>
                        <div className="category-box">
                            <div className="category-title">{editLabel}商品分类</div>
                            {
                                isLoading ? null :
                                <Form>
                                    <FormItem {...formItemLayout} label="名称">
                                        <Input defaultValue={name} onBlur={this.onNameBlur}/>
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="父分类">
                                        <TreeSelect
                                            style={{ width: '100%' }}
                                            value={this.state.parentKey}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={treeData}
                                            placeholder="请选择父分类"
                                            treeDefaultExpandAll
                                            onChange={this.onCategoryChange} />
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="状态">
                                        <Switch onChange={this.onStatusChange} defaultChecked={checked} 
                                            checkedChildren={'开启'} unCheckedChildren={'关闭'}/>
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="排序">
                                        <InputNumber min={0} max={10000} defaultValue={sequence} onChange={this.onOrderChange} />
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="备注">
                                        <Input type="textarea" defaultValue={remark} rows={4} onBlur={this.onRemarkBlur}/>
                                    </FormItem>
                                </Form>
                            }
                        </div>
                    </Col>
                    <Col span={24}>
                        <Col span={15} className="submit-box">
                            <Button onClick={this.onSubmit} type="primary" size="large">保存</Button>
                            <Button className="submit-cancel-btn" size="large">取消</Button>
                        </Col>
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

export default connect(mapStateToProps)(EitCategory);

