


const Fetch = (url,method,body) => { 
    url = "http://localhost:3000" + url
    return fetch( url ,{
        method: method ,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
        },
        body:JSON.stringify(body)
    }).then(res =>  res.json()) 
}
export default Fetch 


