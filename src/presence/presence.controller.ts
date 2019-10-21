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

type GetAllQuery = {
  page?: number;
  limit?: number;
};

@Controller('presence')
export class PresenceController {
  constructor(private readonly service: PresenceService) {}

  @Post()
  create(@Body() data: PresenceDTO) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: PresenceDTO) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Get()
  getAll(@Query() param: GetAllQuery) {
    this.service.getAll({
      limit: param.limit,
      page: param.page,
    });
  }
}
