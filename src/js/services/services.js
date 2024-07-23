export const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};



export const getResource = async (url) => {
    try {
        const response =  await fetch(url);
        if(!response.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${response.status}`); // выкидываем ошибку, которые попадают нам в консоль. 
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};