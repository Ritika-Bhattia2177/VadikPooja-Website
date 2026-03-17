import React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart({ 
  isOpen, 
  onClose, 
  items, 
  kitItems,
  onUpdateQuantity, 
  onUpdateKitQuantity,
  onRemove,
  onRemoveKit,
  onCheckout 
}) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 
                kitItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-70 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <ShoppingCart className="mr-2 text-[#FF6F00]" />
                Your Cart
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 && kitItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <ShoppingCart size={64} className="mb-4 opacity-20" />
                  <p className="text-lg">Your cart is empty</p>
                  <button 
                    onClick={onClose}
                    className="mt-4 text-[#FF6F00] font-bold hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  {items.map(item => (
                    <div key={item.id} className="flex space-x-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-[#FF6F00] font-bold">₹{item.price}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1 hover:bg-gray-100 text-gray-500"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 text-sm font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1 hover:bg-gray-100 text-gray-500"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {kitItems.map(item => (
                    <div key={`kit-${item.id}`} className="flex space-x-4">
                      <div className="w-20 h-20 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                        <div className="w-10 h-10 bg-[#FF6F00] rounded-full flex items-center justify-center text-white font-bold">K</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-[#FF6F00] font-bold">₹{item.price}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button 
                              onClick={() => onUpdateKitQuantity(item.id, -1)}
                              className="p-1 hover:bg-gray-100 text-gray-500"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 text-sm font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateKitQuantity(item.id, 1)}
                              className="p-1 hover:bg-gray-100 text-gray-500"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => onRemoveKit(item.id)}
                            className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {(items.length > 0 || kitItems.length > 0) && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-gray-800">₹{total}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-[#FF6F00] hover:bg-[#FF9933] text-white py-4 rounded-2xl font-bold text-lg transition-colors shadow-lg shadow-orange-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
