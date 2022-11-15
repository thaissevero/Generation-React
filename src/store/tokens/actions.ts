export type Action = {type: "ADD_TOKEN"; payload: string};

export const addToken = (token: string): Action => ({
    type: "ADD_TOKEN",
    payload: token,
});

/** 🧁 Anotações:
payload - armazenar token;


*/