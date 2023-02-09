import { joinURL, encodePath, encodeParam } from "ufo";
import { createOperationsGenerator } from "#image";
const operationsGenerator = createOperationsGenerator({
    keyMap: {
        format: "f",
        fit: "fit",
        width: "w",
        height: "h",
        resize: "s",
        quality: "q",
        background: "b"
    },
    joinWith: "&",
    formatter: (key: string | number, val: string | number) => encodeParam(key) + "_" + encodeParam(val)
});
export const getImage = (src: string, { modifiers = {}, baseURL } = {} as {modifiers: Record<string, string>, baseURL: string}, _ctx: unknown) => {
    if (modifiers.width && modifiers.height) {
        modifiers.resize = `${modifiers.width}x${modifiers.height}`;
        delete modifiers.width;
        delete modifiers.height;
    }
    const params = operationsGenerator(modifiers) || "_";
    if (!baseURL) {
        baseURL = joinURL("/", "/api/_ipx");
    }
    return {
        url: joinURL(baseURL, params, encodePath(src))
    };
};
export const validateDomains = true;
export const supportsAlias = true;
