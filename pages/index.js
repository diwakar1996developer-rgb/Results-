import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [liveResults, setLiveResults] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [displayTime, setDisplayTime] = useState('');
    const [latestGame, setLatestGame] = useState(null);

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

                if (liveJson.length > 0) {
                    const sorted = [...liveJson].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                    setLatestGame(sorted[0]);
                }

                const resChart = await fetch(`/api/results?month=${currentMonth}`);
                const chartJson = await resChart.json();
                setChartData(chartJson);
            } catch (err) {}
        };
        fetchData();
        setInterval(fetchData, 15000);
        setInterval(() => {
            const now = new Date();
            setDisplayTime(now.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }) + " " + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
        }, 1000);
    }, []);

    const getLive = (id) => liveResults.find(r => r.id === id) || { oldResult: '??', newResult: '??' };
    const getChartNum = (day, gameId) => {
        const dayStr = day < 10 ? `0${day}` : day;
        const found = chartData.find(d => d.date === `${currentMonth}-${dayStr}` && d.id === gameId);
        return found ? found.newResult : '--';
    };

    const goToWA = (num) => window.open(`https://wa.me/91${num}`, '_blank');

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'serif', textAlign: 'center', margin: 0, padding: 0 }}>
            <Head>
                <title>Satta King Live Result | Satta-King-Live.com</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* --- ANIMATED HEADER --- */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', backgroundColor: '#800000', color: 'white', fontSize: '11px', fontWeight: 'bold', borderBottom: '1px solid white' }}>
                <div style={{ borderRight: '1px solid white', padding: '12px 2px' }}>HOME</div>
                <div style={{ borderRight: '1px solid white', padding: '12px 2px' }}>SATTA CHART</div>
                <div style={{ borderRight: '1px solid white', padding: '12px 2px' }}>SATTA KING 786</div>
                <div style={{ borderRight: '1px solid white', padding: '12px 2px' }}>DELHI KING</div>
                <div style={{ padding: '12px 2px' }}>SATTA LEAK</div>
            </div>

            <div style={{ backgroundColor: '#000', color: 'white', padding: '6px 0', borderBottom: '2px solid #ffff00' }}>
                <marquee style={{ fontWeight: 'bold', fontSize: '14px' }}>SATTA KING, SATTA KING RECORD, SATTA KING RECORD CHART, SATTA KING LIVE RESULT</marquee>
            </div>

            <div className="glow-yellow" style={{ backgroundColor: '#ffff00', padding: '15px 0', borderBottom: '3px solid #008000' }}>
                <h1 style={{ fontSize: '50px', fontWeight: '900', color: 'black', margin: 0, fontStyle: 'italic' }}>SATTA KING</h1>
            </div>

            <div style={{ backgroundColor: '#008000', color: 'white', padding: '8px', fontWeight: 'bold' }}>SATTA KING | SATTA KING LIVE</div>

            {/* --- LATEST UPDATED RESULT --- */}
            <div style={{ padding: '20px 10px' }}>
                <h3 style={{ color: '#c000c0', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{displayTime.split(' ')[0]} {displayTime.split(' ')[1]} {displayTime.split(' ')[2]}</h3>
                <p style={{ color: 'black', fontWeight: 'bold', fontSize: '20px', margin: '5px 0' }}>Today's Satta Live Result !</p>
                
                {latestGame && (
                    <div style={{ marginTop: '15px' }}>
                        <h2 className="blink-text" style={{ color: 'red', fontSize: '50px', fontWeight: '900', margin: 0 }}>{latestGame.name}</h2>
                        <div style={{ color: '#008000', fontSize: '75px', fontWeight: '900', margin: '-10px 0' }}>{latestGame.newResult}</div>
                    </div>
                )}
            </div>

            {/* --- MAIN RESULTS GRID (Fixed Names) --- */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '0 5px', borderLeft: '1px solid black', borderTop: '1px solid black' }}>
                {gameList.map((game) => (
                    <div key={game.id} style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '20px 5px', backgroundColor: 'white' }}>
                        {/* Game Name is now clear and full-width */}
                        <h5 style={{ color: '#800000', fontSize: '22px', fontWeight: '900', margin: 0 }}>{game.name}</h5>
                        <p style={{ fontSize: '13px', fontWeight: 'bold', margin: '2px 0 10px 0', color: '#333' }}>( {game.time} )</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'navy' }}>
                            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>&#123; {getLive(game.id).oldResult} &#125;</span>
                            <span style={{ color: 'green', fontSize: '24px' }}>➡️</span>
                            <span style={{ fontSize: '36px', fontWeight: '900', border: '3px solid navy', padding: '2px 10px', backgroundColor: '#f0faff' }}>
                                [ {getLive(game.id).newResult} ]
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- PROMOTION SECTION --- */}
            <div style={{ background: 'linear-gradient(to bottom, #001a33, #000)', color: 'white', padding: '30px 10px', marginTop: '20px' }}>
                <h2 className="blink" style={{ color: '#25d366' }}>💚 Online khaiwal 💚</h2>
                <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>जोड़ी रेट 10 का 1000 | हरूप 100 का 1000</div>
                <button onClick={() => goToWA('9650695993')} className="btn-glow-blue">WHATSAPP (आकाश भाई)</button>
                <div style={{ backgroundColor: '#ffff00', color: '#000', padding: '15px', margin: '20px 10px', border: '3px dashed red', borderRadius: '10px', fontWeight: 'bold' }}>
                    दोस्तों अब घर बैठे ऑनलाइन गेम प्ले करें <span style={{color:'red'}}>दिवाकर भाई</span> के पास।
                </div>
            </div>

            {/* --- MONTHLY CHART --- */}
            <div style={{ marginTop: '20px', padding: '0 5px' }}>
                <div style={{ backgroundColor: '#800000', color: 'white', padding: '10px', fontWeight: 'bold', border: '1px solid black' }}>SATTA KING RECORD CHART MARCH 2026</div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', color: '#000', fontSize: '12px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#eee' }}>
                                <th style={{ border: '1px solid black', padding: '5px' }}>DT</th>
                                {gameList.map(g => <th key={g.id} style={{ border: '1px solid black', padding: '2px', fontSize: '10px' }}>{g.name}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(31)].map((_, i) => (
                                <tr key={i+1}>
                                    <td style={{ border: '1px solid black', fontWeight: 'bold', background: '#800000', color: '#fff' }}>{i+1}</td>
                                    {gameList.map(g => <td key={g.id} style={{ border: '1px solid black', padding: '5px', fontWeight: 'bold', fontSize: '16px' }}>{getChartNum(i+1, g.id)}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes blinker { 50% { opacity: 0; } }
                .blink { animation: blinker 1s linear infinite; }
                .blink-text { animation: blinker 0.6s linear infinite; }
                @keyframes glow { 
                    0% { box-shadow: inset 0 0 10px #ff0000; }
                    50% { box-shadow: inset 0 0 30px #ff8000; }
                    100% { box-shadow: inset 0 0 10px #ff0000; }
                }
                .glow-yellow { animation: glow 2s infinite; }
                .btn-glow-blue { 
                    background: #0056b3; color: white; border: none; padding: 15px; 
                    border-radius: 5px; width: 90%; font-weight: bold; margin-top: 15px;
                    box-shadow: 0 0 15px rgba(0,86,179,0.8); cursor: pointer;
                }
                body { margin: 0; padding: 0; }
            `}} />
        </div>
    );
                            }
