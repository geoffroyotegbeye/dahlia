import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    // Méthode de validation de l'utilisateur
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password_hash))) {
            // Ne pas inclure le mot de passe dans la réponse
            const { password_hash, ...result } = user;
            return result; // renvoie l'utilisateur sans le mot de passe
        }
        return null;
    }

    // Méthode de login
    async login(user: any) {
        const payload = { email: user.email, sub: user.id };

        // Générer le token JWT
        const access_token = this.jwtService.sign(payload);

        // Renvoie un objet avec le token et les infos utilisateur
        return {
            user: {
                email: user.email,
                id: user.id,
                // Ajouter d'autres informations de l'utilisateur selon votre besoin
            },
            access_token,
        };
    }

    // Méthode de déconnexion (supprimer le cookie JWT côté client)
    async logout(response: Response) {
        // Supprimer le cookie contenant le JWT
        response.clearCookie('access_token');
        response.status(200).json({ message: 'Déconnexion réussie' });
    }
}
