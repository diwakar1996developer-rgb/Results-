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

    return (
        <div style={{ backgroundColor: '#fffcea', minHeight: '100vh', fontFamily: 'serif', textAlign: 'center', paddingBottom: '50px' }}>
            <Head>
                <title>Satta King Live Result | Satta-King-Live.com</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* Top Bar - Image 15 Style */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', backgroundColor: '#800000', color: 'white', fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid white' }}>
                <div style={{ borderRight: '1px solid white', padding: '10px' }}>HOME</div>
                <div style={{ borderRight: '1px solid white', padding: '10px' }}>SATTA CHART</div>
                <div style={{ borderRight: '1px solid white', padding: '10px' }}>786</div>
                <div style={{ borderRight: '1px solid white', padding: '10px' }}>DELHI KING</div>
                <div style={{ padding: '10px' }}>LEAK</div>
            </div>

            {/* Giant Yellow Header */}
            <div style={{ backgroundColor: '#ffff00', padding: '20px 0', borderTop: '2px solid black', borderBottom: '2px solid black' }}>
                <h1 style={{ fontSize: '45px', fontWeight: '900', color: 'black', margin: 0, fontStyle: 'italic' }}>SATTA KING</h1>
            </div>

            <div style={{ backgroundColor: '#008000', color: 'white', padding: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                SATTA KING | SATTA KING LIVE
            </div>

            {/* Branding Box */}
            <div style={{ backgroundColor: '#800000', color: 'white', padding: '15px', margin: '10px', border: '2px solid black' }}>
                <h2 style={{ fontSize: '18px', margin: 0 }}>SATTA KING BEST SITE SATTA RESULT</h2>
                <p className="blink" style={{ fontSize: '16px', color: '#ffff00', fontWeight: 'bold', margin: '5px 0 0 0' }}>SATTA-KING-LIVE.COM</p>
            </div>

            {/* Date & Time */}
            <div style={{ padding: '15px' }}>
                <h3 style={{ color: '#c000c0', fontSize: '24px', margin: 0 }}>{new Date().getDate()} March 2026</h3>
                <p style={{ color: 'red', fontWeight: 'bold', margin: '5px 0' }}>Today's Satta Live Result !</p>
                <p style={{ color: 'blue', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>{displayTime}</p>
            </div>

            {/* Warning Box */}
            <div style={{ margin: '0 15px', border: '2px solid red', padding: '10px', backgroundColor: 'white' }}>
                <h4 style={{ color: '#800000', textDecoration: 'underline', fontWeight: '900', margin: '0 0 5px 0' }}>चेतावनी(WARNING)</h4>
                <p style={{ color: 'navy', fontWeight: 'bold', fontSize: '13px', lineHeight: '1.2', margin: 0 }}>
                    यह साइट सिर्फ मनोरंजन के लिए है। सट्टा और जुआं जहां प्रतिबंधित है वहां के लोग साइट छोड़ दें।
                </p>
            </div>

            {/* Super Fast Button */}
            <div className="blink-bg" style={{ backgroundColor: 'red', color: 'white', fontWeight: '900', padding: '10px 30px', margin: '20px 0', display: 'inline-block', border: '2px solid black', fontSize: '20px' }}>
                SUPER FAST RESULT
            </div>

            {/* RESULT GRID - EXACTLY 6 GAMES */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '0 10px', borderLeft: '1px solid black', borderTop: '1px solid black' }}>
                {gameList.map((game) => (
                    <div key={game.id} style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '15px 5px', backgroundColor: 'white' }}>
                        <h5 style={{ color: '#800000', fontSize: '20px', fontWeight: '900', margin: 0 }}>{game.name}</h5>
                        <p style={{ fontSize: '12px', fontWeight: 'bold', margin: '2px 0 8px 0' }}>( {game.time} )</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>&#123; {getLive(game.id).oldResult} &#125;</span>
                            <span style={{ color: 'green', fontSize: '20px' }}>➡️</span>
                            <span style={{ fontSize: '30px', fontWeight: '900', color: 'navy', border: '2px solid navy', padding: '0 10px', backgroundColor: '#f0faff' }}>
                                [ {getLive(game.id).newResult} ]
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* AUTOMATIC CHART - IMAGE 16 */}
            <div style={{ marginTop: '40px', margin: '0 10px' }}>
                <div style={{ backgroundColor: '#ffff00', padding: '10px', border: '2px solid black', fontWeight: 'bold', fontSize: '18px' }}>
                    Satta King Record Chart March 2026
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', fontSize: '14px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#800000', color: 'white' }}>
                            <th style={{ border: '1px solid black', padding: '5px' }}>DATE</th>
                            {gameList.map(g => (
                                <th key={g.id} style={{ border: '1px solid black', padding: '5px', fontSize: '10px' }}>{g.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(31)].map((_, i) => (
                            <tr key={i+1} style={{ backgroundColor: (i+1)%2===0 ? '#f9f9f9' : 'white' }}>
                                <td style={{ border: '1px solid black', fontWeight: 'bold', backgroundColor: '#800000', color: 'white' }}>{i+1}</td>
                                {gameList.map(g => (
                                    <td key={g.id} style={{ border: '1px solid black', padding: '5px', fontWeight: 'bold', fontSize: '16px' }}>
                                        {getChartNum(i+1, g.id)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes blinker { 50% { opacity: 0; } }
                .blink { animation: blinker 1s linear infinite; }
                @keyframes bgBlink { 0% { background-color: red; } 50% { background-color: darkred; } 100% { background-color: red; } }
                .blink-bg { animation: bgBlink 0.5s infinite; }
                body { margin: 0; padding: 0; }
            `}} />
        </div>
    );
                    }
