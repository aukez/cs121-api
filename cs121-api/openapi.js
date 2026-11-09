module.exports = {
  openapi: "3.0.0",
  info: {
    title: "CS121 Student API",
    version: "1.0.0",
    description: "A simple REST API for managing students"
  },
  paths: {
    "/students": {
      get: {
        summary: "List all students",
        responses: {
          "200": {
            description: "A list of students"
          }
        }
      },
      post: {
        summary: "Create a student",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/StudentInput"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Student created successfully"
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
    "/students/{id}": {
      get: {
        summary: "Get a student by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          "200": { description: "Student found" },
          "404": { description: "Student not found" }
        }
      },
      put: {
        summary: "Update a student by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/StudentInput"
              }
            }
          }
        },
        responses: {
          "200": { description: "Student updated" },
          "400": { description: "Invalid input" },
          "404": { description: "Student not found" }
        }
      },
      delete: {
        summary: "Delete a student by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          "204": { description: "Student deleted" },
          "404": { description: "Student not found" }
        }
      }
    }
  },
  components: {
    schemas: {
      StudentInput: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            example: "Awa Diop"
          }
        }
      }
    }
  }
};