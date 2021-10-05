const aws = require('aws-sdk');
aws.config.update({region:"us-east-1"});

module.exports.handler = async (event, context) => {
    try {
        const bucket_name = process.env.BUCKET;
        console.log('BUCKET :', bucket_name);
        const body = event.body;
        const s3 = new aws.S3();
        var presigned_url = s3.getSignedUrl('putObject', {
            Bucket: bucket_name,
            Key: 'image.jpeg',
            Expires: 100
        });
        presigned_url = decodeURIComponent(presigned_url)
        return {
            statusCode:200,
            body: JSON.stringify({"url": presigned_url})
        } 
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'something went wrong in event handler'
        }
    }
}