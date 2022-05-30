import tokenService from './tokenService';

const BASE_URL = '/api/docs/';

export function create(doc) {
    return fetch(BASE_URL, {
      method: 'POST',
      body: doc,
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken(),
      }
    
    }).then(res => {
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
  }

  export function getAll() {
    return fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    })
    .then(res => {
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
  }