
import React from 'react';



export default class NewGame extends React.Component {
	constructor(props) {
		super(props);

	}

  handleClick(e) {
    e.preventDefault();
    
  }

	render () {
		const randomNumber = Math.floor(Math.random()*100)+1
		return (
		<button className="new-game-button" 
				onClick={() => this.props.onClick(randomNumber)}
				>New Game</button>
	)
	}
}