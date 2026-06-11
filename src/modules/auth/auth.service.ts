import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../admin/users/users.service';
import { hash, compare } from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService){}

    async funLogin(email: string, pass_entrante: string){
        // buscar user por email
        const user = await this.userService.findOneByEmail(email);
        if(!user){
            return new HttpException('Usuario no encontrado', 404);
        }

        // verificar la contraseña
        const verificarPass = await compare(pass_entrante, user.password);
        if(!verificarPass) throw new HttpException('Contraseña Incorrecta', 401);

        // JWT (Json Web Token)

        // return
        return user;

    }
}
