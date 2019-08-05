interface IConfigSite {
  remote: string;
  local: string;
  protocol: string;
  publicPath: string;
}

interface ISGSiteConfig {
  DEV: IConfigSite;
  TEST: IConfigSite;
  UAT: IConfigSite;
  MASTER: IConfigSite;
}

declare const __sg_site_config__: {
  [key: string]: IConfigSite | string;
  DEV: IConfigSite;
  TEST: IConfigSite;
  UAT: IConfigSite;
  MASTER: IConfigSite;
  runtimes: string;
};
