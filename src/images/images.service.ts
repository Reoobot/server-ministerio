import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Images } from './interfaces/images.interface';
import { ImagesDto } from './dto/images-dto/images-dto';

@Injectable()
export class ImagesService {
    constructor(@InjectModel('Images') private imagesModel: Model<Images>){}

    async uploadFile(filename:ImagesDto){
        // const response = new this.imagesModel(filename)
        // return await response.save();
        return this.imagesModel.create(filename)
        
    }

    async getImages ():Promise<Images[]>{
        const images = await this.imagesModel.find()
        return images;
    }

    async getImage (imageID: string): Promise<Images>{
        const image = await this.imagesModel.findById(imageID)
        return image;
    }

    async getPicture(filename:string):Promise<Images>{
        const image = await this.imagesModel.findById(filename)
        return image;
    }

    async deleteImage(imageID: string): Promise<Images>{
        const image = await this.imagesModel.findByIdAndDelete(imageID)
        return image;
    }
    
    async updateImage(imageID: string, imagesdto:ImagesDto):Promise<Images>{
        const updatedImage = await this.imagesModel.findByIdAndUpdate(imageID, imagesdto, {new:true})
        return updatedImage;
    }
}
