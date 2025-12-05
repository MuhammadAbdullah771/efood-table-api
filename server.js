const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data storage (in-memory, can be saved to file)
let dataStore = {
  config: {
    currency_symbol: '$',
    time_format: '12',
    decimal_point_settings: 2,
    currency_symbol_position: 'before',
    restaurant_logo: 'https://via.placeholder.com/200',
    restaurant_phone: '+1234567890',
    restaurant_email: 'restaurant@example.com',
    halal_tag_status: 1,
    is_veg_non_veg_active: 1,
    base_urls: {
      product_image_url: 'https://via.placeholder.com/300',
      customer_image_url: 'https://via.placeholder.com/300',
      banner_image_url: 'https://via.placeholder.com/800x200',
      category_image_url: 'https://via.placeholder.com/300',
      category_banner_image_url: 'https://via.placeholder.com/800x200',
      review_image_url: 'https://via.placeholder.com/300',
      notification_image_url: 'https://via.placeholder.com/300',
      restaurant_image_url: 'https://via.placeholder.com/300',
      delivery_man_image_url: 'https://via.placeholder.com/300',
      chat_image_url: 'https://via.placeholder.com/300',
      promotional_url: 'https://via.placeholder.com/800x200'
    },
    branch: [
      {
        id: 1,
        name: 'Main Branch',
        email: 'branch1@example.com',
        password: 'password123',
        latitude: '24.7136',
        longitude: '46.6753',
        address: '123 Main Street',
        status: 1,
        branch_promotion_status: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        coverage: 5,
        image: 'https://via.placeholder.com/300',
        table: [
          { id: 1, number: 1, capacity: 4, is_available: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: 2, number: 2, capacity: 6, is_available: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: 3, number: 3, capacity: 2, is_available: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { id: 4, number: 4, capacity: 8, is_available: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
        ]
      }
    ],
    promotion_campaign: []
  },
  categories: [
    { id: 1, name: 'Appetizers', image: 'https://via.placeholder.com/300', parent_id: 0, position: 1, status: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 2, name: 'Main Course', image: 'https://via.placeholder.com/300', parent_id: 0, position: 2, status: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 3, name: 'Desserts', image: 'https://via.placeholder.com/300', parent_id: 0, position: 3, status: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 4, name: 'Beverages', image: 'https://via.placeholder.com/300', parent_id: 0, position: 4, status: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ],
  products: [
    {
      id: 1,
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with caesar dressing',
      image: 'https://via.placeholder.com/300',
      category_id: 1,
      category_ids: [1],
      price: 12.99,
      discount: 0,
      discount_type: 'percent',
      tax: 8.5,
      available_time_starts: '10:00',
      available_time_ends: '22:00',
      status: 1,
      restaurant_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      variations: [],
      add_ons: [],
      choice_options: [],
      is_veg: 1,
      is_halal: 1
    },
    {
      id: 2,
      name: 'Grilled Chicken',
      description: 'Tender grilled chicken breast with herbs',
      image: 'https://via.placeholder.com/300',
      category_id: 2,
      category_ids: [2],
      price: 18.99,
      discount: 10,
      discount_type: 'percent',
      tax: 8.5,
      available_time_starts: '11:00',
      available_time_ends: '22:00',
      status: 1,
      restaurant_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      variations: [],
      add_ons: [],
      choice_options: [],
      is_veg: 0,
      is_halal: 1
    },
    {
      id: 3,
      name: 'Chocolate Cake',
      description: 'Rich chocolate cake with frosting',
      image: 'https://via.placeholder.com/300',
      category_id: 3,
      category_ids: [3],
      price: 8.99,
      discount: 0,
      discount_type: 'percent',
      tax: 8.5,
      available_time_starts: '12:00',
      available_time_ends: '22:00',
      status: 1,
      restaurant_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      variations: [],
      add_ons: [],
      choice_options: [],
      is_veg: 1,
      is_halal: 1
    },
    {
      id: 4,
      name: 'Fresh Orange Juice',
      description: 'Freshly squeezed orange juice',
      image: 'https://via.placeholder.com/300',
      category_id: 4,
      category_ids: [4],
      price: 4.99,
      discount: 0,
      discount_type: 'percent',
      tax: 8.5,
      available_time_starts: '08:00',
      available_time_ends: '22:00',
      status: 1,
      restaurant_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      variations: [],
      add_ons: [],
      choice_options: [],
      is_veg: 1,
      is_halal: 1
    }
  ],
  orders: []
};

// Load data from file if exists (with error handling for read-only file systems)
const dataFile = path.join(__dirname, 'data.json');
let canWriteToFile = true;

if (fs.existsSync(dataFile)) {
  try {
    dataStore = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  } catch (e) {
    console.log('Could not load data file, using defaults');
  }
}

// Save data to file (with error handling for cloud hosting)
function saveData() {
  if (!canWriteToFile) return; // Skip if file system is read-only
  
  try {
    fs.writeFileSync(dataFile, JSON.stringify(dataStore, null, 2));
  } catch (e) {
    // If write fails (e.g., read-only file system), disable file writes
    // Data will still persist in memory during the session
    canWriteToFile = false;
    console.log('File system is read-only, data will persist in memory only');
  }
}

// API Routes

// Config endpoint
app.get('/api/v1/config/table', (req, res) => {
  res.json(dataStore.config);
});

// Categories endpoint
app.get('/api/v1/categories', (req, res) => {
  const limit = parseInt(req.query.limit) || 200;
  const offset = parseInt(req.query.offset) || 1;
  const categories = dataStore.categories.slice(offset - 1, offset - 1 + limit);
  res.json({
    categories: categories,
    total_size: dataStore.categories.length
  });
});

// Products endpoint
app.get('/api/v1/products/latest', (req, res) => {
  const limit = parseInt(req.query.limit) || 13;
  const offset = parseInt(req.query.offset) || 0;
  let products = [...dataStore.products];

  // Filter by product type
  if (req.query.product_type) {
    const isVeg = req.query.product_type === 'veg';
    products = products.filter(p => (isVeg ? p.is_veg == 1 : p.is_veg == 0));
  }

  // Filter by category
  if (req.query.category_ids) {
    const categoryIds = req.query.category_ids.split(',').map(Number);
    products = products.filter(p => 
      p.category_ids && p.category_ids.some(id => categoryIds.includes(id))
    );
  }

  // Filter by halal
  if (req.query.is_halal !== undefined) {
    const isHalal = req.query.is_halal == 1;
    products = products.filter(p => (isHalal ? p.is_halal == 1 : p.is_halal == 0));
  }

  // Search by name
  if (req.query.name) {
    const searchTerm = req.query.name.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      (p.description && p.description.toLowerCase().includes(searchTerm))
    );
  }

  const total = products.length;
  const paginatedProducts = products.slice(offset, offset + limit);

  res.json({
    products: paginatedProducts,
    total_size: total
  });
});

// Category products endpoint
app.get('/api/v1/categories/products/:categoryId', (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  const products = dataStore.products.filter(p => 
    p.category_ids && p.category_ids.includes(categoryId)
  );
  res.json({
    products: products,
    total_size: products.length
  });
});

// Place order endpoint
app.post('/api/v1/table/order/place', (req, res) => {
  const orderData = req.body;
  const orderId = dataStore.orders.length + 1;
  const branchTableToken = `token_${Date.now()}_${orderId}`;

  const order = {
    order_id: orderId,
    branch_table_token: branchTableToken,
    ...orderData,
    order_status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  dataStore.orders.push(order);
  saveData();

  res.json({
    message: 'Order placed successfully',
    order_id: orderId,
    branch_table_token: branchTableToken
  });
});

// Order details endpoint
app.get('/api/v1/table/order/details', (req, res) => {
  const orderId = parseInt(req.query.order_id);
  const token = req.query.branch_table_token;

  const order = dataStore.orders.find(o => 
    o.order_id == orderId && o.branch_table_token === token
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Order list endpoint
app.get('/api/v1/table/order/list', (req, res) => {
  const token = req.query.branch_table_token;
  const orders = dataStore.orders.filter(o => o.branch_table_token === token);
  res.json({
    orders: orders,
    total_size: orders.length
  });
});

// Admin API - Get all data
app.get('/admin/data', (req, res) => {
  res.json(dataStore);
});

// Admin API - Update config
app.post('/admin/config', (req, res) => {
  dataStore.config = { ...dataStore.config, ...req.body };
  saveData();
  res.json({ message: 'Config updated', data: dataStore.config });
});

// Admin API - Add category
app.post('/admin/categories', (req, res) => {
  const newCategory = {
    id: dataStore.categories.length + 1,
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  dataStore.categories.push(newCategory);
  saveData();
  res.json({ message: 'Category added', data: newCategory });
});

// Admin API - Update category
app.put('/admin/categories/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = dataStore.categories.findIndex(c => c.id === id);
  if (index !== -1) {
    dataStore.categories[index] = {
      ...dataStore.categories[index],
      ...req.body,
      updated_at: new Date().toISOString()
    };
    saveData();
    res.json({ message: 'Category updated', data: dataStore.categories[index] });
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

// Admin API - Delete category
app.delete('/admin/categories/:id', (req, res) => {
  const id = parseInt(req.params.id);
  dataStore.categories = dataStore.categories.filter(c => c.id !== id);
  saveData();
  res.json({ message: 'Category deleted' });
});

// Admin API - Add product
app.post('/admin/products', (req, res) => {
  const newProduct = {
    id: dataStore.products.length + 1,
    variations: [],
    add_ons: [],
    choice_options: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...req.body
  };
  dataStore.products.push(newProduct);
  saveData();
  res.json({ message: 'Product added', data: newProduct });
});

// Admin API - Update product
app.put('/admin/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = dataStore.products.findIndex(p => p.id === id);
  if (index !== -1) {
    dataStore.products[index] = {
      ...dataStore.products[index],
      ...req.body,
      updated_at: new Date().toISOString()
    };
    saveData();
    res.json({ message: 'Product updated', data: dataStore.products[index] });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Admin API - Delete product
app.delete('/admin/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  dataStore.products = dataStore.products.filter(p => p.id !== id);
  saveData();
  res.json({ message: 'Product deleted' });
});

// Admin API - Get orders
app.get('/admin/orders', (req, res) => {
  res.json({
    orders: dataStore.orders,
    total_size: dataStore.orders.length
  });
});

// Serve admin panel
app.use(express.static(path.join(__dirname, 'admin')));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log(`📱 API Base URL: http://localhost:${PORT}`);
  console.log(`🖥️  Admin Panel: http://localhost:${PORT}/admin.html`);
  console.log(`\n✅ Server is ready for testing!`);
});

