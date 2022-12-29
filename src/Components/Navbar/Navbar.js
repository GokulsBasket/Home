import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Nav,
  Navbar
} from "react-bootstrap";
import LogoImage from "../Picture/Logo.png";
import "./Navbar.css";
import CartImage from "../Picture/Cart_Image.png";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Axios from "axios";

class NabarGokul extends React.Component {
  constructor() {
    super();
    this.state = {
      Login: false,
      UserName: "",
      userID: 0,
      MenuBtn:false,
      AddtoCartList:[]
    };
    this.componentDidMount = () => {
      var data;
      var UserID;
      if (localStorage.getItem("UserName") !== null) {
        data = localStorage.getItem("UserName");
        UserID = parseInt(localStorage.getItem("UserID"));

        this.setState({ UserName: data, userID: UserID });
        var UserID = localStorage.getItem("UserID");
      Axios.get(`http://localhost:5000/api/AddtoCart/${UserID}`).then((res) => {
      var data = res.data;
      this.setState({ AddtoCartList: data });
    });
      }
    };
    this.OpenUserMenu=()=>{
      this.setState({MenuBtn:!this.state.MenuBtn});
    }
    this.LogoutAccount=()=>{
      localStorage.removeItem("UserName");
      localStorage.removeItem("UserID");
      window.location.reload();
    }
    this.Vegetablepath =()=>{
      localStorage.setItem("ProdType","vegetable");
      window.location.pathname = "/VegetableCards";
    }
    this.Fruitpath =()=>{
      localStorage.setItem("ProdType","Fruit");
      window.location.pathname = "/VegetableCards";
    }
    this.Leavepath =()=>{
      localStorage.setItem("ProdType","Leave");
      window.location.pathname = "/VegetableCards";
    }
  }

  render() {
    return (
      <div className="GokulsNavbar">
        {this.state.userID !== 1 ? (
          <Navbar collapseOnSelect expand="lg">
            <Container>
              <Navbar.Brand href="/">
                <img
                  src={LogoImage}
                  width="120px"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/" className="NavbarType">
                    Home
                  </Nav.Link>
                </Nav>
                <Nav className="me-auto">
                  <Nav.Link className="NavbarType" onClick={this.Vegetablepath}>
                    Vegetables
                  </Nav.Link>
                  <Nav.Link className="NavbarType" onClick={this.Fruitpath}>
                    Fruits
                  </Nav.Link>
                  <Nav.Link className="NavbarType" onClick={this.Leavepath}>
                    Leaves
                  </Nav.Link>
                  {this.state.UserName.length === 0 ? (
                    <Nav.Link
                      eventKey={2}
                      href="/LoginUser"
                      className="NavbarType"
                    >
                      Login
                    </Nav.Link>
                  ) : (
                    <Nav.Link eventKey={2} className="NavbarType">
                      Hi {this.state.UserName}
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>

              <Navbar.Brand href="/CartProductList">
                <img src={CartImage} className="NavbarImage" />
                {this.state.AddtoCartList.length !== 0 ?
                <p className="NavbarPara">{this.state.AddtoCartList.length}</p>:""}
              </Navbar.Brand>
            </Container>
          </Navbar>
        ) : (
          <Navbar collapseOnSelect expand="lg">
            <Container>
              <Navbar.Brand href="/">
                <img
                  src={LogoImage}
                  width="120px"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="Admin_Navbar">
                  <Nav.Link
                    eventKey={2}
                    href="/GetProductDetails"
                    className="NavbarType"
                  >
                    Product
                  </Nav.Link>
                  <Nav.Link
                    eventKey={2}
                    href="/VegetableCards"
                    className="NavbarType"
                  >
                    Order
                  </Nav.Link>
                  <Nav.Link
                    eventKey={2}
                    href="/VegetableCards"
                    className="NavbarType"
                  >
                    Delivery
                  </Nav.Link>
                  <Nav.Link
                    eventKey={2}
                    href="/VegetableCards"
                    className="NavbarType"
                  >
                    Dashboard
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <Nav className="">
                {this.state.UserName.length === 0 ? (
                  <Nav.Link
                    eventKey={2}
                    href="/LoginUser"
                    className="NavbarType"
                  >
                    Login
                  </Nav.Link>
                ) : (
                  <div>
                    <Navbar.Brand eventKey={2} className="NavbarType" onClick={this.OpenUserMenu}>
                      Hi {this.state.UserName}
                      <Menu
                      open={this.state.MenuBtn}
                      onClose={!this.state.MenuBtn}
                    >
                      <MenuItem>Profile</MenuItem>
                      <MenuItem >My account</MenuItem>
                      <MenuItem onClick={this.LogoutAccount}>Logout</MenuItem>
                    </Menu>
                    </Navbar.Brand>
                    
                  </div>
                )}
              </Nav>
            </Container>
          </Navbar>
        )}
      </div>
    );
  }
}
export default NabarGokul;
