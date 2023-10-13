import { ApiProperty } from '@nestjs/swagger';
import * as fsx from 'fs-extra';
import { _getLinkPathStorage } from 'src/common/functions/functions';

export class CallBackUploadFileDto {
  @ApiProperty()
  typeFile: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  originalName: string;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  url: string;
}

export const uploadFiles = async (
  files: Express.Multer.File[],
): Promise<CallBackUploadFileDto[]> => {
  const dataCb: CallBackUploadFileDto[] = [];

  if (files.length) {
    for await (const item of files) {
      fsx.moveSync(
        item.path,
        `${_getLinkPathStorage()}/uploads/${item.filename}`,
      );

      const tempSplitTypeFile = item.originalname.split('.');

      dataCb.push({
        typeFile: tempSplitTypeFile[tempSplitTypeFile.length - 1],
        mimetype: item.mimetype,
        originalName: item.originalname,
        fileName: item.filename,
        url: `/upload/${item.filename}`,
      });
    }
  }

  return dataCb;
};

export const uploadFile = async (
  file: Express.Multer.File,
): Promise<CallBackUploadFileDto> => {
  const dataCb: CallBackUploadFileDto = {
    typeFile: '',
    mimetype: '',
    originalName: '',
    fileName: '',
    url: '',
  };

  if (file) {
    fsx.moveSync(
      file.path,
      `${_getLinkPathStorage()}/uploads/images/${file.filename}`,
    );

    const tempSplitTypeFile = file.originalname.split('.');
    dataCb.typeFile = tempSplitTypeFile[tempSplitTypeFile.length - 1];
    dataCb.mimetype = file.mimetype;
    dataCb.originalName = file.originalname;
    dataCb.fileName = file.filename;
    dataCb.url = `/upload/images/${file.filename}`;
  } else return null;

  return dataCb;
};
