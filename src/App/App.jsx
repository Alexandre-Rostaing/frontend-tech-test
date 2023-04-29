/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import './App.scss';
import md5 from 'md5';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from '../components/Header';
import Page from '../components/Page';

function App() {
	const [characterList, setCharacterList] = React.useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	//delays the rendering until the user stops typing for 500ms (ie searchQuery stops changing)
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchQuery)
				getCharacters(searchQuery).then((result)=>{
					console.log(result);
					setCharacterList(result?.data?.results);
				});
		}, 500)
	
		return () => clearTimeout(delayDebounceFn)
	}, [searchQuery])

	//API call function, retrieves the characters with names starting with the user's input (100 results limit)
	async function getCharacters (characterName) {
		const key = "c13ae3105f9dead0bda4ffcc8215c1c0"; //generated with personnal account
		const userkey = "0f86c0a9c7e585e71ef287cfbea8ec63dcebca7e"; //generated with personnal account
		const date = Date.now();
		const url = "https://gateway.marvel.com/v1/public/characters?apikey="+key+
					"&ts="+date+
					"&hash="+md5(date+userkey+key)+
					"&nameStartsWith="+characterName+
					"&limit=100";
		
		const response = await fetch(url, {
			method: "GET",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json"
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
		});

		//check if the response is ok
		if (response.ok)
			return response.json();
		return null;
	}

  return (
	<>
		<Router>
			<Header 
			query= {searchQuery}
			updateQuery={setSearchQuery}/>
			<Switch>
				<Route
					exact
					path="/"
				>
					<section className="lumx-spacing-padding-horizontal-huge" />
					<div className='main-page'>
						<div className='page-title'><h1>Search Results</h1></div>
						<Page charactersResult={characterList}/>
					</div>
				</Route>
			</Switch>
		</Router>

	</>
  );
}

export default App;
