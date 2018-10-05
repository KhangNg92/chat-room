import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

var config = {
  apiKey: 'AIzaSyAi4q34mTyT7rWjl_2NBMXu7XRLPQCDss4',
  authDomain: 'list-chat-rooms.firebaseapp.com',
  databaseURL: 'https://list-chat-rooms.firebaseio.com',
  projectId: 'list-chat-rooms',
  storageBucket: 'list-chat-rooms.appspot.com',
  messagingSenderId: '604501095656',

  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
                  activeRoom: '',
                  activeRoomId: '',
                  user: ''
    }
  }

  updateRoom(roomId){
    if (roomId === '') {
      this.setState({activeRoomId: '', activeRoom: ''})
    } else {
    this.setState({activeRoomId: roomId.key, activeRoom: roomId.name});
    }
  }

  setUser(currentUser){
    this.setState({user: currentUser});
    console.log(currentUser);
  }

  render() {
    return (
      <div className="App">
        <nav className="room-navigation">
          <header className="App-header">
            <h1>Bloc Chat</h1>
          </header>
          <div className="logIn">
            <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user}/>
          </div>
          <RoomList firebase={firebase}
                    updateRoom={this.updateRoom.bind(this)}
                    activeRoomId={this.state.activeRoomId}
                    activeRoom={this.state.activeRoom}/>
        </nav>
        <section className="message-list">
        <MessageList firebase={firebase}
                       activeRoom = {this.state.activeRoom}
                       activeRoomId = {this.state.activeRoomId}
                       user = {this.state.user}/>
        </section>
      </div>
    );
  }
}

export default App;
