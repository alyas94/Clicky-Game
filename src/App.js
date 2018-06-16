import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import friends from "./friends.json";
import "./App.css";

function shuffleFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// phrases to be generated when user answers correctly
const wordArray = [
  "Yer on your way!",
  "Expelliarmus!",
  "Good work, Harry!",
  "Way to go!",
  "You're the chosen one!",
  "Mum and Dad would be so proud!",
];

class App extends Component {
  // Set this.state
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    color: "",
    rightWrong: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.reset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    let rightWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    this.setState({
      currentScore: newScore,
      rightWrong: rightWord,
      color: "green",
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    } else if (newScore === 12) {
      this.setState({ rightWrong: "You win!" });
    }
    this.shuffle();
  };

  reset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      color: "red",
      rightWrong: "Avada Kedavra! Voldemort got you :(",
      clicked: [],
    });
    this.shuffle();
  };

  shuffle = () => {
    let shuffledFriends = shuffleFriends(friends);
    this.setState({ friends: shuffledFriends });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="Wizarding World of Clicky Game"
          score={this.state.currentScore}
          color={this.state.textColor}
          topScore={this.state.topScore}
          rightWrong={this.state.rightWrong}
        />

        <Title>
          Click on each character only one time! Don't let Voldemort get you!
        </Title>

        <Container>
          <Row>
            {this.state.friends.map(friend => (
              <Column size="md-3 sm-6">
                <FriendCard
                  key={friend.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  reset={this.reset}
                  handleShuffle={this.handleShuffle}
                  id={friend.id}
                  image={friend.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
