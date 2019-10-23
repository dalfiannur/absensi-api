import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username)
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = { userId: user.id, username: user.username }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
