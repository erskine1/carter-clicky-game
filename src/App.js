import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Nav from "./components/Nav";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

// to do: message when user loses

class App extends Component {

  // Durstenfeld shuffle function
  shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  state = {
    friends,
    score: 0,
    highScore: 0,
    message: "Click a Carter to begin!"
  };

  clickyFunction = (id) => {
    const clickedImg = this.state.friends.find(friend => friend.id === id);

    if (!clickedImg.clicked) {
      clickedImg.clicked = true;

      if (this.state.score < 11) {
        this.setState({ score: this.state.score + 1, message: "You guessed correctly!" });
        this.shuffleState();
      }
      else if (this.state.score === 11) {
        this.setState({ score: this.state.score + 1, message: "You win!! Amazing." });
        this.restart();
      }
    }
    else {
      console.log(`You already clicked on ${clickedImg.name}`); // remove later
      this.setState({ message: "Game over! Click a Carter to start a new round." })
      this.restart();
    }
  };

  restart = () => {
    if (this.state.score > this.state.highScore) {
      this.setState({ highScore: this.state.score });
    }
    this.setState({ score: 0 });
    this.state.friends.forEach(friend => {
      friend.clicked = false;
    });
  }

  shuffleState = () => {
    let shuffledArray = this.shuffle(friends);
    this.setState({ friends: shuffledArray });
    console.log("Shuffled...")
  }

  render() {
    console.log(this.state.friends);

    return (
      <div>
      <Nav
        score={this.state.score}
        highScore={this.state.highScore}
        message={this.state.message}
      />
      <Wrapper>
        <Title>There's a lot of Samantha Carters. Click one to earn a point but don't click the same Carter twice.</Title>
        {this.state.friends.map(friend => (
          <FriendCard
            clickyFunction={this.clickyFunction}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
          />
        ))}
      </Wrapper>
      </div>
    );
  }
}

export default App;
