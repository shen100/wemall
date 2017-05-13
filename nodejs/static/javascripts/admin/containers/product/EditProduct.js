import React, { Component }      from 'react';
import { connect }               from 'react-redux';

import {
    Row, 
    Col,
    Form,
    Input,
    InputNumber,
    Select,
    TreeSelect
} from 'antd';

import requestProduct            from '../../actions/product/requestProduct';
import requestCategoryList       from '../../actions/category/requestCategoryList';
import Software                  from '../Software';
import utils                     from '../../utils';
import analyze                   from '../../../sdk/analyze';
import '../../../../styles/admin/product/editProduct.css';

/*
 * 管理后台，新建或编辑商品
 */
class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            productId  : this.props.routeParams.id,
            parents    : [], //父分类
            ueditor    : null
        };
    }
    componentWillMount() {
        console.log(this.state.productId);   
    }
    componentDidMount() {
        analyze.pv();
        const { dispatch } = this.props;
        console.log(this.state.productId);
        if (this.state.productId) {
            dispatch(requestProduct(this.state.productId));
        }
        dispatch(requestCategoryList());

        let configLoaded, editorLoaded;

        let self = this;

        window.UEDITOR_HOME_URL = pageConfig.UEDITOR_HOME_URL;

        function loadCallback() {
            if (configLoaded && editorLoaded) {
                var ueditor = UE.getEditor('productDetailUEditor', {
                    initialFrameWidth: '100%',
                    initialFrameHeight: 600
                });
                console.log(ueditor);
                self.setState({
                    ueditor: ueditor
                });
            }
        }

        utils.loadJS(pageConfig.sitePath + '/ueditor/ueditor.config.js', function() {
            configLoaded = true;
            loadCallback();
        });

        utils.loadJS(pageConfig.sitePath + '/ueditor/ueditor.all.js', function() {
            editorLoaded = true;
            loadCallback();
        });
    }
    onParentsChange(value) {
        console.log(value);
        this.setState({ parents: value });
    }
    onOriginalPriceChange() {
        console.log(arguments);
    }
    onPriceChange() {
        console.log(arguments);
    }
    render() {
        let { data }  = this.props;
        let isLoading = this.state.productId && !data.product ? true : false;
        let editLabel = this.state.productId ? '编辑' : '添加';
        let detail    = this.state.productId ? (data.product && data.product.detail || '') : '请编辑商品详情';

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

        const editorLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
            }
        };

        let treeData = utils.parseCategoryTree(data.categories);

        const treeProps = {
            treeData,
            value    : this.state.parents,
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
                                <FormItem {...formItemLayout} label="商品名称">
                                    <Input />
                                </FormItem>
                                <FormItem {...formItemLayout} label="父分类">
                                  <TreeSelect {...treeProps} />
                                </FormItem>
                                <FormItem {...formItemLayout} label="父分类">
                                    <Select defaultValue="3" style={{ width: 120 }} onChange={this.onStatusChange}>
                                        <Option value="3">等待上架</Option>
                                        <Option value="1">上架</Option>
                                        <Option value="2">下架</Option>
                                    </Select>
                                </FormItem>
                                <FormItem {...formItemLayout} label="原价">
                                    <InputNumber min={0} max={100} step={0.1} onChange={this.onOriginalPriceChange} />
                                </FormItem>
                                <FormItem {...formItemLayout} label="促销价">
                                    <InputNumber min={0} max={100} step={0.1} onChange={this.onPriceChange} />
                                </FormItem>
                                <FormItem {...formItemLayout} label="备注">
                                    <Input type="textarea" rows={4} />
                                </FormItem>
                                <FormItem {...editorLayout} label="商品详情">
                                    <div>
                                        <script id="productDetailUEditor" name="content" type="text/plain">{detail}</script>
                                    </div>
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
        data: state.product
    };
}

export default connect(mapStateToProps)(EditProduct);

