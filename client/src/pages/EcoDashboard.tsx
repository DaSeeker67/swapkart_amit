import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { motion } from 'framer-motion';
import { GiftIcon, GlobeAltIcon, SparklesIcon, LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

// --- DATA & TYPES ---
interface EcoImpact {
  co2Saved: number;
  waterSaved: number;
  energySaved: number;
  wasted?: boolean; // true if wasted, false or undefined if saved
}

interface Order {
  id: string;
  date: string;
  name: string;
  ecoImpact: EcoImpact;
}

const user = {
  name: 'Alex Greenthumb',
  level: 'Forest Guardian',
  points: 4500,
  levelIndex: 3, // New: To easily track progress through rewards
  nextLevelPoints: 5000,
};

const progressPercentage = (user.points / user.nextLevelPoints) * 100;

// New: Structured Rewards System
const rewards = [
    { level: 0, points: 0, title: 'Eco Starter', description: 'Began your journey to save the planet.' },
    { level: 1, points: 1000, title: 'Seedling', description: 'A 5% discount coupon on your next order.' },
    { level: 2, points: 2500, title: 'Sprout', description: 'Exclusive access to new sustainable products.' },
    { level: 3, points: 4000, title: 'Forest Guardian', description: 'We plant a tree in your name.' },
    { level: 4, points: 5000, title: 'Earth Whisperer', description: 'A personalized sustainable gift box.' },
    { level: 5, points: 7500, title: 'Planet Hero', description: 'A 15% lifetime discount.' },
];

const impactHistory = [
  { month: 'Jan', co2: 3, water: 150, energy: 1 }, { month: 'Feb', co2: 5, water: 200, energy: 2 },
  { month: 'Mar', co2: 4, water: 180, energy: 2 }, { month: 'Apr', co2: 7, water: 300, energy: 3 },
  { month: 'May', co2: 8, water: 350, energy: 4 }, { month: 'Jun', co2: 15, water: 600, energy: 6 },
];

const totalImpact: EcoImpact = impactHistory.reduce((acc, item) => ({
  co2Saved: acc.co2Saved + item.co2, waterSaved: acc.waterSaved + item.water, energySaved: acc.energySaved + item.energy,
}), { co2Saved: 0, waterSaved: 0, energySaved: 0 });

// Example previous orders data
const previousOrders: Order[] = [
  { id: 'ORD123', date: '2024-06-15', name: 'Eco-Friendly T-Shirt', ecoImpact: { co2Saved: 5, waterSaved: 200, energySaved: 2 } },
  { id: 'ORD124', date: '2024-06-21', name: 'Recycled Glassware Set', ecoImpact: { co2Saved: 8, waterSaved: 350, energySaved: 4 } },
  { id: 'ORD125', date: '2024-07-01', name: 'Bamboo Toothbrush Pack', ecoImpact: { co2Saved: 2, waterSaved: 50, energySaved: 1, wasted: true } },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } } };

// --- SUB-COMPONENTS with Custom SVG Icons ---

const ImpactCard: React.FC<{ icon: React.ReactNode; title: string; value: string; unit: string; }> = ({ icon, title, value, unit }) => (
  <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl flex items-center space-x-4">
    <div className="w-12 h-12 flex-shrink-0">{icon}</div>
    <div>
        <p className="text-gray-200 text-sm font-medium">{title}</p>
        <p className="text-white text-3xl font-bold">
          {value} <span className="text-lg font-light text-gray-300">{unit}</span>
        </p>
    </div>
  </motion.div>
);

const RewardTier: React.FC<{ icon: React.ReactNode; title: string; description: string; status: 'unlocked' | 'current' | 'locked' }> = ({ icon, title, description, status }) => {
    const statusStyles = {
        unlocked: 'border-green-500/50 bg-green-500/10',
        current: 'border-teal-400/80 bg-teal-500/20 scale-105 shadow-lg',
        locked: 'border-gray-500/30 bg-gray-500/10 opacity-70',
    };
    return (
        <div className={`p-4 rounded-lg flex items-center space-x-4 transition-all duration-300 ${statusStyles[status]}`}>
            <div className="w-8 h-8 flex-shrink-0">{icon}</div>
            <div>
                <h4 className="font-bold text-white">{title}</h4>
                <p className="text-sm text-gray-300">{description}</p>
            </div>
        </div>
    );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg border border-gray-600">
        <p className="label text-white font-bold">{`${label}`}</p>
        <p className="intro text-orange-400">{`CO₂ Saved : ${payload[0].value} kg`}</p>
        <p className="intro text-blue-400">{`Water Saved : ${payload[1].value} L`}</p>
        <p className="intro text-yellow-400">{`Energy Saved : ${payload[2].value} kWh`}</p>
      </div>
    );
  }
  return null;
};

// --- MAIN ECO DASHBOARD COMPONENT ---

const EcoDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-600 text-white font-sans overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-green-500/30 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-teal-500/30 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <main className="p-4 md:p-8">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            {/* HERO SECTION */}
            <motion.div variants={itemVariants} className="relative rounded-3xl p-8 md:p-12 min-h-[450px] flex flex-col justify-end overflow-hidden bg-cover bg-center shadow-2xl" style={{ backgroundImage: "url('src/assets/6912290.jpg')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="relative z-10 text-shadow">
                <div className="bg-green-500/20 backdrop-blur-sm border border-green-400 text-green-300 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center mb-4">
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  {rewards[user.levelIndex].title}
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold max-w-2xl leading-tight text-white">Your positive impact is creating a legacy.</h2>
              </div>
            </motion.div>

            {/* GAMIFICATION & STATS - Overlapping the hero */}
            <motion.div variants={containerVariants} className="relative -mt-10 md:-mt-8 mx-auto max-w-6xl z-20 grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
              <motion.div variants={itemVariants} className="md:col-span-3 bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-200">Next Level: <strong>{rewards[user.levelIndex + 1]?.title || 'Max Level'}</strong></p>
                  <p className="font-bold text-xl text-green-400">{user.points} / {rewards[user.levelIndex + 1]?.points || user.points} EP</p>
                </div>
                <div className="w-full bg-black/20 rounded-full h-4">
                  <motion.div className="bg-gradient-to-r from-green-400 to-teal-400 h-4 rounded-full shadow-lg" initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                </div>
              </motion.div>

              {/* Impact Cards with Custom SVG Icons */}
              <ImpactCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-orange-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>}
                title="CO₂ Saved" value={totalImpact.co2Saved.toLocaleString()} unit="kg" 
              />
              <ImpactCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048l5.962-5.962a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06 0l-2.25-2.25 1.06-1.061a4.5 4.5 0 015.822 1.596z" /></svg>}
                title="Water Conserved" value={totalImpact.waterSaved.toLocaleString()} unit="liters"
              />
              <ImpactCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-yellow-400"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>}
                title="Energy Conserved" value={totalImpact.energySaved.toLocaleString()} unit="kWh"
              />
            </motion.div>

            {/* DATA & REWARDS SECTION */}
            <motion.section variants={containerVariants} className="mt-12 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Monthly Impact Report</h3>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <AreaChart data={impactHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs><linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#fb923c" stopOpacity={0.8}/><stop offset="95%" stopColor="#fb923c" stopOpacity={0}/></linearGradient><linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/><stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/></linearGradient><linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#facc15" stopOpacity={0.8}/><stop offset="95%" stopColor="#facc15" stopOpacity={0}/></linearGradient></defs>
                        <XAxis dataKey="month" stroke="#9ca3af" /><YAxis stroke="#9ca3af" /><Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                        <Area type="monotone" dataKey="co2" stroke="#fb923c" fillOpacity={1} fill="url(#colorCo2)" />
                        <Area type="monotone" dataKey="water" stroke="#60a5fa" fillOpacity={1} fill="url(#colorWater)" />
                        <Area type="monotone" dataKey="energy" stroke="#facc15" fillOpacity={1} fill="url(#colorEnergy)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Your Reward Journey</h3>
                    {/* Previous Reward */}
                    {user.levelIndex > 0 && (
                        <RewardTier 
                            icon={<CheckCircleIcon className="text-green-500" />}
                            title={rewards[user.levelIndex - 1].title} 
                            description={`Unlocked at ${rewards[user.levelIndex - 1].points} EP`}
                            status="unlocked" 
                        />
                    )}
                    {/* Current Reward */}
                    <RewardTier 
                        icon={<GiftIcon className="text-teal-300" />}
                        title={rewards[user.levelIndex].title} 
                        description={`Unlocked at ${rewards[user.levelIndex].points} EP`}
                        status="current" 
                    />
                     {/* Next Reward */}
                    {user.levelIndex < rewards.length - 1 && (
                         <RewardTier 
                            icon={<LockClosedIcon className="text-gray-400" />}
                            title={rewards[user.levelIndex + 1].title} 
                            description={`Unlocks at ${rewards[user.levelIndex + 1].points} EP`}
                            status="locked" 
                        />
                    )}
                </div>
              </div>
            </motion.section>

            {/* Previous Orders Section */}
            <motion.section variants={containerVariants} className="mt-12 max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold mb-6">Previous Orders</h3>
              <div className="space-y-4">
                {previousOrders.map(order => (
                  <motion.div
                    key={order.id}
                    variants={itemVariants}
                    className="bg-gray-800/60 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between border border-white/10 shadow-md hover:bg-gray-800/80 transition-colors duration-200"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="font-bold text-lg text-white truncate">{order.name}</span>
                        <span className="text-xs text-gray-400">{order.date}</span>
                      </div>
                      <div className="flex space-x-6 mt-2">
                        {/* CO2 */}
                        <div className="flex items-center space-x-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                          <span className={order.ecoImpact.wasted ? 'text-red-400' : 'text-orange-200'}>
                            {order.ecoImpact.co2Saved} kg {order.ecoImpact.wasted ? 'wasted' : 'saved'}
                          </span>
                        </div>
                        {/* Water */}
                        <div className="flex items-center space-x-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048l5.962-5.962a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06 0l-2.25-2.25 1.06-1.061a4.5 4.5 0 015.822 1.596z" /></svg>
                          <span className={order.ecoImpact.wasted ? 'text-red-400' : 'text-blue-200'}>
                            {order.ecoImpact.waterSaved} L {order.ecoImpact.wasted ? 'wasted' : 'saved'}
                          </span>
                        </div>
                        {/* Energy */}
                        <div className="flex items-center space-x-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-400"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                          <span className={order.ecoImpact.wasted ? 'text-red-400' : 'text-yellow-200'}>
                            {order.ecoImpact.energySaved} kWh {order.ecoImpact.wasted ? 'wasted' : 'saved'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default EcoDashboardPage;