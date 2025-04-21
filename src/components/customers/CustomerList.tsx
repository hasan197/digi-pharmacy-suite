
import { useState } from "react";
import { Search, Filter, PlusCircle, FileText, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample customer data
const SAMPLE_CUSTOMERS = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    lastVisit: "2023-04-15",
    prescriptionCount: 5,
  },
  {
    id: "2",
    name: "Sarah Connor",
    email: "sarah.connor@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Somewhere, CA 67890",
    lastVisit: "2023-04-18",
    prescriptionCount: 3,
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "(555) 456-7890",
    address: "789 Pine Rd, Nowhere, CA 54321",
    lastVisit: "2023-03-25",
    prescriptionCount: 8,
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    phone: "(555) 234-5678",
    address: "321 Cedar Ln, Elsewhere, CA 13579",
    lastVisit: "2023-04-10",
    prescriptionCount: 2,
  },
  {
    id: "5",
    name: "David Thompson",
    email: "david.t@example.com",
    phone: "(555) 876-5432",
    address: "654 Birch St, Anywhere, CA 97531",
    lastVisit: "2023-04-05",
    prescriptionCount: 1,
  }
];

const CustomerList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [filteredCustomers, setFilteredCustomers] = useState(SAMPLE_CUSTOMERS);

  // Apply filtering and sorting
  const applyFilters = () => {
    let result = [...SAMPLE_CUSTOMERS];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(customer => 
        customer.name.toLowerCase().includes(query) || 
        customer.email.toLowerCase().includes(query) ||
        customer.phone.includes(query)
      );
    }
    
    // Apply sorting
    if (sortOption === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "recent") {
      result.sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime());
    } else if (sortOption === "prescriptions") {
      result.sort((a, b) => b.prescriptionCount - a.prescriptionCount);
    }
    
    setFilteredCustomers(result);
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Customer Management</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Customer
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-9"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-3">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="recent">Most Recent Visit</SelectItem>
              <SelectItem value="prescriptions">Most Prescriptions</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary" size="icon" onClick={applyFilters}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="text-center">Prescriptions</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="animate-in">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.address}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm flex items-center">
                        <Phone className="h-3 w-3 mr-2" />
                        {customer.phone}
                      </p>
                      <p className="text-sm flex items-center">
                        <Mail className="h-3 w-3 mr-2" />
                        {customer.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{customer.lastVisit}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{customer.prescriptionCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Customer Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>View Prescription History</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Add New Prescription</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Remove Customer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-muted-foreground">No customers found with the current filters.</p>
                  <Button variant="link" onClick={() => {
                    setSearchQuery("");
                    setSortOption("name-asc");
                  }}>
                    Reset Filters
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination - simplified for the demo */}
      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredCustomers.length}</span> of{" "}
          <span className="font-medium">{SAMPLE_CUSTOMERS.length}</span> customers
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

export default CustomerList;
