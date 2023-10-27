main = () => {
    const id = ;
    const device = getDeviceById(id);
}


const getDeviceById = async () => {
    const response = await fetch(`http://localhost:8080/api/devices/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    });
    const result = await response.json()
    console.log(result)
}
main();