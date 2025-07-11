import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaSpinner,
  FaUtensils,
  FaPizzaSlice,
  FaHamburger,
  FaGlassWhiskey,
  FaIceCream
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { 
  createMenuItem, 
  getMenuItems, 
  updateMenuItem, 
  deleteMenuItem, 
  toggleMenuItemAvailability 
} from '../../db/firebase';
import MenuItemForm from './MenuItemForm';
import MenuItemCard from './MenuItemCard';
import MenuCategoryFilter from './MenuCategoryFilter';
import MenuEmptyState from './MenuEmptyState';

const MenuManagement = ({ pizzeriaId }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'pizza',
    isAvailable: true,
    image: '',
    ingredients: [],
    allergens: [],
    preparationTime: 15,
    calories: 0
  });

  const categories = [
    { id: 'all', label: 'Wszystkie', icon: FaUtensils },
    { id: 'pizza', label: 'Pizza', icon: FaPizzaSlice },
    { id: 'pasta', label: 'Makaron', icon: FaUtensils },
    { id: 'salad', label: 'Sałatki', icon: FaUtensils },
    { id: 'drinks', label: 'Napoje', icon: FaGlassWhiskey },
    { id: 'desserts', label: 'Desery', icon: FaIceCream },
    { id: 'sides', label: 'Dodatki', icon: FaHamburger }
  ];

  // Load menu items from Firebase
  useEffect(() => {
    if (pizzeriaId) {
      loadMenuItems();
    }
  }, [pizzeriaId]);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const items = await getMenuItems(pizzeriaId);
      setMenuItems(items);
    } catch (error) {
      console.error('Error loading menu items:', error);
      toast.error('Błąd podczas ładowania menu');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!pizzeriaId) {
      toast.error('Brak ID pizzerii');
      return;
    }

    try {
      setSaving(true);
      const itemData = {
        ...newItem,
        price: parseFloat(newItem.price),
        preparationTime: parseInt(newItem.preparationTime) || 15,
        calories: parseInt(newItem.calories) || 0
      };

      const newMenuItem = await createMenuItem(pizzeriaId, itemData);
      setMenuItems([...menuItems, newMenuItem]);
      
      setNewItem({
        name: '',
        description: '',
        price: '',
        category: 'pizza',
        isAvailable: true,
        image: '',
        ingredients: [],
        allergens: [],
        preparationTime: 15,
        calories: 0
      });
      setShowAddItem(false);
      toast.success('Danie zostało dodane do menu!');
    } catch (error) {
      console.error('Error adding menu item:', error);
      toast.error('Błąd podczas dodawania dania');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!editingItem?.id) {
      toast.error('Brak ID dania do edycji');
      return;
    }

    try {
      setSaving(true);
      const updateData = {
        ...editingItem,
        price: parseFloat(editingItem.price),
        preparationTime: parseInt(editingItem.preparationTime) || 15,
        calories: parseInt(editingItem.calories) || 0
      };

      await updateMenuItem(editingItem.id, updateData);
      
      setMenuItems(menuItems.map(item => 
        item.id === editingItem.id ? { ...item, ...updateData } : item
      ));
      setEditingItem(null);
      toast.success('Danie zostało zaktualizowane!');
    } catch (error) {
      console.error('Error updating menu item:', error);
      toast.error('Błąd podczas aktualizacji dania');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!confirm('Czy na pewno chcesz usunąć to danie z menu?')) {
      return;
    }

    try {
      await deleteMenuItem(id);
      setMenuItems(menuItems.filter(item => item.id !== id));
      toast.success('Danie zostało usunięte z menu!');
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast.error('Błąd podczas usuwania dania');
    }
  };

  const handleToggleAvailability = async (id, currentAvailability) => {
    try {
      await toggleMenuItemAvailability(id, !currentAvailability);
      setMenuItems(menuItems.map(item => 
        item.id === id ? { ...item, isAvailable: !currentAvailability } : item
      ));
      toast.success(`Danie ${!currentAvailability ? 'udostępniono' : 'ukryto'} w menu!`);
    } catch (error) {
      console.error('Error toggling availability:', error);
      toast.error('Błąd podczas zmiany dostępności dania');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Ładowanie menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Zarządzanie Menu</h2>
          <p className="text-gray-600">Dodawaj, edytuj i zarządzaj daniami w menu</p>
        </div>
        <button
          onClick={() => setShowAddItem(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center"
        >
          <FaPlus className="mr-2" />
          Dodaj danie
        </button>
      </div>

      {/* Category Filter */}
      <MenuCategoryFilter 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
      />

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            categories={categories}
            onEdit={setEditingItem}
            onDelete={handleDeleteItem}
            onToggleAvailability={handleToggleAvailability}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <MenuEmptyState 
          activeCategory={activeCategory}
          categories={categories}
          onAddItem={() => setShowAddItem(true)}
        />
      )}

      {/* Add/Edit Forms */}
      <AnimatePresence>
        <MenuItemForm
          key="add-form"
          isOpen={showAddItem}
          isEdit={false}
          item={newItem}
          setItem={setNewItem}
          onSubmit={handleAddItem}
          onCancel={() => setShowAddItem(false)}
          saving={saving}
        />
        <MenuItemForm
          key="edit-form"
          isOpen={!!editingItem}
          isEdit={true}
          item={editingItem}
          setItem={setEditingItem}
          onSubmit={handleUpdateItem}
          onCancel={() => setEditingItem(null)}
          saving={saving}
        />
      </AnimatePresence>
    </div>
  );
};

export default MenuManagement; 