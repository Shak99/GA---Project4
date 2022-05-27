import tokenService from "./tokenService"

const BASE_URL = '/api'

export function create(docId){
	return fetch(`${BASE_URL}/docs/${docId}/stars`, {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + tokenService.getToken()
		  }
	}).then(res => {
		if(res.ok) return res.json()
		throw new Error('Not logged In! Check Express terminal')
	})
}

export function removeStar(starId){
	return fetch(`${BASE_URL}/stars/${starId}`, {
		method: 'DELETE',
		headers: {
			'Authorization': 'Bearer ' + tokenService.getToken()
		  }
	}).then(res => {
		if(res.ok) return res.json()
		throw new Error('Not logged In! Check Express terminal')
	})
}