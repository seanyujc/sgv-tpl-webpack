/** 页面 */
export interface IPage {

  /** 页头标题 */
  title: string;

  /**
   * 计算文本的宽
   * @param itemText 需计算的文本
   * @returns 像素（px）单位的文本宽
   */
  getBarWidthBase(itemText: string): string;
}
