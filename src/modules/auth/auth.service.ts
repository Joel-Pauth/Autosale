import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, roleId, ...userData } = createUserDto;

      const idBusqueda = roleId || 2;
      const role = await this.roleRepository.findOneBy({ id: idBusqueda });

      if (!role)
        throw new NotFoundException(`El Rol con id ${idBusqueda} no existe.`);

      const user = this.userRepository.create({
        ...userData,
        password_hash: bcrypt.hashSync(password, 10),
        role: role,
      });

      await this.userRepository.save(user);

      const { password_hash, ...userWithoutPassword } = user;

      return {
        ...userWithoutPassword,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOneBy({ email });
    if (!user)
      throw new UnauthorizedException('Credenciales incorrectas (Email).');

    if (!bcrypt.compareSync(password, user.password_hash)) {
      throw new UnauthorizedException('Credenciales incorrectas (Password).');
    }

    if (!user.is_active) throw new UnauthorizedException('Usuario inactivo.');

    const { password_hash, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private handleDBErrors(error: any): never {
    if (error.status === 404) throw new NotFoundException(error.message);
    if (error.code === '23505')
      throw new BadRequestException('El correo ya existe.');
    console.log(error);
    throw new InternalServerErrorException(
      'Error del servidor, revisa los logs.',
    );
  }
}
