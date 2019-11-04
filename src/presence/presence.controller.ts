import * as _ from 'lodash'
import * as Moment from 'moment'
import * as Async from 'async'
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
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class PresenceController {
  constructor(private readonly service: PresenceService) { }

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
    const startDate = Moment(params.startDate ? new Date(params.startDate) : undefined)
      .utcOffset(0)
      .set({
        hour: 0,
        minute: 0,
        second: 1
      })
      .toDate()

    const endDate = Moment(params.endDate ? new Date(params.endDate) : undefined)
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
  async getAll(@Query() params: any) {
    const pagination = {
      limit: _.toInteger(params.limit),
      page: _.toInteger(params.page)
    }

    let typeId = [0]
    if (params.typeId) {
      typeId = typeof params.typeId === 'string' ? [params.typeId] : params.typeId
    }


    // if (attended === 'true') {
    const date = params.date ? Moment(params.date, 'DDMMYYYY') : Moment(new Date())

    const options = {
      typeId,
      attended: params.attended && params.attended === 'false' ? false : true,
      startDate: date.set({
        hour: 0,
        minute: 0,
        second: 1
      }),
      endDate: date.set({
        hours: 23,
        minutes: 59,
        seconds: 59
      })
    }

    return this.service.getAll(pagination, options);
    // } else {
    // const date = params.date ? Moment(params.date, 'DDMMYYYY') : Moment(new Date())
    // const startDate = date.set({
    //   hour: 0,
    //   minute: 0,
    //   second: 1
    // })
    // const endDate = date.set({
    //   hours: 23,
    //   minutes: 59,
    //   seconds: 59
    // })

    // const options = {
    //   startDate,
    //   endDate,
    //   typeId
    // }

    // const data = await this.service.getAllNotAttended(pagination, options)
    // const result = data.pagination
    // const items = await Async.map(result.items, (item, cb) => {
    //   cb(null, {
    //     user: item,
    //     type: {
    //       name: data.types.map((item: any) => item.name).join(', ')
    //     }
    //   })
    // })

    // return {
    //   ...result,
    //   items
    // }
    // return data
    // }


  }
}
