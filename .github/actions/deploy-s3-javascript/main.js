const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec')
function run(){
    // Get the inputs from the action
    const bucket = core.getInput('bucket', {required: true});
    const bucketRegion = core.getInput('bucket-region', {required: true});
    const distFolder = core.getInput('dist-folder', {required: true});
    core.notice('Hello from deploy-s3-deploy custom javascript action!');

    

    // Upload the files to S3
    const s3Url = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Url} --region ${bucketRegion}`);

    const websiteUrl = `http://${bucket}.s3-website.${bucketRegion}.amazonaws.com`;
    
    core.notice(`Website URL: ${websiteUrl}`);
    core.setOutput('website-url', websiteUrl);

}

run();