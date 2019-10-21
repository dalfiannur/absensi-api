import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UserService } from './user.service'
import { UserDTO, AuthDTO } from './user.dto'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { unlink } from 'fs'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

type GetAllQuery = {
  page?: number
  limit?: number
}

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/user')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString())
            .join('')
          cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    })
  )
  create(@Body() data: UserDTO, @UploadedFile() file: any) {
    data.picture = file.path
    console.log(data)
    return this.service.create(data)
  }

  @Put('/user/:id')
  async update(@Param('id') id: number, @Body() data: UserDTO) {
    const user = await this.service.findById(id)
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return this.service.update(id, data)
  }

  @Put('/user/:id/avatar')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString())
            .join('')
          cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    })
  )
  async updateAvatar(@Param('id') id: number, @UploadedFile() file: any) {
    const user = await this.service.findById(id)
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    unlink(user.picture, error => {
      console.error(error)
    })
    const data = {
      picture: file.path
    }
    console.log(data)
    return this.service.update(id, data)
  }

  @Delete('/user/:id')
  async delete(@Param('id') id: number) {
    const user = await this.service.findById(id)
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return this.service.delete(id)
  }

  @Get('/user/:id')
  async findOne(@Param('id') id: number) {
    const user = await this.service.findById(id)
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return user
  }

  @Get('/users')
  getAll(@Query() param: GetAllQuery) {
    return this.service.getAll({
      limit: param.limit || 10,
      page: param.page || 1
    })
  }

  @Post('/login')
  async login(@Body() auth: AuthDTO) {
    const user = await this.service.findByUsername(auth.username)

    if (!user || bcrypt.compareSync(auth.password, user.password))
      throw new HttpException(
        'Username or Password invalid',
        HttpStatus.UNPROCESSABLE_ENTITY
      )

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      'gardeaputri',
      {
        expiresIn: '7days'
      }
    )

    return {
      token
    }
  }
}
