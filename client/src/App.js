import React from 'react';
import {
  Container,
  Button
} from "react-bootstrap";
import {ClientSocketHandler} from "./services/ClientSocketHandler";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.socketHandler = new ClientSocketHandler(
      "http://localhost:4000",
      'generator',
      msg => {console.log('msg received:', msg)}
    )
  }

  render() {
    return (
      <div style={{
        backgroundColor: '#300', 
        height: '100vh', 
        padding: 0, 
        margin:0
      }}>
        <Container style={{paddingTop: 40}}>
          <Button
            onClick={()=>{
              console.log("generator")
              this.socketHandler.setUserType('generator')
            }}
          >
            Become generator
          </Button>
          <Button
            onClick={()=>{
              console.log("transporter")
              this.socketHandler.setUserType('transporter')
            }}
          >
            Become transporter
          </Button>
        </Container>
      </div>
    );
  }
}

export default App;
