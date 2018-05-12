import React from 'react';



import './add-form.css';

export default function AddForm(props) {
	const guessHistory = props.value.map((guessNumber, index) => 
		<span key={index} >{guessNumber} </span>
	);


	return (
		<form className="container-group" onSubmit={e => props.onSubmit(e)}>
			<label className="main-title"><h1>{props.title}</h1></label>
			<label className="lbl-result">{props.successMessage}</label>
				<input id="guess-number" placeHolder="Enter your Guess" type ="text" required 
						onChange={text => props.onChange(text.target.value) } 
						value={props.tempValue} min={props.min} max={props.max}/>
				<button className="guess-button" disabled={!props.tempValue}>Guess</button>
			<label className="guessed-number">
					Guess # <span className="span-guessed-number">{props.value.length}</span> !
			</label>
			<label className="lbl-guess-history">{guessHistory}</label>
		</form>
	);
}