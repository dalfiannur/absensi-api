import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PresenceService } from './presence.service';
import { PresenceDTO } from './presence.dto';
import * as _ from 'lodash'
import * as moment from 'moment'
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: number, @Body() data: PresenceDTO) {
    return this.service.update(id, data);
  }

  @Delete('/presence/:id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Get('/count-presence')
  count(@Query() params: any) {
    const startDate = moment(params.startDate ? new Date(params.startDate): undefined)
      .utcOffset(0)
      .set({
        hour: 0,
        minute: 0,
        second: 1
      })
      .toDate()

    const endDate = moment(params.endDate ? new Date(params.endDate) : undefined)
      .utcOffset(0)
      .set({
        hours: 23,
        minutes: 59,
        seconds: 59
      })
      .toDate()
    
    return this.service.countBetweenDate(startDate, endDate, {
      typeId: params.typeId ? params.typeId : undefined
    });
  }

  @Get('check-presence')
  check(@Query() params: any) {
    return this.service.checkByUserIdAndTypeId(params.userId, params.typeId)
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
