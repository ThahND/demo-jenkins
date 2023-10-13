import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fsx from 'fs-extra';
import { _getLinkPathStorage } from '../functions/functions';

export const multerUploadImageOptions = {
  limits: {
    fileSize: +20000000,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type <${extname(file.originalname)}>`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: process.env.STORAGE,
    filename: (req, file, cb) => {
      const file_name = `${Date.now()}-${file.originalname.replace(' ', '')}`;
      fsx.mkdirSync(`./storage/uploads`, { recursive: true });
      fsx.mkdirSync(`${_getLinkPathStorage()}/uploads`, { recursive: true });
      cb(null, `${file_name}`);
    },
  }),
};

export const multerUploadAllFilesOptions = {
  limits: {
    fileSize: +20000000,
  },
  storage: diskStorage({
    destination: process.env.STORAGE,
    filename: (req, file, cb) => {
      const file_name = `${Date.now()}-${file.originalname.replace(' ', '')}`;
      fsx.mkdirSync(`./storage/uploads`, { recursive: true });
      fsx.mkdirSync(`${_getLinkPathStorage()}/uploads`, { recursive: true });
      cb(null, `${file_name}`);
    },
  }),
};

export const multerUploadSheetOptions = {
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    if (
      file.mimetype.match(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      )
    ) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type <${extname(file.originalname)}>`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: process.env.STORAGE,
    filename: (req, file, cb) => {
      const file_name = `${Date.now()}-${file.originalname.replace(' ', '')}`;
      fsx.mkdirSync(`./storage/uploads`, { recursive: true });
      fsx.mkdirSync(`${_getLinkPathStorage()}/uploads`, { recursive: true });
      cb(null, `${file_name}`);
    },
  }),
};
