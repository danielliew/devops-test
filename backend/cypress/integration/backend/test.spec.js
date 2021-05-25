/// <reference types="cypress" />

describe("Backend API GET /", () => {
  it("returns status 200", () => {
    cy.request("/").its("status").should("equal", 200);
  });

  it("returns hello world", () => {
    cy.request("/").its("body").should("equal", "Hello world");
  });
});

describe("Backend API GET /json", () => {
  it("returns status 200", () => {
    cy.request("/").its("status").should("equal", 200);
  });

  it("returns JSON hello world", () => {
    cy.request("/json").its("body.msg").should("equal", "Hello world");
  });
});
