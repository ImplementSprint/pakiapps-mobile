const os = require('os');
const fs = require('fs');
const path = require('path');

// 1. Find the current Local IP
function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

const currentIp = getLocalIp();
console.log(`\x1b[32m[Auto-IP] Your current IP is: ${currentIp}\x1b[0m`);

// 2. Paths to frontend .env files (directly in pakiship and pakipark folders)
const envs = [
    {
        name: 'PakiShip Frontend',
        path: path.join(__dirname, 'pakiship', '.env'),
        port: 4000
    },
    {
        name: 'PakiPark Frontend',
        path: path.join(__dirname, 'pakipark', '.env'),
        port: 5000
    }
];

// 3. Update Frontend .env files
envs.forEach(env => {
    if (fs.existsSync(env.path)) {
        let content = fs.readFileSync(env.path, 'utf8');
        
        // Match EXPO_PUBLIC_API_BASE_URL=http://<anything>:<port>/api
        const regex1 = new RegExp(`EXPO_PUBLIC_API_BASE_URL=http:\\/\\/[^:\\/\\s]+:${env.port}\\/api`, 'g');
        const regex2 = new RegExp(`API_BASE_URL=http:\\/\\/[^:\\/\\s]+:${env.port}\\/api`, 'g');
        
        content = content.replace(regex1, `EXPO_PUBLIC_API_BASE_URL=http://${currentIp}:${env.port}/api`);
        content = content.replace(regex2, `API_BASE_URL=http://${currentIp}:${env.port}/api`);
        
        fs.writeFileSync(env.path, content);
        console.log(`\x1b[36m[Auto-IP] Updated ${env.name} .env to ${currentIp}:${env.port}\x1b[0m`);
    } else {
        console.log(`\x1b[33m[Auto-IP] ${env.name} .env not found at ${env.path} (skipping)\x1b[0m`);
    }
});

console.log(`\x1b[33m[Auto-IP] Done! Now run your app as usual.\x1b[0m`);
