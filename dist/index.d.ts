import { PluginOption } from 'vite';

interface ModularStyle {
    /**
     * padding-top，单位为px
     */
    paddingTop: number;
    /**
     * padding-right，单位为px
     */
    paddingRight: number;
    /**
     * padding-bottom，单位为px
     */
    paddingBottom: number;
    /**
     * padding-left，单位为px
     */
    paddingLeft: number;
    /**
     * border-radius，单位为px
     */
    borderRadius: number;
    /**
     * font-weight
     */
    fontWeight: number;
    /**
     * color样式
     */
    color: string;
    /**
     * background样式
     */
    background: string;
}

interface LogContext {
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
declare const KLog: LogContext;
interface LogConfig {
    /**
     * 输出全部日志
     * @default true
     */
    all: boolean;
    /**
     * 限制输出日志的模块，当all为false时，此属性生效
     * @default []
     */
    modular: Array<string>;
    /**
     * 是否使用默认模块样式
     * @default true
     */
    withBaseStyle: boolean;
    /**
     * 自定义样式组 {@link ModularStyle}
     * @default []
     */
    styles: Array<ModularStyle>;
}
/**
 * VitePluginKjxingLog插件代码
 * @param config 配置
 * @constructor
 */
declare const VitePluginKjxingLog: (config?: Partial<LogConfig>) => PluginOption;

export { KLog, LogConfig, LogContext, VitePluginKjxingLog as default };
