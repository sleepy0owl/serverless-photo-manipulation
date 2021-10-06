const aws = require('aws-sdk');
const jimp = require('jimp');
aws.config.update({region:"us-east-1"});

function calculate_dimention(dim, ratio){
    return Math.round(dim * (ratio / 100));
}
module.exports.handler = async (event, context) => {
    try {
        const bucket_name = process.env.BUCKET;
        console.log('BUCKET :', bucket_name);
        console.log(event);
        const body = JSON.parse(event.body);
        let file = body.file;
        // base64 decode
        let base64_string = file.replace(/^data:image\/\w+;base64,/, '');
        //create buffer 
        let file_buffer = Buffer.from(base64_string, "base64");

        if (event.queryStringParameters){
            const ratio = event.queryStringParameters.ratio;
            const image = await jimp.read(file_buffer);
            const height = image.bitmap.height;
            const width = image.bitmap.width;
            const new_height = calculate_dimention(height, ratio);
            const new_width = calculate_dimention(width, ratio);
            const new_image = image.resize(new_width, new_height);
            file_buffer = await new_image.getBufferAsync(jimp.AUTO);

        }
        const s3 = new aws.S3();
        const upload_response = await s3.upload({
            Bucket: bucket_name,
            Key: `${Date.now().toString()}.jpeg`,
            Body: file_buffer,
            ContentType: 'image/jpeg'
        }).promise();
        console.log(upload_response);
        return {
            statusCode:200,
            body: JSON.stringify({"message": 'upload success'})
        } 
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'something went wrong in event handler'
        }
    }
}