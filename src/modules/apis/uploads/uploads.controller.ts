import {
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { multerUploadAllFilesOptions } from 'src/common/uploads/upload-files';
import { UploadsService } from './uploads.service';
import * as fsx from 'fs-extra';
import { Request, Response } from 'express';
import { _getLinkPathStorage } from 'src/common/functions/functions';
import { CallBackUploadFileDto } from 'src/configs/config.upload';

@ApiTags('Uploads')
@ApiBearerAuth()
@Controller('upload')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('file')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '| Upload file' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({ type: CallBackUploadFileDto })
  @UseInterceptors(FileInterceptor('file', multerUploadAllFilesOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadsService.uploadFile(file);
  }

  @Post('files')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '| Upload files (max 100 file)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiCreatedResponse({ type: [CallBackUploadFileDto] })
  @UseInterceptors(FilesInterceptor('files', 100, multerUploadAllFilesOptions))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.uploadsService.uploadFiles(files);
  }

  @Get('*')
  async getFile(@Req() req: Request, @Res() res: Response) {
    const pathFile = decodeURI(req.originalUrl.substring(8));
    const filepath = `${_getLinkPathStorage()}/uploads/${pathFile}`;
    if (!fsx.existsSync(filepath)) {
      throw new NotFoundException('File not found!.');
    }
    res.sendFile(filepath);
  }
}
