/// <reference types="cypress" />

describe("Backend API GET /", () => {
  it("returns status 200", () => {
    cy.request("http://localhost:3001").its("status").should("equal", 200);
  });

  it("returns hello world", () => {
    cy.request("http://localhost:3001")
      .its("body")
      .should("equal", "Hello world");
  });
});

describe("Backend API GET /json", () => {
  it("returns status 200", () => {
    cy.request("http://localhost:3001").its("status").should("equal", 200);
  });

  it("returns JSON hello world", () => {
    cy.request("http://localhost:3001/json")
      .its("body.msg")
      .should("equal", "Hello world");
  });
});
