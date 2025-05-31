import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:3000/api';

async function testDossier() {
  try {
    // 1. Authentification
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'password123'
    });
    
    const token = loginResponse.data.token;
    console.log('Token obtenu:', token);

    // 2. Création d'un dossier
    const dossierData = {
      titre: 'Dossier Test',
      description: 'Description du dossier test',
      idAvocat: 'ID_AVOCAT', // À remplacer par un ID valide
      idClient: 'ID_CLIENT', // À remplacer par un ID valide
      dateLimite: '2024-12-31'
    };

    const createResponse = await axios.post(`${API_URL}/dossiers`, dossierData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Dossier créé:', createResponse.data);

    // 3. Vérification de la création
    const getResponse = await axios.get(`${API_URL}/dossiers/${createResponse.data.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Dossier récupéré:', getResponse.data);

  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Erreur:', error.response?.data || error.message);
    } else {
      console.error('Erreur inattendue:', error);
    }
  }
}

testDossier(); 