import { Controller, Post, Body, Res, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Res() response: Response) {
        try {
            await this.authService.logout(response);
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Une erreur est survenue lors de la déconnexion'
            });
        }
    }
}
