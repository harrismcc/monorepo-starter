import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

const stack = pulumi.getStack();
const username = stack.replace('transcend-io/', '');

const bucket = new aws.s3.Bucket('website-contents', {
    bucket: `${username}-onboarding-site-transcend-io`,
    acl: 'public-read',
    website: {
        indexDocument: 'index.html',
        errorDocument: 'index.html',
    },
    policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
            {
                Effect: 'Allow',
                Principal: '*',
                Action: ['s3:GetObject'],
                Resource: [`arn:aws:s3:::${username}-onboarding-site-transcend-io/*`],
            },
        ],
    }),
});

export const bucketName = bucket.bucket;
export const bucketUrl = pulumi.interpolate`https://${bucket.bucketDomainName}/index.html`;
