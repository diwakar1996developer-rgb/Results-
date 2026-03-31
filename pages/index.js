import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/results');
            const data = await res.json();
            setResults(data);
        };
        fetchData();
        const timer = setInterval(fetchData, 10000); // 10 सेकंड में ऑटो अपडेट
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-yellow-50 min-h-screen font-serif text-center">
            <Head>
                <title>Satta King Live Result 2024-2025</title>
                <meta name="description" content="Satta King Live Result Online" />
            </Head>

            {/* Header Area */}
            <div className="bg-blue-900 text-white p-4 shadow-lg border-b-4 border-red-600">
                <h1 className="text-3xl md:text-5xl font-bold italic tracking-tighter">SATTA-KING-LIVE.COM</h1>
                <p className="animate-blink text-yellow-400 font-bold mt-2 text-xl">!!! सबसे तेज़ लाइव रिज़ल्ट यहाँ !!!</p>
            </div>

            {/* Live Result Cards */}
            <div className="max-w-4xl mx-auto mt-6 px-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((item) => (
                        <div key={item.id} className="bg-white border-2 border-blue-800 rounded-lg overflow-hidden shadow-md">
                            <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-2 font-bold text-lg">
                                {item.name}
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 font-bold text-sm">Yesterday: <span className="text-red-600">{item.oldResult}</span></p>
                                <div className="text-5xl font-black my-2 text-blue-900 drop-shadow-md">
                                    {item.newResult || '--'}
                                </div>
                                <p className="bg-yellow-200 inline-block px-4 py-1 rounded-full text-sm font-bold border border-yellow-500">
                                    Time: {item.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Disclaimer Section */}
            <div className="bg-red-700 text-white m-6 p-4 rounded text-sm leading-relaxed max-w-4xl mx-auto">
                <h3 className="font-bold underline mb-2">DISCLAIMER</h3>
                यूट्यूब या वेबसाइट पर दिखाए गए अंक ज्योतिष पर आधारित हैं। सट्टा खेलना आपके देश या राज्य में प्रतिबंधित हो सकता है। हम किसी भी सट्टा गतिविधि का समर्थन नहीं करते हैं।
            </div>

            <footer className="bg-black text-gray-400 p-6 mt-10">
                <p>© 2024-2025 Satta-King-Live.com - All Rights Reserved</p>
            </footer>

            <style jsx global>{`
                @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
                .animate-blink { animation: blink 1s infinite; }
            `}</style>
        </div>
    );
}
