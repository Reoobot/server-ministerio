


// export const renameImage = (_req: any, file: any, calback: any)=>{
//     const name = file.originalname.split('.')[0];
//     const fileName = file.originalname;
//     const randomName = Array(4)
//                 .fill(null)
//                 .map(()=>Math.round(Math.random()*16))
//                 .join('');

//         console.log(`${name}-${randomName}${fileName}`)
//        calback(null, `${name}-${randomName}${fileName}`); 
// }

// export const fileFilter = (req: any, file: any, calback: any)=>{
//     if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
//         return calback(new Error('Invalid format type'), false)
//     }
//     calback(null, true)
// }

