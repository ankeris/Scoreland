import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GameLibrary from '../containers/GameLibrary';
import Firebase from '../firebase';
import { Game } from '../models/Game.model';
interface State {
  games: Array<Game>;
}

class App extends Component<RouteComponentProps<any>, State> {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    Firebase.getAll('games').then(games => {
      console.group('Games from firebase:');
      games.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
      });
      console.groupEnd();
    })
    Firebase.subscribeTo('games', (gameArr: Array<Game>) => {
        this.setState({
          games: gameArr
        })
    })
  }
  async logout() {
    console.log('trying to log out');
    await Firebase.logout();
    this.props.history.push('/login');
  }
  render() {
    return (
      <div className="App">
          <div onClick={this.logout}>Logout</div>
          <div className="content-section grid-box push-vertical">
            <GameLibrary games={this.state.games}></GameLibrary>
          </div>
          <a
              className="link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              A Link to somewhere
            </a>
      </div>
    );
  }
}

export default App;