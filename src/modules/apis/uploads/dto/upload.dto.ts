import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({ type: 'file', format: 'binary' })
  file: string;
}

export class UploadFilesDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  files: string[];
}
