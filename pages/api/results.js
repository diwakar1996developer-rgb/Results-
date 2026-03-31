import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("satta_live_db");
    
    if (req.method === "GET") {
        const results = await db.collection("results").find({}).toArray();
        res.status(200).json(results);
    } else if (req.method === "POST") {
        const { id, name, oldResult, newResult } = req.body;
        await db.collection("results").updateOne(
            { id },
            { $set: { name, oldResult, newResult, updatedAt: new Date() } },
            { upsert: true }
        );
        res.status(200).json({ success: true });
    }
}
