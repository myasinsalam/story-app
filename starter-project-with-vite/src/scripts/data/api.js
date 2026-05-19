const BASE_URL =
  'https://story-api.dicoding.dev/v1';

export async function register(
  name,
  email,
  password
) {

  const response =
    await fetch(
      `${BASE_URL}/register`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

  return response.json();
}

export async function login(
  email,
  password
) {

  const response =
    await fetch(
      `${BASE_URL}/login`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

  return response.json();
}

export async function getStories(
  token
) {

  const response =
    await fetch(
      `${BASE_URL}/stories`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.json();
}

export async function addStory(
  formData,
  token
) {

  const response =
    await fetch(
      `${BASE_URL}/stories`,
      {
        method: 'POST',

        headers: {
          Authorization:
            `Bearer ${token}`,
        },

        body: formData,
      }
    );

  return response.json();
}

export async function subscribeNotification(
  subscription,
  token
) {

  const response =
    await fetch(
      `${BASE_URL}/notifications/subscribe`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify(
          subscription
        ),
      }
    );

  return response.json();
}

export async function unsubscribeNotification(
  endpoint,
  token
) {

  const response =
    await fetch(
      `${BASE_URL}/notifications/subscribe`,
      {
        method: 'DELETE',

        headers: {
          'Content-Type':
            'application/json',

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          endpoint,
        }),
      }
    );

  return response.json();
}