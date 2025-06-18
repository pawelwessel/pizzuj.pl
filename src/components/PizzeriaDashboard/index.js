"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  createPizzeria,
  updatePizzeria,
  getUserPizzerias,
  deletePizzeria,
} from "../../db/firebase";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

export default function PizzeriaDashboard({ user }) {
  const [pizzerias, setPizzerias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    openingHours: "",
    cuisine: "",
    priceRange: "",
  });

  useEffect(() => {
    if (user) {
      loadPizzerias();
    }
  }, [user]);

  const loadPizzerias = async () => {
    try {
      const userPizzerias = await getUserPizzerias(user.uid);
      setPizzerias(userPizzerias);
    } catch (error) {
      toast.error("Błąd podczas ładowania pizzerii");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      description: "",
      openingHours: "",
      cuisine: "",
      priceRange: "",
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim()) {
      toast.error("Nazwa i adres są wymagane!");
      return;
    }

    try {
      if (editingId) {
        await updatePizzeria(editingId, formData);
        toast.success("Pizzeria została zaktualizowana!");
      } else {
        await createPizzeria(user.uid, formData);
        toast.success("Pizzeria została dodana!");
      }
      await loadPizzerias();
      resetForm();
    } catch (error) {
      toast.error("Błąd podczas zapisywania pizzerii");
    }
  };

  const handleEdit = (pizzeria) => {
    setFormData({
      name: pizzeria.name || "",
      address: pizzeria.address || "",
      phone: pizzeria.phone || "",
      email: pizzeria.email || "",
      website: pizzeria.website || "",
      description: pizzeria.description || "",
      openingHours: pizzeria.openingHours || "",
      cuisine: pizzeria.cuisine || "",
      priceRange: pizzeria.priceRange || "",
    });
    setEditingId(pizzeria.id);
    setShowAddForm(true);
  };

  const handleDelete = async (pizzeriaId) => {
    if (window.confirm("Czy na pewno chcesz usunąć tę pizzerię?")) {
      try {
        await deletePizzeria(pizzeriaId);
        toast.success("Pizzeria została usunięta!");
        await loadPizzerias();
      } catch (error) {
        toast.error("Błąd podczas usuwania pizzerii");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Ładowanie pizzerii...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Zarządzaj swoimi pizzeriami</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlus /> Dodaj pizzerię
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? "Edytuj pizzerię" : "Dodaj nową pizzerię"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nazwa pizzerii *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adres *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Strona internetowa
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Godziny otwarcia
                </label>
                <input
                  type="text"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleInputChange}
                  placeholder="np. Pon-Pt: 10:00-22:00"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rodzaj kuchni
                </label>
                <select
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Wybierz rodzaj kuchni</option>
                  <option value="neapolitan">Neapolitańska</option>
                  <option value="american">Amerykańska</option>
                  <option value="italian">Włoska</option>
                  <option value="sicilian">Sycylijska</option>
                  <option value="other">Inna</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Przedział cenowy
                </label>
                <select
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Wybierz przedział cenowy</option>
                  <option value="$">$ - Budżetowy</option>
                  <option value="$$">$$ - Średni</option>
                  <option value="$$$">$$$ - Drogi</option>
                  <option value="$$$$">$$$$ - Luksusowy</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opis
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Opisz swoją pizzerię..."
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaSave /> {editingId ? "Zaktualizuj" : "Zapisz"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaTimes /> Anuluj
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {pizzerias.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">Nie masz jeszcze żadnych pizzerii.</p>
            <p>Kliknij "Dodaj pizzerię", aby rozpocząć!</p>
          </div>
        ) : (
          pizzerias.map((pizzeria) => (
            <div
              key={pizzeria.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{pizzeria.name}</h3>
                  <p className="text-gray-600">{pizzeria.address}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(pizzeria)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(pizzeria.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                {pizzeria.phone && (
                  <div>
                    <span className="font-medium">Telefon:</span> {pizzeria.phone}
                  </div>
                )}
                {pizzeria.email && (
                  <div>
                    <span className="font-medium">Email:</span> {pizzeria.email}
                  </div>
                )}
                {pizzeria.website && (
                  <div>
                    <span className="font-medium">Strona:</span>{" "}
                    <a
                      href={pizzeria.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {pizzeria.website}
                    </a>
                  </div>
                )}
                {pizzeria.openingHours && (
                  <div>
                    <span className="font-medium">Godziny:</span> {pizzeria.openingHours}
                  </div>
                )}
                {pizzeria.cuisine && (
                  <div>
                    <span className="font-medium">Kuchnia:</span> {pizzeria.cuisine}
                  </div>
                )}
                {pizzeria.priceRange && (
                  <div>
                    <span className="font-medium">Ceny:</span> {pizzeria.priceRange}
                  </div>
                )}
              </div>
              {pizzeria.description && (
                <div className="mt-4">
                  <span className="font-medium">Opis:</span>
                  <p className="text-gray-700 mt-1">{pizzeria.description}</p>
                </div>
              )}
              <div className="mt-4 text-xs text-gray-500">
                Utworzono: {new Date(pizzeria.createdAt).toLocaleDateString()}
                {pizzeria.updatedAt !== pizzeria.createdAt && (
                  <span className="ml-4">
                    Zaktualizowano: {new Date(pizzeria.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}