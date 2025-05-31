import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:3000/api';

async function testRegister() {
  try {
    // 1. Inscription de l'avocat
    const registerData = {
      email: 'meriamsaoudi4@gmail.com',
      password: 'qergsdfhdtyj25Mµ*',
      role: 'avocat',
      prenom: 'Meriam',
      nom: 'Saoudi'
    };

    console.log('Tentative d\'inscription avec les données:', registerData);

    const registerResponse = await axios.post(`${API_URL}/auth/register`, registerData);
    console.log('Inscription réussie:', registerResponse.data);

    // 2. Connexion pour vérifier
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'meriamsaoudi4@gmail.com',
      password: 'qergsdfhdtyj25Mµ*'
    });
    
    console.log('Connexion réussie:', loginResponse.data);

  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Erreur détaillée:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        code: error.code
      });
    } else {
      console.error('Erreur inattendue:', error);
    }
  }
}

testRegister(); 