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
			successMessage: 'Make your Guess',
			success: false,
			guessRepeated: false,
			diff: 100,
			beyondLimit: false,
			noneNumeric: false
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
			guessedNumber,
			diff: Math.abs(this.state.randomNumber - guessedNumber)
		});
	}

	handleSubmitEvent(e) {
		e.preventDefault();

		this.setState({
			guessedNumberHistory: [...this.state.guessedNumberHistory, this.state.guessedNumber]
		});

		if(isNaN(this.state.guessedNumber)){
			this.setState({
				noneNumeric: true
			})

		} else if(this.state.guessedNumber < 1 || this.state.guessedNumber > 100 ) {
			this.setState({
				beyondLimit: true
			})

		} else if(this.state.guessedNumberHistory.find(val => val === this.state.guessedNumber)) {
			this.setState({
				guessedNumber: '',
				guessRepeated: true
			})	
		} else {
			this.setState({
				guessRepeated: false
			})			
		}

		if(this.state.diff === 0) {
			this.setState({
				successMessage: 'Good job! You won! Click NEW GAME to play again!',
				success: true
			})
		} else if (this.state.diff <= 5) {
			this.setState({
				successMessage: 'Hot',
				success: false
			})
		} else if(this.state.diff > 5){
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
		if(this.state.guessRepeated) {
			alert('You have already guessed and Random #: ' + this.state.randomNumber);
			this.setState({
				guessRepeated: false,
				guessedNumber: '',
				guessedNumberHistory: [...new Set(this.state.guessedNumberHistory)]
			});	
		} else if(this.state.beyondLimit) {
			alert('Guess should be between 1 and 100!');
			const guessedHistory = this.state.guessedNumberHistory.splice(-1,1);
			this.setState({
				beyondLimit: false,
				guessedNumber: '',
				guessedNumberHistory: this.state.guessedNumberHistory
			});
		} else if(this.state.noneNumeric) {
			alert('Guess numbers only!');
			const guessedHistory = this.state.guessedNumberHistory.splice(-1,1);
			this.setState({
				noneNumeric: false,
				guessedNumber: '',
				guessedNumberHistory: this.state.guessedNumberHistory
			});
		} else if (this.state.success) {
			this.setState({
				success: false,
				randomNumber: Math.floor(Math.random()*100)+1,
				guessedNumber: '',
				guessedNumberHistory: []
			});
		}

		const title = 'HOT or COLD';
		return (
			<div className="main-container row" >
				<NewGame onClick={randomNumber => this.setRandomNumber(randomNumber)}/>
				<AddForm onChange={text => this.setGuessedNumber(text)}
						value={this.state.guessedNumberHistory} 
						onSubmit={e => this.handleSubmitEvent(e)} 
						tempValue={this.state.guessedNumber}
						successMessage={this.state.successMessage}
						title={title} 
						boolean={this.state.boolean}
						min={1} max={100}/>
			</div>
		);
	}
}