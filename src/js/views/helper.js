import { TIMEOUT_SEC } from "../config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`)
            );
        }, s * 1000);
    });
};

export const getJSON = async function (url) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        // console.log(res, data);
        if (!res.ok) throw new Error(`${data.message}` + `Error ${res.status}`);
        // return data;
    } catch (err) {
        //throws error from parent call->model.js
        throw err;
    }
};
