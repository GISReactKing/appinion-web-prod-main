const s3_Options = (name) => {
  return {
    // keyPrefix: `uploads/${name}/`,
    bucketName: 'appinionapp250418e14558403b94723a40d61b0a0d182539-dev',
    region: 'eu-west-1',
    accessKeyId: 'AKIA5Y66ACKM5NIWHRMZ',
    secretAccessKey: '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',
    // successActionStatus: 201,
  };
};

const s3_PostsImageOptions = (name) => {
  return {
    keyPrefix: `posts/${name}/`,
    bucket: 'appinionapp250418e14558403b94723a40d61b0a0d182539-dev',
    region: 'eu-west-1',
    accessKey: 'AKIA5Y66ACKM5NIWHRMZ',
    secretKey: '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',
    successActionStatus: 201,
  };
};

export {s3_Options, s3_PostsImageOptions};
