import React, { useState } from 'react';
import {
  Navbar,
  Footer,
  Modal,
  PrimaryButton,
  OutlineButton,
  NavyButton,
  CommandPalette,
} from '@/components/common';
import {
  PencilEditIcon,
  TrashIcon,
  PlusCircleIcon,
  ProductsIcon,
} from '@/components/Icons';

export function MerchantProductItemizerPage({ onNavigate }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCommandModal, setShowCommandModal] = useState(false);

  // Initial 6 products matching the image exactly
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Boerewors',
      subtitle: 'Traditional spiced Mutton sausage',
      icon: '🥩',
      standardPrice: 'R99',
      yeboPrice: 'R79',
      savings: 'Save R20',
    },
    {
      id: 2,
      name: 'Beef Burger',
      subtitle: 'Flame-grilled 200g pure patty',
      icon: '🍔',
      standardPrice: 'R80',
      yeboPrice: 'R65',
      savings: 'Save R15',
    },
    {
      id: 3,
      name: 'Chicken Burger',
      subtitle: 'Crispy peri-peri chicken breast',
      icon: '🍗',
      standardPrice: 'R75',
      yeboPrice: 'R60',
      savings: 'Save R15',
    },
    {
      id: 4,
      name: 'Cappuccino',
      subtitle: 'Double shot artisan roast',
      icon: '☕',
      standardPrice: 'R35',
      yeboPrice: 'R25',
      savings: 'Save R10',
    },
    {
      id: 5,
      name: 'Breakfast Platter',
      subtitle: 'Eggs, bacon, tomato & artisan toast',
      icon: '🍳',
      standardPrice: 'R120',
      yeboPrice: 'R95',
      savings: 'Save R25',
    },
    {
      id: 6,
      name: 'Fresh Bakery Box',
      subtitle: 'Assorted croissants & cinnamon rolls',
      icon: '🥐',
      standardPrice: 'R90',
      yeboPrice: 'R70',
      savings: 'Save R20',
    },
  ]);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const std = Number(form.standardPrice.value.replace(/[^0-9]/g, '')) || 50;
    const yeb = Number(form.yeboPrice.value.replace(/[^0-9]/g, '')) || 40;
    const sav = Math.max(0, std - yeb);

    const newProd = {
      id: Date.now(),
      name: form.prodName.value || 'New Artisan Item',
      subtitle: form.prodSubtitle.value || 'Signature cafe specialty',
      icon: form.prodIcon.value || '🍽️',
      standardPrice: `R${std}`,
      yeboPrice: `R${yeb}`,
      savings: `Save R${sav}`,
    };

    setProducts([...products, newProd]);
    setShowAddModal(false);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const std = Number(form.standardPrice.value.replace(/[^0-9]/g, '')) || 50;
    const yeb = Number(form.yeboPrice.value.replace(/[^0-9]/g, '')) || 40;
    const sav = Math.max(0, std - yeb);

    setProducts(
      products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: form.prodName.value,
              subtitle: form.prodSubtitle.value,
              standardPrice: `R${std}`,
              yeboPrice: `R${yeb}`,
              savings: `Save R${sav}`,
            }
          : p
      )
    );
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col font-sans">
      {/* 1. Common Navbar */}
      <Navbar
        activeTab="Deals"
        onSelectTab={(tab) => {
          if (tab === 'Dashboard' && onNavigate) onNavigate('dashboard');
          else if (tab === 'Deals' && onNavigate) onNavigate('deals');
          else if (onNavigate) onNavigate('dashboard', tab);
        }}
        onOpenCommand={() => setShowCommandModal(true)}
      />

      {/* 2. Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumbs: ← Back to Deals / Product Itemizer */}
        <div className="flex items-center gap-2 text-xs mb-5 select-none">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('deals')}
            className="flex items-center gap-1.5 text-slate-800 hover:text-orange-600 font-bold transition cursor-pointer"
          >
            <span className="text-sm">←</span>
            <span>Back to Deals</span>
          </button>
          <span className="text-slate-300 font-normal">/</span>
          <span className="text-[#ea580c] font-bold">Product Itemizer</span>
        </div>

        {/* Page Title & Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
              PRODUCT ITEMIZER
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage products and items used for your YEBO PERKS deals.
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <PrimaryButton onClick={() => setShowAddModal(true)} className="w-full sm:w-auto justify-center">
              <PlusCircleIcon className="w-4 h-4 text-white" />
              <span>ADD PRODUCT</span>
            </PrimaryButton>
          </div>
        </div>

        {/* Table Card: CONFIGURED ITEMS FOR DEALS */}
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] mt-6 sm:mt-8 overflow-hidden">
          {/* Card Header */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#ea580c] inline-block" />
              <h2 className="text-xs sm:text-sm font-black text-[#0c1844] tracking-wider uppercase">
                CONFIGURED ITEMS FOR DEALS
              </h2>
            </div>

            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/60 w-fit">
              {products.length} Products Configured
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-6">PRODUCT</th>
                  <th className="py-3 px-6">STANDARD PRICE</th>
                  <th className="py-3 px-6">YEBO PRICE</th>
                  <th className="py-3 px-6 text-right">ACTIONS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Product Column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-[#fff2ea] flex items-center justify-center text-xl shrink-0 border border-orange-100/60 shadow-2xs">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="font-extrabold text-slate-900 text-sm">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Standard Price */}
                    <td className="py-4 px-6 align-middle font-bold text-slate-800 text-sm">
                      {item.standardPrice}
                    </td>

                    {/* Yebo Price + Savings Badge */}
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-black text-[#f97316]">
                          {item.yeboPrice}
                        </span>
                        <span className="bg-[#ffedd5] text-[#ea580c] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {item.savings}
                        </span>
                      </div>
                    </td>

                    {/* Actions: EDIT & DELETE */}
                    <td className="py-4 px-6 align-middle text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingProduct(item)}
                          className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <PencilEditIcon className="w-3.5 h-3.5 text-slate-500" />
                          <span>EDIT</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="px-2.5 py-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                          <span>DELETE</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* 3. Common Footer */}
      <Footer />

      {/* --- MODAL: ADD PRODUCT --- */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Catalog Product"
        subtitle="The Daily Grind • Menu Items"
        icon={ProductsIcon}
        iconBg="bg-[#f97316]"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Product Name *
            </label>
            <input
              name="prodName"
              required
              placeholder="e.g. Avocado & Poached Egg Toast"
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:ring-1 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Description / Details *
            </label>
            <input
              name="prodSubtitle"
              required
              placeholder="e.g. Sourdough toast with lemon smashed avo"
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-slate-700 focus:ring-1 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Standard Price *
              </label>
              <input
                name="standardPrice"
                required
                placeholder="e.g. R85"
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Yebo Price *
              </label>
              <input
                name="yeboPrice"
                required
                placeholder="e.g. R65"
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-orange-600"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Item Emoji Icon
            </label>
            <select
              name="prodIcon"
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-semibold bg-white"
            >
              <option value="🥑">🥑 Avocado Toast</option>
              <option value="🥩">🥩 Meat / Sausage</option>
              <option value="🍔">🍔 Burger</option>
              <option value="🍗">🍗 Chicken</option>
              <option value="☕">☕ Coffee / Drink</option>
              <option value="🍳">🍳 Breakfast Platter</option>
              <option value="🥐">🥐 Bakery / Pastry</option>
              <option value="🥗">🥗 Salad</option>
            </select>
          </div>

          <div className="pt-3 flex gap-3">
            <PrimaryButton type="submit" className="flex-1">
              Add to Catalog
            </PrimaryButton>
            <OutlineButton onClick={() => setShowAddModal(false)}>
              Cancel
            </OutlineButton>
          </div>
        </form>
      </Modal>

      {/* --- MODAL: EDIT PRODUCT --- */}
      <Modal
        isOpen={Boolean(editingProduct)}
        onClose={() => setEditingProduct(null)}
        title="Edit Product Details"
        subtitle={editingProduct?.name}
        icon={PencilEditIcon}
        iconBg="bg-[#0c1844]"
        maxWidth="max-w-md"
      >
        {editingProduct && (
          <form onSubmit={handleUpdateProduct} className="space-y-3.5 text-xs">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Product Name
              </label>
              <input
                name="prodName"
                defaultValue={editingProduct.name}
                required
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Description
              </label>
              <input
                name="prodSubtitle"
                defaultValue={editingProduct.subtitle}
                required
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-slate-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Standard Price
                </label>
                <input
                  name="standardPrice"
                  defaultValue={editingProduct.standardPrice}
                  required
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Yebo Price
                </label>
                <input
                  name="yeboPrice"
                  defaultValue={editingProduct.yeboPrice}
                  required
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-orange-600"
                />
              </div>
            </div>

            <div className="pt-3 flex gap-3">
              <NavyButton type="submit" className="flex-1">
                Save Updates
              </NavyButton>
              <OutlineButton onClick={() => setEditingProduct(null)}>
                Cancel
              </OutlineButton>
            </div>
          </form>
        )}
      </Modal>

      {/* Common Command Palette */}
      <CommandPalette
        isOpen={showCommandModal}
        onClose={() => setShowCommandModal(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
}

export default MerchantProductItemizerPage;
