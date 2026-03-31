import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("satta_live_db");
    
    if (req.method === "GET") {
        const { month } = req.query;
        // अगर महीना माँगा है तो चार्ट का डेटा दो, वरना लाइव रिजल्ट
        const query = month ? { date: { $regex: `^${month}` } } : {};
        const collection = month ? "history" : "results";
        
        const results = await db.collection(collection).find(query).toArray();
        res.status(200).json(results);
    } 
    else if (req.method === "POST") {
        const { id, name, oldResult, newResult, date } = req.body;
        // इतिहास में चार्ट के लिए सेव करें
        await db.collection("history").updateOne(
            { id, date },
            { $set: { name, newResult, date } },
            { upsert: true }
        );
        // लाइव बॉक्स के लिए अपडेट करें
        await db.collection("results").updateOne(
            { id },
            { $set: { name, oldResult, newResult, updatedAt: new Date() } },
            { upsert: true }
        );
        res.status(200).json({ success: true });
    }
}
