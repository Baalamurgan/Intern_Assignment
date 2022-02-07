import { USER_API } from "../backend";

export const signup = (user) => {
    return fetch(`${USER_API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const update = ({ contentId }) => {
    const userId = localStorage.getItem("userId");
    return fetch(`${USER_API}/updateLike/${contentId}/${userId}`, {
        method: "PUT",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};
