const backendUrl = 'http://localhost:8081';
const imageUrl = backendUrl + '/api/image';
const authUrl = backendUrl + '/api/auth/';
const userUrl = backendUrl + '/api/users';
const friendUrl = backendUrl + '/api/friends';
const postUrl = backendUrl + '/api/posts';
const searchUrl = backendUrl + '/api/search';

const login = authUrl + 'login';
const signUp = authUrl + 'sign-up';
const logout = authUrl + 'logout';
const isUserLoggedIn = userUrl + '/isLoggedIn';

// 4117

const authUrls = {
  login,
  signUp,
  logout,
  isUserLoggedIn
};

const friendUrls = {
  friendUrl: friendUrl,
  friendRequests: friendUrl + '/requests',
  acceptFr: friendUrl + '/requests/accept',
  rejectFr: friendUrl + '/requests/reject'
};

const chatUrl = `${backendUrl}/api/chat`;

export { chatUrl, authUrl, authUrls, imageUrl, userUrl, friendUrl, postUrl, searchUrl, friendUrls };
