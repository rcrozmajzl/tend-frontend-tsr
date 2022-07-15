
function authHeader() {
    // return authorization header with jwt jwt
    let user = JSON.parse(`${localStorage.getItem('user')}`);

    if (user && user.jwt) {
        return { 'Authorization': `Bearer ${user.jwt}` };
    } else {
        return {};
    }
}

export default authHeader