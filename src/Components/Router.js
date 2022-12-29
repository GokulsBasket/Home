import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginUser from "./Navbar/LoginUserDetails.js";
import HomePage from "./HomePage/Homepage.js";
import AddProductItem from "./AddProductItem/AddProductItem.js";
import GetProductDetails from "./AddProductItem/GetProductDetails.js";
import VegetableCards from "./VegetableCards/VegetableCards.js";
import CartProductList from "./AddToCart/CartProductList.js";
import UserAddress from "./Address/UserAddress.js";

class Routers extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
        <BrowserRouter>
      <Routes>
      <Route exact path='/' element={< HomePage />}></Route>     
<Route exact path='/LoginUser' element={< LoginUser />}></Route>
<Route exact path="/AddProductItem" element={<AddProductItem />}></Route>
<Route exact path="/GetProductDetails" element={<GetProductDetails />}></Route>
<Route exact path="/VegetableCards" element={<VegetableCards />}></Route>
<Route exact path="/CartProductList" element={<CartProductList />}></Route>
<Route exact path="/UserAddress" element={<UserAddress />}></Route>
      </Routes>
    </BrowserRouter>
    )
  }
}
export default Routers;
