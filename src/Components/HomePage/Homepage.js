import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import FruitHome from "../Picture/Vegetable_all.png";
import Image from "react-bootstrap/Image";
import FruitCarosel from "../Picture/Fruit_Carosel.png";
import vegetableCarosel from "../Picture/vegetable-carosel.jpg";
import "./Homepage.css";
import { Carousel, Radio } from 'antd';

// import HomeCard from "./HomeCard";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      Login: false,
    };
  }
  componentDidMount = () => {
    console.log(this.props);
  };

  render() {
    return (
      <div>
        <Container>
        <div>
        <Carousel dotPosition="bottom" autoplay effect="fade">
     
        <div>
        <Row className="Heading_Row">
            <Col lg={8} className="Heading_Col1">
              <Image src={FruitCarosel} className="Heading_Image"></Image>
            </Col>

            <Col sm={4} className="Heading_Col2">
              <h3 className="Heading_Head">
                Fruits
              </h3>
              <br />
              <p className="Heading_Para">
                " Fruits and vegetables contain a variety of nutrients including
                vitamins, minerals and antioxidants. Eating the recommended
                amount of fruits and vegetables each day can reduce the risk of
                chronic diseases. Vegetables are rich in vitamin A, vitamin C,
                folate, fiber and potassium. Folate helps the body form red
                blood cells. "
              </p>
            </Col>
          </Row>
        </div>
        <div>
        <Row className="Heading_Row">
            <Col lg={8} className="Heading_Col1">
              <Image src={vegetableCarosel} className="Heading_Image"></Image>
            </Col>

            <Col sm={4} className="Heading_Col2">
              <h3 className="Heading_Head">
                vegetables
              </h3>
              <br />
              <p className="Heading_Para">
                " Fruits and vegetables contain a variety of nutrients including
                vitamins, minerals and antioxidants. Eating the recommended
                amount of fruits and vegetables each day can reduce the risk of
                chronic diseases. Vegetables are rich in vitamin A, vitamin C,
                folate, fiber and potassium. Folate helps the body form red
                blood cells. "
              </p>
            </Col>
          </Row>
        </div>
        <div>
        <Row className="Heading_Row">
            <Col lg={8} className="Heading_Col1">
              <Image src={FruitHome} className="Heading_Image"></Image>
            </Col>

            <Col sm={4} className="Heading_Col2">
              <h3 className="Heading_Head">
                Leaves
              </h3>
              <br />
              <p className="Heading_Para">
                " Fruits and vegetables contain a variety of nutrients including
                vitamins, minerals and antioxidants. Eating the recommended
                amount of fruits and vegetables each day can reduce the risk of
                chronic diseases. Vegetables are rich in vitamin A, vitamin C,
                folate, fiber and potassium. Folate helps the body form red
                blood cells. "
              </p>
            </Col>
          </Row>
        </div>
        </Carousel>
        </div>
        </Container>
          <br />
          <Container>
          <Row>
            <Col Col md={3}>
              <Card className="HomeCard_card">
                <Card.Img
                  variant="top"
                  src={FruitHome}
                  className="HomeCard_Img"
                />
                <Card.Body>
                  <Card.Title className="HomeCard_Tittle">
                    SuperFast Delivery
                  </Card.Title>
                  <Card.Text className="HomeCard_Text">
                    Get your order delivered to your doorstep at the earliest
                    from dark stores near you
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col Col md={3}>
              <Card className="HomeCard_card">
                <Card.Img
                  variant="top"
                  src={FruitHome}
                  className="HomeCard_Img"
                />
                <Card.Body>
                  <Card.Title className="HomeCard_Tittle">
                    SuperFast Delivery
                  </Card.Title>
                  <Card.Text className="HomeCard_Text">
                    Get your order delivered to your doorstep at the earliest
                    from dark stores near you
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col Col md={3}>
              <Card className="HomeCard_card">
                <Card.Img
                  variant="top"
                  src={FruitHome}
                  className="HomeCard_Img"
                />
                <Card.Body>
                  <Card.Title className="HomeCard_Tittle">
                    SuperFast Delivery
                  </Card.Title>
                  <Card.Text className="HomeCard_Text">
                    Get your order delivered to your doorstep at the earliest
                    from dark stores near you
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="HomeCard_card">
                <Card.Img
                  variant="top"
                  src={FruitHome}
                  className="HomeCard_Img"
                />
                <Card.Body>
                  <Card.Title className="HomeCard_Tittle">
                    SuperFast Delivery
                  </Card.Title>
                  <Card.Text className="HomeCard_Text">
                    Get your order delivered to your doorstep at the earliest
                    from dark stores near you
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          </Container>
      </div>
    );
  }
}
export default HomePage;
