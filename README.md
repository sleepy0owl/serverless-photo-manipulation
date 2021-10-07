# Welcome to your CDK JavaScript project!

This is a blank project for JavaScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app. The build step is not required when using JavaScript.

## Useful commands

 * `npm run test`         perform the jest unit tests
 * `cdk deploy`           deploy this stack to your default AWS account/region
 * `cdk diff`             compare deployed stack with current state
 * `cdk synth`            emits the synthesized CloudFormation template

****
## End points
* `<api gateway>/photo` uploads a photo in s3
* `<api gateway/photo?ration=<number>` also uploads a photo but downdrades by `<number>`%

## Payload
Takes base64 encoded string of an image
```json
{
    "file": "/9j/4AAQSkZJRgABAQAAAQABAAD/4QBqRXhpZgAASUkqAAgAAAADABIBAwABAA........."
}
```