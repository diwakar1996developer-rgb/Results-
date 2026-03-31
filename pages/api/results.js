import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("satta_live_db");
    
    if (req.method === "GET") {
        const { month } = req.query; // उदा: "2026-03"
        
        if (month) {
            // चार्ट के लिए उस महीने का सारा डेटा इतिहास (history) से निकालें
            const history = await db.collection("history")
                .find({ date: { $regex: `^${month}` } })
                .toArray();
            return res.status(200).json(history);
        } else {
            // होमपेज के लाइव बॉक्स के लिए डेटा
            const results = await db.collection("results").find({}).toArray();
            return res.status(200).json(results);
        }
    } 
    
    else if (req.method === "POST") {
        const { id, name, oldResult, newResult, date } = req.body;
        
        // 1. इतिहास (History) में सेव करें चार्ट के लिए
        await db.collection("history").updateOne(
            { id, date },
            { $set: { name, newResult, date } },
            { upsert: true }
        );
        
        // 2. लाइव रिजल्ट (Results) अपडेट करें होमपेज बॉक्स के लिए
        await db.collection("results").updateOne(
            { id },
            { $set: { name, oldResult, newResult, updatedAt: new Date() } },
            { upsert: true }
        );
        res.status(200).json({ success: true });
    }
}
