const { Router } = require("express");
const { getTypesHandler } = require("../handlers/TypesHandler");

const typesRouter = Router();

typesRouter.get("/", getTypesHandler);

module.exports = typesRouter;
