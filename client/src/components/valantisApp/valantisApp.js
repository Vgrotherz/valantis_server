import md5 from 'md5';

let apiUrl = 'http://api.valantis.store:40000/'; // Исходная ссылка

// Проверяем, находимся ли мы в production-окружении
if (process.env.NODE_ENV === 'production') {
  apiUrl = 'https://valantis-server.vercel.app/'; // Заменяем ссылку для production
}

// Функция для получения URL API с сервера
const fetchApiUrl = async () => {
  try {
    const response = await fetch(`${apiUrl}api-url`, {
        mode: 'no-cors'
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch API URL: ${response.status} ${response.statusText}`);
    }
    const data = await response.text();
    apiUrl = data.trim(); // Получаем URL API от сервера
  } catch (error) {
    console.error('Error fetching API URL:', error);
  }
};

fetchApiUrl(); // Вызываем функцию для получения URL API

const apiPassword = 'Valantis';
const retryTime = 1000; // Время после которого будет повтор получения данных

export const getDataFromApi = async (action, params, retryCount = 0) => {
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    try {
        const response = await fetch(`${apiUrl}`, {
            method: "POST",
            body:JSON.stringify({
                action,
                params
            }),
            headers: {
                "Content-type" : "application/json",
                "X-Auth" : md5(`${apiPassword}_${timestamp}`)
            }
        });

        if(!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Error making API request:", error);

        await new Promise(resolve => setTimeout(resolve, retryTime));
        return getDataFromApi(action, params, retryCount + 1);
        // throw error;
    }
}