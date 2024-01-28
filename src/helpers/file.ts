import { resolve } from "path";
import fs from "fs";

// export function openFile(path: string): number {
//         const realPath = resolve(path);

//         return openSync(realPath, 'w');
// }

// export function writeToFile(fd: number, data: string): void {
//         writeFileSync(fd, data, {
//                 encoding: 'utf-8'
//         });
// }

export function writeToDisk(path: string, data: string): void {
        const realPath = resolve(path);

        const fd = fs.openSync(realPath, 'a');
        fs.appendFileSync(fd, `${data}\n`, { encoding: 'utf8' });
        fs.closeSync(fd);
}