import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { PresenceService } from './presence.service';
import { PresenceDTO } from './presence.dto';
import * as _ from 'lodash'

type GetAllQuery = {
  page?: number;
  limit?: number;
};

@Controller()
export class PresenceController {
  constructor(private readonly service: PresenceService) {}

  @Post('/presence')
  create(@Body() data: PresenceDTO) {
    return this.service.create(data);
  }

  @Put('/presence/:id')
  update(@Param('id') id: number, @Body() data: PresenceDTO) {
    return this.service.update(id, data);
  }

  @Delete('/presence/:id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Get('/presence/:id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Get('/presences')
  getAll(@Query() param: GetAllQuery) {
    return this.service.getAll({
      limit: _.toInteger(param.limit),
      page: _.toInteger(param.page),
    });
  }
}
