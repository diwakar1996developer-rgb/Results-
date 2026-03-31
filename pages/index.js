import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [liveResults, setLiveResults] = useState([]);
    const [displayTime, setDisplayTime] = useState('');
    const [latestGame, setLatestGame] = useState({ name: 'DISAWAR', number: '81' });

    // आपके द्वारा बताए गए 6 गेम्स और उनकी फिक्स टाइमिंग
    const gameList = [
        { id: 'sg', name: 'SHREE GANESH', time: '04:30 PM' },
        { id: 'fb', name: 'FARIDABAD', time: '05:45 PM' },
        { id: 'gb', name: 'GAZIYABAD', time: '09:30 PM' },
        { id: 'gl', name: 'GALI CHOR', time: '11:25 PM' },
        { id: 'l7', name: 'LUCKY 7 NIGHT', time: '02:15 AM' },
        { id: 'ds', name: 'DISAWAR', time: '03:30 AM' }
    ];

    // स्क्रीनशॉट 31 और 32 का 5 दिन का डेटा + 6th Game (L7)
    const staticChart = [
        { dt: '1', fb: '02', gz: '10', gl: '92', ds: '81', sg: '36', l7: '--' },
        { dt: '2', fb: '91', gz: '10', gl: '30', ds: '68', sg: '56', l7: '--' },
        { dt: '3', fb: '06', gz: '13', gl: '17', ds: '49', sg: '17', l7: '--' },
        { dt: '4', fb: '66', gz: '65', gl: '90', ds: '19', sg: '74', l7: '--' },
        { dt: '5', fb: '07', gz: '46', gl: '74', ds: '54', sg: '14', l7: '--' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/results');
                const data = await res.json();
                if (data && data.length > 0) {
                    setLiveResults(data);
                    // Latest result logic
                    const sorted = [...data].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                    setLatestGame({ name: sorted[0].name, number: sorted[0].newResult });
                }
            } catch (e) { console.error(e); }
        };
        fetchData();
        const timer = setInterval(fetchData, 15000);
        const clock = setInterval(() => {
            const now = new Date();
            setDisplayTime(now.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }) + " " + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
        }, 1000);
        return () => { clearInterval(timer); clearInterval(clock); };
    }, []);

    const getVal = (id, type) => {
        const found = liveResults.find(r => r.id === id);
        return found ? (type === 'new' ? found.newResult : found.oldResult) : '??';
    };

    const goToWA = (n) => window.open(`https://wa.me/91${n}`, '_blank');

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: '"Arial Narrow", sans-serif', textAlign: 'center', margin: 0, padding: 0 }}>
            <Head>
                <title>Satta King Live Result | Satta-King-Live.com</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* --- PREMIUM ANIMATED HEADER --- */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', backgroundColor: '#800000', color: 'white', fontSize: '11px', fontWeight: 'bold', borderBottom: '1px solid white' }}>
                <div style={{ padding: '12px 2px', borderRight: '1px solid white' }}>HOME</div>
                <div style={{ padding: '12px 2px', borderRight: '1px solid white' }}>SATTA CHART</div>
                <div style={{ padding: '12px 2px', borderRight: '1px solid white' }}>786</div>
                <div style={{ padding: '12px 2px', borderRight: '1px solid white' }}>DELHI KING</div>
                <div style={{ padding: '12px 2px' }}>LEAK</div>
            </div>

            <div style={{ backgroundColor: '#000', color: '#fff', padding: '5px 0' }}>
                <marquee style={{ fontWeight: 'bold', fontSize: '13px' }}>SATTA KING LIVE RESULT | FASTEST SATTA RECORD CHART MARCH 2026</marquee>
            </div>

            <div className="glow-yellow-box" style={{ backgroundColor: '#ffff00', padding: '10px 0', borderBottom: '3px solid #008000' }}>
                <h1 style={{ fontSize: '55px', fontWeight: '900', color: '#000', margin: 0, fontStyle: 'italic', letterSpacing: '-3px', textShadow: '2px 2px #aaa' }}>SATTA KING</h1>
            </div>

            <div style={{ backgroundColor: '#008000', color: '#fff', padding: '6px', fontWeight: 'bold', fontSize: '14px', borderBottom: '2px solid #800000' }}>
                SATTA KING | SATTA KING LIVE
            </div>

            <div style={{ backgroundColor: '#800000', color: '#white', padding: '10px', margin: '5px', border: '1px solid black', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                <h2 style={{ fontSize: '18px', margin: 0, color: 'white' }}>SATTA KING BEST SITE SATTA RESULT</h2>
                <p style={{ margin: '2px 0 0 0', fontSize: '14px', color: '#eee' }}>SATTA-KING-LIVE.COM</p>
            </div>

            {/* --- LIVE TIME & LATEST HIGHLIGHT --- */}
            <div style={{ padding: '15px 0' }}>
                <h3 style={{ color: '#c000c0', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{displayTime.split(' ')[0]} {displayTime.split(' ')[1]} {displayTime.split(' ')[2]}</h3>
                <p style={{ fontWeight: 'bold', margin: '5px 0', fontSize: '18px' }}>Today's Satta Live Result !</p>
                
                <div className="blink-fast" style={{ marginTop: '15px' }}>
                    <h2 style={{ color: 'red', fontSize: '50px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>{latestGame.name}</h2>
                    <div style={{ color: '#008000', fontSize: '85px', fontWeight: '900', marginTop: '-20px' }}>{latestGame.number}</div>
                </div>
            </div>

            {/* --- RESULT GRID (COMPACT SIZE - SCRNSHOT 33 REPLICA) --- */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '0 5px', borderLeft: '1.5px solid black', borderTop: '1.5px solid black', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                {gameList.map((game) => (
                    <div key={game.id} style={{ borderRight: '1.5px solid black', borderBottom: '1.5px solid black', padding: '15px 2px', backgroundColor: 'white' }}>
                        <h5 style={{ color: '#800000', fontSize: '20px', fontWeight: '900', margin: 0 }}>{game.name}</h5>
                        <p style={{ fontSize: '12px', fontWeight: 'bold', margin: '3px 0', color: '#333' }}>( {game.time} )</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>&#123; {getVal(game.id, 'old')} &#125;</span>
                            <span style={{ color: '#5dade2', fontSize: '22px', fontWeight: 'bold' }}>➡️</span>
                            <div style={{ border: '3px solid #000080', padding: '0 8px', backgroundColor: '#fff' }}>
                                <span style={{ fontSize: '38px', fontWeight: '900', color: '#000080' }}>[ {getVal(game.id, 'new')} ]</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- PROMOTION SECTION (SCRNSHOT 25 REPLICA) --- */}
            <div className="promo-gradient" style={{ padding: '30px 10px', marginTop: '20px', borderTop: '5px solid #800000' }}>
                <h3 className="blink" style={{ color: '#25d366', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>💚 Online khaiwal 💚</h3>
                <h2 style={{ color: '#fff', fontSize: '26px', margin: '10px 0' }}>❤️ 100% भरोसेमंद ❤️</h2>
                <p style={{ color: '#ffff00', fontSize: '21px', fontWeight: 'bold', border: '1px solid #444', display: 'inline-block', padding: '5px 15px' }}>जोड़ी 10 का 1000 | हरूप 100 का 1000</p>
                
                <div style={{ margin: '20px auto', maxWidth: '300px', textAlign: 'left', border: '1.5px dashed #666', padding: '15px', color: '#ddd', fontSize: '17px', background: 'rgba(255,255,255,0.05)' }}>
                    <p style={{ margin: '5px 0' }}>⏰ 04:30PM 🔰 श्री गणेश</p>
                    <p style={{ margin: '5px 0' }}>⏰ 05:45PM 🔰 फरीदाबाद</p>
                    <p style={{ margin: '5px 0' }}>⏰ 09:30PM 🔰 गाजियाबाद</p>
                    <p style={{ margin: '5px 0' }}>⏰ 11:25PM 🔰 गली चोर</p>
                    <p style={{ margin: '5px 0' }}>⏰ 02:15AM 🔰 लक्की7 नाइट</p>
                    <p style={{ margin: '5px 0' }}>⏰ 03:30AM 🔰 दिसावर</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                    <button onClick={() => goToWA('9650695993')} className="wa-btn-blue glow-btn">WHATSAPP (आकाश भाई खाईवाल)</button>
                    <button onClick={() => goToWA('9354072027')} className="wa-btn-green">WHATSAPP (अली कुली मिर्ज़ा)</button>
                </div>

                <div className="blink-border-yellow" style={{ backgroundColor: '#ffff00', color: '#000', padding: '20px', margin: '30px 10px', borderRadius: '15px', border: '3px dashed red' }}>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, lineHeight: '1.4' }}>
                        दोस्तों अब घर बैठे Online गेम प्ले करे श्री गणेश से दिशावर तक। <br/>
                        <span style={{ color: 'red', fontSize: '20px', fontWeight: '900' }}>आपके अपने भाई दिवाकर खाईवाल के पास</span> <br/>
                        जोड़ी 10 के 1000 और 100 के 10000
                    </p>
                    <button onClick={() => goToWA('9650695993')} style={{ marginTop: '15px', backgroundColor: '#25d366', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '30px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>WhatsApp Link ✅</button>
                </div>
            </div>

            {/* --- AUTOMATIC CHART (6 GAMES - 31 ROWS) --- */}
            <div style={{ marginTop: '30px', padding: '0 5px' }}>
                <div style={{ backgroundColor: '#ffff00', padding: '12px', border: '2px solid black', fontWeight: 'bold', fontSize: '22px', boxShadow: '0 -4px 10px rgba(0,0,0,0.1)' }}>
                    Satta King Record Chart March 2026
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', color: '#000' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#800000', color: 'white', fontSize: '14px' }}>
                                <th style={{ border: '1.5px solid black', padding: '8px' }}>DT</th>
                                <th style={{ border: '1.5px solid black' }}>FB</th>
                                <th style={{ border: '1.5px solid black' }}>GZ</th>
                                <th style={{ border: '1.5px solid black' }}>GL</th>
                                <th style={{ border: '1.5px solid black' }}>DS</th>
                                <th style={{ border: '1.5px solid black' }}>SG</th>
                                <th style={{ border: '1.5px solid black', backgroundColor: '#000080' }}>L7</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Static Data for 5 days */}
                            {staticChart.map(row => (
                                <tr key={row.dt} style={{ fontSize: '19px' }}>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold', backgroundColor: '#800000', color: 'white', padding: '10px' }}>{row.dt}</td>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold' }}>{row.fb}</td>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold' }}>{row.gz}</td>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold' }}>{row.gl}</td>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold' }}>{row.ds}</td>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold' }}>{row.sg}</td>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold', color: '#000080' }}>{row.l7}</td>
                                </tr>
                            ))}
                            {/* Empty rows for rest of month */}
                            {[...Array(26)].map((_, i) => (
                                <tr key={i+6}>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold', backgroundColor: '#800000', color: 'white' }}>{i+6}</td>
                                    {[...Array(6)].map((__, j) => <td key={j} style={{ border: '1.5px solid black', padding: '10px' }}>--</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- SEO & FOOTER (SCRNSHOT 28 REPLICA) --- */}
            <div style={{ textAlign: 'left', padding: '20px', fontSize: '14px', color: '#333', borderTop: '2px solid #800000', marginTop: '40px' }}>
                <div style={{ border: '2px solid blue', padding: '15px', marginBottom: '15px' }}>
                    <h4 style={{ color: 'maroon', fontSize: '20px', margin: '0 0 10px 0' }}>What Is Satta King ?</h4>
                    <p>Satta king (सट्टा किंग) is a popular lottery-based game. It originated from Mumbai and now is played online worldwide...</p>
                </div>
                <div style={{ backgroundColor: '#ffff00', border: '2px solid black', padding: '15px', textAlign: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '18px' }}>DISCLAIMER</h4>
                    <p style={{ fontSize: '12px', margin: '10px 0', fontWeight: 'bold' }}>This website is for information only. We do not promote gambling. Playing Satta might be illegal in your area.</p>
                </div>
            </div>

            <footer style={{ backgroundColor: '#000', color: '#fff', padding: '40px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '25px' }}>
                    <button className="foot-btn">DISCLAIMER</button>
                    <button className="foot-btn">PRIVACY POLICY</button>
                    <button className="foot-btn">SITEMAP</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', maxWidth: '600px', margin: '0 auto' }}>
                    {[ 'Satta King VIP', 'Satta King Fast', 'UP GAME KING', 'Satta King 2026', 'Contact Us', 'About Us' ].map(link => (
                        <div key={link} style={{ backgroundColor: '#ffff00', color: '#000', padding: '8px', fontWeight: 'bold', border: '1px solid #000', fontSize: '12px' }}>{link}</div>
                    ))}
                </div>
                <h2 style={{ fontSize: '32px', margin: '30px 0 5px 0', fontWeight: '900', borderTop: '1px solid #333', paddingTop: '20px' }}>SATTA KING LIVE</h2>
                <p style={{ fontSize: '12px', color: '#888' }}>Copyright © 2018-2026 - SATTA KING LIVE</p>
            </footer>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes blinker { 50% { opacity: 0; } }
                .blink { animation: blinker 1s linear infinite; }
                .blink-fast { animation: blinker 0.6s linear infinite; }
                @keyframes glow { 0% { box-shadow: 0 0 10px red; } 50% { box-shadow: 0 0 25px yellow; } 100% { box-shadow: 0 0 10px red; } }
                .glow-yellow-box { animation: glow 2s infinite; }
                .promo-gradient { background: linear-gradient(180deg, #001a33 0%, #000 100%); }
                .wa-btn-blue { background-color: #0056b3; color: white; border: none; padding: 16px; border-radius: 8px; font-weight: bold; width: 90%; cursor: pointer; font-size: 17px; }
                .wa-btn-green { background-color: #008000; color: white; border: none; padding: 16px; border-radius: 8px; font-weight: bold; width: 90%; cursor: pointer; font-size: 17px; margin-top: 10px; }
                .glow-btn { box-shadow: 0 0 20px rgba(0,86,179,0.8); }
                .foot-btn { background-color: #e74c3c; color: white; border: none; padding: 10px 20px; font-weight: bold; cursor: pointer; border-radius: 4px; }
                body { margin: 0; padding: 0; }
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-thumb { background: #800000; }
            `}} />
        </div>
    );
                                         }
