import React from "react";
import Axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import "./CartProductList.css";
import { AiFillMinusSquare,AiFillPlusSquare } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { Button, Result } from 'antd';
import swal from "sweetalert";

class CartProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      AllCartProdList:[],
      TotalAmount:0
    };
    this.componentDidMount = () => {
      var UserID = localStorage.getItem("UserID");
      Axios.get(`http://localhost:5000/api/GettoProductCartz/${UserID}`).then((res) => {
        var data = res.data;
        this.setState({ AllCartProdList: data });
        var sum=0;
        for(var i=0;i<data.length;i++){
          sum=sum + (parseInt(data[i].ProductNewPrice) * parseFloat(data[i].ProductQty));
        }
        this.setState({TotalAmount:sum});
      });
    };
    this.CartQtyMinus =(item)=>{
      var EditData = item;
      EditData.ProductQty = parseFloat(item.ProductQty)-0.25;
      var Setdata = this.state.AllCartProdList.map(u => u.ProductID !== EditData.ProductID ? u : EditData);
      this.setState({AllCartProdList:Setdata});
      var sum=0;
      var data=this.state.AllCartProdList;
        for(var i=0;i<data.length;i++){
          sum=sum + (parseInt(data[i].ProductNewPrice) * parseFloat(data[i].ProductQty));
        }
        this.setState({TotalAmount:sum});
    }
    this.CartQtyPlus =(item)=>{
      var EditData = item;
      EditData.ProductQty = parseFloat(item.ProductQty)+0.25;
      var Setdata = this.state.AllCartProdList.map(u => u.ProductID !== EditData.ProductID ? u : EditData);
      this.setState({AllCartProdList:Setdata});
      var sum=0;
      var data=this.state.AllCartProdList;
        for(var i=0;i<data.length;i++){
          sum=sum + (parseInt(data[i].ProductNewPrice) * parseFloat(data[i].ProductQty));
        }
        this.setState({TotalAmount:sum});
    }
    this.removeFromCart = (item)=>{
      swal({
        title: "Are you sure?",
        text: "want to delete Item!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
      Axios.delete(`http://localhost:5000/api/DeletetoCart/${item.CartID}`).then((res) => {
         console.log("item deleted");
         window.location.reload();
      });
    }})
    }
    this.OrderProductfromCart =()=>{
      window.location.pathname = "/UserAddress";
    }
  }

  render() {
    console.log("AllCartProdList",this.state.AllCartProdList)
    return (
       <div>
        {this.state.AllCartProdList.length !== 0 ?
        <Container>
           <br />
          <Row>
            <Col className="CartProductList_head">
              <h3>Product Img</h3>
            </Col>
            <Col className="CartProductList_head">
              <h3>Product Name</h3>
            </Col>
            <Col className="CartProductList_head">
              <h3>Product Qty</h3>
            </Col>
            <Col className="CartProductList_head">
              <h3>Product Price</h3>
            </Col>
            <Col className="CartProductList_head">
              <h3>Remove</h3>
            </Col>
          </Row>
          {this.state.AllCartProdList.map((item)=>(
            <div>
            <Row>
            <Col className="CartProductList_head">
              <img src={item.ProductImageURL}/>
            </Col>
            <Col className="CartProductList_head">
              <p>{item.ProductName}</p>
            </Col>
            <Col className="CartProductList_head">
              <p><AiFillMinusSquare className="CartItem" onClick={()=>this.CartQtyMinus(item)}/>  {item.ProductQty}  <AiFillPlusSquare className="CartItem" onClick={()=>this.CartQtyPlus(item)}/></p>
            </Col>
            <Col className="CartProductList_head">
              <p><FaRupeeSign />  {parseFloat(item.ProductQty)*parseInt(item.ProductNewPrice)}</p>
            </Col>
            <Col className="CartProductList_head">
              <p onClick={()=>this.removeFromCart(item)}><GiCancel className="CartItem1"/></p>
            </Col>
          </Row>
          <hr />
          </div>
          ))}
          <Row><Col md={8}></Col><Col md={4}><h6>Total Amount : <FaRupeeSign /> {this.state.TotalAmount}</h6></Col></Row>
          <Button onClick={this.OrderProductfromCart}>Buy Now</Button>
        </Container>: <Result
    status="403"
    title="No Items In Cart"
    subTitle="Sorry, please add items in cart"
    extra={<Button type="primary" href="/">Buy something</Button>}
  />}
       </div>
    )
  }
}
export default CartProductList;
