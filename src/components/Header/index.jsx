import React from 'react';
import { FlexBox, Alignment } from '@lumx/react';
import Search from '../Search';

const Header = ({query, updateQuery}) => (
	<header className="lumx-spacing-padding-big header">
		<h1 className='header-title'>Marvel Characters</h1>
		<FlexBox vAlign={Alignment.right}>
			<Search 
			value={query}
			onChange={updateQuery}/>
		</FlexBox>
	</header>
);

export default Header;
