import logo from './logo.svg';
import './App.css';
import {Container, Row} from 'reactstrap';

//container
import CardProduct from './Containers/CardProduct'
import BannerVideo from "./Containers/BannerVideo"
import Numpad from "./Containers/Numpad"

function App() {
  return (
    <div className="App">
      <BannerVideo videoUrl="indomie_default.mp4"></BannerVideo>
      {/* <Numpad/> */}
      <Container>
        <Row>
          <CardProduct grid={'col-md-3 col-lg-3 col-sm-3 col-xs-3 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
          <CardProduct grid={'col-md-3 col-lg-3 col-sm-3 col-xs-3 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
          <CardProduct grid={'col-md-3 col-lg-3 col-sm-3 col-xs-3 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
          <CardProduct grid={'col-md-3 col-lg-3 col-sm-3 col-xs-3 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
          <CardProduct grid={'col-md-3 col-lg-3 col-sm-3 col-xs-3 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
          <CardProduct grid={'col-md-3 col-lg-3 col-sm-3 col-xs-3 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
          <CardProduct grid={'col-md-3 col-lg-3 col-sm-3 col-xs-3 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
          <CardProduct grid={'col-md-3 col-lg-3 col-sm-3 col-xs-3 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
          <CardProduct grid={'col-md-3 col-lg-3 col-sm-3 col-xs-3 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
          <CardProduct grid={'col-md-3 col-lg-3 col-sm-3 col-xs-3 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
        </Row>
      </Container>
    </div>
  );
}

export default App;
