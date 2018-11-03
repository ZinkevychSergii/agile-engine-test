const baseApi = "https://api.datamuse.com";

export const getSynonyms = word => {
    return fetch(`${baseApi}/words?rel_syn=${word}`).then(res => res.json());
}