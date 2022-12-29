import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Axios from "axios";
import { Row, Col, Container, Button, Navbar, Nav, Form} from "react-bootstrap";
import "./VegetableCards.css";
import { FaRupeeSign } from "react-icons/fa";
import swal from "sweetalert";

class VegetableCards extends React.Component {
  constructor() {
    super();
    this.state = {
      AllProductList: [],
      AddtoCartList: [],
      filteredData:[],
      UpdatedCart:[],
      filterUpdateCart:[],
      SortArrayofCart:[]
    };
    this.componentDidMount = () => {
      var vegetable =localStorage.getItem("ProdType");
      var proddata;
      Axios.get(
        `http://localhost:5000/api/getProductDetails/${vegetable}`
      ).then((res) => {
        var data = res.data;
        proddata = res.data;
        this.setState({ AllProductList: data });
      });
      var UserID = localStorage.getItem("UserID");
      Axios.get(`http://localhost:5000/api/AddtoCart/${UserID}`).then((res) => {
      var data = res.data;
      var arr=[];
      console.log(this.state.AllProductList,"fff")
      for(var i=0;i<data.length;i++){
        for(var j=0;j<proddata.length;j++){
          if(data[i].ProductID === proddata[j].ProductID ){
            arr.push(data[i]);
            console.log(arr)
          }
        }
      }
      this.setState({UpdatedCart:arr})
      this.setState({ AddtoCartList: data });
      var SortArrayofCart = arr.map(u =>parseInt(u.ProductID)).sort();
      var datafil=[];
      for(var i=0;i<proddata.length;i++){
        for(var j=0;j<SortArrayofCart.length;j++){
          if(proddata[i].ProductID === SortArrayofCart[j]){
            datafil[i] = proddata[i].ProductID;
          }
        }
      }
      console.log(datafil,"gggggg")
    this.setState({SortArrayofCart:datafil})
    });
    };
    this.AddToCart_of_Product = (item) => {
      var UserID = localStorage.getItem("UserID");
      Axios.post(`http://localhost:5000/api/AddtoCart/${UserID}`, {
        ProductQty: 1,
        ProductID: item.ProductID,
      })
     window.location.reload();
     
        
    }
    this.inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        this.setState({ InputText: lowerCase });
        var filteredData = this.state.AllProductList.filter((el)=>{
          if (lowerCase === ""){
            return el;
          }
          else {
            return el.ProductName.toLowerCase().includes(lowerCase);
          }
        })
        this.setState({ filteredData: filteredData });
        var arr=[];
        for(var i=0;i<this.state.AddtoCartList.length;i++){
          for(var j=0;j<this.state.filteredData.length;j++){
            if(this.state.AddtoCartList[i].ProductID === this.state.filteredData[j].ProductID ){
              arr.push(this.state.AddtoCartList[i]);
              console.log(arr)
            }
          }
        }
        this.setState({filterUpdateCart:arr});
      };
  }
  render() {
    console.log(this.state.UpdatedCart,"UpdatedCart");
    return (
      <div>
        <Container>
        
                  <Form.Control
                    id="outlined-basic"
                    onChange={this.inputHandler}
                    variant="outlined"
                    placeholder="Search Product"
                    style={{width:"100%",boxShadow:"rgba(149, 157, 165, 0.2) 0px 8px 24px"}}
                  ></Form.Control>
                  <br />
               
                  
            {this.state.filteredData.length === 0 ? <Row>
            {this.state.AllProductList.map((item,i) => (
              <Col md={3}>
                <Card className="Vegetable_Card">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.ProductImageURL}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Row>
                        <Col>
                          <h3 className="Vegetable_Card_ProdName">
                            {item.ProductName}
                          </h3>
                        </Col>
                        <Col>
                          <h3 className="Vegetable_Card_ProdName_Off">
                            {(
                              ((parseInt(item.ProductOldPrice) -
                                parseInt(item.ProductNewPrice)) /
                                parseInt(item.ProductOldPrice)) *
                              100
                            ).toFixed(0)}
                            % off
                          </h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h3 className="Vegetable_Card_ProdName_Price">
                            <FaRupeeSign /> {item.ProductNewPrice}
                            <span className="Vegetable_Card_ProdName_Span">
                              /{item.ProductType !== "Leave" ? "Kg" : "Pcs"}
                            </span>
                          </h3>
                        </Col>
                        <Col>
                          <h3 className="Vegetable_Card_ProdName_NotAmt">
                            {" "}
                            <s>{item.ProductOldPrice}</s>
                          </h3>
                        </Col>
                      </Row>
                      <Row>
                        {parseInt(item.ProductAvailableQty) !== 0 ? (
                          <div>{parseInt(item.ProductAvailableQty) <= 9 ?
                            <span className="redStockVegetable_Card_ProdName_Avail">
                            * product qty {item.ProductAvailableQty}{" "}
                            {item.ProductType !== "Leave" ? "Kg" : "Pcs"} left</span>:<span className="greenStockVegetable_Card_ProdName_Avail">
                            * product qty {item.ProductAvailableQty}{" "}
                            {item.ProductType !== "Leave" ? "Kg" : "Pcs"} left</span>}
                          </div>
                        ) : (
                          <span className="OutOfStockVegetable_Card_ProdName_Avail"> Product Out of Stock</span>
                        )}
                      </Row>
                    </CardContent>
                  </CardActionArea> 
                  {console.log()}                
                  {parseInt(item.ProductID) === (parseInt(this.state.SortArrayofCart[i]))
                   ? (
                    
                    <Button
                      className="Vegetable_Card_ProdName_Buy"
                      variant="success"
                      disabled
                    >
                      Cart Added
                    </Button>) :
                    (
                      <div>
                        {parseInt(item.ProductAvailableQty) === 0 ? (
                          <Button
                            variant="danger"
                            disabled
                            className="Vegetable_Card_ProdName_Buy_out"
                            onClick={() => this.AddToCart_of_Product(item)}
                          >
                            Out Of Stock
                          </Button>
                        ) : (
                          <Button
                            className="Vegetable_Card_ProdName_Buy"
                            onClick={() => this.AddToCart_of_Product(item)}
                          >
                            buy now
                          </Button>
                        )}
                      </div>
                    
                  )}
                </Card>
              </Col>
            ))}</Row>:<Row>
            {this.state.filteredData.map((item, index) => (
              <Col md={3}>
                <Card className="Vegetable_Card">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.ProductImageURL}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Row>
                        <Col>
                          <h3 className="Vegetable_Card_ProdName">
                            {item.ProductName}
                          </h3>
                        </Col>
                        <Col>
                          <h3 className="Vegetable_Card_ProdName_Off">
                            {(
                              ((parseInt(item.ProductOldPrice) -
                                parseInt(item.ProductNewPrice)) /
                                parseInt(item.ProductOldPrice)) *
                              100
                            ).toFixed(0)}
                            % off
                          </h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h3 className="Vegetable_Card_ProdName_Price">
                            <FaRupeeSign /> {item.ProductNewPrice}
                            <span className="Vegetable_Card_ProdName_Span">
                              /{item.ProductType !== "Leave" ? "Kg" : "Pcs"}
                            </span>
                          </h3>
                        </Col>
                        <Col>
                          <h3 className="Vegetable_Card_ProdName_NotAmt">
                            {" "}
                            <s>{item.ProductOldPrice}</s>
                          </h3>
                        </Col>
                      </Row>
                      <Row>
                        {parseInt(item.ProductAvailableQty) !== 0 ? (
                          <div>{parseInt(item.ProductAvailableQty) <= 9 ?
                            <span className="redStockVegetable_Card_ProdName_Avail">
                            * product qty {item.ProductAvailableQty}{" "}
                            {item.ProductType !== "Leave" ? "Kg" : "Pcs"} left</span>:<span className="greenStockVegetable_Card_ProdName_Avail">
                            * product qty {item.ProductAvailableQty}{" "}
                            {item.ProductType !== "Leave" ? "Kg" : "Pcs"} left</span>}
                          </div>
                        ) : (
                          <span className="OutOfStockVegetable_Card_ProdName_Avail"> Product Out of Stock</span>
                        )}
                      </Row>
                    </CardContent>
                  </CardActionArea>
                  {parseInt(this.state.filterUpdateCart[index]?.ProductID) ===
                  parseInt(item.ProductID) ? (
                    <Button
                      className="Vegetable_Card_ProdName_Buy"
                      variant="success"
                      disabled
                    >
                      Cart Added
                    </Button>
                  ) : (
                    <div>
                      {parseInt(item.ProductAvailableQty) === 0 ? (
                        <Button
                          variant="danger"
                          disabled
                          className="Vegetable_Card_ProdName_Buy_out"
                          onClick={() => this.AddToCart_of_Product(item)}
                        >
                          Out Of Stock
                        </Button>
                      ) : (
                        <Button
                          className="Vegetable_Card_ProdName_Buy"
                          onClick={() => this.AddToCart_of_Product(item)}
                        >
                          buy now
                        </Button>
                      )}
                    </div>
                  )}
                </Card>
              </Col>
            ))}</Row>}
         
        </Container>
        {this.state.AddtoCartList.length !== 0 ?
        <Navbar expand="lg" fixed="bottom">
          <Container>
           <Nav></Nav>
            
            <Nav>
              <Button
                variant="success"
                className="Vegetable_Card_ProdName_Buy2"
                href="/CartProductList"
              >
                continue to shop
              </Button>
            </Nav>
          </Container>
        </Navbar>:""}
      </div>
    );
  }
}
export default VegetableCards;
