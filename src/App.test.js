import logo from './logo.svg';
import './App.css';
import CardProduct from './Containers/CardProduct';
import {Container, Row} from 'reactstrap';

function App() {
  return (
    <div className="App">
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
