import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Icon, Button } from '../components/Components';

export default function AdminOrderDetailScreen() {
  const navigate = useNavigate();
  // Using static data matching the HTML
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-[#1a1929] px-4 py-3 justify-between shadow-sm border-b border-gray-100 dark:border-gray-800">
         <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><Icon name="arrow_back_ios_new" /></button>
         <h2 className="text-lg font-bold flex-1 text-center dark:text-white">Order #8921</h2>
         <button className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><Icon name="more_horiz" /></button>
      </div>

      <main className="flex-1 overflow-y-auto p-4 gap-6 flex flex-col pb-24">
         {/* Status */}
         <div className="bg-white dark:bg-[#1e1e2d] p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between shadow-sm cursor-pointer active:scale-[0.99] transition-transform">
            <div className="flex items-center gap-3">
               <div className="size-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center"><Icon name="schedule" /></div>
               <div><p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Status</p><p className="font-semibold text-base dark:text-white">Processing</p></div>
            </div>
            <div className="flex items-center gap-1 text-primary text-sm font-medium">Update <Icon name="expand_more" /></div>
         </div>

         {/* Customer */}
         <div>
            <h3 className="font-bold text-base mb-3 px-1 dark:text-white">Customer</h3>
            <div className="bg-white dark:bg-[#1e1e2d] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-4">
               <div className="size-12 rounded-full bg-gray-200 bg-cover bg-center" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBg8shrZTSG3UF-MPlfoSHV57URNdPvgrZgZq4c-xplsWU3WnI9QAI5qOetY0kwlee84VP9328krnbemgx3zGESPpqURw_RM6Ofmqv5Im24Qb3COmQbD0ApreTniBw9ihuBxauUzv6wxZuP13ifJT9cTVZ6f7Wz3wZJwNQO8p5iUae3PDd6_4rwdu_wKZtMRdjuV3LwPv8u69qtDaDCXdsrGFaqIelrLGGgbl-DS9kqFPwMDlFdExLPcF1PfY-aYiCKmb7UUwxMS3I')`}}></div>
               <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base truncate dark:text-white">Jane Doe</p>
                  <p className="text-sm text-gray-500 truncate">jane.doe@example.com</p>
               </div>
               <div className="flex gap-2">
                  <button className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center"><Icon name="call" className="text-[20px]" /></button>
                  <button className="size-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center"><Icon name="mail" className="text-[20px]" /></button>
               </div>
            </div>
         </div>

         {/* Shipping */}
         <div>
             <h3 className="font-bold text-base mb-3 px-1 dark:text-white">Shipping</h3>
             <div className="relative rounded-xl overflow-hidden h-28 w-full shadow-sm bg-gray-200">
                <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBq01qxFYavl3UgDFudruqc-YPqeeVh3VZXEqPW3hkagUVD4TfURrFHUL0CsYGVMuML2tRIfq_0kO6n3U7yn2q6gZdvRWx0YNUNcnjyBHMc-3fFNl7Du06AyMwYln1uw41Xw2OYxayzO8kLKVNW9xz6SWHyNsP3qkoffTfdF2CXjwkGt_1az4nzv2gZTT3luxO7oePFGeKSkztTlHgUZTG7-gRfJvS2AvDLYr6BpS7cdsvzUStFvdJIeYiyoYdAdrDv3TKXG1Jqjpw')`}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                   <p className="text-white/80 text-xs font-medium uppercase mb-1">Delivery Address</p>
                   <div className="flex justify-between items-end">
                      <p className="text-white font-medium leading-snug">123 Maple Street, Springfield, IL</p>
                      <button className="size-8 rounded-lg bg-white/20 backdrop-blur-md text-white flex items-center justify-center"><Icon name="content_copy" className="text-[18px]" /></button>
                   </div>
                </div>
             </div>
         </div>

         {/* Items */}
         <div>
            <h3 className="font-bold text-base mb-3 px-1 dark:text-white">Items (3)</h3>
            <div className="bg-white dark:bg-[#1e1e2d] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
               <div className="p-4 flex gap-4 items-center">
                   <div className="size-16 rounded-lg bg-gray-100 bg-cover bg-center" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrEN-53nJBrY_LzP-vcqN_PaPZPkSQWhBpQbpz95J3-PXOPMXDNJmgMh9g4iuvyaw_jGLt9LEhfLts_YAfGRsn_dbdd1J4rkpI4BVnguPv9Gqhja9aL1Nz6uuvIMHBaCjseGrqH7WBIWnDxabrQ3NoVdB7opV3Q3IysiBZ4PTGDd5mcG5eqX6w_N_9Tllpn5WDDYmot7ixGTIMTwNqxZWdzYNXoEWE6V2qccL3mHlLLFIvOBtlOI9xh-NXNK2-1C5fiKby_Dcpu9c')`}}></div>
                   <div className="flex-1">
                      <p className="font-semibold text-sm line-clamp-1 dark:text-white">Ceramic Vase</p>
                      <p className="text-xs text-gray-500 mt-1">Variant: White</p>
                   </div>
                   <div className="text-right">
                      <p className="font-semibold text-sm dark:text-white">$25.00</p>
                      <span className="inline-block bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs text-gray-600 dark:text-gray-300 mt-1">x1</span>
                   </div>
               </div>
               <div className="p-4 flex gap-4 items-center">
                   <div className="size-16 rounded-lg bg-gray-100 bg-cover bg-center" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXbVLSXkfUor6oZOcEmpSpw0NxRIJ5BHfsCfX-QME6QoIYH1SKO8Ni7JZ9pbs0j6phsn8BQ81JFyijB5yycHdFlay9OhdZjUBo45m5kyxE7wnX84SYNBmnd5Ok7QIGoARdCNj1ud0B9VNHRIhO8jvEJbBzJkdPqi7DcdadvniTAoZNbpIKyFZ0RAc4oUCHOCCDXWI408sBGAK53uVigWljOyrthnfb4gPOkFYlnjFu4h1Vu5YKqe__6qUATdkfTmjiBwgIpMkG7jk')`}}></div>
                   <div className="flex-1">
                      <p className="font-semibold text-sm line-clamp-1 dark:text-white">Soy Candle</p>
                      <p className="text-xs text-gray-500 mt-1">Variant: Large</p>
                   </div>
                   <div className="text-right">
                      <p className="font-semibold text-sm dark:text-white">$24.00</p>
                      <span className="inline-block bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs text-gray-600 dark:text-gray-300 mt-1">x2</span>
                   </div>
               </div>
            </div>
         </div>

         {/* Summary */}
         <div className="bg-white dark:bg-[#1e1e2d] rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3">
             <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="font-medium dark:text-white">$49.00</span></div>
             <div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span className="font-medium dark:text-white">$5.00</span></div>
             <div className="h-px bg-gray-100 dark:bg-gray-800 my-1"></div>
             <div className="flex justify-between text-lg"><span className="font-bold dark:text-white">Total</span><span className="font-bold text-primary">$54.00</span></div>
         </div>
      </main>

      <div className="sticky bottom-0 bg-white dark:bg-[#1e1e2d] border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-20">
         <Button className="w-full gap-2"><Icon name="local_shipping" /> Mark as Shipped</Button>
      </div>
    </div>
  );
}