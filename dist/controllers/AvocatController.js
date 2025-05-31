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
exports.AvocatController = void 0;
const AvocatService_1 = require("../services/AvocatService");
class AvocatController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const avocat = yield AvocatService_1.AvocatService.create(req.body);
                res.status(201).json(avocat);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield AvocatService_1.AvocatService.getAll();
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
                const data = yield AvocatService_1.AvocatService.getById(req.params.id);
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
                const data = yield AvocatService_1.AvocatService.update(req.params.id, req.body);
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
                yield AvocatService_1.AvocatService.delete(req.params.id);
                res.json({ message: 'Avocat supprimé' });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.AvocatController = AvocatController;
