const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const ADMIN_URL = BASE_URL + "api/admin-panel/"


export const AUTH = {
    LOGIN: {
        POST: BASE_URL + "api/auth/login"
    },
    REGISTER: {
        POST: BASE_URL + "api/auth/register"
    },
    INFO: {
        POST: BASE_URL + "api/auth/info"
    }
}


export const ADMIN_PANEL = {
    SIM_CARDS: {
        GET: ADMIN_URL + "sim-cards/",
        DELETE: ADMIN_URL + "sim-cards/delete/",
        PUT: ADMIN_URL + "sim-cards/update/",
        POST: ADMIN_URL + "sim-cards/new/",
    },
    BUY_ORDERS: {

    },
    SELL_ORDERS: {
        GET: ADMIN_URL + "sell-orders/"
    },
    BUY_ORDERS: {
        GET: ADMIN_URL + "buy-orders/"
    },


    CSV: {
        IMPORT: {
            POST: ADMIN_URL + "sim-cards/new-import"
        },
        EXPORT: {

        }
    }


}