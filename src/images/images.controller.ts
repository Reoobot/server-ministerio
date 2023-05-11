import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { rename } from 'fs';
import { diskStorage } from 'multer';
// import { fileFilter, renameImage } from './helpers/images.helper';
import { ImagesService } from './images.service';
import { Images } from './interfaces/images.interface';
import { Sign } from 'crypto';
import { ImagesDto } from './dto/images-dto/images-dto';
import { Response} from 'express';
import { send } from 'process';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService){}
    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file', {
    //     storage: diskStorage({
    //         destination:'./upload',
    //         filename:renameImage
    //     }),
    //     fileFilter:fileFilter
    // }))
    // async uploadFile(@UploadedFile()file:Express.Multer.File){
    //     console.log(file)
    //     return await this.imagesService.uploadFile({filename:file.filename})
    // }
    @Get('/')
    async getImages(@Res()res):Promise<Images[]>{
        const images = await this.imagesService.getImages();
        return res.status(HttpStatus.OK).json(images)
    }
    @Get('/picture/:imageID')
    async getImage (@Res()res, @Param('imageID') imageID){
        const image = await this.imagesService.getImage(imageID);
        console.log(image)
        if(!image) throw new NotFoundException('Image Does not exists')
        return res.status(HttpStatus.OK).json(image)
        
    
    }
    @Delete('/picture/:imageID')
    async deleteImage(@Res()res, @Param('imageID')imageID: string){
        const deleteImage = await this.imagesService.deleteImage(imageID);
        if(!deleteImage) throw new NotFoundException('Image Does not exists')
        return res.status(HttpStatus.OK).json({
        message:'Image Delete Succesfully', deleteImage});
    }
    @Put('/:imageID')
    async updateImage(@Res()res, @Body() imagesdto: ImagesDto, @Param('imageID')imageID){
        const updateImage = await this.imagesService.updateImage(imageID, imagesdto)
        return res.status(HttpStatus.OK).json({
            message:'Image update succesfully', updateImage
        })
    }
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination:'./upload',
            filename:(req: any, file: any, cb: any)=>{
                const name = file.originalname.split('.')[0];
                const fileExtension = file.originalname.split('.')[1];
                const newFileName = name.split('').join('_')+ '_'+Date.now()+ '.'+ fileExtension;

                cb(null, newFileName);

            }
        }),
        fileFilter: (req:any, file:any, cb:any)=>{
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
                return cb(null, false)
            }
            cb(null, true)
        }
    }))

    async uploadFile(@UploadedFile()file:Express.Multer.File){
        console.log(file)
        if(!file){
            throw new BadRequestException('file is not an image', { cause: new Error(), description: 'Some error description' })
        } else{
            const response = {
                file: `http://localhost:3000/api/v1/images/${file.filename}`
                
            } 
            
            return await this.imagesService.uploadFile({filename:response.file})
        }

    }
    
    @Get('/:filename')
    async getPicture(@Param('filename')filename, @Res()res:Response){
        res.sendFile(filename,{root: './upload'})
    }
}
