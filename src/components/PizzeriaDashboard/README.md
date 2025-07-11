# Pizzeria Management System

A comprehensive pizzeria management system for the Pizzuj platform, featuring advanced analytics, menu management, and operational tools.

## 🚀 Features

### Core Components
- **PizzeriaDashboard**: Main dashboard with navigation and state management
- **PizzeriaManagement**: Comprehensive pizzeria overview and settings
- **MenuManagement**: Complete menu management with categories and pricing
- **AnalyticsDashboard**: Advanced analytics and performance metrics
- **PizzeriaCard**: Individual pizzeria display cards
- **AddPizzeriaForm**: Form for adding new pizzerias

### Management Features
- **Multi-view Navigation**: Seamless switching between list, management, menu, and analytics views
- **Real-time Analytics**: Performance metrics, revenue tracking, and customer insights
- **Menu Management**: Category-based menu organization with pricing and availability
- **Operational Tools**: Settings, promotions, and business management
- **Responsive Design**: Works on all devices and screen sizes

## 📦 Components Overview

### PizzeriaDashboard
Main orchestrator component that manages:
- List view of all pizzerias
- Navigation between different management views
- State management for selected pizzeria
- Integration with all management components

### PizzeriaManagement
Comprehensive management interface with:
- **Overview Tab**: Basic info, quick stats, recent activity
- **Menu Tab**: Complete menu management system
- **Analytics Tab**: Performance metrics and insights
- **Promotions Tab**: Active promotions and marketing tools
- **Settings Tab**: Operational settings and preferences

### MenuManagement
Advanced menu management featuring:
- **Category Organization**: Pizza, pasta, salads, drinks, desserts, sides
- **Item Management**: Add, edit, delete menu items
- **Pricing Control**: Set and update prices
- **Availability Toggle**: Enable/disable items
- **Ingredient Tracking**: Manage ingredients and allergens
- **Preparation Time**: Set preparation times for each item

### AnalyticsDashboard
Comprehensive analytics with:
- **Revenue Tracking**: Daily, weekly, monthly revenue trends
- **Order Analytics**: Order volume and patterns
- **Customer Insights**: New customers, returning customers
- **Performance Metrics**: Average order value, delivery times
- **Top Items**: Most popular menu items
- **Order Sources**: Breakdown by platform (app, website, phone)

## 🎨 UI/UX Features

### Navigation
- **Tab-based Navigation**: Easy switching between management views
- **Breadcrumb Navigation**: Clear path back to main list
- **Contextual Headers**: Dynamic titles based on current view
- **Action Buttons**: Quick access to common actions

### Visual Design
- **Gradient Backgrounds**: Beautiful orange gradients throughout
- **Card-based Layout**: Clean, organized information display
- **Hover Effects**: Interactive elements with smooth transitions
- **Status Indicators**: Visual feedback for availability and status
- **Progress Bars**: Animated progress indicators

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Grid Layouts**: Responsive grid systems
- **Flexible Components**: Adapt to different screen sizes
- **Touch-friendly**: Large touch targets for mobile

## 📊 Analytics Features

### Revenue Analytics
- **Time-based Tracking**: Daily, weekly, monthly revenue
- **Growth Indicators**: Percentage changes and trends
- **Visual Charts**: Animated bar charts and graphs
- **Comparative Analysis**: Period-over-period comparisons

### Customer Analytics
- **Customer Acquisition**: New customer tracking
- **Retention Metrics**: Returning customer rates
- **Satisfaction Scores**: Rating and review tracking
- **Behavior Patterns**: Order frequency and preferences

### Operational Analytics
- **Order Processing**: Order volume and processing times
- **Delivery Performance**: Delivery time tracking
- **Menu Performance**: Item popularity and profitability
- **Source Attribution**: Order source breakdown

## 🍕 Menu Management Features

### Category Management
- **Pizza**: Traditional and specialty pizzas
- **Pasta**: Various pasta dishes
- **Salads**: Fresh salads and sides
- **Drinks**: Beverages and soft drinks
- **Desserts**: Sweet treats and desserts
- **Sides**: Additional items and sides

### Item Management
- **Add Items**: Comprehensive form for new items
- **Edit Items**: Update existing menu items
- **Delete Items**: Remove items from menu
- **Availability Control**: Toggle item availability
- **Pricing Management**: Set and update prices
- **Description Management**: Detailed item descriptions

### Advanced Features
- **Ingredient Tracking**: List of ingredients for each item
- **Allergen Information**: Allergen warnings and information
- **Preparation Time**: Estimated preparation times
- **Calorie Information**: Nutritional information
- **Image Support**: Item photos and visual content

## ⚙️ Settings & Configuration

### Operational Settings
- **Business Hours**: Set opening and closing times
- **Delivery Area**: Define delivery radius and zones
- **Minimum Orders**: Set minimum order requirements
- **Preparation Times**: Configure preparation time estimates

### Promotional Tools
- **Discount Codes**: Create and manage discount codes
- **Happy Hours**: Set special pricing periods
- **Free Delivery**: Configure free delivery thresholds
- **Loyalty Programs**: Customer loyalty features

### Business Management
- **Contact Information**: Update business contact details
- **Location Settings**: Manage address and delivery areas
- **Payment Settings**: Configure payment methods
- **Notification Settings**: Manage customer notifications

## 🔧 Technical Implementation

### State Management
```jsx
const [pizzerias, setPizzerias] = useState([]);
const [selectedPizzeria, setSelectedPizzeria] = useState(null);
const [activeView, setActiveView] = useState('list');
```

### Navigation Flow
1. **List View**: Overview of all pizzerias
2. **Management View**: Detailed pizzeria management
3. **Menu View**: Menu management and editing
4. **Analytics View**: Performance metrics and insights

### Data Structure
```jsx
const pizzeria = {
  id: 1,
  name: "Pizzeria Bella",
  address: "ul. Marszałkowska 123, Warszawa",
  phone: "+48 123 456 789",
  website: "www.pizzeriabella.pl",
  description: "Autentyczna włoska pizza w sercu Warszawy",
  rating: 4.8,
  isPremium: true
};
```

## 🎯 Usage Examples

### Adding a New Pizzeria
```jsx
const handleAddPizzeria = (pizzeriaData) => {
  const newPizzeria = {
    id: generateId(),
    ...pizzeriaData,
    rating: 0,
    isPremium: false
  };
  setPizzerias([...pizzerias, newPizzeria]);
};
```

### Managing Menu Items
```jsx
const handleAddMenuItem = (itemData) => {
  const newItem = {
    id: generateId(),
    ...itemData,
    isAvailable: true
  };
  setMenuItems([...menuItems, newItem]);
};
```

### Analytics Integration
```jsx
const analyticsData = {
  revenue: 12450,
  orders: 156,
  customers: 23,
  avgOrder: 79.8
};
```

## 🚀 Performance Features

### Optimizations
- **Lazy Loading**: Components load only when needed
- **Memoization**: Cached calculations for analytics
- **Efficient Rendering**: Optimized re-renders
- **Smooth Animations**: 60fps animations with Framer Motion

### Data Management
- **Local State**: Fast local state management
- **Optimistic Updates**: Immediate UI feedback
- **Error Handling**: Graceful error management
- **Loading States**: Clear loading indicators

## 🔮 Future Enhancements

### Planned Features
- [ ] **Real-time Updates**: Live data synchronization
- [ ] **Advanced Analytics**: Machine learning insights
- [ ] **Inventory Management**: Stock tracking and alerts
- [ ] **Employee Management**: Staff scheduling and roles
- [ ] **Customer Database**: Customer relationship management
- [ ] **Integration APIs**: Third-party service integration
- [ ] **Mobile App**: Native mobile application
- [ ] **Multi-location**: Support for multiple locations

### Technical Improvements
- [ ] **Offline Support**: PWA capabilities
- [ ] **Push Notifications**: Real-time alerts
- [ ] **Data Export**: CSV/PDF report generation
- [ ] **API Integration**: External service connections
- [ ] **Performance Monitoring**: Advanced analytics tracking

## 📝 Contributing

When adding new features:

1. **Follow Component Structure**: Use established patterns
2. **Maintain Responsive Design**: Ensure mobile compatibility
3. **Add Animations**: Include smooth transitions
4. **Update Documentation**: Keep README current
5. **Test Thoroughly**: Ensure all features work correctly

## 📄 License

This pizzeria management system is part of the Pizzuj project and follows the same licensing terms. 