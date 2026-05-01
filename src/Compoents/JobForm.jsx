import React, { useState } from 'react';
import {
    User, Mail, Phone, MapPin, Briefcase,
    Users, Code, Upload, Send, Monitor, X // Laptop ko Monitor se change kiya hai safe side ke liye
} from 'lucide-react';
import { motion } from 'framer-motion';

const JobForm = () => {
    const [darkMode, setDarkMode] = useState(true);

    const initialFormState = {
        fullname: '', email: '', phone: '', address: '',
        position: 'Software Developer', gender: '', employment: '', skills: [],
    };

    const [formData, setFormData] = useState(initialFormState);
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const updatedSkills = checked
                ? [...formData.skills, value]
                : formData.skills.filter(s => s !== value);
            setFormData({ ...formData, skills: updatedSkills });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFile({
                    name: selectedFile.name,
                    data: reader.result
                });
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const removeFile = () => setFile(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = { ...formData, resumeFile: file };
        localStorage.setItem('jobApplicationData', JSON.stringify(finalData));
        alert("Application Submitted! Data saved in Local Storage.");
        setFormData(initialFormState);
        setFile(null);
    };

    return (
        <div className={darkMode ? "dark" : ""}>
            <div className="min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-500 bg-slate-100 dark:bg-[#050505]">

                {darkMode && (
                    <>
                        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]"></div>
                    </>
                )}

                <div className="absolute top-10 right-10 z-50">
                    <div
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                        <motion.div
                            layout
                            className="bg-white w-4 h-4 rounded-full shadow-md"
                            animate={{ x: darkMode ? 24 : 0 }}
                        />
                    </div>
                </div>

                <motion.div
                    layout
                    className="relative w-full max-w-xl bg-white dark:bg-white/5 backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl transition-all"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                            JOB FORM
                        </h1>
                        <p className="text-gray-500 dark:text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">Portal for Applicants</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <User className="absolute left-4 top-3.5 text-gray-400 dark:text-white/30" size={18} />
                                <input type="text" name="fullname" placeholder="Full Name" required
                                    value={formData.fullname} onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl py-3.5 pl-12 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                            </div>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 text-gray-400 dark:text-white/30" size={18} />
                                <input type="email" name="email" placeholder="Email" required
                                    value={formData.email} onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl py-3.5 pl-12 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                            </div>
                        </div>

                        <div className="relative">
                            <Monitor className="absolute left-4 top-3.5 text-gray-400 dark:text-white/30" size={18} />
                            <select name="position" value={formData.position} onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl py-3.5 pl-12 text-gray-900 dark:text-white focus:outline-none cursor-pointer appearance-none">
                                <option value="Software Developer">Software Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-200 dark:border-white/5">
                                <p className="text-gray-400 dark:text-white/40 text-[10px] uppercase font-bold mb-3 tracking-widest">Gender</p>
                                <div className="flex gap-4 dark:text-white/70">
                                    {['Male', 'Female'].map(g => (
                                        <label key={g} className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" name="gender" value={g.toLowerCase()}
                                                checked={formData.gender === g.toLowerCase()}
                                                onChange={handleChange} className="accent-blue-500" /> {g}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-200 dark:border-white/5">
                                <p className="text-gray-400 dark:text-white/40 text-[10px] uppercase font-bold mb-3 tracking-widest">Employment</p>
                                <div className="flex gap-4 dark:text-white/70">
                                    {['Full-Time', 'Intern'].map(e => (
                                        <label key={e} className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input type="radio" name="employment" value={e.toLowerCase()}
                                                checked={formData.employment === e.toLowerCase()}
                                                onChange={handleChange} className="accent-blue-500" /> {e}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-gray-400 dark:text-white/40 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2"><Code size={14} /> Skills</p>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'Tailwind', 'Node'].map(s => (
                                    <label key={s} className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl cursor-pointer hover:border-blue-500/50 transition-all">
                                        <input type="checkbox" value={s} checked={formData.skills.includes(s)} onChange={handleChange} className="accent-blue-500" />
                                        <span className="text-gray-600 dark:text-white/60 text-xs">{s}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            {!file ? (
                                <div className="relative group h-24 border-2 border-dashed border-gray-300 dark:border-white/10 rounded-[2rem] flex flex-col items-center justify-center bg-gray-50 dark:bg-white/5 hover:border-blue-500/40 transition-all cursor-pointer">
                                    <Upload className="text-gray-400 dark:text-white/20" />
                                    <span className="text-gray-400 dark:text-white/20 text-[10px] mt-2 uppercase font-bold tracking-widest">Upload Resume</span>
                                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                </div>
                            ) : (
                                <div className="h-24 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-[2rem] flex items-center justify-between px-8 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500 rounded-lg text-white"><Upload size={16} /></div>
                                        <div>
                                            <p className="text-blue-600 dark:text-blue-400 text-xs font-bold truncate max-w-[150px]">{file.name}</p>
                                            <p className="text-[10px] text-gray-400">File Selected</p>
                                        </div>
                                    </div>
                                    <button type="button" onClick={removeFile} className="p-2 hover:bg-red-500/20 rounded-full text-red-500 transition-colors"><X size={20} /></button>
                                </div>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-blue-600 text-white font-medium rounded-2xl shadow-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3"
                        >
                            <Send size={18} /> SUBMIT APPLICATION
                        </motion.button>
                        <h1>hello sir we just practice </h1>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default JobForm;