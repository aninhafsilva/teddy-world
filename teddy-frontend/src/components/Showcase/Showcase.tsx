import Img1 from "../../components/Showcase/img/img1.jpg";
import Img2 from "../../components/Showcase/img/img2.png";

import "./Showcase.css";
import { Carousel } from "react-bootstrap";

function Showcase() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={Img1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Img2} alt="Second slide" />
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Showcase;
