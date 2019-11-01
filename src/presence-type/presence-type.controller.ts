import * as _ from 'lodash'
import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Query,
  HttpException,
  HttpStatus,
  UseGuards
} from '@nestjs/common'
import { PresenceTypeService } from './presence-type.service'
import { PresenceTypeDTO } from './presence-type.dto'
import { AuthGuard } from '@nestjs/passport'

type GetAllQuery = {
  page?: number
  limit?: number
}

@Controller()
export class PresenceTypeController {
  constructor(private readonly service: PresenceTypeService) {}

  @Post('/presence-type')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() data: PresenceTypeDTO) {
    return this.service.create(data)
      .then(result => {
        return { ...result.generatedMaps[0], ...data }
      })
      .catch(error => {
        throw new HttpException(error, 422)
      })
  }

  @Put('/presence-type/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: number, @Body() data: PresenceTypeDTO) {
    const type = await this.service.findById(id)
    if (!type) throw new HttpException('Type not found', HttpStatus.NOT_FOUND)
    return this.service.update(id, data)
      .then(result => {
        return {
          ...type,
          ...data,
          code: _.kebabCase(data.name)
        }
      })
      .catch(error => {
        throw new HttpException(error, 422)
      })
  }

  @Delete('/presence-type/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: number) {
    const type = await this.service.findById(id)
    if (!type) throw new HttpException('Type not found', HttpStatus.NOT_FOUND)
    return this.service.delete(id)
      .then(result => result)
      .catch(error => {
        throw new HttpException(error, 400)
      })
  }

  @Get('/presence-type/:id')
  async findById(@Param('id') id: number) {
    const type = await this.service.findById(id)
    if (!type) throw new HttpException('Type not found', HttpStatus.NOT_FOUND)
    return type
  }

  @Get('/presence-types')
  getAll(@Query() param: GetAllQuery) {
    return this.service.getAll({
      limit: param.limit || 25,
      page: param.page || 1
    })
  }
}
