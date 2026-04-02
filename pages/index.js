import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [liveResults, setLiveResults] = useState([]);
    const [chartDataApril, setChartDataApril] = useState([]);
    const [displayTime, setDisplayTime] = useState('');
    const [nextGameSoon, setNextGameSoon] = useState('');
    const [latestGame, setLatestGame] = useState(null);
    const [modal, setModal] = useState({ show: false, title: '', content: '' });

    const gameList = [
        { id: 'sg', name: 'SHREE GANESH', time: '04:30 PM', h: 16, m: 30 },
        { id: 'fb', name: 'FARIDABAD', time: '05:45 PM', h: 17, m: 45 },
        { id: 'gb', name: 'GAZIYABAD', time: '09:30 PM', h: 21, m: 30 },
        { id: 'gl', name: 'GALI CHOR', time: '11:25 PM', h: 23, m: 25 },
        { id: 'l7', name: 'LUCKY 7 NIGHT', time: '02:15 AM', h: 2, m: 15 },
        { id: 'ds', name: 'DISAWAR', time: '03:30 AM', h: 3, m: 30 }
    ];

    const marchData = [
        { date: '1', sg: '36', fb: '02', gb: '10', gl: '92', ds: '##', l7: '--' },
        { date: '2', sg: '00', fb: '91', gb: '10', gl: '30', ds: '68', l7: '04' },
        { date: '3', sg: '17', fb: '06', gb: '13', gl: '17', ds: '49', l7: '07' },
        { date: '4', sg: '74', fb: '66', gb: '65', gl: '90', ds: '19', l7: '11' },
        { date: '5', sg: '14', fb: '07', gb: '46', gl: '74', ds: '54', l7: '16' },
        { date: '6', sg: '59', fb: '36', gb: '02', gl: '45', ds: '36', l7: '22' },
        { date: '7', sg: '57', fb: '62', gb: '60', gl: '22', ds: '38', l7: '29' },
        { date: '8', sg: '98', fb: '29', gb: '78', gl: '51', ds: '45', l7: '37' },
        { date: '9', sg: '94', fb: '46', gb: '26', gl: '99', ds: '65', l7: '46' },
        { date: '10', sg: '79', fb: '79', gb: '74', gl: '64', ds: '49', l7: '56' },
        { date: '11', sg: '76', fb: '28', gb: '58', gl: '24', ds: '09', l7: '67' },
        { date: '12', sg: '15', fb: '90', gb: '18', gl: '09', ds: '25', l7: '79' },
        { date: '13', sg: '36', fb: '49', gb: '72', gl: '20', ds: '03', l7: '92' },
        { date: '14', sg: '16', fb: '82', gb: '75', gl: '74', ds: '95', l7: '01' },
        { date: '15', sg: '48', fb: '39', gb: '27', gl: '82', ds: '39', l7: '02' },
        { date: '16', sg: '61', fb: '68', gb: '12', gl: '17', ds: '28', l7: '04' },
        { date: '17', sg: '45', fb: '58', gb: '26', gl: '45', ds: '47', l7: '07' },
        { date: '18', sg: '33', fb: '90', gb: '76', gl: '76', ds: '82', l7: '11' },
        { date: '19', sg: '33', fb: '87', gb: '26', gl: '43', ds: '50', l7: '16' },
        { date: '20', sg: '07', fb: '74', gb: '23', gl: '85', ds: '12', l7: '22' },
        { date: '21', sg: '26', fb: '49', gb: '17', gl: '01', ds: '16', l7: '29' },
        { date: '22', sg: '34', fb: '40', gb: '28', gl: '70', ds: '70', l7: '37' },
        { date: '23', sg: '71', fb: '59', gb: '10', gl: '86', ds: '27', l7: '46' },
        { date: '24', sg: '02', fb: '28', gb: '75', gl: '82', ds: '66', l7: '56' },
        { date: '25', sg: '90', fb: '48', gb: '70', gl: '30', ds: '13', l7: '67' },
        { date: '26', sg: '42', fb: '43', gb: '34', gl: '68', ds: '92', l7: '79' },
        { date: '27', sg: '16', fb: '82', gb: '43', gl: '83', ds: '26', l7: '92' },
        { date: '28', sg: '05', fb: '35', gb: '05', gl: '26', ds: '40', l7: '06' },
        { date: '29', sg: '00', fb: '00', gb: '14', gl: '21', ds: '93', l7: '07' },
        { date: '30', sg: '14', fb: '84', gb: '20', gl: '39', ds: '23', l7: '09' },
        { date: '31', sg: '--', fb: '--', gb: '--', gl: '--', ds: '81', l7: '12' }
    ];

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
                const resApril = await fetch(`/api/results?month=2026-04`);
                const aprilJson = await resApril.json();
                setChartDataApril(aprilJson);
            } catch (err) {}
        };

        const updateSoonLogic = () => {
            const now = new Date();
            const currentMins = now.getHours() * 60 + now.getMinutes();
            let next = gameList.find(g => (g.h * 60 + g.m) > currentMins);
            if (!next) next = gameList[4]; 
            setNextGameSoon(next.name + " SOON");
        };

        fetchData();
        updateSoonLogic();
        setInterval(fetchData, 15000);
        setInterval(() => {
            const now = new Date();
            setDisplayTime(now.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }) + " " + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
            updateSoonLogic();
        }, 1000);
    }, []);

    const getLive = (id, type) => {
        const found = liveResults.find(r => r.id === id);
        if (type === 'new') return found?.newResult || "WAIT";
        return found?.oldResult || "??";
    };

    const getAprilVal = (day, gameId) => {
        if (day === 1 && gameId === 'sg') return "43";
        const dayStr = day < 10 ? `0${day}` : day;
        const found = chartDataApril.find(d => d.date === `2026-04-${dayStr}` && d.id === gameId);
        return found ? found.newResult : '--';
    };

    const goToWA = (num) => window.open(`https://wa.me/91${num}`, '_blank');
    const openModal = (t) => {
        const contents = {
            privacy: "हम आपकी प्राइवेसी का सम्मान करते हैं। यह साइट कोई यूजर डेटा कलेक्ट नहीं करती।",
            disclaimer: "सट्टा जुआ गैरकानूनी हो सकता है। यह साइट केवल मनोरंजन और परिणाम दिखाने के लिए है।",
            about: "SattaNet.com सबसे तेज़ और सटीक सट्टा परिणाम प्रदान करने वाली वेबसाइट है।"
        };
        setModal({ show: true, title: t.toUpperCase(), content: contents[t] });
    };

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: '"Arial Narrow", sans-serif', textAlign: 'center', margin: 0, padding: 0, overflowX: 'hidden' }}>
            <Head>
                <title>Satta King Live Result | SattaNet.com</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* --- 1. HEADER (EXACT REPLICA) --- */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', backgroundColor: '#800000', color: 'white', fontSize: '11px', fontWeight: 'bold', borderBottom: '1px solid white' }}>
                <div style={{ borderRight: '1px solid white', padding: '12px 2px' }}>HOME</div>
                <div style={{ borderRight: '1px solid white', padding: '12px 2px' }}>SATTA CHART</div>
                <div style={{ borderRight: '1px solid white', padding: '12px 2px' }}>786</div>
                <div style={{ borderRight: '1px solid white', padding: '12px 2px' }}>DELHI KING</div>
                <div style={{ padding: '12px 2px' }}>LEAK</div>
            </div>
            <div style={{ backgroundColor: '#000', color: 'white', padding: '5px 0', borderBottom: '2px solid #ffff00' }}>
                <marquee style={{ fontWeight: 'bold', fontSize: '13px' }}>SATTA KING LIVE RESULT | FASTEST SATTA RECORD CHART 2026</marquee>
            </div>
            <div className="glow-yellow-logo" style={{ backgroundColor: '#ffff00', padding: '10px 0', borderBottom: '3px solid #008000' }}>
                <h1 style={{ fontSize: '50px', fontWeight: '900', color: 'black', margin: 0, fontStyle: 'italic', letterSpacing: '-3px' }}>SATTA KING</h1>
            </div>
            <div style={{ backgroundColor: '#008000', color: 'white', padding: '8px', fontWeight: 'bold', fontSize: '15px', borderBottom: '2px solid #800000' }}>SATTA KING | SATTA KING LIVE</div>

            {/* --- DYNAMIC SOON & LATEST RESULT --- */}
            <div style={{ padding: '20px 10px' }}>
                <h3 style={{ color: '#c000c0', fontSize: '26px', fontWeight: 'bold', margin: 0 }}>{displayTime}</h3>
                <p style={{ fontWeight: 'bold', margin: '5px 0', fontSize: '18px' }}>Today's Satta Live Result !</p>
                
                <div style={{ marginTop: '15px' }}>
                    <h2 className="blink-soon" style={{ color: 'red', fontSize: '45px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>{latestGame ? latestGame.name : nextGameSoon}</h2>
                    <div style={{ color: '#008000', fontSize: '80px', fontWeight: '900', marginTop: '-20px' }}>{latestGame ? latestGame.newResult : "WAIT"}</div>
                </div>
            </div>

            {/* --- COMPACT RESULT BOXES (NO BRACKETS) --- */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '0 5px', borderLeft: '1.5px solid black', borderTop: '1.5px solid black' }}>
                {gameList.map((game) => (
                    <div key={game.id} style={{ borderRight: '1.5px solid black', borderBottom: '1.5px solid black', padding: '10px 2px', backgroundColor: 'white' }}>
                        <h5 style={{ color: '#800000', fontSize: '18px', fontWeight: '900', margin: 0 }}>{game.name}</h5>
                        <p style={{ fontSize: '12px', fontWeight: 'bold', margin: '2px 0', color: '#444' }}>( {game.time} )</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>{getLive(game.id, 'old')}</span>
                            <span style={{ color: '#5dade2', fontSize: '22px', fontWeight: 'bold' }}>➡️</span>
                            <div style={{ border: '2.5px solid #000080', padding: '2px 10px', backgroundColor: '#f0faff', borderRadius: '4px' }}>
                                <span style={{ fontSize: '32px', fontWeight: '900', color: '#000080' }}>{getLive(game.id, 'new')}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- PROMOTION SECTION --- */}
            <div className="promo-gradient" style={{ padding: '30px 10px', marginTop: '20px', borderTop: '5px solid #800000' }}>
                <h3 className="blink" style={{ color: '#25d366', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>💚 Online khaiwal 💚</h3>
                <h2 style={{ fontSize: '24px', margin: '10px 0', color: '#fff' }}>❤️ 100% भरोसेमंद ❤️</h2>
                <p style={{ fontSize: '19px', fontWeight: 'bold', color: '#ffff00' }}>जोड़ी 10 का 1000 | हरूप 100 का 1000</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginTop: '20px' }}>
                    <button onClick={() => goToWA('9650695993')} className="wa-btn-blue glow-btn">WHATSAPP (आकाश भाई खाईवाल)</button>
                    <button onClick={() => goToWA('9354072027')} className="wa-btn-green">WHATSAPP (अली कुली मिर्ज़ा)</button>
                </div>

                <div className="blink-border-red" style={{ backgroundColor: '#ffff00', color: '#000', padding: '20px', margin: '30px 10px', borderRadius: '12px', border: '3px dashed red' }}>
                    <p style={{ fontSize: '17px', fontWeight: 'bold', margin: 0, lineHeight: '1.4' }}>
                        दोस्तों अब घर बैठे Online गेम प्ले करे श्री गणेश से दिशावर तक। <br/>
                        <span style={{ color: 'red', fontSize: '19px', fontWeight: '900' }}>आपके अपने भाई दिवाकर खाईवाल के पास</span> <br/>
                        जोड़ी 10 के 1000
                    </p>
                    <button onClick={() => goToWA('9650695993')} style={{ marginTop: '15px', backgroundColor: '#25d366', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '30px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>WhatsApp Link ✅</button>
                </div>
            </div>

            {/* --- APRIL 2026 CHART --- */}
            <div style={{ marginTop: '30px', padding: '0 5px' }}>
                <div style={{ backgroundColor: '#ffff00', padding: '10px', border: '2px solid black', fontWeight: 'bold', fontSize: '20px' }}>Satta King Record Chart April 2026</div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', color: '#000', fontSize: '12px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#800000', color: 'white' }}>
                                <th style={{ border: '1.5px solid black', padding: '8px' }}>DT</th>
                                <th style={{ border: '1.5px solid black' }}>FB</th>
                                <th style={{ border: '1.5px solid black' }}>GB</th>
                                <th style={{ border: '1.5px solid black' }}>GL</th>
                                <th style={{ border: '1.5px solid black' }}>DS</th>
                                <th style={{ border: '1.5px solid black' }}>SG</th>
                                <th style={{ border: '1.5px solid black', background: '#000080' }}>L7N</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(30)].map((_, i) => {
                                const day = i + 1;
                                return (
                                    <tr key={day} style={{ height: '32px' }}>
                                        <td style={{ border: '1.5px solid black', fontWeight: 'bold', backgroundColor: '#800000', color: 'white' }}>{day}</td>
                                        {['fb', 'gb', 'gl', 'ds', 'sg', 'l7'].map(id => (
                                            <td key={id} style={{ border: '1.5px solid black', fontWeight: 'bold', fontSize: '17px' }}>{getAprilVal(day, id)}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- MARCH 2026 CHART --- */}
            <div style={{ marginTop: '40px', padding: '0 5px' }}>
                <div style={{ backgroundColor: '#ffff00', padding: '10px', border: '2px solid black', fontWeight: 'bold', fontSize: '20px' }}>Satta King Record Chart March 2026</div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', color: '#000', fontSize: '12px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#800000', color: 'white' }}>
                                <th style={{ border: '1.5px solid black', padding: '8px' }}>DT</th>
                                <th style={{ border: '1.5px solid black' }}>FB</th>
                                <th style={{ border: '1.5px solid black' }}>GB</th>
                                <th style={{ border: '1.5px solid black' }}>GL</th>
                                <th style={{ border: '1.5px solid black' }}>DS</th>
                                <th style={{ border: '1.5px solid black' }}>SG</th>
                                <th style={{ border: '1.5px solid black', background: '#000080' }}>L7N</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marchData.map((row) => (
                                <tr key={row.date} style={{ height: '32px' }}>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold', backgroundColor: '#800000', color: 'white' }}>{row.date}</td>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold', fontSize: '17px' }}>{row.fb}</td>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold', fontSize: '17px' }}>{row.gb}</td>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold', fontSize: '17px' }}>{row.gl}</td>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold', fontSize: '17px' }}>{row.ds}</td>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold', fontSize: '17px' }}>{row.sg}</td>
                                    <td style={{ border: '1.5px solid black', fontWeight: 'bold', fontSize: '17px', color: '#000080' }}>{row.l7}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- FOOTER --- */}
            <footer style={{ backgroundColor: '#000', color: '#fff', padding: '40px 10px', marginTop: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                    <button onClick={() => openModal('disclaimer')} className="foot-btn">DISCLAIMER</button>
                    <button onClick={() => openModal('privacy')} className="foot-btn">PRIVACY POLICY</button>
                    <button onClick={() => openModal('about')} className="foot-btn">ABOUT US</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', maxWidth: '500px', margin: '0 auto' }}>
                    {['Satta King VIP', 'Satta King Fast', 'Contact Us', 'About Us', 'Sitemap', 'Lucky 7'].map(b => (
                        <div key={b} style={{ backgroundColor: '#ffff00', color: '#000', padding: '6px', fontWeight: 'bold', fontSize: '11px', border: '1px solid #000' }}>{b}</div>
                    ))}
                </div>
                <h2 style={{ fontSize: '28px', margin: '25px 0 5px 0', fontWeight: '900', borderTop: '1px solid #333', paddingTop: '15px' }}>SATTA KING LIVE</h2>
                <p style={{ fontSize: '11px', color: '#666' }}>Copyright © 2018-2026 - SATTA KING LIVE</p>
            </footer>

            {/* --- POP-UP MODAL --- */}
            {modal.show && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: '#fff', color: '#000', padding: '30px', borderRadius: '10px', maxWidth: '90%' }}>
                        <h2>{modal.title}</h2>
                        <p>{modal.content}</p>
                        <button onClick={() => setModal({show:false})} style={{ padding: '10px 20px', backgroundColor: '#800000', color: '#fff', border: 'none', borderRadius: '5px' }}>CLOSE</button>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes blinker { 50% { opacity: 0; } }
                .blink { animation: blinker 1s linear infinite; }
                .blink-soon { animation: blinker 0.6s linear infinite; }
                .blink-fast { animation: blinker 0.6s linear infinite; }
                @keyframes glow { 0% { box-shadow: 0 0 10px red; } 50% { box-shadow: 0 0 25px yellow; } 100% { box-shadow: 0 0 10px red; } }
                .glow-yellow-logo { animation: glow 2s infinite; }
                .promo-gradient { background: linear-gradient(180deg, #001a33 0%, #000 100%); }
                .wa-btn-blue { background-color: #0056b3; color: white; border: none; padding: 15px; border-radius: 5px; font-weight: bold; width: 90%; cursor: pointer; }
                .wa-btn-green { background-color: #008000; color: white; border: none; padding: 15px; border-radius: 5px; font-weight: bold; width: 90%; cursor: pointer; margin-top: 10px; }
                .glow-btn { box-shadow: 0 0 20px rgba(0,86,179,0.7); }
                .foot-btn { background-color: #e74c3c; color: white; border: none; padding: 8px 12px; font-weight: bold; cursor: pointer; border-radius: 3px; }
                body { margin: 0; padding: 0; overflow-x: hidden; }
            `}} />
        </div>
    );
}
