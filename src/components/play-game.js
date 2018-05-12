import React from 'react';

import AddForm from './add-form';

import NewGame from './new-game';



import './play-game.css';

export default class PlayGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			randomNumber: Math.floor(Math.random()*100)+1,
			guessedNumber: '', 
			guessedNumberHistory: [],
			successMessage: '',
			success: false,
			guessRepeated: false
		}
	}

	setRandomNumber(randomNumber) {
		this.setState({
			randomNumber: randomNumber,
			guessedNumber: '',
			guessedNumberHistory: [],
			successMessage: '',
			success: false,
			guessRepeated: false	
		})
	}

	setGuessedNumber(guessedNumber){
		this.setState({
			guessedNumber
		});
	}

	handleSubmitEvent(e) {
		e.preventDefault();

		this.setState({
			guessedNumberHistory: [...this.state.guessedNumberHistory, this.state.guessedNumber]
		});

		if(this.state.guessedNumberHistory.find(val => val === this.state.guessedNumber)) {
			this.setState({
				guessedNumber: '',
				guessRepeated: true
			})	
		} else {
			this.setState({

				guessRepeated: false
			})			
		}



		const diff = Math.abs(this.state.guessedNumber - this.state.randomNumber);

		if(this.state.guessedNumber === this.state.randomNumber) {
			this.setState({
				successMessage: 'Good job! You won! Click NEW GAME to play again',
				success: true
			})

		} else if (this.diff <= 5) {
			this.setState({
				successMessage: 'Hot',
				success: false
			})
		} else {
			this.setState({
				successMessage: 'Cold',
				success: false
			});
		}

		this.setState({
				guessedNumber: ''
		});	
	}

	render() {
		if(this.state.success) {

		} else if(this.state.guessRepeated) {
			alert('You have already guessed and Random #: ' + this.state.randomNumber);
			this.setState({
					guessRepeated: false,
					guessedNumber: ''
			});	
		}

		return (
			<div className="main-container row" >
				<NewGame onClick={randomNumber => this.setRandomNumber(randomNumber)}/>
				<AddForm onChange={text => this.setGuessedNumber(text)}
						value={this.state.guessedNumberHistory} 
						onSubmit={e => this.handleSubmitEvent(e)} 
						tempValue={this.state.guessedNumber}
						successMessage={this.state.successMessage}/>
			</div>
		);
	}
}