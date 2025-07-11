"use client";
import { useState, useEffect } from "react";
import { FaPlus, FaChartBar, FaUtensils, FaCog, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import PizzeriaCard from "./PizzeriaCard";
import AddPizzeriaForm from "./AddPizzeriaForm";
import EmptyState from "./EmptyState";
import PizzeriaManagement from "./PizzeriaManagement";
import MenuManagement from "./MenuManagement";
import AnalyticsDashboard from "./AnalyticsDashboard";
import { createPizzeria, getUserPizzerias, deletePizzeria, updatePizzeria, testFirebaseConnection, testFirebaseWrite } from "../../db/firebase";

export default function PizzeriaDashboard({ user }) {
  const [pizzerias, setPizzerias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPizzeria, setSelectedPizzeria] = useState(null);
  const [activeView, setActiveView] = useState('list'); // 'list', 'management', 'menu', 'analytics'
  const [newPizzeria, setNewPizzeria] = useState({
    name: "",
    address: "",
    phone: "",
    website: "",
    description: "",
    lat: null,
    lng: null,
    exactAddress: "",
    city: ""
  });

  useEffect(() => {
    if (user?.uid) {
      // Test Firebase connection first
      testFirebaseConnection().then(isConnected => {
        console.log("Firebase connection test result:", isConnected);
        if (isConnected) {
          // Test Firebase write
          testFirebaseWrite().then(canWrite => {
            console.log("Firebase write test result:", canWrite);
            if (canWrite) {
              loadUserPizzerias();
            } else {
              console.error("Firebase write failed");
              toast.error("Błąd zapisu do bazy danych");
              setIsLoading(false);
            }
          });
        } else {
          console.error("Firebase connection failed");
          toast.error("Błąd połączenia z bazą danych");
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const loadUserPizzerias = async () => {
    try {
      setIsLoading(true);
      console.log("Loading pizzerias for user:", user.uid);
      const userPizzerias = await getUserPizzerias(user.uid);
      console.log("Loaded pizzerias:", userPizzerias);
      setPizzerias(userPizzerias);
    } catch (error) {
      console.error("Error loading pizzerias:", error);
      toast.error("Błąd podczas ładowania pizzerii");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPizzeria = async (e) => {
    e.preventDefault();
    
    console.log("handleAddPizzeria called");
    console.log("User:", user);
    console.log("New pizzeria data:", newPizzeria);
    
    if (!user?.uid) {
      console.log("No user UID found");
      toast.error("Musisz być zalogowany, aby dodać pizzerię");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Creating pizzeria for user:", user.uid);
      
      // Create pizzeria in Firebase
      const createdPizzeria = await createPizzeria(user.uid, {
        ...newPizzeria,
        rating: 0,
        isPremium: false
      });
      
      console.log("Pizzeria created successfully:", createdPizzeria);
      
      // Add to local state
      setPizzerias([...pizzerias, createdPizzeria]);
      
      // Reset form
      setNewPizzeria({ name: "", address: "", phone: "", website: "", description: "", lat: null, lng: null, exactAddress: "", city: "" });
      setShowAddForm(false);
      
      toast.success("Pizzeria została dodana!");
    } catch (error) {
      console.error("Error creating pizzeria:", error);
      toast.error("Błąd podczas dodawania pizzerii");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePizzeria = async (id) => {
    try {
      await deletePizzeria(id);
      setPizzerias(pizzerias.filter(p => p.id !== id));
      toast.success("Pizzeria została usunięta!");
    } catch (error) {
      console.error("Error deleting pizzeria:", error);
      toast.error("Błąd podczas usuwania pizzerii");
    }
  };

  const handleUpdatePizzeria = async (updatedPizzeria) => {
    try {
      await updatePizzeria(updatedPizzeria.id, updatedPizzeria);
      setPizzerias(pizzerias.map(p => 
        p.id === updatedPizzeria.id ? updatedPizzeria : p
      ));
      toast.success("Pizzeria została zaktualizowana!");
    } catch (error) {
      console.error("Error updating pizzeria:", error);
      toast.error("Błąd podczas aktualizacji pizzerii");
    }
  };

  const handleViewPizzeria = (pizzeria) => {
    setSelectedPizzeria(pizzeria);
    setActiveView('management');
  };

  const handleEditPizzeria = (pizzeria) => {
    setSelectedPizzeria(pizzeria);
    setActiveView('edit');
  };

  const handleBackToList = () => {
    setSelectedPizzeria(null);
    setActiveView('list');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie pizzerii...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            {activeView === 'list' ? 'Moje Pizzerie' : selectedPizzeria?.name}
          </h2>
          <p className="text-gray-600">
            {activeView === 'list' 
              ? 'Zarządzaj swoimi pizzeriami' 
              : 'Zarządzaj pizzeria i monitoruj wydajność'
            }
          </p>
        </div>
        
        {activeView === 'list' ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FaPlus /> Dodaj Pizzerię
          </button>
        ) : (
          <button
            onClick={handleBackToList}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
          >
            ← Powrót do listy
          </button>
        )}
        
        
      </div>

      

      {/* Add Form */}
      <AddPizzeriaForm
        showForm={showAddForm}
        newPizzeria={newPizzeria}
        setNewPizzeria={setNewPizzeria}
        onSubmit={handleAddPizzeria}
        onCancel={() => setShowAddForm(false)}
      />

      {/* Content based on active view */}
      {activeView === 'list' && (
        <>
          {/* Pizzerias List */}
          {pizzerias.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pizzerias.map((pizzeria) => (
                <PizzeriaCard
                  key={pizzeria.id}
                  pizzeria={pizzeria}
                  onDelete={handleDeletePizzeria}
                  onView={() => handleViewPizzeria(pizzeria)}
                  onEdit={() => handleEditPizzeria(pizzeria)}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {pizzerias.length === 0 && !showAddForm && (
            <EmptyState onAddClick={() => setShowAddForm(true)} />
          )}
        </>
      )}

      {/* Management View */}
      {activeView === 'management' && selectedPizzeria && (
        <PizzeriaManagement
          pizzeria={selectedPizzeria}
          onUpdate={handleUpdatePizzeria}
          onDelete={handleDeletePizzeria}
        />
      )}

      {/* Menu Management View */}
      {activeView === 'menu' && selectedPizzeria && (
        <MenuManagement pizzeriaId={selectedPizzeria.id} />
      )}

      {/* Analytics View */}
      {activeView === 'analytics' && selectedPizzeria && (
        <AnalyticsDashboard pizzeriaId={selectedPizzeria.id} />
      )}

      {/* Edit View */}
      {activeView === 'edit' && selectedPizzeria && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Edytuj Pizzerię</h3>
            <p className="text-gray-600">Zaktualizuj informacje o swojej pizzerii</p>
          </div>
          
          <form onSubmit={async (e) => {
            e.preventDefault();
            try {
              const updatedPizzeria = {
                ...selectedPizzeria,
                name: e.target.name.value,
                address: e.target.address.value,
                phone: e.target.phone.value,
                website: e.target.website.value,
                description: e.target.description.value
              };
              await handleUpdatePizzeria(updatedPizzeria);
              setActiveView('list');
            } catch (error) {
              console.error("Error updating pizzeria:", error);
            }
          }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nazwa pizzerii</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedPizzeria.name}
                  className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Adres</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={selectedPizzeria.address}
                  className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={selectedPizzeria.phone}
                  className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Strona internetowa</label>
                <input
                  type="url"
                  name="website"
                  defaultValue={selectedPizzeria.website}
                  className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Opis</label>
              <textarea
                name="description"
                defaultValue={selectedPizzeria.description}
                className="w-full p-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows="3"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all duration-300"
              >
                Zapisz zmiany
              </button>
              <button
                type="button"
                onClick={() => setActiveView('list')}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all duration-300"
              >
                Anuluj
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 