import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
    const [liveResults, setLiveResults] = useState([]);
    const [chartDataApril, setChartDataApril] = useState([]);
    const [displayTime, setDisplayTime] = useState('');
    const [nextGameSoon, setNextGameSoon] = useState('');
    const [latestGame, setLatestGame] = useState(null);
    const [modal, setModal] = useState({ show: false, title: '', content: '' });

    // FIX: gb को gz कर दिया गया है ताकि एडमिन पैनल और डेटाबेस से मैच हो सके
    const gameList = [
        { id: 'sg', name: 'SHREE GANESH', time: '04:30 PM', h: 16, m: 30 },
        { id: 'fb', name: 'FARIDABAD', time: '05:45 PM', h: 17, m: 45 },
        { id: 'gz', name: 'GAZIYABAD', time: '09:30 PM', h: 21, m: 30 }, 
        { id: 'gl', name: 'GALI CHOR', time: '11:25 PM', h: 23, m: 25 },
        { id: 'l7', name: 'LUCKY 7 NIGHT', time: '02:15 AM', h: 2, m: 15 },
        { id: 'ds', name: 'DISAWAR', time: '03:30 AM', h: 3, m: 30 }
    ];

    // FIX: marchData में भी हर जगह gb की जगह gz कर दिया है
    const marchData = [
        { date: '1', sg: '36', fb: '02', gz: '10', gl: '92', ds: '##', l7: '--' },
        { date: '2', sg: '00', fb: '91', gz: '10', gl: '30', ds: '68', l7: '04' },
        { date: '3', sg: '17', fb: '06', gz: '13', gl: '17', ds: '49', l7: '07' },
        { date: '4', sg: '74', fb: '66', gz: '65', gl: '90', ds: '19', l7: '11' },
        { date: '5', sg: '14', fb: '07', gz: '46', gl: '74', ds: '54', l7: '16' },
        { date: '6', sg: '59', fb: '36', gz: '02', gl: '45', ds: '36', l7: '22' },
        { date: '7', sg: '57', fb: '62', gz: '60', gl: '22', ds: '38', l7: '29' },
        { date: '8', sg: '98', fb: '29', gz: '78', gl: '51', ds: '45', l7: '37' },
        { date: '9', sg: '94', fb: '46', gz: '26', gl: '99', ds: '65', l7: '46' },
        { date: '10', sg: '79', fb: '79', gz: '74', gl: '64', ds: '49', l7: '56' },
        { date: '11', sg: '76', fb: '28', gz: '58', gl: '24', ds: '09', l7: '67' },
        { date: '12', sg: '15', fb: '90', gz: '18', gl: '09', ds: '25', l7: '79' },
        { date: '13', sg: '36', fb: '49', gz: '72', gl: '20', ds: '03', l7: '92' },
        { date: '14', sg: '16', fb: '82', gz: '75', gl: '74', ds: '95', l7: '01' },
        { date: '15', sg: '48', fb: '39', gz: '27', gl: '82', ds: '39', l7: '02' },
        { date: '16', sg: '61', fb: '68', gz: '12', gl: '17', ds: '28', l7: '04' },
        { date: '17', sg: '45', fb: '58', gz: '26', gl: '45', ds: '47', l7: '07' },
        { date: '18', sg: '33', fb: '90', gz: '76', gl: '76', ds: '82', l7: '11' },
        { date: '19', sg: '33', fb: '87', gz: '26', gl: '43', ds: '50', l7: '16' },
        { date: '20', sg: '07', fb: '74', gz: '23', gl: '85', ds: '12', l7: '22' },
        { date: '21', sg: '26', fb: '49', gz: '17', gl: '01', ds: '16', l7: '29' },
        { date: '22', sg: '34', fb: '40', gz: '28', gl: '70', ds: '70', l7: '37' },
        { date: '23', sg: '71', fb: '59', gz: '10', gl: '86', ds: '27', l7: '46' },
        { date: '24', sg: '02', fb: '28', gz: '75', gl: '82', ds: '66', l7: '56' },
        { date: '25', sg: '90', fb: '48', gz: '70', gl: '30', ds: '13', l7: '67' },
        { date: '26', sg: '42', fb: '43', gz: '34', gl: '68', ds: '92', l7: '79' },
        { date: '27', sg: '16', fb: '82', gz: '43', gl: '83', ds: '26', l7: '92' },
        { date: '28', sg: '05', fb: '35', gz: '05', gl: '26', ds: '40', l7: '06' },
        { date: '29', sg: '00', fb: '00', gz: '14', gl: '21', ds: '93', l7: '07' },
        { date: '30', sg: '14', fb: '84', gz: '20', gl: '39', ds: '23', l7: '09' },
        { date: '31', sg: '--', fb: '--', gz: '--', gl: '--', ds: '81', l7: '12' }
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
    
    // मैंने इस फंक्शन को पूरा कर दिया है जो आपके मैसेज में आधा कट गया था
    const openModal = (t) => {
        const contents = {
            privacy: "हम आपकी प्राइवेसी का सम्मान करते हैं। यह साइट कोई यूजर डेटा कलेक्ट नहीं करती।",
            disclaimer: "सट्टा जुआ गैरकानूनी हो सकता है। यह साइट केवल मनोरंजन और रिजल्ट्स दिखाने के लिए है।",
            about: "SattaNet.com सबसे तेज़ और सटीक सट्टा खबर प्रदान करने वाली वेबसाइट है।"
        };
        setModal({ show: true, title: t.toUpperCase(), content: contents[t] || '' });
    };

    // नोट: अपना बाकी का JSX (return वाला पार्ट) इसके नीचे वैसे ही रखें जैसा वो पहले था।
