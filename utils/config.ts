import { parse } from 'yaml';
import * as fs from 'fs';
import * as path from 'path';

interface TestConfig {
    urls: {
        ncps: {
            base: string;
            credentials: {
                username: string;
                password: string;
            }
        }
    };
    viewports: {
        desktop: { width: number; height: number };
        iphone14Pro: { width: number; height: number };
        ipad10: { width: number; height: number };
    };
    timeouts: {
        navigation: number;
        element: number;
    };
}

export function getConfig(): TestConfig {
    const configPath = path.join(__dirname, '..', 'config', 'test.config.yaml');
    const configFile = fs.readFileSync(configPath, 'utf8');
    return parse(configFile) as TestConfig;
}

export function getAuthUrl(config: TestConfig): string {
    const { base, credentials } = config.urls.ncps;
    return `https://${credentials.username}:${credentials.password}@${base.replace('https://', '')}`;
}