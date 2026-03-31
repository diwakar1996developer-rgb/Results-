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

    // स्क्रीनशॉट 27 का चार्ट डेटा (5 मुख्य घड़ियाँ)
    const staticChart = [
        { date: '1', fb: '02', gz: '10', gl: '92', ds: '81', sg: '36' },
        { date: '2', fb: '91', gz: '10', gl: '30', ds: '68', sg: '56' },
        { date: '3', fb: '06', gz: '13', gl: '17', ds: '49', sg: '17' },
        { date: '4', fb: '66', gz: '65', gl: '90', ds: '19', sg: '74' },
        { date: '5', fb: '07', gz: '46', gl: '74', ds: '54', sg: '14' },
    ];

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setDisplayTime(now.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }) + " " + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
        };
        updateTime();
        const t = setInterval(updateTime, 1000);
        return () => clearInterval(t);
    }, []);

    const goToWA = (num) => window.open(`https://wa.me/91${num}`, '_blank');

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'Arial, sans-serif', textAlign: 'center', margin: 0, padding: 0, overflowX: 'hidden' }}>
            <Head>
                <title>Satta King Live Result | Satta-King-Live.com</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* --- 1. ANIMATED HEADER (EXACT REPLICA) --- */}
            <nav style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', backgroundColor: '#800000', color: 'white', fontSize: '11px', fontWeight: 'bold', borderBottom: '1px solid white' }}>
                <div style={{ borderRight: '1px solid white', padding: '12px 2px' }}>HOME</div>
                <div style={{ borderRight: '1px solid white', padding: '12px 2px' }}>SATTA CHART</div>
                <div style={{ borderRight: '1px solid white', padding: '12px 2px' }}>SATTA KING 786</div>
                <div style={{ borderRight: '1px solid white', padding: '12px 2px' }}>DELHI KING</div>
                <div style={{ padding: '12px 2px' }}>SATTA LEAK</div>
            </nav>

            <div style={{ backgroundColor: '#000', color: 'white', padding: '5px 0', borderBottom: '2px solid #ffff00' }}>
                <marquee style={{ fontWeight: 'bold' }}>SATTA KING, SATTA KING RECORD, SATTA KING RECORD CHART, SATTA KING 786, SATTA KING LIVE RESULT</marquee>
            </div>

            <div className="glow-yellow-bg" style={{ backgroundColor: '#ffff00', padding: '15px 0', borderBottom: '3px solid #008000' }}>
                <h1 style={{ fontSize: '48px', fontWeight: '900', color: 'black', margin: 0, fontStyle: 'italic', letterSpacing: '-2px' }}>SATTA KING</h1>
            </div>

            <div style={{ backgroundColor: '#008000', color: 'white', padding: '8px', fontWeight: 'bold', fontSize: '15px' }}>SATTA KING | SATTA KING LIVE</div>

            <div style={{ backgroundColor: '#800000', color: 'white', padding: '12px', margin: '5px', border: '1px solid black' }}>
                <h2 style={{ fontSize: '18px', margin: 0, fontWeight: 'bold' }}>SATTA KING BEST SITE SATTA RESULT</h2>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>SATTA-KING-LIVE.COM</p>
            </div>

            {/* --- 2. AUTO FETCH TIME & LATEST RESULT --- */}
            <div style={{ padding: '15px 0' }}>
                <h3 style={{ color: '#c000c0', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{displayTime}</h3>
                <p style={{ fontWeight: 'bold', margin: '5px 0' }}>Today's Satta Live Result !</p>
                
                {/* Latest Updated result display */}
                <div style={{ marginTop: '10px' }}>
                    <h2 className="blink-red" style={{ color: 'red', fontSize: '45px', fontWeight: '900', margin: 0 }}>{latestGame.name}</h2>
                    <div style={{ color: '#008000', fontSize: '70px', fontWeight: '900', marginTop: '-10px' }}>{latestGame.number}</div>
                </div>
            </div>

            {/* --- 3. RESULT BOXES (FIXED SIZE) --- */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '0 5px', borderLeft: '1px solid black', borderTop: '1px solid black' }}>
                {gameList.map((game) => (
                    <div key={game.id} style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '12px 2px', backgroundColor: 'white' }}>
                        <h5 style={{ color: '#800000', fontSize: '18px', fontWeight: '900', margin: 0 }}>{game.name}</h5>
                        <p style={{ fontSize: '12px', fontWeight: 'bold', margin: '2px 0' }}>( {game.time} )</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>&#123; ?? &#125;</span>
                            <span style={{ color: 'green', fontWeight: 'bold' }}>➡️</span>
                            <span style={{ fontSize: '26px', fontWeight: '900', color: 'navy', border: '2px solid navy', padding: '0 8px', backgroundColor: '#f0faff' }}>[ ?? ]</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- 4. ANIMATED PROMOTION SECTION --- */}
            <div style={{ background: 'linear-gradient(180deg, #001a33 0%, #000 100%)', color: 'white', padding: '25px 10px', marginTop: '20px', borderTop: '4px solid #800000' }}>
                <div className="blink" style={{ color: '#25d366', fontSize: '20px', fontWeight: 'bold' }}>💚 Online khaiwal 💚</div>
                <h2 style={{ fontSize: '22px', margin: '10px 0' }}>❤️ 100% भरोसेमंद ❤️</h2>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>जोड़ी रेट <span style={{color:'#ffff00'}}>10 का 1000</span> | हरूप रेट <span style={{color:'#ffff00'}}>100 का 1000</span></p>
                
                <div style={{ margin: '15px auto', maxWidth: '280px', textAlign: 'left', border: '1px dashed #444', padding: '10px', fontSize: '16px' }}>
                    <p>⏰ 04:30PM 🔰 श्री गणेश</p>
                    <p>⏰ 05:45PM 🔰 फरीदाबाद</p>
                    <p>⏰ 09:30PM 🔰 गाजियाबाद</p>
                    <p>⏰ 11:25PM 🔰 गली चोर</p>
                    <p>⏰ 02:15AM 🔰 लक्की7 नाइट</p>
                    <p>⏰ 03:30AM 🔰 दिसावर</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                    <button onClick={() => goToWA('9650695993')} className="btn-wa shadow-blue">WHATSAPP (आकाश भाई खाईवाल)</button>
                    <button onClick={() => goToWA('9354072027')} className="btn-wa shadow-green" style={{backgroundColor:'#008000'}}>WHATSAPP (अली कुली मिर्ज़ा)</button>
                </div>

                <div className="blink-border" style={{ backgroundColor: '#ffff00', color: '#000', padding: '15px', margin: '20px 10px', borderRadius: '10px' }}>
                    <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
                        दोस्तों अब घर बैठे Online गेम प्ले करे श्री गणेश से दिशावर तक। <br/>
                        <span style={{ color: 'red', fontSize: '18px', fontWeight: '900' }}>आपके अपने भाई दिवाकर खाईवाल के पास</span> <br/>
                        जोड़ी 10 के 1000 और 100 के 10000
                    </p>
                    <button onClick={() => goToWA('9650695993')} style={{ marginTop: '10px', backgroundColor: '#25d366', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>WhatsApp Link ✅</button>
                </div>
            </div>

            {/* --- 5. AUTOMATIC CHART (SCRNSHOT 27 DATA) --- */}
            <div style={{ marginTop: '20px', padding: '0 5px' }}>
                <div style={{ backgroundColor: '#ffff00', padding: '8px', border: '2px solid black', fontWeight: 'bold' }}>Satta King Record Chart March 2026</div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', fontSize: '12px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#800000', color: 'white' }}>
                                <th style={{ border: '1px solid black', padding: '5px' }}>DT</th>
                                <th style={{ border: '1px solid black' }}>FB</th>
                                <th style={{ border: '1px solid black' }}>GZ</th>
                                <th style={{ border: '1px solid black' }}>GL</th>
                                <th style={{ border: '1px solid black' }}>DS</th>
                                <th style={{ border: '1px solid black' }}>SG</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staticChart.map((row) => (
                                <tr key={row.date}>
                                    <td style={{ border: '1px solid black', fontWeight: 'bold', background: '#800000', color: 'white' }}>{row.date}</td>
                                    <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>{row.fb}</td>
                                    <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>{row.gz}</td>
                                    <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>{row.gl}</td>
                                    <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>{row.ds}</td>
                                    <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>{row.sg}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- 6. SEO CONTENT SECTION (AS PER SCREENSHOT 28) --- */}
            <div style={{ textAlign: 'left', padding: '20px', fontSize: '13px', lineHeight: '1.5', color: '#333' }}>
                <div style={{ border: '2px solid blue', padding: '10px', marginBottom: '10px' }}>
                    <h4 style={{ color: 'maroon', margin: '0 0 5px 0' }}>What Is Satta King ?</h4>
                    <p>Satta king (सट्टा किंग) is one of the most well known gambling game being played all over India...</p>
                </div>
                <div style={{ border: '2px solid blue', padding: '10px', marginBottom: '10px' }}>
                    <h4 style={{ color: 'maroon', margin: '0 0 5px 0' }}>How To Play Satta King ?</h4>
                    <p>Satta king game is very easy to play it does not need to learn any extra knowledge...</p>
                </div>
                <div style={{ backgroundColor: '#ffff00', border: '2px solid black', padding: '10px', textAlign: 'center' }}>
                    <h4 style={{ margin: 0 }}>DISCLAIMER</h4>
                    <p style={{ fontSize: '11px', margin: '5px 0' }}>The content provided is for informational purposes only. We do not operate gambling platforms.</p>
                </div>
            </div>

            {/* --- 7. PREMIUM FOOTER (AS PER SCREENSHOT 28) --- */}
            <footer style={{ backgroundColor: '#000', color: 'white', padding: '30px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    <button style={footerBtnStyle}>DISCLAIMER</button>
                    <button style={footerBtnStyle}>PRIVACY POLICY</button>
                    <button style={footerBtnStyle}>SITEMAP</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', fontSize: '10px' }}>
                    <div style={footerLinkBox}>Satta King VIP</div>
                    <div style={footerLinkBox}>Satta King Fast</div>
                    <div style={footerLinkBox}>UP GAME KING</div>
                    <div style={footerLinkBox}>Satta King 2026</div>
                    <div style={footerLinkBox}>Contact Us</div>
                    <div style={footerLinkBox}>About Us</div>
                </div>
                <h2 style={{ fontSize: '24px', margin: '20px 0 5px 0', borderTop: '1px solid #333', paddingTop: '10px' }}>SATTA KING LIVE</h2>
                <p style={{ fontSize: '11px', color: '#777' }}>Copyright © 2018-2026 - SATTA KING LEAK</p>
            </footer>

            {/* --- FLOATING WHATSAPP BUTTON --- */}
            <div onClick={() => goToWA('9650695993')} style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#25d366', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', animation: 'pulse 2s infinite', zIndex: 1000 }}>
                <span style={{ fontSize: '30px' }}>💬</span>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes blinker { 50% { opacity: 0; } }
                .blink { animation: blinker 1s linear infinite; }
                .blink-red { animation: blinker 0.6s linear infinite; }
                @keyframes glow { 
                    0% { box-shadow: inset 0 0 10px #ff0000; }
                    50% { box-shadow: inset 0 0 30px #ff8000; }
                    100% { box-shadow: inset 0 0 10px #ff0000; }
                }
                .glow-yellow-bg { animation: glow 2s infinite; }
                @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
                .btn-wa { border: none; padding: 12px; border-radius: 5px; color: white; font-weight: bold; width: 280px; cursor: pointer; }
                .shadow-blue { background-color: #0056b3; box-shadow: 0 0 15px rgba(0,86,179,0.7); }
                .blink-border { border: 3px dashed red; animation: blinker 1s step-end infinite; }
                body { margin: 0; padding: 0; }
            `}} />
        </div>
    );
}

const footerBtnStyle = { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' };
const footerLinkBox = { backgroundColor: '#ffff00', color: '#000', padding: '5px', border: '1px solid #000', fontWeight: 'bold' };
