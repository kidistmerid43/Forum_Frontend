import React, { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState(
		{
		token: "",
		user: null,
		config: {},
	});

	return (
		<UserContext.Provider value={{userData, setUserData}}>
			{children}
		</UserContext.Provider>
	);
};
