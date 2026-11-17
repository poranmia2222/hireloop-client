const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const checkoutVerify = async (sessionId: string) => {
    const res = await fetch(`${BASE_URL}/payment/checkout/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sessionId})
    })
    return res.json()
}