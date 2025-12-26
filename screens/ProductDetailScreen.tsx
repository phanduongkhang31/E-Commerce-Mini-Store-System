import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon, Button } from '../components/Components';
import { useApp } from '../App';

export default function ProductDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart, products } = useApp(); // Get 'products' from context
  const product = products.find(p => p.id === id) || products[0]; // Fallback to safe
  const [qty, setQty] = useState(1);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (!product) return null; // Safety check

  const handleAddToCart = () => {
    for(let i=0; i<qty; i++) addToCart(product);
  };

  return (
    <div className="relative flex h-full flex-col bg-background-light dark:bg-background-dark">
       {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/20 to-transparent">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm shadow-sm transition-transform active:scale-95">
          <Icon name="arrow_back_ios_new" className="text-gray-900 dark:text-white" />
        </button>
        <button onClick={() => navigate('/cart')} className="relative flex size-10 items-center justify-center rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm shadow-sm transition-transform active:scale-95">
          <Icon name="shopping_cart" className="text-gray-900 dark:text-white" />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white border-2 border-white dark:border-black">{cartCount}</span>}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-28">
         {/* Carousel */}
         <div className="relative w-full aspect-[4/5] bg-gray-200 dark:bg-gray-800">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
         </div>

         <div className="relative -mt-6 rounded-t-3xl bg-white dark:bg-[#1e1e2d] px-6 pt-8 pb-6 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">{product.name}</h1>
              <button className="p-2 -mr-2 text-gray-400 hover:text-red-500 transition-colors">
                <Icon name="favorite" />
              </button>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                 <>
                  <span className="text-lg text-gray-400 line-through decoration-1">${product.originalPrice.toFixed(2)}</span>
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">-30%</span>
                 </>
              )}
            </div>

             <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  <Icon name="star" className="text-[20px]" filled />
                  <Icon name="star" className="text-[20px]" filled />
                  <Icon name="star" className="text-[20px]" filled />
                  <Icon name="star" className="text-[20px]" filled />
                  <Icon name="star_half" className="text-[20px]" filled />
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.rating || 0}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews || 0} reviews)</span>
            </div>

            <div className="h-px bg-gray-100 dark:bg-gray-800 my-6"></div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Description</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">{product.description}</p>

            <div className="h-px bg-gray-100 dark:bg-gray-800 my-6"></div>

            {/* Quantity */}
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-gray-900 dark:text-white">Quantity</span>
              <div className="flex items-center bg-gray-100 dark:bg-black/20 rounded-lg p-1">
                 <button onClick={() => setQty(q => Math.max(1, q - 1))} className="size-8 flex items-center justify-center rounded-md bg-white dark:bg-gray-700 shadow-sm text-gray-600 dark:text-gray-200">
                    <Icon name="remove" className="text-lg" />
                 </button>
                 <span className="w-10 text-center font-semibold text-gray-900 dark:text-white">{qty}</span>
                 <button onClick={() => setQty(q => q + 1)} className="size-8 flex items-center justify-center rounded-md bg-white dark:bg-gray-700 shadow-sm text-gray-600 dark:text-gray-200">
                    <Icon name="add" className="text-lg" />
                 </button>
              </div>
            </div>
         </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-white dark:bg-[#1e1e2d] border-t border-gray-100 dark:border-gray-800 z-10">
         <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={handleAddToCart}>Add to Cart</Button>
            <Button className="flex-1" onClick={() => { handleAddToCart(); navigate('/cart'); }}>Buy Now</Button>
         </div>
      </div>
    </div>
  );
}