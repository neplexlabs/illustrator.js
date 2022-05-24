import { Worker } from "worker_threads";

export type WorkerOperations = "convolute";

export function run<T = unknown>(operation: WorkerOperations, data: unknown) {
    return new Promise<T>((resolve, reject) => {
        let path: string;
        switch (operation) {
            case "convolute":
                {
                    path = `${__dirname}/convolute.js`;
                }
                break;
            default:
                return reject(new Error(`Unknown operation "${operation}"`));
        }

        const worker = new Worker(path);
        worker
            .once("message", (data) => {
                worker.terminate();
                resolve(data);
            })
            .once("error", (error) => {
                worker.terminate();
                reject(error);
            })
            .once("online", () => worker.postMessage(data));
    });
}
