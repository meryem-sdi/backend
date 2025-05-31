import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import { initializeFirebaseAdmin } from './config/firebase';
import cabinetRoutes from './routes/CabinetRoutes';
import dossierRoutes from './routes/DossierClientRoutes';
import documentRoutes from './routes/DocumentRoutes';
import factureRoutes from './routes/FactureRoutes';
import rendezvousRoutes from './routes/RendezVousRoutes';
import utilisateurRoutes from './routes/UtilisateurRoutes';
import calendrierRoutes from './routes/CalendrierRoutes';
import clientRoutes from './routes/ClientRoutes';
import secretaireRoutes from './routes/SecretaireRoutes';
import administrateurRoutes from './routes/AdministrateurRoutes';
import avocatRoutes from './routes/AvocatRoutes';
import contactRoutes from './routes/ContactRoutes';
import { errorHandler } from './middlewares/errorHandler';
import statistiquesRoutes from "./routes/StatistiqueRoutes";

// Initialisation Firebase Admin SDK
initializeFirebaseAdmin();

const app = express();

// Configurer CORS pour autoriser le frontend React
app.use(
  cors({
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
  })
);

app.use(helmet());
app.use(express.json());

// Toutes les routes sont préfixées par /api
app.use('/api', routes);

// Routes supplémentaires
app.use('/api/cabinets', cabinetRoutes);
app.use('/api/dossiers', dossierRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/factures', factureRoutes);
app.use('/api/rendezvous', rendezvousRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/calendrier', calendrierRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/secretaires', secretaireRoutes);
app.use('/api/administrateurs', administrateurRoutes);
app.use('/api/avocats', avocatRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/statistiques", statistiquesRoutes);

// Gestion 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée.' });
});

// Middleware de gestion d'erreur (doit être le dernier)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});

export default app;