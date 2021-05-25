/// <reference types="cypress" />

describe("Home page tests", () => {
  it("checks main title", () => {
    cy.visit("/");
    cy.contains("YTL Cement Berhad");
  });
});
