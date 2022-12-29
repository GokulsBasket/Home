import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { MdOutlineMarkEmailUnread, MdPhone } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Image } from "react-bootstrap";
import "../HomePage/Homepage.css";
import Axios from "axios";
import swal from 'sweetalert';
import LoginImage from "../Picture/Vegetable_all.png";


class LoginUserDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      DrawerOpen: true,
      DrawerLogin: true,
      SignUpUName: "",
      SignUpUMail: "",
      SignUpUCont: "",
      SignUpPass: "",
      LoginUmail: "",
      LoginUPass: "",
      ActualLoginUser: [],
      AllLoginUsers: [],
    };
  this.onCloseDrawer = () => {
    this.setState({ DrawerOpen: false });
  };
  this.changeLogin = () => {
    this.setState({ DrawerLogin: false });
  };
  this.changesignUp = () => {
    this.setState({ DrawerLogin: true });
  };
  this.OnClickLoginBtn = () => {
   
    if (
      this.state.LoginUmail.length !== 0 &&
      this.state.LoginUPass.length !== 0
    ) {
      
      for (var i = 0; i < this.state.AllLoginUsers.length; i++) {
        if (this.state.AllLoginUsers[i].UserEmail === this.state.LoginUmail) {
          if (this.state.AllLoginUsers[i].UserPassword === this.state.LoginUPass) {
            Axios.get(`http://localhost:5000/api/get/${this.state.LoginUmail}`)
              .then((res) => {
                var data= res.data;
                this.setState({ActualLoginUser:data});                
                swal({
                  title: "Login Successfully",
                  text: "",
                  icon: "success",
                  button: "continue",
                }).then((value)=>{
                  if(value){
                    window.location.reload();
                    localStorage.setItem("UserID",res.data[0].UserID);
                    localStorage.setItem("UserName",res.data[0].UserName);
                    if(res.data[0].UserID === 1 && res.data[0].UserName === "Junnu"){
                      window.location.pathname = "/GetProductDetails";
                    }
                    else{
                    window.location.pathname = "/";}
                  }
                })
                
              })
          }
          
          else{
            swal({
              title: "Sorry",
              text: "User Details not found. try again",
              icon: "warning",
              button: "ok",
              dangerMode: true,
            });
            
          }
          
        }
      }
    }
    
  };
  this.OnClicksignUp = () => {
    if (
      this.state.SignUpUMail.length !== 0 &&
      this.state.SignUpPass.length !== 0 &&
      this.state.SignUpUName.length !== 0 &&
      this.state.SignUpUCont.length !== 0
    ) {
      Axios.post(`http://localhost:5000/api/insert`, {
        UserName: this.state.SignUpUName,
        UserEmail: this.state.SignUpUMail,
        UserContact: this.state.SignUpUCont,
        UserPassword: this.state.SignUpPass
      }).then((res) => {
        swal({
          title: "Signup Successfully",
          text: "",
          icon: "success",
          button: "continue",
        }).then(window.location.reload());
        this.setState({DrawerLogin:true})
      });
    } else {
      alert("please fill login credential");
    }
  };
  this.componentDidMount = () => {
    Axios.get(`http://localhost:5000/api/get`).then((res) => {
      var data = res.data;
      this.setState({ AllLoginUsers: data });
    });
  };

}
  render() {
    console.log(this.state.AllLoginUsers,"AllLoginUsers")
    return (
      <div>
        <Container>
          <Row className="Heading_Row">
            <Col lg={8} className="Heading_Col1">
              <Image src={LoginImage} className="Heading_Image"></Image>
            </Col>
            <Col lg={4} className="Heading_Col1">
              <div className="OverallDrawer">
                {this.state.DrawerLogin == true ? (
                  <Form
                    name="normal_login"
                    initialValues={{
                      remember: true,
                    }}
                  >
                    <h3 className="login_form_Head">Login User</h3>
                    <br />
                    <Form.Item
                      className="login_form"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <MdOutlineMarkEmailUnread className="site-form-item-icon" />
                        }
                        placeholder="Email"
                        onChange={(e) => {
                          this.setState({ LoginUmail: e.target.value });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      className="login_form"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                          this.setState({ LoginUPass: e.target.value });
                        }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        noStyle
                      >
                        <Checkbox>
                          <p className="login_form">Remember me</p>
                        </Checkbox>
                      </Form.Item>
                      <br />

                      <a href="" className="login_form">
                        Forgot password
                      </a>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login_form_button"
                        onClick={this.OnClickLoginBtn}
                      >
                        Log in
                      </Button>
                      </Form.Item>
                      <span className="login_form"> Or New User? </span>

                      <a onClick={this.changeLogin} className="login_form">
                        register now
                      </a>
                    
                  </Form>
                ) : (
                  <Form
                    name="normal_login"
                    initialValues={{
                      remember: true,
                    }}
                  >
                    <h3 className="login_form_Head">Signup User</h3>
                    <br />
                    <Form.Item
                      className="login_form"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Username!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                        onChange={(e) => {
                          this.setState({ SignUpUName: e.target.value });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      className="login_form"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <MdOutlineMarkEmailUnread className="site-form-item-icon" />
                        }
                        placeholder="Email"
                        onChange={(e) => {
                          this.setState({ SignUpUMail: e.target.value });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      className="login_form"
                      name="contact"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Contact!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<MdPhone className="site-form-item-icon" />}
                        placeholder="Contact"
                        onChange={(e) => {
                          this.setState({ SignUpUCont: e.target.value });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      className="login_form"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                          this.setState({ SignUpPass: e.target.value });
                        }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login_form_button"
                        onClick={this.OnClicksignUp}
                      >
                        Sign Up
                      </Button>
                      </Form.Item>
                      <span className="login_form"> Or already user? </span>
                      <a onClick={this.changesignUp} className="login_form">
                        Login
                      </a>
                    
                  </Form>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LoginUserDetails;
