import "./config/path.conf";
// tslint:disable-next-line:ordered-imports
import Vue from "vue";
import { SGVFactory } from "../lib/sg-resource";
import { apiConfig, mockData, serverConfig } from "./config";

Vue.use(SGVFactory.createVuePlugin(), { apiConfig, serverConfig, mockData });
// tslint:disable:no-var-requires
require("./index.module");
require("es6-promise").polyfill();
