import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [liveResults, setLiveResults] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [displayTime, setDisplayTime] = useState('');

    const gameList = [
        { id: 'sg', name: 'SHREE GANESH', time: '04:30 PM' },
        { id: 'fb', name: 'FARIDABAD', time: '05:45 PM' },
        { id: 'gb', name: 'GAZIYABAD', time: '09:30 PM' },
        { id: 'gl', name: 'GALI CHOR', time: '11:25 PM' },
        { id: 'l7', name: 'LUCKY 7 NIGHT', time: '02:15 AM' },
        { id: 'ds', name: 'DISAWAR', time: '03:30 AM' }
    ];

    const currentMonth = new Date().toISOString().slice(0, 7);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resLive = await fetch('/api/results');
                const liveJson = await resLive.json();
                setLiveResults(liveJson);
                const resChart = await fetch(`/api/results?month=${currentMonth}`);
                const chartJson = await resChart.json();
                setChartData(chartJson);
            } catch (err) {}
        };
        fetchData();
        setInterval(fetchData, 20000);
        setInterval(() => {
            setDisplayTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
        }, 1000);
    }, []);

    const getLive = (id) => liveResults.find(r => r.id === id) || { oldResult: '??', newResult: '??' };
    const getChartNum = (day, gameId) => {
        const dayStr = day < 10 ? `0${day}` : day;
        const found = chartData.find(d => d.date === `${currentMonth}-${dayStr}` && d.id === gameId);
        return found ? found.newResult : '--';
    };

    // WhatsApp Redirect Function
    const goToWA = (num) => window.location.href = `https://wa.me/91${num}`;

    return (
        <div style={{ backgroundColor: '#000', minHeight: '100vh', fontFamily: 'serif', textAlign: 'center', paddingBottom: '80px', color: '#fff' }}>
            <Head>
                <title>Satta King Live Result | Online Khaiwal</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* Red Promo Bar */}
            <div className="blink-bg-red" style={{ padding: '12px', fontWeight: 'bold', fontSize: '18px', borderBottom: '2px solid white', cursor: 'pointer' }} onClick={() => goToWA('9650695993')}>
                आज की सिंगल लीक जोड़ी - CLICK करें !
            </div>

            {/* KHAIWAL PROMOTION SECTION - Image 19 Style */}
            <div style={{ background: 'linear-gradient(to bottom, #001a33, #000)', padding: '20px 10px', borderBottom: '3px solid #800000' }}>
                <h2 style={{ color: '#25d366', fontSize: '22px', margin: '0' }}>💚 Online khaiwal 💚</h2>
                <h2 style={{ color: '#fff', fontSize: '24px', margin: '5px 0' }}>❤️ राम भाई ❤️</h2>
                <div style={{ fontSize: '19px', fontWeight: 'bold', color: '#f2f2f2' }}>
                    जोड़ी रेट 10 का 970 <br />
                    हरूप रेट 100 का 970
                </div>
                <div style={{ margin: '10px 0', color: '#aaa' }}>====================</div>
                
                {/* Game Timings with Clocks */}
                <div style={{ display: 'inline-block', textAlign: 'left', fontSize: '18px', fontWeight: 'bold' }}>
                    <p style={{ margin: '5px 0' }}>⏰ 04:30PM 🔰 श्री गणेश</p>
                    <p style={{ margin: '5px 0' }}>⏰ 05:45PM 🔰 फरीदाबाद</p>
                    <p style={{ margin: '5px 0' }}>⏰ 09:30PM 🔰 गाजियाबाद</p>
                    <p style={{ margin: '5px 0' }}>⏰ 11:25PM 🔰 गली चोर</p>
                    <p style={{ margin: '5px 0' }}>⏰ 02:15AM 🔰 लक्की7 नाइट</p>
                    <p style={{ margin: '5px 0' }}>⏰ 03:30AM 🔰 दिसावर</p>
                </div>
                <div style={{ margin: '10px 0', color: '#aaa' }}>====================</div>
                
                <p style={{ fontSize: '15px', color: '#fff', fontWeight: 'bold' }}>गेम प्ले करने के लिए नीली पट्टी पर क्लिक करे</p>
                
                {/* WHATSAPP BUTTONS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', marginTop: '15px' }}>
                    <button onClick={() => goToWA('9650695993')} className="wa-btn-blue">
                        WHATSAPP (आकाश भाई खाईवाल)
                    </button>
                    <button onClick={() => goToWA('9354072027')} className="wa-btn-green">
                        WHATSAPP (अली कुली मिर्ज़ा भाईजान)
                    </button>
                </div>
            </div>

            {/* DIWAKAR KHAIWAL SPECIAL SECTION */}
            <div style={{ backgroundColor: '#ffff00', color: '#000', padding: '15px', margin: '15px 10px', border: '3px dashed red', borderRadius: '10px' }}>
                <p style={{ fontSize: '18px', fontWeight: '900', margin: '0' }}>
                    दोस्तों अब घर बैठे Online गेम प्ले करे श्री गणेश से दिशावर तक। <br />
                    <span style={{ color: 'red', fontSize: '20px' }}>आपके अपने भाई दिवाकर खाईवाल के पास</span> <br />
                    जोड़ी 10 के 1000 और 100 के 10000
                </p>
                <button onClick={() => goToWA('9650695993')} style={{ marginTop: '10px', backgroundColor: '#25d366', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>
                    दिवाकर भाई से चैट करें ✅
                </button>
            </div>

            {/* LIVE RESULTS SECTION */}
            <div style={{ backgroundColor: '#fffcea', padding: '20px 0' }}>
                <div className="blink-bg-maroon" style={{ color: 'white', padding: '10px', fontWeight: 'bold', fontSize: '22px', margin: '10px' }}>
                    SUPER FAST RESULT
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '0 10px', borderLeft: '1px solid black', borderTop: '1px solid black' }}>
                    {gameList.map((game) => (
                        <div key={game.id} style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '15px 5px', backgroundColor: 'white' }}>
                            <h5 style={{ color: '#800000', fontSize: '20px', fontWeight: '900', margin: 0 }}>{game.name}</h5>
                            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#000', margin: '2px 0 8px 0' }}>( {game.time} )</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>&#123; {getLive(game.id).oldResult} &#125;</span>
                                <span style={{ color: 'green', fontSize: '20px' }}>➡️</span>
                                <span style={{ fontSize: '30px', fontWeight: '900', color: 'navy', border: '2px solid navy', padding: '0 10px', backgroundColor: '#f0faff' }}>
                                    [ {getLive(game.id).newResult} ]
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AUTOMATIC MONTHLY CHART */}
            <div style={{ marginTop: '30px', margin: '0 10px' }}>
                <div style={{ backgroundColor: '#ffff00', color: '#000', padding: '10px', border: '2px solid black', fontWeight: 'bold', fontSize: '18px' }}>
                    Satta King Record Chart March 2026
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', fontSize: '13px', color: '#000' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#800000', color: 'white' }}>
                                <th style={{ border: '1px solid black', padding: '5px' }}>DATE</th>
                                {gameList.map(g => (
                                    <th key={g.id} style={{ border: '1px solid black', padding: '5px', fontSize: '9px' }}>{g.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(31)].map((_, i) => (
                                <tr key={i+1} style={{ backgroundColor: (i+1)%2===0 ? '#f9f9f9' : 'white' }}>
                                    <td style={{ border: '1px solid black', fontWeight: 'bold', backgroundColor: '#800000', color: 'white' }}>{i+1}</td>
                                    {gameList.map(g => (
                                        <td key={g.id} style={{ border: '1px solid black', padding: '5px', fontWeight: 'bold', fontSize: '15px' }}>
                                            {getChartNum(i+1, g.id)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Floating Buttons */}
            <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
                <div onClick={() => goToWA('9650695993')} style={{ backgroundColor: '#25d366', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', animation: 'pulse 2s infinite' }}>
                    <span style={{ fontSize: '30px' }}>💬</span>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes blinker { 50% { opacity: 0; } }
                @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
                @keyframes bgBlinkRed { 0% { background-color: #ff0000; } 50% { background-color: #000; } 100% { background-color: #ff0000; } }
                @keyframes bgBlinkMaroon { 0% { background-color: #800000; } 50% { background-color: #ff0000; } 100% { background-color: #800000; } }
                
                .blink-bg-red { animation: bgBlinkRed 1s infinite; color: white; }
                .blink-bg-maroon { animation: bgBlinkMaroon 0.8s infinite; }
                
                .wa-btn-blue { background-color: #0056b3; color: white; border: none; padding: 12px 25px; border-radius: 50px; font-weight: bold; font-size: 16px; width: 90%; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 15px rgba(0,86,179,0.4); }
                .wa-btn-green { background-color: #008000; color: white; border: none; padding: 12px 25px; border-radius: 50px; font-weight: bold; font-size: 16px; width: 90%; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 15px rgba(0,128,0,0.4); }
                
                body { margin: 0; padding: 0; }
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-thumb { background: #800000; }
            `}} />
        </div>
    );
}
