import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("/v1/auth/login")
    funIngresar(@Body() datos: LoginAuthDto){

        return this.authService.funLogin(datos.email, datos.password);
    }
}
