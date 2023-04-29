import React, { useEffect } from 'react';
import './index.scss';
import { FlexBox, Alignment } from '@lumx/react';
import classNames from 'classnames';
import Card from '../Card';

const Page = ({charactersResult}) => {

	//resets the current page to 0 on result change
	useEffect(()=>{
		if (charactersResult)
			changeCurrentPage(0);
	}, [charactersResult]);

	//reorganizes the characters array to be more easily rendered (pages of 4 character profiles)
	const pages =  () => {
		let newArray = [];
		let pIndex = 0;
		for (var index = 0; index < charactersResult.length; index+=4) {
			newArray[pIndex] = [];
			for (var cardIndex = 0; cardIndex < 4; cardIndex++) {
				if (charactersResult[index+cardIndex])
					newArray[pIndex].push(charactersResult[index+cardIndex]);
			}
			pIndex++;
		}
		return newArray;
	};

	//creates a page with cards for the character profile
	const createSinglePage = (content, index) => (
		<div key={"page"+index} className={classNames('single-page')} id={"page-index-"+index} data-index={index} >
		{ content.map((character, cardIndex) => <Card key={index+"+"+cardIndex} character={character}/>) }
		</div>
	);

	//event function, changes the current page to the new index
	const changeCurrentPage = (newIndex) => {
		if (newIndex >= 0 && newIndex < pages().length) {
			let currentPage = document.getElementsByClassName("single-page current-page")[0];
			//check if a current page is shown (first render edge case)
			if (currentPage) {
				currentPage.classList.remove("current-page");
				//currentPage.style.display = "none";
				document.getElementById("page-button-"+currentPage.dataset.index).classList.remove("current-page");
			}

			let newCurrentPage = document.getElementById("page-index-"+newIndex);
			//newCurrentPage.style.display = "block";
			newCurrentPage.classList.add("current-page");
			document.getElementById("page-button-"+newIndex).classList.add("current-page");
		}
	};

	//event function for the 'previous page' button
	const previousPage = () => {
		let currentPage = document.getElementsByClassName("current-page")[0];
		changeCurrentPage(parseInt(currentPage.dataset.index)-1);
	};

	//event function for the 'next page' button
	const nextPage = () => {
		let currentPage = document.getElementsByClassName("current-page")[0];
		changeCurrentPage(parseInt(currentPage.dataset.index)+1);
	};

	//create the results page and components, and the pagination component
	const loadPage = () => (
		<>
		<div className='results-page'>
			{ pages().map((pageContent, index) => createSinglePage(pageContent, index)) }
		</div>
		<div className='pagination-zone'>
			<button className='change-page-button' name="previous" value="previous" onClick={()=>previousPage()}>Previous</button>
			{
				pages().map((val, index) => (<button key={"button"+index} className={classNames('page-button', {'current-page': index === 0})} id={"page-button-"+index} name={"page-button-"+index} onClick={()=>changeCurrentPage(index)}>{index+1}</button>))
			}
			<button className='change-page-button' name="next" value="next" onClick={()=>nextPage()}>Next</button>
		</div>
		</>
	);

	return (
		<>
			{
				charactersResult && charactersResult.length>0 ? 
				loadPage() :
				<div className='empty-results'><h4>No Results</h4></div>
			}
		</>
	);
};

export default Page;