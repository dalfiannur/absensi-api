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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

type GetAllQuery = {
  page?: number;
  limit?: number;
};

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString())
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(@Body() data: UserDTO, @UploadedFile() file: any) {
    data.picture = file.path;
    console.log(data);
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: UserDTO) {
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
    return this.service.getAll({
      limit: param.limit || 10,
      page: param.page || 1,
    });
  }
}
