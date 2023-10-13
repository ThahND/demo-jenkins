import { Injectable } from '@nestjs/common';
import { uploadFile, uploadFiles } from 'src/configs/config.upload';
import * as fsx from 'fs-extra';
import { _getLinkPathStorage } from 'src/common/functions/functions';

@Injectable()
export class UploadsService {
  constructor() {
    this._basePublicUps();
  }

  async uploadFile(file: Express.Multer.File) {
    return await uploadFile(file);
  }

  async uploadFiles(files: Express.Multer.File[]) {
    return await uploadFiles(files);
  }

  async _basePublicUps() {
    const publicUps = await fsx.readdir('public/uploads');

    // Check folder
    await fsx.mkdir(`${_getLinkPathStorage()}/uploads`, { recursive: true });

    publicUps.forEach((item) => {
      fsx.copyFile(
        `public/uploads/${item}`,
        `${_getLinkPathStorage()}/uploads/${item}`,
      );
    });
  }
}
