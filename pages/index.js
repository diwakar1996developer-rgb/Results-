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

    // स्क्रीनशॉट 30 के अनुसार शुरुआती डेटा
    const initialChart = [
        { dt: '1', fb: '02', gz: '10', gl: '92', ds: '81', sg: '36' },
        { dt: '2', fb: '91', gz: '10', gl: '30', ds: '68', sg: '56' },
        { dt: '3', fb: '06', gz: '13', gl: '17', ds: '49', sg: '17' },
        { dt: '4', fb: '66', gz: '65', gl: '90', ds: '19', sg: '74' },
        { dt: '5', fb: '07', gz: '46', gl: '74', ds: '54', sg: '14' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/results');
                const data = await res.json();
                if (data && data.length > 0) setLiveResults(data);
            } catch (e) { console.error(e); }
        };
        fetchData();
        const timer = setInterval(fetchData, 10000);
        const clock = setInterval(() => {
            setDisplayTime(new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }) + " " + new Date().toLocaleTimeString());
        }, 1000);
        return () => { clearInterval(timer); clearInterval(clock); };
    }, []);

    const getVal = (id, type) => {
        const found = liveResults.find(r => r.id === id);
        if (type === 'new') return found ? found.newResult : '??';
        return found ? found.oldResult : '??';
    };

    const goToWA = (n) => window.open(`https://wa.me/91${n}`, '_blank');

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'center', margin: 0, padding: 0 }}>
            <Head>
                <title>Satta King Live Result | Satta-King-Live.com</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* --- ANIMATED HEADER --- */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', backgroundColor: '#800000', color: 'white', fontSize: '12px', fontWeight: 'bold', borderBottom: '1px solid white' }}>
                <div style={{ padding: '12px 2px', borderRight: '1px solid white' }}>HOME</div>
                <div style={{ padding: '12px 2px', borderRight: '1px solid white' }}>SATTA CHART</div>
                <div style={{ padding: '12px 2px', borderRight: '1px solid white' }}>786</div>
                <div style={{ padding: '12px 2px', borderRight: '1px solid white' }}>DELHI KING</div>
                <div style={{ padding: '12px 2px' }}>LEAK</div>
            </div>

            <div style={{ backgroundColor: '#000', color: '#fff', padding: '5px 0' }}>
                <marquee style={{ fontWeight: 'bold' }}>SATTA KING LIVE RESULT | FASTEST SATTA RECORD CHART MARCH 2026</marquee>
            </div>

            <div className="glow-yellow-box" style={{ backgroundColor: '#ffff00', padding: '15px 0', borderBottom: '3px solid #008000' }}>
                <h1 style={{ fontSize: '50px', fontWeight: '900', color: '#000', margin: 0, fontStyle: 'italic', letterSpacing: '-2px' }}>SATTA KING</h1>
            </div>

            <div style={{ backgroundColor: '#008000', color: '#fff', padding: '8px', fontWeight: 'bold' }}>SATTA KING | SATTA KING LIVE</div>

            <div style={{ padding: '15px' }}>
                <h2 style={{ color: '#c000c0', fontSize: '26px', fontWeight: 'bold', margin: 0 }}>{displayTime}</h2>
                <p style={{ fontWeight: 'bold', margin: '5px 0' }}>Today's Satta Live Result !</p>
                
                {/* LATEST RESULT HIGHLIGHT */}
                <div className="blink-fast" style={{ marginTop: '10px' }}>
                    <h2 style={{ color: 'red', fontSize: '45px', fontWeight: '900', margin: 0 }}>DISAWAR</h2>
                    <div style={{ color: '#008000', fontSize: '80px', fontWeight: '900', marginTop: '-15px' }}>{getVal('ds', 'new')}</div>
                </div>
            </div>

            {/* --- RESULT BOXES (SCREENSHOT 29 STYLE) --- */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '0 5px', borderLeft: '1.5px solid black', borderTop: '1.5px solid black' }}>
                {gameList.map((game) => (
                    <div key={game.id} style={{ borderRight: '1.5px solid black', borderBottom: '1.5px solid black', padding: '20px 2px', backgroundColor: 'white' }}>
                        <h5 style={{ color: '#800000', fontSize: '22px', fontWeight: '900', margin: 0, lineHeight: '1' }}>{game.name}</h5>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '5px 0' }}>( {game.time} )</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#000' }}>&#123; {getVal(game.id, 'old')} &#125;</span>
                            <span style={{ color: '#5dade2', fontSize: '24px' }}>➡️</span>
                            <div style={{ border: '3px solid #000080', padding: '2px 10px', backgroundColor: 'white' }}>
                                <span style={{ fontSize: '42px', fontWeight: '900', color: '#000080' }}>[ {getVal(game.id, 'new')} ]</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- PROMOTION (ANIMATED) --- */}
            <div className="promo-bg" style={{ padding: '30px 10px', marginTop: '20px', borderTop: '5px solid #800000' }}>
                <h3 className="blink" style={{ color: '#25d366', fontSize: '22px' }}>💚 Online khaiwal 💚</h3>
                <h2 style={{ color: '#fff', fontSize: '24px' }}>❤️ 100% भरोसेमंद ❤️</h2>
                <p style={{ color: '#ffff00', fontSize: '20px', fontWeight: 'bold' }}>जोड़ी 10 का 1000 | हरूप 100 का 1000</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginTop: '15px' }}>
                    <button onClick={() => goToWA('9650695993')} className="wa-btn blink-border">WHATSAPP (आकाश भाई)</button>
                    <button onClick={() => goToWA('9354072027')} className="wa-btn" style={{ backgroundColor: '#008000' }}>WHATSAPP (अली कुली मिर्ज़ा)</button>
                </div>
                <div className="yellow-promo" style={{ backgroundColor: '#ffff00', color: '#000', padding: '15px', margin: '20px 10px', border: '3px dashed red', fontWeight: 'bold' }}>
                    दोस्तों घर बैठे ऑनलाइन गेम प्ले करें <span style={{color:'red'}}>दिवाकर भाई</span> के पास। <br/> जोड़ी 10 का 1000
                </div>
            </div>

            {/* --- CHART (SCREENSHOT 30 STYLE) --- */}
            <div style={{ marginTop: '20px', padding: '0 5px' }}>
                <div style={{ backgroundColor: '#ffff00', padding: '10px', border: '2px solid black', fontWeight: 'bold', fontSize: '20px' }}>
                    Satta King Record Chart March 2026
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', color: '#000' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#800000', color: 'white' }}>
                            <th style={{ border: '1.5px solid black', padding: '8px' }}>DT</th>
                            <th style={{ border: '1.5px solid black' }}>FB</th>
                            <th style={{ border: '1.5px solid black' }}>GZ</th>
                            <th style={{ border: '1.5px solid black' }}>GL</th>
                            <th style={{ border: '1.5px solid black' }}>DS</th>
                            <th style={{ border: '1.5px solid black' }}>SG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialChart.map(row => (
                            <tr key={row.dt}>
                                <td style={{ border: '1.5px solid black', fontWeight: 'bold', backgroundColor: '#800000', color: 'white', padding: '10px' }}>{row.dt}</td>
                                <td style={{ border: '1.5px solid black', fontWeight: 'bold', fontSize: '20px' }}>{row.fb}</td>
                                <td style={{ border: '1.5px solid black', fontWeight: 'bold', fontSize: '20px' }}>{row.gz}</td>
                                <td style={{ border: '1px solid black', fontWeight: 'bold', fontSize: '20px' }}>{row.gl}</td>
                                <td style={{ border: '1.5px solid black', fontWeight: 'bold', fontSize: '20px' }}>{row.ds}</td>
                                <td style={{ border: '1.5px solid black', fontWeight: 'bold', fontSize: '20px' }}>{row.sg}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- FOOTER --- */}
            <footer style={{ backgroundColor: '#000', color: '#fff', padding: '40px 10px', marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    <button className="foot-btn">DISCLAIMER</button>
                    <button className="foot-btn">PRIVACY POLICY</button>
                    <button className="foot-btn">CONTACT US</button>
                </div>
                <h2 style={{ fontSize: '28px', borderTop: '1px solid #333', paddingTop: '10px' }}>SATTA KING LIVE</h2>
                <p style={{ fontSize: '12px', color: '#666' }}>Copyright © 2018-2026 - SATTA KING LIVE</p>
            </footer>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes blink { 50% { opacity: 0; } }
                .blink { animation: blink 1s linear infinite; }
                .blink-fast { animation: blink 0.5s linear infinite; }
                @keyframes glow { 0% { box-shadow: 0 0 5px red; } 50% { box-shadow: 0 0 20px yellow; } 100% { box-shadow: 0 0 5px red; } }
                .glow-yellow-box { animation: glow 2s infinite; }
                .promo-bg { background: linear-gradient(180deg, #001a33 0%, #000 100%); }
                .wa-btn { background-color: #0056b3; color: white; border: none; padding: 15px; border-radius: 5px; font-weight: bold; width: 90%; cursor: pointer; box-shadow: 0 0 10px rgba(0,0,0,0.5); }
                .blink-border { border: 3px dashed #ffff00; }
                .foot-btn { background-color: #e74c3c; color: white; border: none; padding: 10px 15px; font-weight: bold; cursor: pointer; }
                body { margin: 0; padding: 0; }
            `}} />
        </div>
    );
                }
