
import { useState, useEffect } from "react";
import { Search, Filter, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InventoryItem from "@/components/ui/InventoryItem";

// Sample inventory data
const SAMPLE_INVENTORY = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    sku: "MED001",
    category: "Pain Relief",
    stock: 5,
    price: 9.99,
    expiryDate: "2025/03/15",
    manufacturer: "PharmaCorp",
    lowStock: true,
    expired: false,
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    sku: "MED002",
    category: "Antibiotics",
    stock: 42,
    price: 15.50,
    expiryDate: "2025/06/30",
    manufacturer: "MedPharm",
    lowStock: false,
    expired: false,
  },
  {
    id: "3",
    name: "Ibuprofen 200mg",
    sku: "MED003",
    category: "Pain Relief",
    stock: 120,
    price: 7.99,
    expiryDate: "2024/12/10",
    manufacturer: "HealthCare Inc",
    lowStock: false,
    expired: false,
  },
  {
    id: "4",
    name: "Cetirizine 10mg",
    sku: "MED004",
    category: "Allergy",
    stock: 80,
    price: 12.25,
    expiryDate: "2023/09/22",
    manufacturer: "AllergyRelief",
    lowStock: false,
    expired: true,
  },
  {
    id: "5",
    name: "Vitamin D3 1000IU",
    sku: "VIT001",
    category: "Vitamins",
    stock: 0,
    price: 14.99,
    expiryDate: "2025/01/01",
    manufacturer: "VitaHealth",
    lowStock: true,
    expired: false,
  },
  {
    id: "6",
    name: "Omeprazole 20mg",
    sku: "MED005",
    category: "Digestive",
    stock: 35,
    price: 18.75,
    expiryDate: "2024/11/15",
    manufacturer: "GastroHealth",
    lowStock: false,
    expired: false,
  },
];

const InventoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("name-asc");
  const [filteredInventory, setFilteredInventory] = useState(SAMPLE_INVENTORY);

  // Apply filtering and sorting
  const applyFilters = () => {
    let result = [...SAMPLE_INVENTORY];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.sku.toLowerCase().includes(query) ||
        item.manufacturer?.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    // Apply sorting
    if (sortOption === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "stock-asc") {
      result.sort((a, b) => a.stock - b.stock);
    } else if (sortOption === "stock-desc") {
      result.sort((a, b) => b.stock - a.stock);
    } else if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredInventory(result);
  };

  // Effect to apply filters whenever dependencies change
  useEffect(() => {
    applyFilters();
  }, [searchQuery, categoryFilter, sortOption]);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Extract unique categories for the filter
  const categories = Array.from(new Set(SAMPLE_INVENTORY.map(item => item.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Inventory Management</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Item
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, SKU, or manufacturer..."
            className="pl-9"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="stock-asc">Stock (Low-High)</SelectItem>
              <SelectItem value="stock-desc">Stock (High-Low)</SelectItem>
              <SelectItem value="price-asc">Price (Low-High)</SelectItem>
              <SelectItem value="price-desc">Price (High-Low)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Inventory Items */}
      <div className="space-y-4">
        {filteredInventory.length > 0 ? (
          filteredInventory.map((item) => (
            <InventoryItem 
              key={item.id}
              name={item.name}
              sku={item.sku}
              category={item.category}
              stock={item.stock}
              price={item.price}
              expiryDate={item.expiryDate}
              manufacturer={item.manufacturer}
              lowStock={item.lowStock}
              expired={item.expired}
            />
          ))
        ) : (
          <div className="text-center py-10 border rounded-lg">
            <p className="text-muted-foreground">No inventory items found with the current filters.</p>
            <Button variant="link" onClick={() => {
              setSearchQuery("");
              setCategoryFilter("all");
              setSortOption("name-asc");
            }}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Pagination - simplified for the demo */}
      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredInventory.length}</span> of{" "}
          <span className="font-medium">{SAMPLE_INVENTORY.length}</span> items
        </p>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryList;
