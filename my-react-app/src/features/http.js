const BASE_URL = "https://movienew.cybersoft.edu.vn";


function buildHeaders(extra = {}){
return {
"Content-Type": "application/json",
Accept: "application/json",
TokenCybersoft: import.meta.env.VITE_CYBERSOFT_TOKEN,
...extra,
}
}

async function request(path,{method = "GET" , body , headers , signal} = {}) {

const res = await fetch(`${BASE_URL}${path}` , {
    method,
    headers: buildHeaders(headers),
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    signal,
});

const data = await res.json().catch(() => ({}));

if(!res.ok){
const err = new Error(data?.message || data?.content || "Request failed");
err.status = res.status;
err.payload = data;
throw err;
}
return data;
}

export const authGet  = (path, opts)       => request(path, { ...opts, method: "GET" });
export const authPost = (path, body, opts) => request(path, { ...opts, method: "POST", body });