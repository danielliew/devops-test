const request = require("supertest");
const app = require("../app");

describe("Test Endpoints", () => {
  it("should test api endpoint", async (done) => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    done();
  });
});
