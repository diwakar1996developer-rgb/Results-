import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [results, setResults] = useState([]);
    const [currentTime, setCurrentTime] = useState('');

    // आपके द्वारा बताए गए 6 गेम्स की लिस्ट
    const gameList = [
        { id: 'sg', name: 'SHREE GANESH', time: '04:30 PM' },
        { id: 'fb', name: 'FARIDABAD', time: '06:15 PM' },
        { id: 'gb', name: 'GAZIYABAD', time: '09:45 PM' },
        { id: 'gl', name: 'GALI', time: '11:55 PM' },
        { id: 'l7', name: 'LUCKY 7 NIGHT', time: '02:30 AM' },
        { id: 'ds', name: 'DISAWAR', time: '05:10 AM' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/results');
            const data = await res.json();
            setResults(data);
        };
        fetchData();
        setCurrentTime(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }));
        const timer = setInterval(fetchData, 10000);
        return () => clearInterval(timer);
    }, []);

    // डेटाबेस से गेम ढूंढने का फंक्शन
    const getRes = (id) => results.find(r => r.id === id) || { oldResult: '??', newResult: '??' };

    return (
        <div className="bg-white min-h-screen font-serif text-center select-none">
            <Head>
                <title>Satta King Live Result | Satta King 786</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* Top Navigation - Image 15 Style */}
            <div className="grid grid-cols-5 bg-[#800000] text-white text-[10px] font-bold border-b border-white">
                <div className="border-r p-2">HOME</div>
                <div className="border-r p-2">SATTA CHART</div>
                <div className="border-r p-2">SATTA KING 786</div>
                <div className="border-r p-2">DELHI KING</div>
                <div className="p-2">SATTA LEAK</div>
            </div>

            {/* Main Header - Image 15 Yellow Bar */}
            <div className="bg-[#ffff00] py-4 border-y-2 border-black">
                <h1 className="text-5xl font-black text-black italic tracking-tighter">SATTA KING</h1>
            </div>

            {/* Green Sub Header */}
            <div className="bg-[#008000] text-white py-1 font-bold text-sm">
                SATTA KING | SATTA KING LIVE
            </div>

            {/* Maroon Info Box */}
            <div className="bg-[#800000] text-white p-4 mx-2 mt-2 border-2 border-black">
                <h2 className="text-xl font-bold">SATTA KING BEST SITE SATTA RESULT</h2>
                <p className="text-lg">SATTA-KING-LIVE.COM</p>
            </div>

            {/* Live Time - Image 15 Style */}
            <div className="py-4">
                <h3 className="text-[#c000c0] text-2xl font-bold">{new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</h3>
                <p className="text-[#c000c0] text-xl font-bold">Today's Satta Live Result !</p>
            </div>

            {/* Warning Box - Image 14 Style */}
            <div className="mx-2 border-2 border-red-600 p-3 mb-4 bg-[#fffcea]">
                <h4 className="text-red-700 text-xl font-black underline mb-1">चेतावनी(WARNING)</h4>
                <p className="text-blue-900 font-bold text-sm leading-tight">
                    यह साइट सिर्फ और सिर्फ मनोरंजन के लिए बनाई गई है। सट्टा और जुआं जिस देश या राज्य में प्रतिबंधित है वहां के लोग हमारी साइट को ब्लॉक कर दें।
                </p>
            </div>

            {/* Results Grid - Exact Replica of Image 14 */}
            <div className="grid grid-cols-2 border-l border-t border-black mx-1">
                {gameList.map((game) => (
                    <div key={game.id} className="border-r border-b border-black p-3 bg-white">
                        <h5 className="text-[#800000] text-xl font-black leading-none">{game.name}</h5>
                        <p className="text-black font-bold text-xs">({game.time})</p>
                        <div className="flex items-center justify-center gap-1 mt-2">
                            <span className="text-black font-bold text-lg">&#123; {getRes(game.id).oldResult} &#125;</span>
                            <span className="text-green-600 font-bold text-xl">➡️</span>
                            <span className="text-blue-900 font-black text-3xl border-2 border-blue-900 px-2 bg-blue-50">
                                [ {getRes(game.id).newResult} ]
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Monthly Chart Section - Image 16 Style */}
            <div className="mt-8 mx-1">
                <div className="bg-[#ffff00] py-2 border-2 border-black font-bold text-lg">
                    Satta King Record Chart March 2026
                </div>
                <table className="w-full border-collapse border border-black text-sm">
                    <thead>
                        <tr className="bg-[#800000] text-white">
                            <th className="border border-black p-1">DATE</th>
                            {gameList.slice(0, 4).map(g => (
                                <th key={g.id} className="border border-black p-1 text-[10px]">{g.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                <td className="border border-black font-bold bg-[#800000] text-white p-2">{i + 1}</td>
                                <td className="border border-black p-2 font-bold text-lg">02</td>
                                <td className="border border-black p-2 font-bold text-lg">10</td>
                                <td className="border border-black p-2 font-bold text-lg">92</td>
                                <td className="border border-black p-2 font-bold text-lg">61</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Floating Action Icons */}
            <div className="fixed bottom-4 left-4 flex flex-col gap-3">
                <div className="bg-[#0088cc] p-3 rounded-full shadow-2xl border-2 border-white animate-bounce">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" className="w-8 h-8" alt="TG" />
                </div>
                <div className="bg-[#25d366] p-3 rounded-full shadow-2xl border-2 border-white">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-8 h-8" alt="WA" />
                </div>
            </div>

            <style jsx global>{`
                @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
                .animate-blink { animation: blink 0.7s infinite; }
                body { background-color: #f2f2f2; }
            `}</style>
        </div>
    );
                                                   }
