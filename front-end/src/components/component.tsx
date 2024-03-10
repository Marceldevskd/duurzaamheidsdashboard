import React from 'react';

type componentProps = {
	hoi: string
}

const Component: React.FC<componentProps> = ({ hoi }) => {
	return (
		<div>
			{hoi}
		</div>
	);
};

export default Component;
