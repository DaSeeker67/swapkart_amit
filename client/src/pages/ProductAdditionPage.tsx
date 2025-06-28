import { useState, useRef } from 'react';
import Header from '@/components/common/Header';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { Plus, X, Image as ImageIcon, Package, Tag, Star } from 'lucide-react';

const categories = [
  'Electronics', 'Clothing',  'Grocery'
];
const badges = [
  'Bestseller', 'New Launch', 'Top Rated', "Editor's Choice", 'Deal of the Day', 'Premium', 'Limited Edition', 'Flash Sale'
];
const materialOptions = [
  'Aluminium', 'Cotton', 'Plastic', 'Organinc',
];
const countryOptions = [
  'India', 'China', 'USA', 'Germany', 'Bangladesh'
];
const transportModes = [
  'Truck', 'Sea', 'Air'
];
const packagingTypes = [
 'Plastic Wrap', 'Cardboard Box', 'None', 'Glass Bottle', 'Mixed'
];
const recyclableOptions = [
  'Yes', 'No', 'Partially'
];

const LeafIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="#22c55e" viewBox="0 0 20 20">
    <path d="M2.166 10.5c2.5-6.5 11.334-10 15.667-8.5C19.5 13.5 7.5 20 2.166 10.5z"/>
    <path d="M7 13c2-2 5-5 8-7" stroke="#166534" strokeWidth="1" fill="none"/>
  </svg>
);

const ProductAdditionPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    originalPrice: '',
    description: '',
    specifications: [{ key: '', value: '' }],
    features: [''],
    images: [],
    badge: '',
    inStock: true,
    stockQuantity: '',
    sku: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    warranty: '',
    returnPolicy: '7',
    shippingInfo: {
      freeShipping: true,
      shippingCost: '',
      estimatedDelivery: '2-3'
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: ''
    },
    material: '',
    countryOfOrigin: '',
    packagingType: '',
    isRecyclable: '',
    transportMode: ''
  });

  const [imagePreview, setImagePreview] = useState([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [isPreview, setIsPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showEco, setShowEco] = useState(false);
  const [ecoTabVisible, setEcoTabVisible] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleSpecificationChange = (index, field, value) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }]
    }));
  };

  const removeSpecification = (index) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            id: Date.now() + Math.random(),
            file: file,
            url: e.target.result,
            name: file.name
          };
          setImagePreview(prev => [...prev, newImage]);
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, newImage]
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (imageId) => {
    setImagePreview(prev => prev.filter(img => img.id !== imageId));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.originalPrice || parseFloat(formData.originalPrice) <= 0) newErrors.originalPrice = 'Valid original price is required';
    if (parseFloat(formData.price) > parseFloat(formData.originalPrice)) newErrors.price = 'Price cannot be higher than original price';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0) newErrors.stockQuantity = 'Valid stock quantity is required';
    if (!formData.material) newErrors.material = 'Material is required';
    if (!formData.countryOfOrigin) newErrors.countryOfOrigin = 'Country of origin is required';
    if (!formData.packagingType) newErrors.packagingType = 'Packaging type is required';
    if (!formData.isRecyclable) newErrors.isRecyclable = 'Recyclable info is required';
    if (!formData.transportMode) newErrors.transportMode = 'Transport mode is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const discount = Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice)) * 100);
      const productData = {
        ...formData,
        discount: `${discount}% off`,
        id: Date.now(),
        rating: 0,
        reviews: 0,
        createdAt: new Date().toISOString()
      };
      console.log('Product saved:', productData);
      alert('Product saved successfully!');
    } catch (error) {
      alert('Error saving product');
    } finally {
      setIsSaving(false);
    }
  };

  // --- ECO INFO SECTION ---
  const renderEcoInfo = () => (
    <div className="space-y-6 border rounded-lg p-6 bg-green-50 border-green-200 mt-6 relative">
      <div className="absolute top-4 right-4">
        <LeafIcon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-2">
        <LeafIcon className="w-6 h-6" />
        Eco Information
      </h3>
      <p className="text-green-900 text-sm mb-4">
        Buyers tend to prefer eco-friendly products. Providing accurate ecological information increases trust and sales.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Material */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Material *</label>
          <select
            value={formData.material || ''}
            onChange={(e) => handleInputChange('material', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${errors.material ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select material</option>
            {materialOptions.map((mat) => <option key={mat} value={mat}>{mat}</option>)}
          </select>
          {errors.material && <p className="mt-1 text-sm text-red-600">{errors.material}</p>}
        </div>
        {/* Country of Origin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country of Origin *</label>
          <select
            value={formData.countryOfOrigin || ''}
            onChange={(e) => handleInputChange('countryOfOrigin', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${errors.countryOfOrigin ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select country</option>
            {countryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.countryOfOrigin && <p className="mt-1 text-sm text-red-600">{errors.countryOfOrigin}</p>}
        </div>
        {/* Packaging Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Packaging Type *</label>
          <select
            value={formData.packagingType || ''}
            onChange={(e) => handleInputChange('packagingType', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${errors.packagingType ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select packaging type</option>
            {packagingTypes.map((pack) => <option key={pack} value={pack}>{pack}</option>)}
          </select>
          {errors.packagingType && <p className="mt-1 text-sm text-red-600">{errors.packagingType}</p>}
        </div>
        {/* Is Product Recyclable */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Is Product Recyclable? *</label>
          <select
            value={formData.isRecyclable || ''}
            onChange={(e) => handleInputChange('isRecyclable', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${errors.isRecyclable ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select option</option>
            {recyclableOptions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {errors.isRecyclable && <p className="mt-1 text-sm text-red-600">{errors.isRecyclable}</p>}
        </div>
        {/* Transport Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Transport Mode *</label>
          <select
            value={formData.transportMode || ''}
            onChange={(e) => handleInputChange('transportMode', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${errors.transportMode ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select transport mode</option>
            {transportModes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
          </select>
          {errors.transportMode && <p className="mt-1 text-sm text-red-600">{errors.transportMode}</p>}
        </div>
        {/* Weight in grams */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight (g)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0"
            min="0"
            step="1"
          />
        </div>
      </div>
    </div>
  );

  // --- BASIC INFO SECTION (remove eco fields from here) ---
  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Basic Information</h2>
       
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter product name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand *
          </label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.brand ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter brand name"
          />
          {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
        </div>
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>
        {/* Badge */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Badge
          </label>
          <select
            value={formData.badge}
            onChange={(e) => handleInputChange('badge', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select badge (optional)</option>
            {badges.map(badge => (
              <option key={badge} value={badge}>{badge}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter product description"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
      {/* Original Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Original Price (₹) *
        </label>
        <input
          type="number"
          value={formData.originalPrice}
          onChange={(e) => handleInputChange('originalPrice', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
            errors.originalPrice ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="0.00"
          min="0"
          step="0.01"
        />
        {errors.originalPrice && <p className="mt-1 text-sm text-red-600">{errors.originalPrice}</p>}
      </div>
      {/* Selling Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selling Price (₹) *
        </label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => handleInputChange('price', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
            errors.price ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="0.00"
          min="0"
          step="0.01"
        />
        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        {formData.price && formData.originalPrice && (
          <p className="mt-1 text-sm text-green-600">
            Discount: {Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice)) * 100)}%
          </p>
        )}
      </div>
    </div>
  );

  const renderImages = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images *
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop images here, or{' '}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              browse
            </button>
          </p>
          <p className="text-xs text-gray-500">Support: JPG, PNG, GIF (Max 5MB each)</p>
        </div>
        {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
      </div>
      {imagePreview.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Uploaded Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imagePreview.map((image, index) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SKU
          </label>
          <input
            type="text"
            value={formData.sku}
            onChange={(e) => handleInputChange('sku', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter SKU"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock Quantity *
          </label>
          <input
            type="number"
            value={formData.stockQuantity}
            onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.stockQuantity ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0"
            min="0"
          />
          {errors.stockQuantity && <p className="mt-1 text-sm text-red-600">{errors.stockQuantity}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0.0"
            min="0"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Warranty
          </label>
          <input
            type="text"
            value={formData.warranty}
            onChange={(e) => handleInputChange('warranty', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., 1 year manufacturer warranty"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dimensions (cm)
        </label>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            value={formData.dimensions.length}
            onChange={(e) => handleNestedInputChange('dimensions', 'length', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Length"
            min="0"
          />
          <input
            type="number"
            value={formData.dimensions.width}
            onChange={(e) => handleNestedInputChange('dimensions', 'width', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Width"
            min="0"
          />
          <input
            type="number"
            value={formData.dimensions.height}
            onChange={(e) => handleNestedInputChange('dimensions', 'height', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Height"
            min="0"
          />
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="inStock"
          checked={formData.inStock}
          onChange={(e) => handleInputChange('inStock', e.target.checked)}
          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
        <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
          Product is in stock
        </label>
      </div>
    </div>
  );

  const renderSpecifications = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Product Specifications</h3>
          <button
            type="button"
            onClick={addSpecification}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Specification
          </button>
        </div>
        <div className="space-y-3">
          {formData.specifications.map((spec, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={spec.key}
                onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Specification name (e.g., Display Size)"
              />
              <input
                type="text"
                value={spec.value}
                onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Specification value (e.g., 6.1 inches)"
              />
              <button
                type="button"
                onClick={() => removeSpecification(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                disabled={formData.specifications.length === 1}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Key Features</h3>
          <button
            type="button"
            onClick={addFeature}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Feature
          </button>
        </div>
        <div className="space-y-3">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter key feature"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                disabled={formData.features.length === 1}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Package },
    ...(ecoTabVisible ? [{ id: 'eco', label: 'Eco Info', icon: LeafIcon }] : []),
    { id: 'images', label: 'Images', icon: ImageIcon },
    { id: 'inventory', label: 'Inventory', icon: Tag },
    { id: 'specifications', label: 'Specifications', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>
      <Navigation/>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              {/* Eco Info Add/Remove Button */}
              {!ecoTabVisible ? (
                <button
                  type="button"
                  onClick={() => setEcoTabVisible(true)}
                  className="w-full flex items-center gap-2 px-4 py-2 mb-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all duration-200 animate-pulse"
                >
                  <LeafIcon className="w-5 h-5" />
                  Add Eco Info Section
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setEcoTabVisible(false);
                    if (activeTab === 'eco') setActiveTab('basic');
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 mb-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                  Remove Eco Info Section
                </button>
              )}
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  const isEco = tab.id === 'eco';
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                        ${activeTab === tab.id
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'text-gray-700 hover:bg-gray-50'}
                        ${isEco ? 'relative overflow-hidden' : ''}
                      `}
                      style={isEco ? { position: 'relative' } : {}}
                    >
                      <span
                        className={isEco
                          ? `transition-transform duration-200 ${activeTab === 'eco' ? 'scale-110 drop-shadow-[0_0_8px_#22c55e]' : 'group-hover:scale-105 group-hover:drop-shadow-[0_0_6px_#bbf7d0]'}` 
                          : ''}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      {tab.label}
                      {isEco && (
                        <span
                          className={`absolute inset-0 pointer-events-none rounded-lg transition-all duration-300
                            ${activeTab === 'eco' ? 'ring-2 ring-green-400/60' : ''}
                          `}
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'basic' && renderBasicInfo()}
              {activeTab === 'eco' && renderEcoInfo()}
              {activeTab === 'images' && renderImages()}
              {activeTab === 'inventory' && renderInventory()}
              {activeTab === 'specifications' && renderSpecifications()}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductAdditionPage;