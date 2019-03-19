import Vue from "vue";
import { SGVFactory } from "../lib/sg-resource";
import { apiConfig, mockData } from "./config";
import { serverConfig } from "./config/site.conf";

Vue.use(SGVFactory.createVuePlugin(), { apiConfig, serverConfig, mockData });
// tslint:disable:no-var-requires
require("./index.module");
require("es6-promise").polyfill();
