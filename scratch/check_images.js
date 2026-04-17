const fs = require('fs');

function getPngDimensions(filePath) {
    const buffer = fs.readFileSync(filePath);
    if (buffer.toString('ascii', 1, 4) !== 'PNG') {
        throw new Error('Not a PNG file');
    }
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
}

try {
    const pranay = getPngDimensions('public/pranay.png');
    console.log('pranay.png:', pranay);
} catch (e) {
    console.log('pranay.png: error', e.message);
}

try {
    const profile = getPngDimensions('public/profile.png');
    console.log('profile.png:', profile);
} catch (e) {
    console.log('profile.png: error', e.message);
}
