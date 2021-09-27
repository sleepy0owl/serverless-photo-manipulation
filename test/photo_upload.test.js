const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const PhotoUpload = require('../lib/photo_upload-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new PhotoUpload.PhotoUploadStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
