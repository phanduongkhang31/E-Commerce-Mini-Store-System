import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Components';
import { useApp } from '../App';

export default function AdminSettingsScreen() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const handleSave = () => {
    showToast("Settings saved successfully");
    setTimeout(() => navigate(-1), 1000);
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-28">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between transition-colors duration-200">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-gray-900 dark:text-white">
          <Icon name="arrow_back" className="text-[24px]" />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] absolute left-1/2 -translate-x-1/2 dark:text-white">Store Settings</h2>
        <div className="size-10"></div> {/* Spacer for centering */}
      </div>

      <div className="mx-auto w-full max-w-lg px-4 pt-6 space-y-6 overflow-y-auto no-scrollbar">
        {/* Section: Store Identity */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">Store Identity</h3>
          <div className="bg-white dark:bg-[#1e1e2d] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden p-5">
            {/* Profile Header */}
            <div className="flex flex-col items-center sm:flex-row gap-5 mb-6">
              <div className="relative group cursor-pointer">
                <div className="h-20 w-20 rounded-full bg-cover bg-center border-2 border-gray-200 dark:border-gray-700 shadow-inner" style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAHr7pVeZ-jtMQ3N6mGnJuUPq2b5FNcVYOqBl7LfVek9Nksrzz4xXBybG8fOsEMkzYMLMqdsewmzGZKr9tjq68q4wOtQgxjY-naWAaVGtKYftSG2gNdUax5ll6wGocD8PBGFx4LcTgEqaWbPgANV5a2UMXq2E_IAwjclimaCCnYqHebsNlsaMQCKocNjeE-sMbNGN5heAm8GhdA4pxUpgYEhJiVotgV3L5EearPVvHzskobImiecYK68kr8HC7PyVtd3guoU1z0JwU")`}}>
                </div>
                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="edit" className="text-white text-sm" />
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start flex-1 text-center sm:text-left">
                <p className="text-lg font-bold text-gray-900 dark:text-white">My Awesome Shop</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Update your store's look</p>
                <button className="text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30 px-3 py-1.5 rounded-lg transition-colors">
                    Change Logo
                </button>
              </div>
            </div>
            {/* Inputs */}
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-1.5 block">Store Name</span>
                <input className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121121] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400 h-11 px-4 text-sm" type="text" defaultValue="My Awesome Shop"/>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-1.5 block">Support Email</span>
                <input className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121121] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400 h-11 px-4 text-sm" type="email" defaultValue="help@awesomeshop.com"/>
              </label>
            </div>
          </div>
        </div>

        {/* Section: Configuration */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">Configuration</h3>
          <div className="bg-white dark:bg-[#1e1e2d] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-200 dark:divide-gray-800">
            {/* Currency */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Icon name="payments" className="text-[18px]" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Currency</span>
              </div>
              <select className="bg-transparent border-none text-right text-sm text-gray-500 dark:text-gray-400 focus:ring-0 cursor-pointer pr-8">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>JPY (¥)</option>
              </select>
            </div>
            {/* Tax Rate */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <Icon name="percent" className="text-[18px]" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Tax Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <input className="w-16 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121121] text-gray-900 dark:text-white focus:ring-primary focus:border-primary text-right h-8 text-sm p-1" type="number" defaultValue="8.5"/>
                <span className="text-sm text-gray-500 dark:text-gray-500">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Preferences */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">Notifications</h3>
          <div className="bg-white dark:bg-[#1e1e2d] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-200 dark:divide-gray-800">
            {/* Push Notification Toggle */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  <Icon name="notifications" className="text-[18px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Push Notifications</span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">Order updates on your phone</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={pushEnabled} onChange={() => setPushEnabled(!pushEnabled)} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            {/* Email Alerts Toggle */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  <Icon name="mail" className="text-[18px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Email Alerts</span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">Weekly performance summary</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={emailEnabled} onChange={() => setEmailEnabled(!emailEnabled)} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Section: Account */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">Team & Security</h3>
          <div className="bg-white dark:bg-[#1e1e2d] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden divide-y divide-gray-200 dark:divide-gray-800">
            {/* Manage User Roles */}
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                  <Icon name="group" className="text-[18px]" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Manage User Roles</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-500">2 admins</span>
                <Icon name="chevron_right" className="text-gray-400 dark:text-gray-600 text-[20px] group-hover:text-primary transition-colors" />
              </div>
            </button>
            {/* Change Password */}
            <button onClick={() => navigate('/change-password')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <Icon name="lock" className="text-[18px]" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Change Password</span>
              </div>
              <Icon name="chevron_right" className="text-gray-400 dark:text-gray-600 text-[20px] group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-4 pb-2">
          <button onClick={() => navigate('/login')} className="w-full py-3.5 text-center text-red-600 dark:text-red-400 font-medium text-sm bg-red-50 dark:bg-red-900/10 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
              Log Out
          </button>
          <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-4">Version 1.2.0 (Build 3405)</p>
        </div>
      </div>

      {/* Sticky Footer Action */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1e1e2d] border-t border-gray-200 dark:border-gray-800 p-4 pb-6 z-40 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
        <div className="max-w-lg mx-auto">
          <button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}