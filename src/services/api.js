const API_URL = 'https://connections-api.goit.global'; // URL-ul de bază al API-ului

const setAuthToken = token => {
  localStorage.setItem('authToken', token);
};

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const registerUser = async userData => {
  const response = await fetch(`${API_URL}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to register user');
  }
  const data = await response.json();
  setAuthToken(data.token);
  return data;
};

export const loginUser = async userData => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to login user');
  }
  const data = await response.json();
  setAuthToken(data.token);
  return data;
};

export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/users/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to logout user');
  }
  localStorage.removeItem('authToken');
};

export const fetchContacts = async () => {
  const response = await fetch(`${API_URL}/contacts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return response.json();
};

export const addContact = async contactData => {
  const response = await fetch(`${API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(contactData),
  });
  if (!response.ok) {
    throw new Error('Failed to add contact');
  }
  return response.json();
};

export const deleteContact = async contactId => {
  const response = await fetch(`${API_URL}/contacts/${contactId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete contact');
  }
};

export const updateContact = async (contactId, contactData) => {
  const response = await fetch(`${API_URL}/contacts/${contactId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(contactData),
  });
  if (!response.ok) {
    throw new Error('Failed to update contact');
  }
  return response.json();
};
