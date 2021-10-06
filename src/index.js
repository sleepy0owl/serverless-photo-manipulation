const aws = require('aws-sdk');
aws.config.update({region:"us-east-1"});

module.exports.handler = async (event, context) => {
    try {
        const bucket_name = process.env.BUCKET;
        console.log('BUCKET :', bucket_name);
        const body = JSON.parse(event.body);
        let file = body.file;
        // base64 decode
        let base64_string = file.replace(/^data:image\/\w+;base64,/, '');
        //create buffer 
        let file_buffer = Buffer.from(base64_string, "base64");
        
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