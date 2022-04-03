/* eslint-disable import/no-anonymous-default-export */
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

/**
 * @type {Cypress.PluginConfig}
 */
export default (_on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  config.env.googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  config.env.googleClientId = process.env.GOOGLE_CLIENT_ID;
  config.env.googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

  return config;
};
