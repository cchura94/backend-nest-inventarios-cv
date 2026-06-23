import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDto{
    @ApiProperty({type: 'string', format: 'binary', description: 'subir archivo'})
    file: any
}