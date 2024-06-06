const url = 'https://peruvian-dni-info.p.rapidapi.com/dni/71784206';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'c52e5b9f5dmshd06f0e1ff5a802ep1bb4f8jsn329094d00cfa',
		'x-rapidapi-host': 'peruvian-dni-info.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}