
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(price);
};


export const extractPrice = (priceString: string): number => {
  return parseFloat(priceString.replace(/[₹,]/g, ''));
};


export const calculateDiscount = (originalPrice: number, salePrice: number): number => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};


export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};


export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};


export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};


export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};


export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};


export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};


export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};


export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};


export const sortProducts = (products: any[], sortBy: string) => {
  switch (sortBy) {
    case 'price-low':
      return [...products].sort((a, b) => 
        extractPrice(a.price) - extractPrice(b.price)
      );
    case 'price-high':
      return [...products].sort((a, b) => 
        extractPrice(b.price) - extractPrice(a.price)
      );
    case 'rating':
      return [...products].sort((a, b) => b.rating - a.rating);
    case 'newest':
      return [...products].sort((a, b) => b.id - a.id);
    default:
      return products;
  }
};


export const filterProducts = (products: any[], filters: any) => {
  return products.filter(product => {
    
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    

    if (filters.priceRange) {
      const price = extractPrice(product.price);
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false;
      }
    }
    

    if (filters.rating && product.rating < filters.rating) {
      return false;
    }
    

    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }
    
    return true;
  });
};


export const getRandomProducts = (products: any[], count: number) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};


export const isOnSale = (product: any): boolean => {
  return extractPrice(product.originalPrice) > extractPrice(product.price);
};


export const getSalePercentage = (product: any): number => {
  const original = extractPrice(product.originalPrice);
  const current = extractPrice(product.price);
  return calculateDiscount(original, current);
};