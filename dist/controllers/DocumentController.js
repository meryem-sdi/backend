"use strict";
/**
 * @file document.controller.ts
 * @description Contrôleur Express pour les documents.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const DocumentService_1 = require("../services/DocumentService");
const Document_1 = require("../models/Document");
class DocumentController {
    static createDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, nom, contenu, dateAjout } = req.body;
                const document = new Document_1.Document(type, nom, contenu, new Date(dateAjout));
                const id = yield DocumentService_1.DocumentService.create(document);
                res.status(201).json({ id, message: 'Document créé avec succès.' });
            }
            catch (error) {
                console.error('Erreur création document :', error);
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getDocumentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const document = yield DocumentService_1.DocumentService.getById(id);
                if (!document) {
                    res.status(404).json({ message: 'Document non trouvé.' });
                    return;
                }
                res.status(200).json(document);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static updateDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                yield DocumentService_1.DocumentService.update(id, data);
                res.status(200).json({ message: 'Document mis à jour avec succès.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static deleteDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield DocumentService_1.DocumentService.delete(id);
                res.status(200).json({ message: 'Document supprimé avec succès.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getAllDocuments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const documents = yield DocumentService_1.DocumentService.getAll();
                res.status(200).json(documents);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
}
exports.DocumentController = DocumentController;
