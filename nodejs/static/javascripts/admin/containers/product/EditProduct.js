import React, { Component }      from 'react';
import { connect }               from 'react-redux';

import {
    Button,
    Row, 
    Col,
    Form,
    Input,
    InputNumber,
    Select,
    TreeSelect
} from 'antd';

import requestProduct            from '../../actions/product/requestProduct';
import requestSaveProduct        from '../../actions/product/requestSaveProduct';
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
        this.onNameBlur            = this.onNameBlur.bind(this);
        this.onCategoriesChange    = this.onCategoriesChange.bind(this);
        this.onOriginalPriceBlur   = this.onOriginalPriceBlur.bind(this);
        this.onPriceBlur           = this.onPriceBlur.bind(this);
        this.onRemarkBlur          = this.onRemarkBlur.bind(this);
        this.onStatusChange        = this.onStatusChange.bind(this);
        this.onSubmit              = this.onSubmit.bind(this);

        this.state = {
            productId     : this.props.routeParams.id,
            categories    : [], //产品所属的分类
            name          : '',
            detail        : '',
            originalPrice : 0,
            price         : 0,
            remark        : '',
            status        : '3', //等待上架
            ueditor       : null,
            loadCalled    : false
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
    loadUEditor() {
        if (this.state.loadCalled) {
            return;
        }
        this.setState({
            loadCalled: true
        });

        window.UEDITOR_HOME_URL = pageConfig.ueditorURL;

        let configLoaded, editorLoaded;

        let self = this;

        function loadCallback() {
            if (configLoaded && editorLoaded) {
                var ueditor = UE.getEditor('productDetailUEditor', {
                    initialFrameWidth  : '100%',
                    initialFrameHeight : 600
                });
                self.setState({
                    ueditor: ueditor
                });
            }
        }

        utils.loadJS(pageConfig.sitePath + '/ueditor/ueditor.config.js', function() {
            configLoaded = true;
            loadCallback();
        });

        utils.loadJS(pageConfig.sitePath + '/ueditor/ueditor.all.min.js', function() {
            editorLoaded = true;
            loadCallback();
        });
    }
    componentWillReceiveProps(nextProps) {
        var product       = nextProps.data.product;
        var allCategories = nextProps.data.categories;
        if (product && allCategories && allCategories.length > 0) {
            var categories = [];
            for (var i = 0; i < product.categories.length; i++) {
                var parentId = product.categories[i].parentId;
                var id       = product.categories[i].id;
                categories.push(utils.parseTreeNodeKey(allCategories, id));
            }
            this.setState({
                productId     : product.id,
                categories    : categories,
                name          : product.name,
                detail        : product.detail,
                originalPrice : product.originalPrice,
                price         : product.price,
                remark        : product.remark,
                status        : product.status + ''
            });
            this.loadUEditor();
        }
    }
    onNameBlur(event) {
        this.setState({ name: event.target.value });
    }
    onCategoriesChange(value) {
        this.setState({ categories: value });
    }
    onOriginalPriceBlur(event) {
        var price = event.target.value;
        price     = Number(price);
        this.setState({ originalPrice: price });
    }
    onPriceBlur(event) {
        var price = event.target.value;
        price     = Number(price);
        this.setState({ price: price });
    }
    onRemarkBlur(event) {
        this.setState({ remark: event.target.value });
    }
    onStatusChange(status) {
        this.setState({ status: status });
    }
    onSubmit() {
        if (!this.state.ueditor) {
            return;
        }
        const { dispatch } = this.props;
        dispatch(requestSaveProduct({
            id            : this.state.productId,
            name          : this.state.name,
            categories    : this.state.categories,
            status        : this.state.status,
            originalPrice : this.state.originalPrice,
            price         : this.state.price,
            remark        : this.state.remark,
            detail        : this.state.ueditor.getContent()
        }));
    }
    render() {
        let { data }  = this.props;
        let editLabel = this.state.productId ? '编辑' : '添加';
        let isLoading = this.state.productId && !data.product ? true : false;
        
        let name          = this.state.name;
        let detail        = this.state.detail;
        let originalPrice = this.state.originalPrice;
        let price         = this.state.price;
        let remark        = this.state.remark;
        let status        = this.state.status;

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

        const editorLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3  },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
            }
        };

        let treeData = utils.parseTree(data.categories);

        const treeProps = {
            treeData,
            value    : this.state.categories,
            onChange : this.onCategoriesChange,
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
                            {
                                isLoading ? null :
                                <Form>
                                    <FormItem {...formItemLayout} label="商品名称">
                                        <Input defaultValue={name} onBlur={this.onNameBlur}/>
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="商品分类">
                                        <TreeSelect {...treeProps} />
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="商品状态">
                                        <Select defaultValue={status} style={{ width: 120 }} onChange={this.onStatusChange}>
                                            <Select.Option value="3">等待上架</Select.Option>
                                            <Select.Option value="1">上架</Select.Option>
                                            <Select.Option value="2">下架</Select.Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="原价">
                                        <InputNumber min={0} max={100} defaultValue={originalPrice} step={0.1} onBlur={this.onOriginalPriceBlur} />
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="促销价">
                                        <InputNumber min={0} max={100} defaultValue={price} step={0.1} onBlur={this.onPriceBlur} />
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="备注">
                                        <Input type="textarea" defaultValue={remark} rows={4} onBlur={this.onRemarkBlur}/>
                                    </FormItem>
                                    <FormItem {...editorLayout} label="商品详情">
                                        <div>
                                            <script id="productDetailUEditor" name="content" type="text/plain">{detail}</script>
                                        </div>
                                    </FormItem>
                                </Form>
                            }
                        </div>
                    </Col>
                    <Col span={24} className="submit-box">
                        <Button onClick={this.onSubmit} type="primary" size="large">保存</Button>
                        <Button className="submit-cancel-btn" size="large">取消</Button>
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

