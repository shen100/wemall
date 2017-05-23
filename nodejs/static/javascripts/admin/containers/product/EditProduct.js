import React, { Component }      from 'react';
import { connect }               from 'react-redux';

import {
    Button,
    Row, 
    Col,
    Form,
    Icon,
    Input,
    InputNumber,
    message,
    Modal,
    Select,
    TreeSelect,
    Upload
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
        this.onImageChange         = this.onImageChange.bind(this);
        this.onImageListChange     = this.onImageListChange.bind(this);
        this.onPreview             = this.onPreview.bind(this);
        this.onCancelPreview       = this.onCancelPreview.bind(this);
        this.onSubmit              = this.onSubmit.bind(this);

        this.state = {
            productId      : this.props.routeParams.id,
            categories     : [], //产品所属的分类
            name           : '',
            detail         : '',
            originalPrice  : 0,
            price          : 0,
            remark         : '',
            status         : '3', //等待上架
            imageID        : '',
            imageData      : '',
            imageURL       : '',
            previewVisible : false,
            previewImage   : '',
            imageList      : [],
            ueditor        : null,
            loadCalled     : false, //是否已加载UEditor
            isLoading      : true
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
                status        : product.status + '',
                imageID       : product.imageID,
                imageData     : product.imageURL,
                imageURL      : product.imageURL,
                isLoading     : false
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
    onBeforeUpload(file) {
        var isImage = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isImage) {
            message.error('只支持jpg或png格式的图片');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小要小于2M');
        }
        return isImage && isLt2M;
    }
    onImageChange(info) {
        var self = this;
        if (info.file.status === 'done') {
            self.setState({
                imageURL : info.file.response.data.url,
                imageID  : info.file.response.data.id
            });
            (function(originFileObj, callback) {
                var reader = new FileReader();
                reader.addEventListener('load', function() {
                    callback(reader.result);
                });
                reader.readAsDataURL(originFileObj);
            }(info.file.originFileObj, function(imageData) {
                self.setState({ imageData })
            }));
        }
    }
    onCancelPreview() {
        this.setState({ previewVisible: false }); 
    }
    onPreview(file) {
        this.setState({
            previewImage   : file.url || file.thumbUrl,
            previewVisible : true
        });
    }
    onImageListChange(data) {
        var fileList = data.fileList || [];
        var imageIDs = [];
        for (var i = 0; i < fileList.length; i++) {
            if (fileList[i].response) {
                imageIDs.push(fileList[i].response.data.id);
            } 
        }
        this.setState({
            imageIDs  : imageIDs,
            imageList : data.fileList
        });
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
            imageID       : this.state.imageID,
            imageIDs      : this.state.imageIDs,
            originalPrice : this.state.originalPrice,
            price         : this.state.price,
            remark        : this.state.remark,
            detail        : this.state.ueditor.getContent()
        }));
    }
    render() {
        let { data }       = this.props;
        let editLabel      = this.state.productId ? '编辑' : '添加';
        let isLoading      = this.state.isLoading; 
        let name           = this.state.name;
        let detail         = this.state.detail;
        let originalPrice  = this.state.originalPrice;
        let price          = this.state.price;
        let remark         = this.state.remark;
        let status         = this.state.status;
        let imageData      = this.state.imageData;
        let uploadURL      = pageConfig.apiPath + '/admin/upload';
        let previewVisible = this.state.previewVisible;
        let previewImage   = this.state.previewImage;
        let imageList      = this.state.imageList;

        let uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">点击上传</div>
            </div>
        );

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
                        <div id="productBox">
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
                                    <FormItem {...formItemLayout} label="商品封面图">
                                        <Upload className="image-uploader" name="upFile"
                                            showUploadList={false} action={uploadURL}
                                            beforeUpload={this.onBeforeUpload}
                                            onChange={this.onImageChange}>
                                            {
                                                imageData ?
                                                <img src={imageData} alt="" className="image" /> 
                                                :
                                                <Icon type="plus" className="image-uploader-trigger" />
                                            }
                                        </Upload>
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="商品图片集">
                                        <div className="clearfix">
                                            <Upload action={uploadURL} name="upFile"
                                                listType="picture-card"
                                                fileList={imageList}
                                                onPreview={this.onPreview}
                                                beforeUpload={this.onBeforeUpload}
                                                onChange={this.onImageListChange}>
                                            { imageList.length >= 3 ? null : uploadButton }
                                            </Upload>
                                            <Modal visible={previewVisible} onCancel={this.onCancelPreview}
                                                footer={null}>
                                                <img alt="预览图片" style={{ width: '100%' }} src={previewImage} />
                                            </Modal>
                                        </div>
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

