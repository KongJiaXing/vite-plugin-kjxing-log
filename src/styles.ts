const commonStyle = 'padding: 2px 4px 2px 4px; border-radius:5px; font-weight:600; '

/**
 * 默认颜色组
 */
export const modularStyles: Array<string> = [
    `${commonStyle}color: #fff; background: #45C58B`,
    `${commonStyle}color: #fff; background: #0ED6CA`,
    `${commonStyle}color: #fff; background: #7A5AF8`,
    `${commonStyle}color: #fff; background: #53B1FD`,
    `${commonStyle}color: #fff; background: #EF45B3`,
    `${commonStyle}color: #fff; background: #F54343`,
    `${commonStyle}color: #fff; background: #FF5479`,
    `${commonStyle}color: #fff; background: #FD853A`,
    `${commonStyle}color: #fff; background: #00A870`,
    `${commonStyle}color: #fff; background: #E34D59`,
];

export interface ModularStyle {
    /**
     * padding-top，单位为px
     */
    paddingTop: number,
    /**
     * padding-right，单位为px
     */
    paddingRight: number,
    /**
     * padding-bottom，单位为px
     */
    paddingBottom: number,
    /**
     * padding-left，单位为px
     */
    paddingLeft: number,
    /**
     * border-radius，单位为px
     */
    borderRadius: number,
    /**
     * font-weight
     */
    fontWeight: number,
    /**
     * color样式
     */
    color: string,
    /**
     * background样式
     */
    background: string,
}

/**
 * 组建自定义样式文本
 * @param style 自定义样式
 */
export const buildStyle = (style: ModularStyle): string => {
    return `padding: ${style.paddingTop}px ${style.paddingRight}px ${style.paddingBottom}px ${style.paddingLeft}px; border-radius: ${style.borderRadius}px; font-weight: ${style.fontWeight}; color: ${style.color}; background: ${style.background}`;
}

