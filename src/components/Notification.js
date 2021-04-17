import React from 'react';

const Notification = ({ message, type }) => {
	if (message === null) {
		return null;
	}

	return (
		<div className={type === "error" ? "notification error" : "notification"}>
			{message}
		</div>
	);
}
 
export default Notification;