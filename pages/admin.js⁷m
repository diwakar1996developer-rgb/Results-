import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("satta_king");
    
    if (req.method === "GET") {
        const results = await db.collection("live_results").find({}).toArray();
        res.status(200).json(results);
    } else if (req.method === "POST") {
        const { id, name, oldResult, newResult, time } = req.body;
        await db.collection("live_results").updateOne(
            { id },
            { $set: { name, oldResult, newResult, time } },
            { upsert: true }
        );
        res.status(200).json({ success: true });
    }
}
