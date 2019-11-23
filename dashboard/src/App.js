import React from 'react';
import {
  Container,
  Button
} from "react-bootstrap";
import axios from 'axios';
import {DashboardSocketHandler} from './services/DashboardSockerHandler'
const serverEndpoint = "http://localhost:4000"

const testRequest = async () => {
  console.log("test request")
  axios.get(serverEndpoint)
  .then(function (response) {
    // handle success
    console.log(response);
    console.log(response.data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {response: ""};
    this.socketHandler = new DashboardSocketHandler(
      "http://localhost:4000",
      'generator',
      data => {
        if (this._isMounted) this.setState({ response: data })
      }
    )
  }

  componentDidMount() {
    this._isMounted = true
  }

  render() {
    const {response} = this.state
    let responseKeys = Object.keys(response)
    let socketData = (
      <div>
        {
          responseKeys.map( item => {
            return(
              <Button 
              key={item} 
              style={{marginBottom: 5}}
              onClick={()=>{
                this.socketHandler.sendMsg(item, 'hello')
              }}
              >
                {item} : {response[item].type}
              </Button>
            )
          })
        }
      </div>
    )

    return (
      <div style={{backgroundColor: '#000', height: '100vh'}}>
        <Container style={{paddingTop: 40}}>
          <div style={{
            backgroundColor: '#fff', 
            height: 200, 
            marginBottom: 10, 
            borderRadius: 20, 
            padding: 10
          }}>
            {socketData}
          </div>
          <Button
            onClick={testRequest}
          >
            Update
          </Button>
        </Container>
      </div>
    );
  }
  
}

export default App;
