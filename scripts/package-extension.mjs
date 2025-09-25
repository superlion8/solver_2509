import { spawn } from 'node:child_process';
import { mkdir, rm, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const extensionDir = path.resolve(repoRoot, 'extension');
const downloadsDir = path.resolve(repoRoot, 'public', 'downloads');
const outputPath = path.resolve(downloadsDir, 'solver-extension.zip');

await mkdir(downloadsDir, { recursive: true });
await rm(outputPath, { force: true });

const isWindows = process.platform === 'win32';

async function ensureExtensionDirectory() {
  try {
    await access(extensionDir);
  } catch (error) {
    console.error('Cannot find the extension directory at', extensionDir);
    process.exit(1);
  }
}

await ensureExtensionDirectory();

const command = isWindows ? 'powershell' : 'zip';
const args = isWindows
  ? [
      '-NoLogo',
      '-NoProfile',
      '-Command',
      `Compress-Archive -Path "${extensionDir}/*" -DestinationPath "${outputPath}" -Force`
    ]
  : ['-qr', outputPath, '.'];

if (!isWindows) {
  await new Promise((resolve, reject) => {
    const which = spawn('which', ['zip']);
    which.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error('The "zip" command is required but not found. Install it or package the extension manually.'));
      }
    });
  }).catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

const child = spawn(command, args, {
  cwd: isWindows ? undefined : extensionDir,
  stdio: 'inherit'
});

const code = await new Promise((resolve) => {
  child.on('close', resolve);
});

if (code !== 0) {
  console.error('Failed to package the extension.');
  process.exit(code);
}

console.log(`Extension packaged at ${path.relative(repoRoot, outputPath)}`);
