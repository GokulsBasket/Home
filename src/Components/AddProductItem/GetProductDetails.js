import React from "react";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import { Button, Container } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import "./AddProductItem.css";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import AddProductItem from "./AddProductItem";
import { Row, Col} from "react-bootstrap";
import { PlusOutlined } from '@ant-design/icons';
import {  Drawer,Space } from 'antd'
import swal from "sweetalert";

class GetProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllProductList: [],
      AddorEditProduct: false,
      PutProductDetail:[],
      ProductMethodType:"ADD"
    };
    this.componentDidMount = () => {
      Axios.get(`http://localhost:5000/api/getProductDetails`).then((res) => {
        var data = res.data;
        this.setState({ AllProductList: data });
        console.log(data);
      });
    };
    this.OneditProductIteam = (item) => {
      this.setState({AddorEditProduct: true, PutProductDetail:item,ProductMethodType:"EDIT"});
    };
    this.OnDeleteProductIteam=(item)=>{
      swal({
        title: "Are you sure?",
        text: "want to disable Product Item!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          var ProdOld = parseInt(item.ProductOldPrice);
        var ProdNew = parseInt(item.ProductNewPrice);
        Axios.post(`http://localhost:5000/api/UpdateProductDetails/${item.ProductID}`, {
          ProductName: item.ProductName,
          ProductDetail: item.ProductDetail,
          ProductOldPrice: ProdOld,
          ProductNewPrice: ProdNew,
          ProductURL: item.ProductImageURL,
          ProductType: item.ProductType,
          ProductAvailableQty: item.ProductAvailableQty,
          ProductStatus:"D"
        }).then((res) => {
            swal("Product has been disabled!", {
              icon: "success",
            }).then(window.location.reload());
      });
        } 
      });
    }
    this.AddProductItemasNew = ()=>{
      this.setState({AddorEditProduct: true,ProductMethodType:"ADD",PutProductDetail:[]})
    }
  }
  render() {
    return (
      <div className="GetProductDetails">
        <Container>
          <br/>
          <Row><Col md={8}><p className="AddItemIndetails_TT">Product Details</p></Col> <Col md={4}><Button className="GetProduct_ADD_PROD" onClick={this.AddProductItemasNew}>Add Product</Button></Col></Row>

          <Table striped bordered hover size="sm">
            <thead className="GetProductDetails_TH">
              <tr>
                <th>Product ID</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Produt Old Price</th>
                <th>Produt New Price</th>
                <th>Available Qty</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="GetProductDetails_TB">
              {this.state.AllProductList.map((item) => (
                <tr>
                  <td>{item.ProductID}</td>
                  <td>
                    <img
                      src={item.ProductImageURL}
                      width="30px"
                      height="30px"
                    />
                  </td>
                  <td>{item.ProductName}</td>
                  <td>{item.ProductOldPrice}</td>
                  <td>{item.ProductNewPrice}</td>
                  <td>
                    {parseInt(item.ProductAvailableQty) === 0 ? (
                      <p className="OutOfStockPara">Out of Stock</p>
                    ) : (
                      <>{item.ProductAvailableQty}</>
                    )}
                  </td>
                  <td>
                    
                      <FiEdit className="GetProductDetails_icon_Edit" onClick={() => this.OneditProductIteam(item)}/>
                    
                  </td>
                  <td>
                    <MdDelete
                      className="GetProductDetails_icon_Del"
                      onClick={() => this.OnDeleteProductIteam(item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Drawer
        title= {this.state.ProductMethodType === "ADD" ? <p className="AddItemIndetails_TT">Add Product</p> : <p className="AddItemIndetails_TT">Edit Product</p>}
        width={720}
        open={this.state.AddorEditProduct}
        onClose={() => this.setState({AddorEditProduct:false,PutProductDetail:[]})}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <AddProductItem value={this.state.PutProductDetail} type={this.state.ProductMethodType}/>
        </Drawer>
        
      </div>
    );
  }
}
export default GetProductDetails;
