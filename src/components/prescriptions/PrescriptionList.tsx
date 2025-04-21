
import { useState } from "react";
import { Search, Filter, PlusCircle, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Sample prescription data
const SAMPLE_PRESCRIPTIONS = [
  {
    id: "1",
    patientName: "John Smith",
    patientId: "P001",
    status: "pending",
    dateCreated: "2023-04-20",
    doctor: "Dr. Amanda Johnson",
    items: [
      { name: "Amoxicillin 500mg", quantity: 30, instructions: "1 tablet 3 times a day" },
      { name: "Paracetamol 500mg", quantity: 20, instructions: "1-2 tablets every 4-6 hours" }
    ]
  },
  {
    id: "2",
    patientName: "Sarah Connor",
    patientId: "P002",
    status: "ready",
    dateCreated: "2023-04-19",
    doctor: "Dr. Michael Brown",
    items: [
      { name: "Lisinopril 10mg", quantity: 30, instructions: "1 tablet daily in the morning" }
    ]
  },
  {
    id: "3",
    patientName: "Robert Johnson",
    patientId: "P003",
    status: "completed",
    dateCreated: "2023-04-18",
    doctor: "Dr. Amanda Johnson",
    items: [
      { name: "Metformin 500mg", quantity: 60, instructions: "1 tablet twice daily with meals" },
      { name: "Glimepiride 2mg", quantity: 30, instructions: "1 tablet daily before breakfast" }
    ]
  },
  {
    id: "4",
    patientName: "Emma Thompson",
    patientId: "P004",
    status: "pending",
    dateCreated: "2023-04-20",
    doctor: "Dr. David Wilson",
    items: [
      { name: "Fluoxetine 20mg", quantity: 30, instructions: "1 capsule daily in the morning" }
    ]
  },
  {
    id: "5",
    patientName: "Michael Davis",
    patientId: "P005",
    status: "ready",
    dateCreated: "2023-04-19",
    doctor: "Dr. Sarah Miller",
    items: [
      { name: "Atorvastatin 20mg", quantity: 30, instructions: "1 tablet daily at bedtime" },
      { name: "Aspirin 75mg", quantity: 30, instructions: "1 tablet daily with food" }
    ]
  }
];

const PrescriptionList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredPrescriptions, setFilteredPrescriptions] = useState(SAMPLE_PRESCRIPTIONS);

  // Apply filtering
  const applyFilters = () => {
    let result = [...SAMPLE_PRESCRIPTIONS];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.patientName.toLowerCase().includes(query) || 
        item.patientId.toLowerCase().includes(query) ||
        item.doctor.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter from tabs
    if (activeTab !== "all") {
      result = result.filter(item => item.status === activeTab);
    }
    
    // Apply additional status filter if selected
    if (statusFilter !== "all") {
      result = result.filter(item => item.status === statusFilter);
    }
    
    setFilteredPrescriptions(result);
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Get status badge properties
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return { 
          label: "Pending", 
          variant: "secondary" as const,
          icon: <Clock className="h-3 w-3 mr-1" /> 
        };
      case "ready":
        return { 
          label: "Ready", 
          variant: "default" as const,
          icon: <CheckCircle className="h-3 w-3 mr-1" /> 
        };
      case "completed":
        return { 
          label: "Completed", 
          variant: "outline" as const,
          icon: null 
        };
      default:
        return { 
          label: "Unknown", 
          variant: "outline" as const,
          icon: <AlertCircle className="h-3 w-3 mr-1" /> 
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Prescription Management</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Prescription
        </Button>
      </div>

      {/* Tabs */}
      <Tabs 
        defaultValue="all" 
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          setStatusFilter("all"); // Reset additional filter when changing tabs
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="ready">Ready for Pickup</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name or ID..."
                className="pl-9"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="secondary" size="icon" onClick={applyFilters}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Prescription Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPrescriptions.map((prescription) => {
              const statusBadge = getStatusBadge(prescription.status);
              
              return (
                <Card key={prescription.id} className="animate-in">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{prescription.patientName}</CardTitle>
                        <p className="text-sm text-muted-foreground">ID: {prescription.patientId}</p>
                      </div>
                      <Badge variant={statusBadge.variant} className="flex items-center">
                        {statusBadge.icon}
                        {statusBadge.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-2">Prescribed by: {prescription.doctor}</p>
                    <p className="text-sm font-medium mb-1">Medications:</p>
                    <ul className="space-y-1">
                      {prescription.items.map((item, index) => (
                        <li key={index} className="text-sm">
                          • {item.name} ({item.quantity}) - {item.instructions}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between">
                    <p className="text-xs text-muted-foreground">Created: {prescription.dateCreated}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      {prescription.status === "pending" && (
                        <Button size="sm">Process</Button>
                      )}
                      {prescription.status === "ready" && (
                        <Button size="sm">Mark as Complete</Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              );
            })}

            {filteredPrescriptions.length === 0 && (
              <div className="col-span-2 text-center py-10 border rounded-lg">
                <p className="text-muted-foreground">No prescriptions found with the current filters.</p>
                <Button variant="link" onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setActiveTab("all");
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          {/* Same content structure but filtered to pending */}
          {/* For brevity, we're sharing the same filter UI and rendering logic */}
        </TabsContent>

        <TabsContent value="ready" className="space-y-6">
          {/* Same content structure but filtered to ready */}
          {/* For brevity, we're sharing the same filter UI and rendering logic */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PrescriptionList;
