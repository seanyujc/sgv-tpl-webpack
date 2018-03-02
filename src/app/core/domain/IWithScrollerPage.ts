/** 带卷动组件的页面 */
export interface IWithScrollerPage {

  /** 当前页 */
  page: number;
  /** 页面尺寸 */
  pageSize: number;
  /** 下拉刷新配置 */
  PULLDOWN_CONFIG: any;
  /** 上拉加载配置 */
  PULLUP_CONFIG: any;

  /** 下拉刷新方法 */
  pullDonwRefresh(): void;
  /** 上拉加载 */
  pullUpLoad(): void;
}
