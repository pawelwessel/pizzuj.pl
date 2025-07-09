"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { 
  FaSave, 
  FaBell, 
  FaEye, 
  FaShieldAlt, 
  FaPalette, 
  FaLanguage,
  FaEnvelope,
  FaTrash,
  FaToggleOn,
  FaToggleOff
} from "react-icons/fa";
import { updateUserSettings, getUserSettings } from "../../../db/firebase";

export default function Settings({ user }) {
  const [settings, setSettings] = useState({
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    pizzeriaUpdates: true,
    weeklyDigest: false,
    
    // Privacy settings
    profileVisibility: "public", // public, private, contacts
    showEmail: false,
    showPhone: false,
    allowAnalytics: true,
    
    // Appearance settings
    theme: "light", // light, dark, auto
    language: "pl", // pl, en
    compactView: false,
    showAchievements: true,
    
    // Account preferences
    autoSave: true,
    twoFactorAuth: false,
    sessionTimeout: 30, // minutes
    dataRetention: 365, // days
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("notifications");

  useEffect(() => {
    const loadSettings = async () => {
      if (user?.uid) {
        try {
          const userSettings = await getUserSettings(user.uid);
          if (userSettings) {
            setSettings(prev => ({ ...prev, ...userSettings }));
          }
        } catch (error) {
          console.error("Error loading settings:", error);
          toast.error("Błąd podczas ładowania ustawień");
        } finally {
          setLoading(false);
        }
      }
    };
    loadSettings();
  }, [user]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await updateUserSettings(user.uid, settings);
      toast.success("Ustawienia zostały zapisane!");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Błąd podczas zapisywania ustawień");
    } finally {
      setSaving(false);
    }
  };

  const handleResetSettings = () => {
    if (window.confirm("Czy na pewno chcesz przywrócić domyślne ustawienia?")) {
      setSettings({
        emailNotifications: true,
        pushNotifications: true,
        marketingEmails: false,
        pizzeriaUpdates: true,
        weeklyDigest: false,
        profileVisibility: "public",
        showEmail: false,
        showPhone: false,
        allowAnalytics: true,
        theme: "light",
        language: "pl",
        compactView: false,
        showAchievements: true,
        autoSave: true,
        twoFactorAuth: false,
        sessionTimeout: 30,
        dataRetention: 365,
      });
      toast.info("Ustawienia zostały przywrócone do domyślnych");
    }
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-orange-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Ustawienia konta</h2>
          <div className="flex gap-3">
            <button
              onClick={handleResetSettings}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaTrash className="inline mr-2" />
              Resetuj
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <FaSave />
              {saving ? "Zapisywanie..." : "Zapisz zmiany"}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "notifications", label: "Powiadomienia", icon: FaBell },
              { id: "privacy", label: "Prywatność", icon: FaShieldAlt },
              { id: "appearance", label: "Wygląd", icon: FaPalette },
              { id: "account", label: "Konto", icon: FaEye },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeSection === section.id
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <section.icon />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {activeSection === "notifications" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaBell className="text-orange-500" />
                Powiadomienia
              </h3>
              <div className="space-y-1 divide-y divide-gray-100">
                <ToggleSwitch
                  enabled={settings.emailNotifications}
                  onChange={(value) => handleSettingChange("emailNotifications", value)}
                  label="Powiadomienia email"
                  description="Otrzymuj powiadomienia o ważnych wydarzeniach na email"
                />
                <ToggleSwitch
                  enabled={settings.pushNotifications}
                  onChange={(value) => handleSettingChange("pushNotifications", value)}
                  label="Powiadomienia push"
                  description="Otrzymuj powiadomienia push w przeglądarce"
                />
                <ToggleSwitch
                  enabled={settings.marketingEmails}
                  onChange={(value) => handleSettingChange("marketingEmails", value)}
                  label="Wiadomości marketingowe"
                  description="Otrzymuj informacje o promocjach i nowościach"
                />
                <ToggleSwitch
                  enabled={settings.pizzeriaUpdates}
                  onChange={(value) => handleSettingChange("pizzeriaUpdates", value)}
                  label="Aktualizacje pizzerii"
                  description="Powiadomienia o zmianach w Twoich pizzeriach"
                />
                <ToggleSwitch
                  enabled={settings.weeklyDigest}
                  onChange={(value) => handleSettingChange("weeklyDigest", value)}
                  label="Tygodniowe podsumowanie"
                  description="Otrzymuj podsumowanie aktywności co tydzień"
                />
              </div>
            </div>
          )}

          {activeSection === "privacy" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-orange-500" />
                Prywatność i bezpieczeństwo
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Widoczność profilu
                  </label>
                  <select
                    value={settings.profileVisibility}
                    onChange={(e) => handleSettingChange("profileVisibility", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="public">Publiczny</option>
                    <option value="private">Prywatny</option>
                    <option value="contacts">Tylko kontakty</option>
                  </select>
                </div>
                <div className="space-y-1 divide-y divide-gray-100">
                  <ToggleSwitch
                    enabled={settings.showEmail}
                    onChange={(value) => handleSettingChange("showEmail", value)}
                    label="Pokaż email w profilu"
                    description="Inni użytkownicy będą mogli zobaczyć Twój adres email"
                  />
                  <ToggleSwitch
                    enabled={settings.showPhone}
                    onChange={(value) => handleSettingChange("showPhone", value)}
                    label="Pokaż telefon w profilu"
                    description="Inni użytkownicy będą mogli zobaczyć Twój numer telefonu"
                  />
                  <ToggleSwitch
                    enabled={settings.allowAnalytics}
                    onChange={(value) => handleSettingChange("allowAnalytics", value)}
                    label="Zezwól na analitykę"
                    description="Pomóż nam ulepszyć serwis poprzez zbieranie danych analitycznych"
                  />
                  <ToggleSwitch
                    enabled={settings.twoFactorAuth}
                    onChange={(value) => handleSettingChange("twoFactorAuth", value)}
                    label="Uwierzytelnianie dwuskładnikowe"
                    description="Dodatkowa warstwa bezpieczeństwa dla Twojego konta"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaPalette className="text-orange-500" />
                Wygląd i interfejs
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motyw
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleSettingChange("theme", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="light">Jasny</option>
                    <option value="dark">Ciemny</option>
                    <option value="auto">Automatyczny</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Język
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange("language", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="pl">Polski</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="space-y-1 divide-y divide-gray-100">
                  <ToggleSwitch
                    enabled={settings.compactView}
                    onChange={(value) => handleSettingChange("compactView", value)}
                    label="Widok kompaktowy"
                    description="Używaj mniejszych elementów interfejsu"
                  />
                  <ToggleSwitch
                    enabled={settings.showAchievements}
                    onChange={(value) => handleSettingChange("showAchievements", value)}
                    label="Pokaż osiągnięcia"
                    description="Wyświetlaj osiągnięcia w profilu"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === "account" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaEye className="text-orange-500" />
                Ustawienia konta
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Limit czasu sesji (minuty)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="1440"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Okres przechowywania danych (dni)
                  </label>
                  <select
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange("dataRetention", parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="30">30 dni</option>
                    <option value="90">90 dni</option>
                    <option value="365">365 dni</option>
                    <option value="1095">3 lata</option>
                    <option value="0">Bez limitu</option>
                  </select>
                </div>
                <div className="space-y-1 divide-y divide-gray-100">
                  <ToggleSwitch
                    enabled={settings.autoSave}
                    onChange={(value) => handleSettingChange("autoSave", value)}
                    label="Automatyczne zapisywanie"
                    description="Automatycznie zapisuj zmiany w formularzach"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}