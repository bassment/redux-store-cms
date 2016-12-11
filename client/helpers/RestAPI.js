const post = (url, body) => fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(body || {}),
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
}).then(res => res.json());

export const signin = (username, password) => post('/api/signin', {username, password});
export const signup = (username, password) => post('/api/signup', {username, password});
export const signout = () => post('/api/signout');

// GraphQL
const postGraphQL = (body) => fetch('/graphql', {
    method: 'POST',
    credentials: 'include',
    body: body || {},
    headers: {
        'Content-Type': 'application/graphql',
        Accept: 'application/graphql'
    }
}).then(res => res.json());

export const requestProducts = (payload) => postGraphQL(payload);
