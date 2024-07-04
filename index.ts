require('dotenv').config();
import express, { Express } from "express";
import { Connection } from "mysql2/promise";
import { initDataBase } from "./Server/Services/db";
import { initServer } from "./Server/Services/server";
import ShopAPI from "./Shop.API";
import ShopAdmin from "./Shop.Admin";
import path from 'path';

export let server: Express;
export let connection: Connection;

async function launchApplication() {
    server = initServer();
    connection = await initDataBase();

    initRouter();

    server.get('/', (_, res) => {
        res.sendFile(path.join(__dirname, '../Shop.Client/public', 'index.html'));
    });
}

function initRouter() {
    const shopApi = ShopAPI(connection)
    server.use("/api", shopApi);

    const shopAdmin = ShopAdmin();
    server.use("/admin", shopAdmin);

    const reactAppPath = path.join(__dirname, '../Shop.Client/public');
    server.use(express.static(reactAppPath));

    server.get('*', (_, res) => {
        res.sendFile(path.join(reactAppPath, 'index.html'));
    });
}

launchApplication();