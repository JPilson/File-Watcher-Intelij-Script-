type ArgumentKey = "ICON_DIR_NAME" | "WORK_DIR" | "ICON_REGISTRY_NAME";

void onScriptStart();
async function onScriptStart() {
    const args: Record<ArgumentKey, string> = parseArguments();
    const registryPath = `${args.WORK_DIR}/${args.ICON_REGISTRY_NAME}`;
    const registeredIcons = await getRegistryFileContent(
        registryPath,
    );

    const newIcons = await scanIconFilesDirectoryForNames(
        `${args.WORK_DIR}/${args.ICON_DIR_NAME}`,
        registeredIcons,
    );
    void saveNewIcons(registryPath, newIcons);
}

function saveNewIcons(to: string, newIcons: Record<string, string>) {
    Deno.writeTextFile(to, JSON.stringify(newIcons));
}

function parseArguments() {
    const argumentObject: Partial<Record<ArgumentKey, string>> = {};
    Deno.args.forEach((arg) => {
        const keyValuePair = arg.split("=");
        argumentObject[keyValuePair[0] as ArgumentKey] = keyValuePair[1];
    });
    return argumentObject as Record<ArgumentKey, string>;
}

async function scanIconFilesDirectoryForNames(
    directory: string,
    currentRegistryContent: Record<string, string>,
) {

    const directoryFileNames = new Set<string>();
    for await (const file of Deno.readDir(directory)) {
        if (file.isFile) {
            const iconName = file.name.split(".")[0];
            directoryFileNames.add(iconName);
            if (!currentRegistryContent[iconName]) {
                console.log(`Found new icon: ${iconName}`);
                currentRegistryContent[iconName] = file.name;
            }
        }
    }
    // Clean up
    Object.keys(currentRegistryContent).forEach((iconName) => {
        if (!directoryFileNames.has(iconName)) {
            delete currentRegistryContent[iconName];
        }
    });

    return currentRegistryContent;
}
async function getRegistryFileContent(
    registryName: string,
): Promise<Record<string, string>> {
    const doesExists = await doesFileExist(registryName);
    // let file = await Deno[doesExists ? "readFile" : "create"](registryName);
    if (!doesExists) {
        return {};
    }
    const file = await Deno.readFile(registryName);

    const fileContent = new TextDecoder().decode(file);
    return JSON.parse(fileContent);
}

async function doesFileExist(path: string) {
    try {
        await Deno.lstat(path);
        return true;
    } catch (e) {
        const isNotFound = e?.toString().includes("No such file or directory");
        if (isNotFound) return false;
        throw e;
    }
}
