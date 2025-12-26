import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminBottomNav, Icon } from '../components/Components';
import { useApp } from '../App';

export default function AdminDashboardScreen() {
  const navigate = useNavigate();
  const { orders, products } = useApp();

  // Logic: Calculate Real Stats
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const activeProducts = products.length;
  
  // Get recent 3 orders
  const recentOrders = [...orders].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-20">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#1a1929]/90 backdrop-blur-md shadow-sm">
        <div className="flex items-center px-4 py-3 justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">Good Morning, Admin</h2>
          </div>
          <div className="flex items-center justify-end">
            <button className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Icon name="notifications" className="text-[24px]" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-2 w-full p-4 overflow-y-auto no-scrollbar">
        {/* Stats Overview */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {/* Revenue Card */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1 rounded-xl bg-white dark:bg-[#1e1e2d] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Revenue</p>
              <Icon name="payments" className="text-primary text-[20px]" />
            </div>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="trending_up" className="text-green-600 text-[16px]" />
              <p className="text-green-600 text-xs font-semibold">+5%</p>
              <p className="text-gray-400 text-xs ml-1">vs last week</p>
            </div>
          </div>
          
          {/* Orders Card */}
          <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-[#1e1e2d] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Orders</p>
              <Icon name="shopping_bag" className="text-primary/70 text-[20px]" />
            </div>
            <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-1">{totalOrders}</p>
            <div className="flex items-center gap-1 mt-1">
              <p className="text-green-600 text-xs font-semibold">+12%</p>
              <p className="text-gray-400 text-xs">new</p>
            </div>
          </div>
          
          {/* Products Card */}
          <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-[#1e1e2d] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Products</p>
              <Icon name="inventory_2" className="text-primary/70 text-[20px]" />
            </div>
            <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-1">{activeProducts}</p>
            <div className="flex items-center gap-1 mt-1">
              <p className="text-gray-500 text-xs font-medium">Active</p>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="mt-2 rounded-xl bg-white dark:bg-[#1e1e2d] p-5 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-gray-900 dark:text-white text-lg font-bold">Weekly Revenue</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Last 7 days performance</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded text-green-700 dark:text-green-400 text-xs font-bold">
              +5.2% Growth
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <svg fill="none" height="120" preserveAspectRatio="none" viewBox="0 0 400 120" width="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5048e5" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="#5048e5" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path d="M0,80 C50,80 50,40 100,40 C150,40 150,90 200,90 C250,90 250,30 300,30 C350,30 350,60 400,60 V120 H0 Z" fill="url(#chartGradient)"></path>
              <path d="M0,80 C50,80 50,40 100,40 C150,40 150,90 200,90 C250,90 250,30 300,30 C350,30 350,60 400,60" fill="none" stroke="#5048e5" strokeLinecap="round" strokeWidth="3"></path>
            </svg>
          </div>
          <div className="flex justify-between mt-2 px-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                 <p key={day} className="text-gray-400 text-xs font-medium">{day}</p>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <div className="mt-4 mb-2 flex items-center justify-between">
          <h2 className="text-gray-900 dark:text-white text-lg font-bold">Quick Actions</h2>
        </div>
        <section className="flex flex-col gap-3">
          {/* Manage Products */}
          <div onClick={() => navigate('/admin/products')} className="group flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#1e1e2d] p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-[2_2_0px] flex-col justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-8 h-8 rounded-lg flex items-center justify-center mb-1">
                  <Icon name="inventory_2" className="text-blue-600 dark:text-blue-400 text-lg" />
                </div>
                <p className="text-gray-900 dark:text-white text-base font-bold leading-tight">Manage Products</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">Add or edit your inventory</p>
              </div>
              <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-1 group-hover:underline">
                Go to Products <Icon name="arrow_forward" className="text-sm" />
              </div>
            </div>
            <div className="w-24 sm:w-32 bg-center bg-no-repeat bg-cover rounded-lg aspect-square" style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuByqy6l0mUdwGolxOxM1n_7BVFOT-nVYX3F6abA6rRg5ohA-3EGDCog6byGxKFvjiOYRXHTzxeGV5ma8qfCZEGwpVEs354vNK_W2NkJXGQQhnx2BvzRscL3nk5ZWwErkabw5AO-wP9oAlSzEVYn9eK6p5_4RS9JljaT40A00cO5zjurK8PI2tbCUHmxVT4f7egWqdYhgS8SD5PBQKdYgnmAT30XQ_9IeDKw-SYvvS8vCp1DIB1nXEMOtpqE_kA1kJGeC-P71WftS_o")`}}></div>
          </div>

          {/* View Orders */}
          <div onClick={() => navigate('/admin/orders')} className="group flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#1e1e2d] p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-[2_2_0px] flex-col justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-8 h-8 rounded-lg flex items-center justify-center mb-1">
                  <Icon name="local_shipping" className="text-purple-600 dark:text-purple-400 text-lg" />
                </div>
                <p className="text-gray-900 dark:text-white text-base font-bold leading-tight">Order Management</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">Track shipments and status</p>
              </div>
              <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-1 group-hover:underline">
                View Orders <Icon name="arrow_forward" className="text-sm" />
              </div>
            </div>
            <div className="w-24 sm:w-32 bg-center bg-no-repeat bg-cover rounded-lg aspect-square" style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdtrZ20gp4o4Wk0O7cm2EQmPZbMholucgwK0ZO-2CWBViOE80n5gf4IdU5EBSXYTk0XV1ng72nHeyi6-YMQ6Do1KxDqk2UcrM86uTJh4P_Hw_Sg8nxJc-z5vchJF0MfqhVgvUX1zzVUoV4IOUIN-9sZTIfmzoSHYmF7I0ca80nrHBUhJslPSVRznHIWXU5CQF5DpBYEPtQf7be59Klo1ahal4SM92a6yPitYY_MxV_Wv_b6R_OuxKRFT8RtPDiKtG1wuj1Jb8E2h0")`}}></div>
          </div>
        </section>

        {/* Recent Orders List */}
        <div className="mt-6 mb-2 flex items-center justify-between px-1">
          <h2 className="text-gray-900 dark:text-white text-lg font-bold">Recent Orders</h2>
          <button onClick={() => navigate('/admin/orders')} className="text-primary text-sm font-medium">See All</button>
        </div>
        <section className="flex flex-col gap-2 pb-8">
          {recentOrders.map(order => (
             <div key={order.id} className="flex items-center justify-between p-4 bg-white dark:bg-[#1e1e2d] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold text-xs">ORD</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Order #{order.id}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
          ))}
        </section>
      </main>

      <AdminBottomNav activeTab="dashboard" />
    </div>
  );
}