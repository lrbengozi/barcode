import express, { request, response } from "express";

import app from "./app";

const port = 3030

app.listen(port, () => console.log(`Server is runing in port ${port}`));