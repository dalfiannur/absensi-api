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
import { DepartementService } from './departement.service'
import { DepartementDTO } from './departement.dto'
import { AuthGuard } from '@nestjs/passport'
import * as _ from 'lodash'

type GetAllQuery = {
  page?: number
  limit?: number
}

@Controller()
export class DepartementController {
  constructor(private readonly service: DepartementService) { }

  @Post('/departement')
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() data: DepartementDTO) {
    data.code = _.kebabCase(data.name)

    return this.service
      .create(data)
      .then(result => ({
        ...result.generatedMaps[0],
        ...data
      }))
      .catch(error => {
        throw new HttpException(error, 422)
      })
  }

  @Put('/departement/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: number, @Body() data: DepartementDTO) {
    const departement = await this.service.findById(id)

    if (!departement)
      throw new HttpException('Departement not found', HttpStatus.NOT_FOUND)

    data.code = _.kebabCase(data.name)

    return this.service
      .update(id, data)
      .then(() => ({
        ...departement,
        ...data
      }))
      .catch(error => {
        throw new HttpException(error, 422)
      })
  }

  @Delete('/departement/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: number) {
    const departement = await this.service.findById(id)

    if (!departement)
      throw new HttpException('Departement not found', HttpStatus.NOT_FOUND)

    return this.service
      .delete(id)
      .then(result => result)
      .catch(error => {
        throw new HttpException(error, 400)
      })
  }

  @Get('/departement/:id')
  async findById(@Param('id') id: number) {
    const departement = await this.service.findById(id)
    
    if (!departement)
      throw new HttpException('Departement not found', HttpStatus.NOT_FOUND)

    return departement
  }

  @Get('/departements')
  getAll(@Query() param: GetAllQuery) {
    return this.service.getAll({
      limit: param.limit || 25,
      page: param.page || 1
    })
  }
}
