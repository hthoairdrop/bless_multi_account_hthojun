const fs = require('fs').promises;
const { HttpsProxyAgent } = require('https-proxy-agent');
const readline = require('readline');

const apiBaseUrl = "https://gateway-run.bls.dev/api/v1";
const ipServiceUrl = "https://icanhazip.com/";
let useProxy;

async function loadFetch() {
    const fetch = await import('node-fetch').then(module => module.default);
    return fetch;
}

async function readProxies() {
    const data = await fs.readFile('proxy.txt', 'utf-8');
    const proxies = data.trim().split('\n').filter(proxy => proxy);
    return proxies;
}

async function readNodeAndHardwareIds() {
    const data = await fs.readFile('id.txt', 'utf-8');
    const ids = data.trim().split('\n').filter(id => id).map(id => {
        const [nodeId, hardwareId] = id.split(':');
        return { nodeId, hardwareId };
    });
    return ids;
}

async function readAuthToken() {
    const data = await fs.readFile('user.txt', 'utf-8');
    const authTokens = data.split('\n').map(d => d.trim());
    return authTokens;
}

async function promptUseProxy() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question('Do you want to use a proxy? (y/n): ', answer => {
            rl.close();
            resolve(answer.toLowerCase() === 'y');
        });
    });
}

async function fetchIpAddress(fetch, agent) {

        const response = await fetch(ipServiceUrl, {
            headers: {
                Accept: "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            },
            agent,
        });

        const data = await response.text()

        return data || '0.0.0.0';

}
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomHardwareInfo() {
    const cpuArchitectures = ["x86_64", "ARM64", "x86"];
    const cpuModels = [
        "Intel Core i7-10700K CPU @ 3.80GHz", "AMD Ryzen 5 5600G with Radeon Graphics", 
        "Intel Core i5-10600K CPU @ 4.10GHz", "AMD Ryzen 7 5800X", 
        "Intel Core i9-10900K CPU @ 3.70GHz", "AMD Ryzen 9 5900X", 
        "Intel Core i3-10100 CPU @ 3.60GHz", "AMD Ryzen 3 3300X", 
        "Intel Core i7-9700K CPU @ 3.60GHz", "Intel Core i5-9600K CPU @ 3.70GHz", 
        "AMD Ryzen 5 3600X", "Intel Core i9-11900K CPU @ 3.50GHz", "AMD Ryzen 7 3700X", 
        "Intel Xeon E5-2670 v3", "AMD Ryzen 9 3950X", "Intel Core i5-11600K CPU @ 3.90GHz", 
        "AMD Ryzen 3 2200G with Radeon Vega Graphics", "Intel Core i7-9700F CPU @ 3.00GHz", 
        "Intel Core i9-10850K", "AMD Ryzen 5 3400G with Radeon RX Vega 11", 
        "Intel Core i5-8600K CPU @ 3.60GHz", "Intel Core i7-6800K CPU @ 3.40GHz", 
        "AMD Ryzen 9 5950X", "Intel Core i5-10400F CPU @ 2.90GHz", "Intel Xeon Gold 6248", 
        "AMD Ryzen Threadripper 3990X", "Intel Core i9-11980XE", "AMD Ryzen 7 5900HX", 
        "Intel Core i7-11800H", "AMD Ryzen 9 5950H", "Intel Core i5-1135G7", 
        "Intel Core i7-11375H", "Intel Core i9-11950H", "AMD Ryzen 5 5500U", 
        "Intel Core i3-1005G1", "Intel Core i7-8565U", "AMD Ryzen 7 4800H", 
        "Intel Core i5-8250U", "Intel Core i3-8109U", "Intel Core i9-10980HK", 
        "AMD Ryzen 7 5800HS", "Intel Core i5-9300H", "Intel Core i7-10875H", 
        "Intel Xeon Platinum 8280", "Intel Core i5-11300H", "AMD Ryzen 5 5600X", 
        "Intel Xeon E3-1270 v6", "Intel Xeon E5-1650 v4", "Intel Xeon Silver 4210R", 
        "AMD EPYC 7742", "Intel Core i7-11850H", "Intel Core i7-1165G7", 
        "AMD Ryzen 7 5700U", "Intel Core i9-10900F", "AMD Ryzen 5 5600U", 
        "Intel Core i7-11700K", "Intel Core i5-11500", "Intel Xeon Bronze 3104", 
        "Intel Xeon Gold 6348", "Intel Core i7-9700KF", "AMD Ryzen 9 7950X", 
        "Intel Core i5-11320H", "AMD Ryzen 9 5900HX"
    ];
    const cpuFeatures = [
        "mmx", "sse", "sse2", "sse3", "ssse3", "sse4_1", "sse4_2", "avx", "avx2", "avx512", 
        "fma", "fma4", "aes", "tsc", "hypervisor", "vme", "pdpe1gb", "rdtscp", "syscall", "smx", 
        "lahf_lm", "x2apic", "clflush", "xsave", "xsaveopt", "clzero", "pge", "lm", "pat", "mmxext", 
        "pse", "nx", "x86_64", "rdtscp", "tsc_adjust", "mpx", "sgx", "avx2", "avx512f", "avx512dq", 
        "avx512ifma", "avx512pf", "avx512er", "avx512cd", "avx512bw", "avx512vl", "avx512vbmi", 
        "avx512vpopcntdq", "avx512vbmi2", "avx512vbmib", "avx512vnni", "aes-ni", "movbe", "xstore", 
        "tsc_deadline_timer", "pni", "bmi1", "bmi2", "rdrand", "rdseed", "sha_ni", "pt", "mwaitx", 
        "ssbd", "mpx", "clflushopt", "clwb", "lbrv", "amd-v", "intel-vt", "amd-np", "amd64", 
        "vmx", "nxbit", "f16c", "popcnt", "clzm", "tsc", "dca", "pt_write", "rdtsc_emu", "pmm", 
        "spec_ctrl", "pt_tsc", "spec_emu", "mmxext", "prfchw", "debug", "hle", "sgx2", "pvemulate", 
        "adx", "clm", "xsavec", "tme", "tme2", "ecx", "xfast", "pti", "pt-sc", "clwb-prefetch"
    ];
    const numProcessors = [4, 6, 8, 12, 16, 24, 32, 64, 128, 256, 512];
    const memorySizes = [
        8 * 1024 ** 3, 16 * 1024 ** 3, 32 * 1024 ** 3, 64 * 1024 ** 3, 
        128 * 1024 ** 3, 256 * 1024 ** 3, 512 * 1024 ** 3, 1024 * 1024 ** 3, 
        2048 * 1024 ** 3, 4096 * 1024 ** 3, 8192 * 1024 ** 3, 16384 * 1024 ** 3
    ];

    const randomCpuFeatures = Array.from({ length: Math.floor(Math.random() * cpuFeatures.length) + 1 }, () =>
        getRandomElement(cpuFeatures)
    );

    return {
        cpuArchitecture: getRandomElement(cpuArchitectures),
        cpuModel: getRandomElement(cpuModels),
        cpuFeatures: [...new Set(randomCpuFeatures)],
        numOfProcessors: getRandomElement(numProcessors),
        totalMemory: getRandomElement(memorySizes),
        extensionVersions: "0.1.7"
    };
}

async function registerNode(nodeId, hardwareId, ipAddress, proxy, authToken) {
    const fetch = await loadFetch();
    let agent;

    if (proxy) {
        agent = new HttpsProxyAgent(proxy);
    }

    const registerUrl = `${apiBaseUrl}/nodes/${nodeId}`;
    console.log(`[${new Date().toISOString()}] Registering node with IP: ${ipAddress}, Hardware ID: ${hardwareId}`);

    const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            "origin": "chrome-extension://pljbjcehnhcnofmkdbjolghdcjnmekia",
            "x-extension-version": "0.1.7"
        },
        body: JSON.stringify({
            ipAddress,
            hardwareId,
            hardwareInfo: generateRandomHardwareInfo(),
            extensionVersion: "0.1.7"
        }),
        agent
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        const text = await response.text();
        console.error(`[${new Date().toISOString()}] Failed to parse JSON. Response text:`, text);
        throw error;
    }

    console.log(`[${new Date().toISOString()}] Registration response:`, data);
    return data;
}

async function startSession(nodeId, proxy, authToken) {
    const fetch = await loadFetch();
    let agent;

    if (proxy) {
        agent = new HttpsProxyAgent(proxy);
    }

    const startSessionUrl = `${apiBaseUrl}/nodes/${nodeId}/start-session`;
    console.log(`[${new Date().toISOString()}] Starting session for node ${nodeId}, it might take a while...`);
    const response = await fetch(startSessionUrl, {
        method: "POST",
        headers: {
            Accept: "*/*",
            Authorization: `Bearer ${authToken}`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            "origin": "chrome-extension://pljbjcehnhcnofmkdbjolghdcjnmekia",
            "x-extension-version": "0.1.7"

        },
        agent
    });
    const data = await response.json();
    console.log(`[${new Date().toISOString()}] Start session response:`, data);
    return data;
}
async function stopSession(nodeId, proxy, authToken) {
    const fetch = await loadFetch();
    let agent;

    if (proxy) {
        agent = new HttpsProxyAgent(proxy);
    }

    const stopSessionUrl = `${apiBaseUrl}/nodes/${nodeId}/stop-session`;
    console.log(`[${new Date().toISOString()}] stoping session for node ${nodeId}, it might take a while...`);
    const response = await fetch(stopSessionUrl, {
        method: "POST",
        headers: {
            Accept: "*/*",
            Authorization: `Bearer ${authToken}`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            "origin": "chrome-extension://pljbjcehnhcnofmkdbjolghdcjnmekia",
            "x-extension-version": "0.1.7"

        },
        agent
    });
    const data = await response.json();
    console.log(`[${new Date().toISOString()}] stop session response:`, data);
    return data;
}
async function pingNode(nodeId, proxy, ipAddress, isB7SConnected, authToken) {
    const fetch = await loadFetch();
    const chalk = await import('chalk');
    let agent;

    if (proxy) {
        agent = new HttpsProxyAgent(proxy);
    }

    const pingUrl = `${apiBaseUrl}/nodes/${nodeId}/ping`;
    console.log(`[${new Date().toISOString()}] Pinging node ${nodeId} using proxy ${proxy}`);
    const response = await fetch(pingUrl, {
        method: "POST",
        headers: {
            Accept: "*/*",
            Authorization: `Bearer ${authToken}`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            "origin": "chrome-extension://pljbjcehnhcnofmkdbjolghdcjnmekia",
            "x-extension-version": "0.1.7"
        },
        body: JSON.stringify({ isB7SConnected }),
        agent
    });
    const data = await response.json();

    const logMessage = `[${new Date().toISOString()}] Ping response, NodeID: ${chalk.default.green(nodeId)}, Status: ${chalk.default.yellow(data.status)}, Proxy: ${proxy}, IP: ${ipAddress}`;
    console.log(logMessage);

    return data;
}

async function checkNode(nodeId, proxy, authToken) {

    const fetch = await loadFetch();
    const chalk = await import('chalk');
    let agent;

    if (proxy) {
        agent = new HttpsProxyAgent(proxy);
    }
    const checkNodeUrl = `${apiBaseUrl}/nodes/${nodeId}`;
    console.log(`[${new Date().toISOString()}] Checking node ${nodeId} using proxy ${proxy}`);

    const response = await fetch(checkNodeUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authToken}`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            "origin": "chrome-extension://pljbjcehnhcnofmkdbjolghdcjnmekia",
            "x-extension-version": "0.1.7"
        },
        agent,
    });
    
    const data = await response.json();
    const todayReward = data?.todayReward || 0;
    const isConnected = data?.isConnected || false;
    const logMessage = `[${new Date().toISOString()}] node Check response, NodeID: ${chalk.default.green(nodeId)}, Today Rewards: ${chalk.default.yellow(todayReward)}, is Connected: ${isConnected}`;
    console.log(logMessage);
    return isConnected;
}

async function heathCheck(nodeId, proxy, authToken) {

    const fetch = await loadFetch();
    const chalk = await import('chalk');
    let agent;

    if (proxy) {
        agent = new HttpsProxyAgent(proxy);
    }
    const checkUrl = `https://gateway-run.bls.dev/health`;;
    console.log(`[${new Date().toISOString()}] Checking Health node ${nodeId} using proxy ${proxy}`);

    const response = await fetch(checkUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authToken}`,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            "origin": "chrome-extension://pljbjcehnhcnofmkdbjolghdcjnmekia",
            "x-extension-version": "0.1.7"
        },
        agent,
    });
    const data = await response.json();
    const logMessage = `[${new Date().toISOString()}] Health Check response, NodeID: ${chalk.default.green(nodeId)}, Status: ${chalk.default.yellow(data.status)}, Proxy: ${proxy}`;
    console.log(logMessage);
    return data;
}
async function displayHeader() {
}

let activeNodes = [];

async function processNode(nodeId, hardwareId, proxy, ipAddress, authToken) {
    activeNodes.push({ nodeId, proxy });
    let isConnected = false;

    try {
        console.log(`[${new Date().toISOString()}] Processing nodeId: ${nodeId}, hardwareId: ${hardwareId}, IP: ${ipAddress}`);
        isConnected = await checkNode(nodeId, proxy, authToken);
        if (!isConnected) {
            console.log(`[${new Date().toISOString()}] Node nodeId: ${nodeId} is not connected.`);
            try {
                console.log(`[${new Date().toISOString()}] Starting session for nodeId: ${nodeId}`);
                await registerNode(nodeId, hardwareId, ipAddress, proxy, authToken);
                await startSession(nodeId, proxy, authToken);
            } catch (error) {
                console.error(`[${new Date().toISOString()}] Error Starting session for nodeId: ${nodeId}. Error:`, error.message);
            }
        }
        console.log(`[${new Date().toISOString()}] Sending initial ping for nodeId: ${nodeId}`);
        await pingNode(nodeId, proxy, ipAddress, isConnected, authToken);

        setInterval(async () => {
            try {
                console.log(`[${new Date().toISOString()}] Sending ping for nodeId: ${nodeId}`);
                isConnected = await checkNode(nodeId, proxy, authToken);
                await pingNode(nodeId, proxy, ipAddress, isConnected, authToken);
            } catch (error) {
                console.error(`[${new Date().toISOString()}] Error during ping for nodeId: ${nodeId}: ${error.message}`);
            }
        }, 10 * 60 * 1000);

        setInterval(async () => {
            try {
                console.log(`[${new Date().toISOString()}] Sending Health Check for nodeId: ${nodeId}`);
                await heathCheck(nodeId, proxy, authToken);

                console.log(`[${new Date().toISOString()}] Checking connection status for nodeId: ${nodeId}`);
                isConnected = await checkNode(nodeId, proxy, authToken);

                if (!isConnected) {
                    console.log(`[${new Date().toISOString()}] Node nodeId: ${nodeId} is not connected.`);
                    try {
                        await stopSession(nodeId, proxy, authToken);
                        console.log(`[${new Date().toISOString()}] Restarting session for nodeId: ${nodeId}`);
                        await registerNode(nodeId, hardwareId, ipAddress, proxy, authToken);
                        await startSession(nodeId, proxy, authToken);
                    } catch (error) {
                        console.error(`[${new Date().toISOString()}] Error Restarting session for nodeId: ${nodeId}. Error:`, error.message);
                    }
                }
            } catch (error) {
                console.error(`[${new Date().toISOString()}] Error during Health Check for nodeId: ${nodeId}: ${error.message}`);
            }
        }, 60 * 1000);

    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error occurred for nodeId: ${nodeId}, restarting process: ${error.message}`);
    }
}

//
async function runAll(initialRun = true) {
    try {
        if (initialRun) {
            await displayHeader();
            useProxy = await promptUseProxy();
        }

        const ids = await readNodeAndHardwareIds();
        const proxies = await readProxies();
        const authTokens = await readAuthToken();

        if (useProxy && proxies.length < ids.length) {
            throw new Error((await import('chalk')).default.yellow(`Number of proxies (${proxies.length}) does not match number of nodeId:hardwareId pairs (${ids.length})`));
        }
        let sttAccount = 0;
        let currentAccount = '';
        for (let i = 0; i < authTokens.length; i++) {
            if (currentAccount !== authTokens[i]) {
                currentAccount = authTokens[i];
                sttAccount++
            }
            console.log(`[${new Date().toISOString()}]: Start with account ${sttAccount}`);
            const { nodeId, hardwareId } = ids[i];
            const proxy = useProxy ? proxies[i] : null;
            const ipAddress = useProxy ? await fetchIpAddress(await loadFetch(), proxy ? new HttpsProxyAgent(proxy) : null) : null;
            console.log("ipAddress", ipAddress);
            
            const authToken = authTokens[i];

            await processNode(nodeId, hardwareId, proxy, ipAddress, authToken);
        }
    } catch (error) {
        const chalk = await import('chalk');
        console.error(chalk.default.yellow(`[${new Date().toISOString()}] An error occurred: ${error}`));
    }
}
// run
runAll();
