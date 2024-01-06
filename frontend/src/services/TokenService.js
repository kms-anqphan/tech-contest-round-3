const getLocalToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token;
};

const updateLocalToken = (token) => {
  const user = JSON.parse(localStorage.getItem('user'));
  user.token = token;
  localStorage.setItem('user', JSON.stringify(user));
};

const getUser = () => JSON.parse(localStorage.getItem('user'));

const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem('user');
};

const updateUser = (displayName, avatarUrl) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (displayName) user.displayName = displayName;
  if (avatarUrl) user.avatarUrl = avatarUrl;

  setUser(user);
};

const TokenService = {
  getLocalToken,
  updateLocalToken,
  getUser,
  setUser,
  removeUser,
  updateUser
};

export default TokenService;