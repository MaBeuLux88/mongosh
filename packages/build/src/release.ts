import os from 'os';
import { Octokit } from '@octokit/rest';
import Config from './config';
import compileExec from './compile-exec';
import uploadArtifactToEvergreen from './evergreen';
import createRelease, { isReleasable, uploadAsset } from './github';
import uploadArtifactToDownloads from './upload-artifact';
import uploadDownloadCenterConfig from './download-center';
import Platform from './platform';
import zip from './zip';
import S3 from 'aws-sdk/clients/s3';

/**
 * Run the release process.
 *
 * @param {Config} config - the configuration, usually config/build.config.js.
 */
const release = async(config: Config) => {
  const platform = os.platform();
  // console.log('mongosh: releasing with config:', config);

  const octokit = new Octokit({
    auth: config.githubToken,
    userAgent: `mongosh ${config.version}`
  });

  // - Build the executable.
  await compileExec(config.input, config.outputDir, platform);

  // - Sign the executable for each OS. Sign executable or zip?
  // - Notarise the zip (only on macos)

  // - Zip the executable.
  const artifact = await zip(config.input, config.outputDir, platform, config.version);

  // - Create & sign the .deb (only on linux)
  // - Create & sign the .rpm (only on linux)
  // - Create & sign the .msi (only on win)

  // - Upload artifacts to S3 for Evergreen.
  await uploadArtifactToEvergreen(
    artifact,
    config.evgAwsKey,
    config.evgAwsSecret,
    config.project,
    config.revision
  );

  if (await isReleasable(config.version, octokit)) {
    const releaseId = await createRelease(config.version, octokit);
    await uploadAsset(artifact, octokit);

    // - Publish the .deb (only on linux)
    // - Publish the .rpm (only on linux)
    // - Create PR for Homebrew (only on macos)

    // - Upload the artifact to downloads.10gen.com
    await uploadArtifactToDownloads(
      artifact,
      config.downloadCenterAwsKey,
      config.downloadCenterAwsSecret,
      config.project,
      config.revision
    );

    // - Create download center config and upload.
    // - Publish to NPM.
    //
    // These only need to happen once so we only run them on MacOS.
    if (platform === Platform.MacOs) {
      await uploadDownloadCenterConfig(
        config.version,
        config.downloadCenterAwsKey,
        config.downloadCenterAwsSecret
      );
      // npm publish.
    }
  }
}; 

export default release;
