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
  HttpStatus,
  UseGuards
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UserService } from './user.service'
import { UserDTO } from './user.dto'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { unlink } from 'fs'
import { AuthGuard } from '@nestjs/passport'
import { hashSync, genSaltSync } from 'bcrypt'

type GetAllQuery = {
  page?: number
  limit?: number
}

@Controller()
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/user')
  @UseGuards(AuthGuard('jwt'))
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
    if (file) {
      data.picture = file.path
    }
    const salt = genSaltSync(10)
    data.password = hashSync(data.password, salt)
    return this.service.create(data)
  }

  @Put('/user/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: number, @Body() data: UserDTO) {
    const user = await this.service.findById(id)
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    if (data.password) {
      data.password = hashSync(data.password, genSaltSync(10))
    }
    return this.service.update(id, data)
  }

  @Put('/user/:id/avatar')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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

  @Post('/signup')
  async signup(@Body() signup: UserDTO) {
    signup.roleId = 2
    return this.service.create(signup)
  }
}
