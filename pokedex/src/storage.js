
import React from "react";
import './App.css';
import {Link} from 'react-router-dom';
import PokemonCard from './PokemonCard';
//import Button from '@material-ui/core/button';

class App extends React.Component{


	fetchData(){
		fetch(
			`https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=${this.state.pageNumber}`)
						.then((res) => res.json())
						.then((json) => {
							this.setState({
								items: json,
								DataisLoaded: true
							});
						})
	}

	nextPageClick(){
		this.setState((previous) => ({pageNumber : previous.pageNumber+1}), this.fetchData)
	}

	lastPageClick(){
		this.setState((previous) => ({pageNumber : previous.pageNumber-1}), this.fetchData)
	}

	// Constructor
	
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false,
			pageNumber : 1
		};
		this.nextPageClick = this.nextPageClick.bind(this)
		this.lastPageClick = this.lastPageClick.bind(this)
	
	}
	

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		this.fetchData()
	}
  
	render() {
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Loading... </h1> </div> ;

		return (
      
	<div className = "card">
      <div className="PageNav">
            <h1>  </h1>
           <button onClick={this.lastPageClick}>Previous Page</button><button onClick={this.nextPageClick}>Next Page</button>
      </div>

      <Link to="/pokemon"><button>To Pokemon</button></Link>
      
			<h1> Pokemon from Pokedex API </h1> {
        
  
         
        items.data.map((item) => (
          <PokemonCard item={item}>
            
          </PokemonCard>
				))
			};
		</div>
	);
}
}

export default App;



