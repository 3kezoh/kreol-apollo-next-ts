// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * Custom command to select DOM element by data-cy attribute.
 * @example cy.dataCy('greeting')
 */
Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

/**
 * Custom command to login to google using OAuth 2.0.
 * @example cy.loginWithGoogle()
 */
Cypress.Commands.add("loginWithGoogle", () => {
  cy.log("Logging in to Google");
  cy.request({
    method: "POST",
    url: "https://www.googleapis.com/oauth2/v4/token",
    body: {
      grant_type: "refresh_token",
      client_id: Cypress.env("googleClientId"),
      client_secret: Cypress.env("googleClientSecret"),
      refresh_token: Cypress.env("googleRefreshToken"),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body;

    cy.request({
      method: "GET",
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body);
      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        },
      };

      window.localStorage.setItem("googleCypress", JSON.stringify(userItem));
    });
  });
});

/**
 * Adds a delay betweens `commands`
 * @usage export CYPRESS_COMMAND_DELAY=1000
 * @see https://github.com/cypress-io/cypress/issues/249
 */
const COMMAND_DELAY = Cypress.env("COMMAND_DELAY") || 0;

const commands = ["visit", "click", "trigger", "type", "contains", "location", "scrollIntoView"];

if (COMMAND_DELAY > 0) {
  for (const command of commands) {
    Cypress.Commands.overwrite(command, (originalFn, ...args) => {
      const origVal = originalFn(...args);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(origVal);
        }, COMMAND_DELAY);
      });
    });
  }
}

/**
 * Adds a delay when typing
 * @usage export CYPRESS_TYPE_DELAY=50
 * @note 10 is the default delay
 */
const TYPE_DELAY = Cypress.env("TYPE_DELAY") || 0;

if (TYPE_DELAY > 10) {
  Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
    return originalFn(element, text, { ...options, delay: TYPE_DELAY });
  });
}

/**
 * Adds a duration when scrolling
 * @usage export CYPRESS_SCROLL_DURATION=1000
 * @note 10 is the default delay
 */
const SCROLL_DURATION = Cypress.env("SCROLL_DURATION") || 0;

if (SCROLL_DURATION > 0) {
  Cypress.Commands.overwrite("scrollIntoView", (originalFn, element, options) => {
    return originalFn(element, { ...options, duration: SCROLL_DURATION });
  });
}
