import React from "react";
import { Card } from "antd";
import { Container } from "react-bootstrap";
import { Row, Col, Modal } from "react-bootstrap";
import "./UserAddress.css";
import { MdAddCircleOutline } from "react-icons/md";
import { Button } from "antd";
import { Form, Input, Select,Drawer } from "antd";
import Axios from "axios";

class UserAddress extends React.Component {
  constructor() {
    super();
    this.state = {
      OpenModal: false,
      heelo: [],
      DoorNo:"",
      Building:"",
      Street:"",
      LandMark:"",
      Village:"",
      Pincode:"",
      City:""
    };
    this.componentDidMount = () => {
        Axios.get(`http://localhost:5000/api/getProductDetails`).then((res) => {
          var data = res.data;
          this.setState({ AllProductList: data });
          console.log(data);
        });
      };
    this.OpenModelUserAddress = () => {
      this.setState({ OpenModal: true });
    };
    this.AddAddressDetails = ()=>{
        if(this.state.DoorNo.length !== 0 && this.state.Street.length !== 0 && this.state.LandMark.length !== 0 ){

        }

    }
  }

  render() {
    return (
      <div>
        <br />
        <Container>
          <Row>
            <Col sm={3}>
              <Card
                className="UserAddress_OverCard"
                onClick={this.OpenModelUserAddress}
              >
                <p className="UserAddress_OverCard_Add">
                  <MdAddCircleOutline />
                </p>
                <h3 className="UserAddress_OverCard_h3">Add New Address</h3>
              </Card>
            </Col>
            {this.state.heelo.map((item) => (
              <Col sm={3}>
                <Card className="UserAddress_OverCard">
                  <p className="UserAddress_OverCard_Add">
                    <MdAddCircleOutline />
                  </p>
                  <h3 className="UserAddress_OverCard_h3">Add Address</h3>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Drawer
          width={720}
          title="Add New Address"
        onClose={() => this.setState({ OpenModal: false })}
          open={this.state.OpenModal}
          bodyStyle={{
            paddingBottom: 80,
          }}
        >
          <Container>
          <Form layout="horizontal">
            <Row>
              <Col>
                <Form.Item
                  className="UserAddress_OverCard_form"
                  label="Door Num"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Door Number",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      this.setState({ DoorNo: e.target.value });
                    }}
                    // defaultValue={this.props?.value?.ProductOldPrice}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  className="UserAddress_OverCard_form"
                  label="Building"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Building",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      this.setState({ Building: e.target.value });
                    }}
                    //defaultValue={this.props?.value?.ProductNewPrice}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              className="UserAddress_OverCard_form"
              label="Street   "
              rules={[
                {
                  required: true,
                  message: "Please enter Street Name",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  this.setState({ Street: e.target.value });
                }}
                //defaultValue={this.props?.value?.ProductOldPrice}
              />
            </Form.Item>

            <Form.Item
              className="UserAddress_OverCard_form"
              label="Land Mark"
              rules={[
                {
                  required: true,
                  message: "Please enter near Land Mark",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  this.setState({ LandMark: e.target.value });
                }}
                //defaultValue={this.props?.value?.ProductNewPrice}
              />
            </Form.Item>
            <Form.Item label="Village" className="UserAddress_OverCard_form">
              <Select
                onChange={(e) => {
                  this.setState({ Village: e });
                }}
                //defaultValue={this.props?.value?.ProductType}
              >
                <Select.Option value="vegetable">Bathalapalli</Select.Option>
                <Select.Option value="Fruit">Green Field</Select.Option>
                <Select.Option value="Leave">Bathalapalli Market</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              className="UserAddress_OverCard_form"
              label="Pincode"
              rules={[
                {
                  required: true,
                  message: "Please enter Pincode",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  this.setState({ Pincode: e.target.value });
                }}
                value="635130"
              />
            </Form.Item>
            <Form.Item
              className="UserAddress_OverCard_form"
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please enter Product City",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  this.setState({ City: e.target.value });
                }}
                value="Hosur"
              />
            </Form.Item>
            <Form.Item className="AddItemIndetails">
              {this.props?.type == "ADD" ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login_form_button_AddItem"
                  onClick={this.AddAddressDetails}
                >
                  Add New Address
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login_form_button_AddItem"
                  onClick={this.EditAddressDetails}
                >
                  Edit Address
                </Button>
              )}
            </Form.Item>
          </Form>
          </Container>
        </Drawer>
      </div>
    );
  }
}
export default UserAddress;
