const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

const srcDir = path.join(__dirname, 'client', 'dist');
const destDir = path.join(__dirname, 'public');

console.log(`Copying build from ${srcDir} to ${destDir}...`);

try {
    if (fs.existsSync(srcDir)) {
        copyRecursiveSync(srcDir, destDir);
        console.log('Build files copied successfully to root public directory.');
    } else {
        console.error('Source directory client/dist does not exist. Check if build succeeded.');
        process.exit(1);
    }
} catch (err) {
    console.error('Error copying build files:', err);
    process.exit(1);
}
