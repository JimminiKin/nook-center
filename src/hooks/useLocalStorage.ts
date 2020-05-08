import React from 'react';

const useLocalStorage = <TStored>(
	key: string,
	initialValue: TStored,
): [TStored, (value: TStored) => void, () => void] => {
	key = `v3-${key}`;

	if (typeof window === 'undefined') {
		return [
			initialValue,
			() => {
				throw new Error('Can not set a value with useLocalStorage on server side');
			},
			() => {},
		];
	}

	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = React.useState(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			console.log(error);
			return initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			// Save state
			setStoredValue(valueToStore);
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};

	const deleteValue = () => {
		try {
			// Save empty state
			setStoredValue(initialValue);
			// Remove from local storage
			window.localStorage.removeItem(key);
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};

	return [storedValue, setValue, deleteValue];
};

export default useLocalStorage;
