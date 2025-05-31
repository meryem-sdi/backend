"use strict";
/**
 * @file checkUserRole.ts
 * @description Middleware pour vérifier le rôle de l'utilisateur connecté.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserRole = void 0;
const checkUserRole = (rolesAutorises) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !user.role) {
            return res.status(403).json({ message: 'Accès interdit. Aucun rôle défini.' });
        }
        if (!rolesAutorises.includes(user.role)) {
            return res.status(403).json({ message: 'Accès interdit. Rôle non autorisé.' });
        }
        next();
    };
};
exports.checkUserRole = checkUserRole;
