import { useState } from 'react';

export default function Admin() {
    const [form, setForm] = useState({ 
        id: 'sg', 
        oldResult: '', 
        newResult: '', 
        date: new Date().toISOString().split('T')[0] // आज की तारीख
    });

    const games = [
        { id: 'sg', name: 'SHREE GANESH' },
        { id: 'fb', name: 'FARIDABAD' },
        { id: 'gb', name: 'GAZIYABAD' },
        { id: 'gl', name: 'GALI' },
        { id: 'l7', name: 'LUCKY 7 NIGHT' },
        { id: 'ds', name: 'DISAWAR' }
    ];

    const update = async () => {
        const name = games.find(g => g.id === form.id).name;
        const res = await fetch('/api/results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, name })
        });
        if (res.ok) alert("Live Result and Chart Updated!");
    };

    return (
        <div className="p-10 text-center font-sans bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-black text-red-700 mb-8">SATTA ADMIN PANEL</h1>
            <div className="bg-white p-6 rounded-lg shadow-xl inline-block border-2 border-red-700">
                <p className="font-bold mb-1">तारीख चुनें:</p>
                <input type="date" className="border p-2 mb-4 w-full" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                
                <p className="font-bold mb-1">गेम चुनें:</p>
                <select className="border p-2 mb-4 w-full" onChange={e => setForm({...form, id: e.target.value})}>
                    {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>

                <input className="border p-2 mb-2 w-full" placeholder="Yesterday Result" onChange={e => setForm({...form, oldResult: e.target.value})} />
                <input className="border p-2 mb-4 w-full text-2xl font-bold text-blue-800" placeholder="Today Result" onChange={e => setForm({...form, newResult: e.target.value})} />
                
                <button onClick={update} className="bg-red-700 text-white p-4 w-full font-black text-xl hover:bg-black transition">SAVE & UPDATE</button>
            </div>
        </div>
    );
}
