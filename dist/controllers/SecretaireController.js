"use strict";
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
exports.SecretaireController = void 0;
const SecretaireService_1 = require("../services/SecretaireService");
class SecretaireController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secretaire = yield SecretaireService_1.SecretaireService.create(req.body);
                res.status(201).json(secretaire);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield SecretaireService_1.SecretaireService.getAll();
                res.json(data);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield SecretaireService_1.SecretaireService.getById(req.params.id);
                res.json(data);
            }
            catch (error) {
                res.status(404).json({ error: error.message });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield SecretaireService_1.SecretaireService.update(req.params.id, req.body);
                res.json(data);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield SecretaireService_1.SecretaireService.delete(req.params.id);
                res.json({ message: 'Secretaire supprimé' });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.SecretaireController = SecretaireController;
