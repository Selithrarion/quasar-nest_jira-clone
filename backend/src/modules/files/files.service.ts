import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { S3 } from 'aws-sdk';
import { PublicFileEntity } from './entity/public-file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFileEntity)
    private readonly files: Repository<PublicFileEntity>
  ) {}

  async uploadPublicFile(fileBuffer: Buffer, filename: string): Promise<PublicFileEntity> {
    const Bucket = process.env.AWS_PUBLIC_S3_BUCKET_NAME;
    const ACL = 'public-read';

    const s3 = new S3();
    const uploadedFile = await s3
      .upload({
        Bucket,
        ACL,
        Body: fileBuffer,
        Key: filename,
      })
      .promise();

    const newFile = this.files.create({
      key: uploadedFile.Key,
      url: uploadedFile.Location,
    });
    await this.files.save(newFile);

    return newFile;
  }

  async deletePublicFile(id: number): Promise<void> {
    const file = await this.files.findOne(id);
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: process.env.AWS_PUBLIC_S3_BUCKET_NAME,
        Key: file.key,
      })
      .promise();
    await this.files.delete(id);
  }
}
