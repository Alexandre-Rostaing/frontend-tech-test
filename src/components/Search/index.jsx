import React from 'react';
import { TextField, Theme } from '@lumx/react';
import { mdiMagnify } from '@lumx/icons';

const Search = ({value,onChange}) => (
	<TextField value={value} theme={Theme.dark} placeholder="Search ..." icon={mdiMagnify} onChange={(e)=>{onChange(e)} } />
);

export default Search;
