import { CONTENT_API } from "../backend";

export const topContents = () => {
    return fetch(`${CONTENT_API}/topcontents`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getContent = async ({ id }) => {
    return await fetch(`${CONTENT_API}/content/${id}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};
