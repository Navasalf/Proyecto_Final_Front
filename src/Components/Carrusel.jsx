import Carousel from "react-bootstrap/Carousel";


function DarkVariantExample() {
  return (
    <div className="container pb-3 mb-4">
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="d-block mx-auto"
            src="src/assets/img/1.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block mx-auto"
            src="src/assets/img/2.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block mx-auto"
            src="src/assets/img/6.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block mx-auto"
            src="src/assets/img/5.png"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default DarkVariantExample;
