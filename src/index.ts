import type {PluginOption} from "vite";
import {buildStyle, ModularStyle, modularStyles} from "./styles";

export interface LogContext {
    /**
     * 输出版本信息
     * @param title 标题
     * @param version 版本号
     */
    version(title: string, version: string): void;

    /**
     * 输出日志信息
     * @param modular 模块名
     * @param data 日志内容
     */
    log(modular: string, ...data: any[]): void;
}

/**
 * 日志输出默认实现
 */
export const KLog: LogContext = {
    version(title: string, version: string) {
        console.log(`%c ${title} %c V${version} `,
            'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;',
            'padding: 2px 5px 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;')
    },

    log(modular: string, data: any) {
        console.log(`[${modular}]`, data);
    }
}

export interface LogConfig {
    /**
     * 输出全部日志
     * @default true
     */
    all: boolean,
    /**
     * 限制输出日志的模块，当all为false时，此属性生效
     * @default []
     */
    modular: Array<string>,
    /**
     * 是否使用默认模块样式
     * @default true
     */
    withBaseStyle: boolean,
    /**
     * 自定义样式组 {@link ModularStyle}
     * @default []
     */
    styles: Array<ModularStyle>
}

/**
 * 默认配置信息
 */
const baseConfig: LogConfig = {
    all: true,
    modular: [],
    withBaseStyle: true,
    styles: []
}

/**
 * 判断是否有KLog使用
 * @param code 代码行
 */
const hasKLog = (code: string): boolean => {
    const match = code.match(/KLog\.log\(['"](\w+)['"], (\w+)\)/);
    return match != null;
}

/**
 * 所有可使用的样式
 */
let realStyles: Array<string> = [];

/**
 * 模块样式缓存map
 */
let modularMap: Record<string, number> = {};

/**
 * 获取每个模块的样式，若之前存在，则从缓存中获取
 * @param modular 模块名
 */
const getModularStyle = (modular: string) => {
    if (modularMap.hasOwnProperty(modular)) {
        return realStyles[modularMap[modular]];
    }
    const index = Math.floor(Math.random() * realStyles.length);
    modularMap[modular] = index;
    return realStyles[index];
}

/**
 * 判断是否有样式可使用
 */
const hasStyle = () => {
    return realStyles.length > 0;
}

/**
 * VitePluginKjxingLog插件代码
 * @param config 配置
 * @constructor
 */
const VitePluginKjxingLog = (config: Partial<LogConfig> = {}): PluginOption => {
    const realConfig: LogConfig = {
        ...baseConfig,
        ...config
    }
    // 组装样式列表
    if (realConfig.styles.length > 0) {
        let tempStyle: Array<string> = [];
        for (const style of realConfig.styles) {
            tempStyle.push(buildStyle(style));
        }
        realStyles.push(...tempStyle);
    }
    if (realConfig.withBaseStyle) {
        realStyles.push(...modularStyles);
    }
    return {
        name: 'vite-plugin-kjxing-log',
        enforce: 'post',
        transform: (code, id) => {
            let result = "";
            if (!id.includes('node_modules') && hasKLog(code)) {
                const rows: string[] = code.split("\n");
                let temp: string[] = [];
                for (let row of rows) {
                    while (hasKLog(row)) {
                        const match = row.match(/KLog\.log\(['"](\w+)['"], (\w+)\)/);
                        if (match != null) {
                            const modular = match[1];
                            let tempStr: string = "";
                            if (realConfig.all || realConfig.modular.includes(modular)) {
                                if (hasStyle()) {
                                    tempStr = `console.log("%c ${modular} ","${getModularStyle(modular)}", ${match[2]} )`;
                                } else {
                                    tempStr = `console.log("[${modular}]", ${match[2]} )`;
                                }
                            }
                            row = row.replace(/KLog\.log\(['"](\w+)['"], (\w+)\)/, tempStr);
                        }
                    }
                    temp.push(row);
                }
                result = temp.join("\n");
            } else {
                result = code;
            }
            return result;
        }
    }
}

export default VitePluginKjxingLog;