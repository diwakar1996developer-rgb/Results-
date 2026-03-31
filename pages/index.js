import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [liveResults, setLiveResults] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [displayTime, setDisplayTime] = useState('');

    const gameList = [
        { id: 'sg', name: 'SHREE GANESH', time: '04:30 PM' },
        { id: 'fb', name: 'FARIDABAD', time: '06:15 PM' },
        { id: 'gb', name: 'GAZIYABAD', time: '09:45 PM' },
        { id: 'gl', name: 'GALI', time: '11:55 PM' },
        { id: 'l7', name: 'LUCKY 7 NIGHT', time: '02:30 AM' },
        { id: 'ds', name: 'DISAWAR', time: '05:10 AM' }
    ];

    const currentMonth = new Date().toISOString().slice(0, 7); // उदा: "2026-03"

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. लाइव रिजल्ट फेच करें (ऊपर वाले बॉक्स के लिए)
                const resLive = await fetch('/api/results');
                const liveJson = await resLive.json();
                setLiveResults(liveJson);

                // 2. पूरे महीने का चार्ट डेटा फेच करें (नीचे वाले चार्ट के लिए)
                const resChart = await fetch(`/api/results?month=${currentMonth}`);
                const chartJson = await resChart.json();
                setChartData(chartJson);
            } catch (err) {
                console.log("Data Fetch Error", err);
            }
        };

        fetchData();
        const timer = setInterval(fetchData, 20000); // हर 20 सेकंड में अपडेट
        
        // लाइव टाइम अपडेट करने के लिए
        const timeTimer = setInterval(() => {
            setDisplayTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
        }, 1000);

        return () => { clearInterval(timer); clearInterval(timeTimer); };
    }, []);

    // डेटाबेस से नंबर ढूंढने के लिए हेल्पर्स
    const getLive = (id) => liveResults.find(r => r.id === id) || { oldResult: '??', newResult: '??' };
    
    const getChartNum = (day, gameId) => {
        const dayStr = day < 10 ? `0${day}` : day;
        const fullDate = `${currentMonth}-${dayStr}`;
        const found = chartData.find(d => d.date === fullDate && d.id === gameId);
        return found ? found.newResult : '--';
    };

    return (
        <div className="bg-[#fffcea] min-h-screen font-serif text-center select-none pb-10">
            <Head>
                <title>Satta King Live Result | Satta King 786 | Satta-King-Live.com</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* Top Navy Nav - Image 15 Style */}
            <div className="grid grid-cols-5 bg-[#800000] text-white text-[10px] font-bold border-b border-white uppercase tracking-tighter">
                <div className="border-r p-2">HOME</div>
                <div className="border-r p-2">SATTA CHART</div>
                <div className="border-r p-2">SATTA KING 786</div>
                <div className="border-r p-2">DELHI KING</div>
                <div className="p-2">SATTA LEAK</div>
            </div>

            {/* Giant Yellow Header - Image 15 */}
            <div className="bg-[#ffff00] py-4 border-y-2 border-black">
                <h1 className="text-5xl md:text-7xl font-black text-black italic tracking-tighter drop-shadow-md">SATTA KING</h1>
            </div>

            {/* Green Banner */}
            <div className="bg-[#008000] text-white py-1 font-bold text-sm tracking-widest border-b border-black">
                SATTA KING | SATTA KING LIVE
            </div>

            {/* Maroon Branding Box */}
            <div className="bg-[#800000] text-white p-3 mx-2 mt-2 border-2 border-black shadow-lg">
                <h2 className="text-lg md:text-xl font-bold">SATTA KING BEST SITE SATTA RESULT</h2>
                <p className="text-md md:text-lg animate-blink text-yellow-300">SATTA-KING-LIVE.COM</p>
            </div>

            {/* Today's Date and Time */}
            <div className="py-4">
                <h3 className="text-[#c000c0] text-2xl font-bold">
                    {new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </h3>
                <p className="text-red-600 text-lg font-bold">Today's Satta Live Result !</p>
                <p className="text-blue-800 font-bold text-xl">{displayTime}</p>
            </div>

            {/* Warning Box - Image 14 Style */}
            <div className="mx-3 border-2 border-red-600 p-3 mb-4 bg-white shadow-inner">
                <h4 className="text-red-700 text-xl font-black underline mb-1 italic">चेतावनी(WARNING)</h4>
                <p className="text-blue-900 font-bold text-[14px] leading-tight">
                    यह साइट सिर्फ और सिर्फ मनोरंजन के लिए बनाई गई है। यह साइट सट्टे से जुड़ी किसी भी गतिविधि को बढ़ावा नहीं देती। सट्टा और जुआं जिस देश या राज्य में प्रतिबंधित है वहां के लोग हमारी साइट को ब्लॉक कर दें। किसी भी लाभ या हानि के लिए आप खुद जिम्मेदार होंगे।
                </p>
            </div>

            {/* Super Fast Result Button */}
            <div className="bg-red-700 text-white font-black text-xl py-2 px-8 mb-6 inline-block shadow-lg border-2 border-black uppercase tracking-widest italic animate-pulse">
                SUPER FAST RESULT
            </div>

            {/* Result Cards Grid - Exactly 6 Games as requested */}
            <div className="grid grid-cols-2 border-l border-t border-black mx-2 bg-white shadow-xl">
                {gameList.map((game) => (
                    <div key={game.id} className="border-r border-b border-black p-3 hover:bg-yellow-50 transition">
                        <h5 className="text-[#800000] text-lg md:text-xl font-black leading-none">{game.name}</h5>
                        <p className="text-black font-bold text-[10px] mb-2">( {game.time} )</p>
                        <div className="flex items-center justify-center gap-1">
                            <span className="text-black font-bold text-lg">&#123; {getLive(game.id).oldResult} &#125;</span>
                            <span className="text-green-600 font-bold text-xl">➡️</span>
                            <span className="text-blue-900 font-black text-3xl border-2 border-blue-900 px-3 py-1 bg-blue-50 shadow-sm">
                                [ {getLive(game.id).newResult} ]
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* AUTOMATIC MONTHLY CHART - Image 16 Style */}
            <div className="mt-10 mx-2 overflow-x-auto shadow-2xl border-2 border-black">
                <div className="bg-[#ffff00] py-3 border-b-2 border-black font-black text-xl text-black uppercase tracking-widest">
                    Satta King Record Chart {new Date().toLocaleString('en-us', { month: 'long' })} {new Date().getFullYear()}
                </div>
                <table className="w-full border-collapse bg-white">
                    <thead>
                        <tr className="bg-[#800000] text-white text-[12px]">
                            <th className="border border-black p-2 w-12">DATE</th>
                            {gameList.map(g => (
                                <th key={g.id} className="border border-black p-1 leading-tight">{g.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(31)].map((_, i) => {
                            const day = i + 1;
                            // अगर आज से आगे की तारीख है तो खाली छोड़ दें (Optional)
                            const isToday = new Date().getDate() === day;
                            return (
                                <tr key={day} className={`${day % 2 === 0 ? 'bg-gray-100' : 'bg-white'} ${isToday ? 'bg-yellow-100' : ''}`}>
                                    <td className="border border-black font-bold bg-[#800000] text-white p-1 text-center">{day}</td>
                                    {gameList.map(g => (
                                        <td key={g.id} className="border border-black p-1 font-bold text-[16px] text-black text-center">
                                            {getChartNum(day, g.id)}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Bottom Footer Section */}
            <div className="bg-black text-yellow-400 p-6 mt-10 mx-2 border-t-4 border-red-700">
                <h6 className="font-bold text-lg mb-2 underline tracking-widest">SATTA-KING-LIVE.COM</h6>
                <p className="text-[12px] text-white italic">Satta King Record Chart March 2026, Satta King AR 786, Desawar Live Result</p>
                <p className="mt-4 text-[10px]">© 2024-2025 ALL RIGHTS RESERVED</p>
            </div>

            {/* Floating Action Icons - Telegram & WhatsApp */}
            <div className="fixed bottom-6 left-4 flex flex-col gap-4 z-50">
                <a href="#" className="bg-[#0088cc] p-3 rounded-full shadow-2xl border-2 border-white hover:scale-110 transition animate-bounce">
                   <span className="text-white text-2xl font-bold">✈️</span>
                </a>
                <a href="#" className="bg-[#25d366] p-3 rounded-full shadow-2xl border-2 border-white hover:scale-110 transition">
                   <span className="text-white text-2xl font-bold">📞</span>
                </a>
            </div>

            {/* Global Animations Style */}
            <style jsx global>{`
                @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
                .animate-blink { animation: blink 0.8s infinite; }
                body { background-color: #f0f0f0; margin: 0; padding: 0; }
                table th, table td { font-family: 'Arial', sans-serif; }
            `}</style>
        </div>
    );
                }
