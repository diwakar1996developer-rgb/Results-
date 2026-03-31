import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [liveResults, setLiveResults] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [displayTime, setDisplayTime] = useState('');
    const [modal, setModal] = useState({ show: false, title: '', content: '' });

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

    const goToWA = (num) => window.open(`https://wa.me/91${num}`, '_blank');

    const openPage = (type) => {
        if (type === 'privacy') setModal({ show: true, title: 'Privacy Policy', content: 'आपकी प्राइवेसी हमारे लिए महत्वपूर्ण है। हम किसी भी यूजर का व्यक्तिगत डेटा स्टोर नहीं करते हैं।' });
        if (type === 'disclaimer') setModal({ show: true, title: 'Disclaimer', content: 'सट्टा खेलना कानूनन अपराध हो सकता है। यह साइट सिर्फ मनोरंजन के लिए है। किसी भी लाभ या हानि के लिए आप स्वयं जिम्मेदार होंगे।' });
        if (type === 'contact') setModal({ show: true, title: 'Contact Us', content: 'हमसे संपर्क करने के लिए दिए गए व्हाट्सएप बटन का उपयोग करें।' });
    };

    return (
        <div style={{ backgroundColor: '#fffcea', minHeight: '100vh', fontFamily: 'serif', textAlign: 'center', margin: 0, padding: 0 }}>
            <Head>
                <title>Satta King Live Result | Online Khaiwal | Satta-King-Live.com</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* HEADER AREA - AS IS */}
            <div style={{ backgroundColor: '#ffff00', padding: '15px 0', borderBottom: '3px solid black' }}>
                <h1 style={{ fontSize: '40px', fontWeight: '900', color: 'black', margin: 0 }}>SATTA KING</h1>
            </div>
            <div style={{ backgroundColor: '#008000', color: 'white', padding: '5px', fontWeight: 'bold' }}>SATTA KING LIVE RESULT</div>

            {/* LIVE RESULTS GRID */}
            <div style={{ backgroundColor: '#800000', color: 'white', padding: '10px', margin: '10px', fontWeight: 'bold' }}>SUPER FAST LIVE RESULT</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '0 10px', borderLeft: '1px solid black', borderTop: '1px solid black' }}>
                {gameList.map((game) => (
                    <div key={game.id} style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '15px 5px', backgroundColor: 'white' }}>
                        <h5 style={{ color: '#800000', fontSize: '18px', fontWeight: '900', margin: 0 }}>{game.name}</h5>
                        <p style={{ fontSize: '11px', fontWeight: 'bold', color: 'black' }}>( {game.time} )</p>
                        <div style={{ fontSize: '24px', fontWeight: '900', color: 'navy' }}>[ {getLive(game.id).newResult} ]</div>
                    </div>
                ))}
            </div>

            {/* MONTHLY CHART AREA */}
            <div style={{ marginTop: '30px', margin: '0 10px' }}>
                <div style={{ backgroundColor: '#ffff00', padding: '10px', border: '2px solid black', fontWeight: 'bold' }}>MONTHLY RECORD CHART 2026</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', fontSize: '12px', color: '#000' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#800000', color: 'white' }}>
                            <th style={{ border: '1px solid black', padding: '5px' }}>DT</th>
                            {gameList.map(g => <th key={g.id} style={{ border: '1px solid black', padding: '2px', fontSize: '9px' }}>{g.name.split(' ')[0]}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(31)].map((_, i) => (
                            <tr key={i+1}>
                                <td style={{ border: '1px solid black', fontWeight: 'bold', background: '#eee' }}>{i+1}</td>
                                {gameList.map(g => <td key={g.id} style={{ border: '1px solid black', fontWeight: 'bold' }}>{getChartNum(i+1, g.id)}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- NEW SECTION: KHAIWAL PROMOTION (ABOVE FOOTER) --- */}
            <div style={{ background: 'linear-gradient(180deg, #001a33 0%, #000 100%)', color: 'white', padding: '30px 10px', marginTop: '40px', borderTop: '4px solid #800000' }}>
                <div className="blink" style={{ color: '#25d366', fontSize: '20px', fontWeight: 'bold' }}>💚 Online khaiwal 💚</div>
                <h2 style={{ fontSize: '26px', margin: '10px 0' }}>❤️ 100% भरोसेमंद ❤️</h2>
                <div style={{ fontSize: '18px', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', display: 'inline-block' }}>
                    जोड़ी रेट <span style={{color:'#ffff00'}}>10 का 1000</span> | हरूप रेट <span style={{color:'#ffff00'}}>100 का 1000</span>
                </div>

                <div style={{ margin: '20px auto', maxWidth: '300px', textAlign: 'left', border: '1px dashed #555', padding: '15px' }}>
                    <p style={{ margin: '5px 0' }}>⏰ 04:30PM 🔰 श्री गणेश</p>
                    <p style={{ margin: '5px 0' }}>⏰ 05:45PM 🔰 फरीदाबाद</p>
                    <p style={{ margin: '5px 0' }}>⏰ 09:30PM 🔰 गाजियाबाद</p>
                    <p style={{ margin: '5px 0' }}>⏰ 11:25PM 🔰 गली चोर</p>
                    <p style={{ margin: '5px 0' }}>⏰ 02:15AM 🔰 लक्की7 नाइट</p>
                    <p style={{ margin: '5px 0' }}>⏰ 03:30AM 🔰 दिसावर</p>
                </div>

                <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#ccc' }}>गेम प्ले करने के लिए नीचे दिए गए बटन पर क्लिक करे</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginTop: '15px' }}>
                    <button onClick={() => goToWA('9650695993')} className="btn-wa shadow-blue">WHATSAPP (आकाश भाई खाईवाल)</button>
                    <button onClick={() => goToWA('9354072027')} className="btn-wa shadow-green" style={{background:'#008000'}}>WHATSAPP (अली कुली मिर्ज़ा भाईजान)</button>
                </div>

                {/* Diwakar Khaiwal Section */}
                <div style={{ backgroundColor: '#ffff00', color: '#000', padding: '20px', margin: '30px 10px 10px 10px', border: '3px dashed red', borderRadius: '15px' }}>
                    <p style={{ fontSize: '17px', fontWeight: 'bold', margin: 0, lineHeight: '1.4' }}>
                        दोस्तों अब घर बैठे Online गेम प्ले करे श्री गणेश से दिशावर तक। <br/>
                        <span style={{ color: 'red', fontSize: '20px', fontWeight: '900' }}>आपके अपने भाई दिवाकर खाईवाल के पास</span> <br/>
                        जोड़ी 10 के 1000 और 100 के 10000
                    </p>
                    <button onClick={() => goToWA('9650695993')} style={{ marginTop: '15px', backgroundColor: '#25d366', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '30px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                        WHATSAPP करें ✅
                    </button>
                </div>
            </div>

            {/* --- PREMIUM FOOTER --- */}
            <footer style={{ backgroundColor: '#800000', color: 'white', padding: '40px 10px', borderTop: '2px solid #ffff00' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 20px 0' }}>SATTA-KING-LIVE.COM</h3>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
                    <span onClick={() => window.scrollTo(0,0)} className="footer-link">HOME</span>
                    <span onClick={() => window.scrollTo(0,1500)} className="footer-link">SATTA CHART</span>
                    <span onClick={() => openPage('privacy')} className="footer-link">PRIVACY POLICY</span>
                    <span onClick={() => openPage('disclaimer')} className="footer-link">DISCLAIMER</span>
                    <span onClick={() => openPage('contact')} className="footer-link">CONTACT US</span>
                </div>

                <div style={{ fontSize: '12px', color: '#ffb3b3', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
                    © 2024-2026 Satta King Live. All Rights Reserved. <br/>
                    Entertainment purpose only. We do not promote gambling.
                </div>
            </footer>

            {/* MODAL SYSTEM FOR FOOTER LINKS */}
            {modal.show && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div style={{ backgroundColor: 'white', color: 'black', padding: '30px', borderRadius: '15px', maxWidth: '500px', width: '100%', position: 'relative' }}>
                        <button onClick={() => setModal({show:false})} style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '25px', border: 'none', background: 'none', cursor: 'pointer' }}>×</button>
                        <h2 style={{ color: '#800000', marginTop: 0 }}>{modal.title}</h2>
                        <p style={{ lineHeight: '1.6', fontSize: '16px' }}>{modal.content}</p>
                        <button onClick={() => setModal({show:false})} style={{ backgroundColor: '#800000', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '5px', marginTop: '20px', cursor: 'pointer' }}>Close</button>
                    </div>
                </div>
            )}

            {/* CSS ANIMATIONS & STYLES */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes blinker { 50% { opacity: 0; } }
                .blink { animation: blinker 1s linear infinite; }
                
                .btn-wa { 
                    background-color: #0056b3; color: white; border: none; padding: 15px 25px; 
                    border-radius: 5px; font-weight: bold; font-size: 16px; width: 90%; 
                    max-width: 350px; cursor: pointer; transition: 0.3s; 
                }
                .shadow-blue { boxShadow: 0 0 15px rgba(0,86,179,0.7); animation: pulse 2s infinite; }
                .shadow-green { boxShadow: 0 0 15px rgba(0,128,0,0.7); }
                
                .footer-link { cursor: pointer; font-weight: bold; font-size: 14px; text-decoration: underline; color: #ffff00; }
                .footer-link:hover { color: white; }

                @keyframes pulse { 
                    0% { transform: scale(1); }
                    50% { transform: scale(1.03); }
                    100% { transform: scale(1); }
                }

                body { margin: 0; padding: 0; overflow-x: hidden; }
            `}} />
        </div>
    );
                                   }
