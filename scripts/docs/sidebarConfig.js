import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.join(__dirname, `../../docs/${config.pagesName}`);
const HEAD_PATH = `/${config.pagesName}`;

const OUTPUT_FILE = path.join(__dirname, '../../docs/.vitepress/config/sidebar.ts');

function scanDirectory(dirPath) {
    const entries = fs.readdirSync(dirPath);
    const result = { files: [], dirs: [] };

    entries.forEach(entry => {
        const fullPath = path.join(dirPath, entry);
        if (fs.statSync(fullPath).isDirectory()) {
            result.dirs.push({ name: entry, ...scanDirectory(fullPath) });
        } else if (entry.endsWith('.md')) {
            result.files.push(entry);
        }
    });
    return result;
}

function generateSidebarConfig(structure, currentPath = '') {
    const sidebarConfig = {};

    structure.dirs.forEach(dir => {
        const dirPath = currentPath ? `${currentPath}/${dir.name}` : dir.name;
        const configKey = `['${HEAD_PATH}/${dirPath}']`;

        // 分离符合命名规范和不规范的文件
        const standardFiles = dir.files
            .filter(file => /^\d+-/.test(file))
            .sort((a, b) => parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]))
            .map(file => ({
                text: file.replace(/^\d+-/, '').replace('.md', ''),
                link: `${HEAD_PATH}/${dirPath}/${file.replace('.md', '')}`
            }));

        const nonStandardFiles = dir.files
            .filter(file => !/^\d+-/.test(file) && file.endsWith('.md'))
            .map(file => ({
                text: file.replace('.md', ''),
                link: `${HEAD_PATH}/${dirPath}/${file.replace('.md', '')}`
            }));

        const allFiles = [...standardFiles, ...nonStandardFiles];

        if (allFiles.length > 0) {
            sidebarConfig[configKey] = [{
                items: allFiles
            }];
        }

        Object.assign(sidebarConfig, generateSidebarConfig(dir, dirPath));
    });

    return sidebarConfig;
}

function generateConfig() {
    const structure = scanDirectory(PAGES_DIR);
    const sidebarConfig = generateSidebarConfig(structure);

    const configContent = `import { DefaultTheme } from 'vitepress'

export const sidebarConfig: DefaultTheme.Sidebar = ${JSON.stringify(sidebarConfig, null, 2)
            .replace(/"([^"]+)":/g, '$1:')
            .replace(/'\[/g, '[')
            .replace(/\]'/g, ']')}`;

    fs.writeFileSync(OUTPUT_FILE, configContent);
    console.log('侧边栏配置已生成');
}

generateConfig();