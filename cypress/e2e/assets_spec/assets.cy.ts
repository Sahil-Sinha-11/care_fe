/// <reference types="cypress" />

import { cy, describe, before, beforeEach, it } from "local-cypress";

describe("Assets List", () => {
  before(() => {
    cy.loginByApi("devdistrictadmin", "Coronasafe@123");
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.intercept(/fontawesome/).as("fontawesome");
    cy.intercept(/currentuser/).as("currentuser");
    cy.visit("http://localhost:4000");
    cy.wait("@fontawesome");
    cy.wait("@currentuser");
    cy.wait(1000);
    cy.get("a").contains("Assets").click();
    cy.url().should("include", "/assets");
  });

  it("Search Asset Name", () => {
    cy.get("[name='search']").type("TEst");
  });

  it("Scan Asset QR", () => {
    cy.contains("Scan Asset QR").click().wait(1000);
    cy.get("video").should("exist");
    cy.get("button").contains("Close Scanner").should("exist").click();
  });

  it("Next/Previous Page", () => {
    cy.wait(1000);
    // only works for desktop mode
    cy.get("button")
      .should("contain", ">")
      .contains(">")
      .click({ force: true });
    cy.wait(1000);
    cy.get("button")
      .should("contain", "<")
      .contains("<")
      .click({ force: true });
  });
});