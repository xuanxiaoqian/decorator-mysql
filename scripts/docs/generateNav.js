import { execSync } from 'child_process';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const navConfigPath = path.join(__dirname, './navConfig.js');
const sidebarConfigPath = path.join(__dirname, 'sidebarConfig.js');

execSync(`node ${navConfigPath}`);
console.log('导航配置已生成');

execSync(`node ${sidebarConfigPath}`);
console.log('侧边栏配置已生成');