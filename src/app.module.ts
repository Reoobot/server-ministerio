import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://f:879879@cluster0.a25ednn.mongodb.net/ministerio"),
    ImagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
