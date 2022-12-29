import React from "react";

import { Form, Input, Select } from "antd";
import { Button, message, Space } from "antd";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Image } from "react-bootstrap";
import { notification } from "antd";
import "./AddProductItem.css";
import Axios from "axios";
import swal from "sweetalert";

class AddProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductName: "",
      ProductNewPrice: "",
      ProductOldPrice: "",
      ProductType: "",
      ProductURL: "",
      ProductDetail: "",
      ProductAvailableQty: "",
      GetProductDetails: [],
    };

    this.AddProductItemDetails = () => {
      if (
        this.state.ProductName.length !== 0 &&
        this.state.ProductNewPrice.length !== 0 &&
        this.state.ProductOldPrice.length !== 0
      ) {
        var ProdOld = parseInt(this.state.ProductOldPrice);
        var ProdNew = parseInt(this.state.ProductNewPrice);
        Axios.post(`http://localhost:5000/api/InsertProductDetails`, {
          ProductName: this.state.ProductName,
          ProductDetail: this.state.ProductDetail,
          ProductOldPrice: ProdOld,
          ProductNewPrice: ProdNew,
          ProductURL: this.state.ProductURL,
          ProductType: this.state.ProductType,
          ProductAvailableQty: this.state.ProductAvailableQty,
          ProductStatus:"A"
        }).then((res) => {
          swal({
            title: "item added Successfully",
            text: "",
            icon: "success",
            button: "continue",
          }).then(window.location.reload());
        });
      } else {
        swal({
          title: "Items Not added Successfully",
          text: "Please try again",
          icon: "warning",
          button: "continue",
        })
      }
    };
    this.EditProductItemDetails =()=>{
      if (
        (this.state.ProductName.length || this.props?.value?.ProductName.length !== 0) &&
        (this.state.ProductNewPrice.length || this.props?.value?.ProductOldPrice.length !== 0) &&
        (this.state.ProductOldPrice.length ||this.props?.value?.ProductNewPrice.length !== 0)
      ) {
        var ProdOld = parseInt(this.state.ProductOldPrice) || parseInt(this.props?.value?.ProductOldPrice) ;
        var ProdNew = parseInt(this.state.ProductNewPrice)|| parseInt(this.props?.value?.ProductNewPrice);
        Axios.post(`http://localhost:5000/api/UpdateProductDetails/${this.props?.value?.ProductID}`, {
          ProductName: this.state.ProductName || this.props?.value?.ProductName,
          ProductDetail: this.state.ProductDetail || this.props?.value?.ProductDetail,
          ProductOldPrice: ProdOld,
          ProductNewPrice: ProdNew,
          ProductURL: this.state.ProductURL || this.props?.value?.ProductImageURL,
          ProductType: this.state.ProductType || this.props?.value?.ProductType,
          ProductAvailableQty: this.state.ProductAvailableQty || this.props?.value?.ProductAvailableQty,
          ProductStatus:"A"
        }).then((res) => {
          swal({
            title: "item Modified Successfully",
            text: "",
            icon: "success",
            button: "continue",
          }).then(window.location.reload());
        });
      } else {
        swal({
          title: "item not modified",
          text: "Please try again",
          icon: "warning",
          button: "continue",
        })
      }
    }
    
    this.componentDidMount = () => {
      console.log(this.props,"gggggggggggggggggggggggg")
      this.setState({ProductURL:this.props?.value.ProductImageURL})
    };
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col md={8}>
              <Form layout="horizontal">
                <Form.Item
                  className="AddItemIndetails"
                  label="Product Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Product Name",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      this.setState({ ProductName: e.target.value });
                    }}
                    defaultValue={this.props?.value?.ProductName}
                  />
                </Form.Item>
                <Form.Item
                  className="AddItemIndetails"
                  label="Product Details"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Product Details",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      this.setState({ ProductDetail: e.target.value });
                    }}
                    defaultValue={this.props?.value?.ProductDetail}
                  />
                </Form.Item>
                <Row>
                  <Col>
                    <Form.Item
                      className="AddItemIndetails"
                      label="Product Old Price"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Product Old Price",
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => {
                          this.setState({ ProductOldPrice: e.target.value });
                        }}
                        defaultValue={this.props?.value?.ProductOldPrice}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      className="AddItemIndetails"
                      label="Product New Price"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Product New Price",
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => {
                          this.setState({ ProductNewPrice: e.target.value });
                        }}
                        defaultValue={this.props?.value?.ProductNewPrice}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {" "}
                    <Form.Item
                      label="Product Type"
                      className="AddItemIndetails"
                    >
                      <Select
                        onChange={(e) => {
                          this.setState({ ProductType: e });
                        }}
                        defaultValue={this.props?.value?.ProductType}
                      >
                        
                        <Select.Option value="vegetable">
                          Vegetable
                        </Select.Option>
                        <Select.Option value="Fruit">Fruit</Select.Option>
                        <Select.Option value="Leave">Leave</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      className="AddItemIndetails"
                      label="Product Available Qty"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Product Available Qty",
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) => {
                          this.setState({
                            ProductAvailableQty: e.target.value,
                          });
                        }}
                        defaultValue={this.props?.value?.ProductAvailableQty}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  className="AddItemIndetails"
                  label="Product URL"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Product Image URL",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      this.setState({ ProductURL: e.target.value });
                    }}
                    defaultValue={this.props?.value?.ProductImageURL}
                  />
                </Form.Item>
                <Form.Item className="AddItemIndetails">
                  {this.props?.type == "ADD" ? (
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login_form_button_AddItem"
                      onClick={this.AddProductItemDetails}
                    >
                      Add Product
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login_form_button_AddItem"
                      onClick={this.EditProductItemDetails}
                    >
                      Edit Product
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </Col>
            <Col md={4}>
              <div className="Image_form_button_Col">
                <img
                  src={this.state.ProductURL}
                  width="100%"
                  height="100%"
                  alt="Product Image"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default AddProductItem;
