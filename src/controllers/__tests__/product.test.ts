import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  test("should dislpay validation errors", async () => {
    const response = await request(server).post("/api/products").send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);
  });

  test("should validate price is greater or equal than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Monitor - testing",
      price: -10,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
  });

  test("should validate price is a number", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Monitor - testing",
      price: "Hi there!",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);
  });

  test("should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Mouse - testing",
      price: 50,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("product");

    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products", () => {
  test("Get a JSON response with products.", async () => {
    const response = await request(server).get("/api/products");

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("products");

    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/product/:id", () => {
  test("should return a 404 response for a non-existing product", async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/products/${productId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Product not found");
  });

  test("should check a valid ID in the URL", async () => {
    const response = await request(server).get("/api/products/not-valid-url");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("Id is invalid");
  });

  test("should get a JSON response for a single product", async () => {
    const response = await request(server).get("/api/products/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("product");
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("PUT /api/products/:id", () => {
  test("should check a valid ID in the URL", async () => {
    const response = await request(server)
      .put("/api/products/not-valid-url")
      .send({
        name: "Redragon Monitor - 32 inches",
        price: 500,
        availabilty: true,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("Id is invalid");
  });

  test("should display validation error messages when updating a product", async () => {
    const response = await request(server).put("/api/products/1").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body).not.toHaveProperty("product");
  });

  test("should validate that the price is greater than 0", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Redragon Monitor - 32 inches",
      price: 0,
      availabilty: true,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("Price must be greater than 0");

    expect(response.body).not.toHaveProperty("product");
  });

  test("should return a 404 response for a non-existing product", async () => {
    const productId = 99999;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Redragon Monitor - 32 inches",
        price: 650,
        availabilty: true,
      });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Product not found");

    expect(response.body).not.toHaveProperty("product");
  });

  test("should update the product with valid data", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Redragon Monitor - 24 inches",
      price: 625,
      availabilty: true,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("product");
    expect(response.body.message).toBe("Product updated succesfully");

    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("PATCH /api/products/:id", () => {
  test("should return a 404 response for a non-existing product", async () => {
    const productId = 99999;
    const response = await request(server)
      .patch(`/api/products/${productId}`)
      .send({
        name: "Redragon Monitor - 32 inches",
        price: 650,
        availabilty: true,
      });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Product not found");
    expect(response.body).not.toHaveProperty("product");
  });

  test("should update the product availabilty", async () => {
    const response = await request(server).patch("/api/products/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("product");
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("DELETE /api/products/:id", () => {
  test("should check a valid id", async () => {
    const response = await request(server).delete("/api/products/not-valid-id");

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("Id is invalid");
  });

  test("should return a 404 status code for a non-existing product", async () => {
    const productId = 99999;
    const response = await request(server).delete(`/api/products/${productId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Product not found");
  });

  test("should delete the product", async () => {
    const response = await request(server).delete("/api/products/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Product deleted succesfully");
  });
});
