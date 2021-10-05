const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const apigw = require('@aws-cdk/aws-apigateway');
const lambda = require('@aws-cdk/aws-lambda');
const path = require('path');

class PhotoUploadStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // s3 bucket
    const bucket = new s3.Bucket(this, 'sm-photo', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });
    // lambda function
    const fn = new lambda.Function(this, 'sm-photo-handler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src'))
    });
    // apigateway
    const api = new apigw.RestApi(this, 'sm-photo-upload', {
      proxy: false
    });
    const lambdaIntegration = new apigw.LambdaIntegration(fn)
    const photo = api.root.addResource('photo');
    photo.addMethod('POST', lambdaIntegration, {
      requestParameters: {
        'method.request.querystring.ratio': false
      }
    })

    // permissions 
    bucket.grantWrite(fn);
    fn.addEnvironment('BUCKET', bucket.bucketName);
  }
}

module.exports = { PhotoUploadStack }
