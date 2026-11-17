const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const updateApplicationStatus = async(id:string, data: {status:string})=>{
    const res = await fetch(`${BASE_URL}/application/${id}`,{
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return res.json()
}