import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, MoreHorizontal } from "lucide-react";
import PatientDetailView from "./PatientDetailView"; // Import the new component

const mockPatients = [
  { id: "PAT001", name: "Priya Sharma", prakriti: "Vata-Pitta", status: "Active", lastVisit: "2025-09-15", age: 28, contact: "priya.s@example.com" },
  { id: "PAT002", name: "Rajesh Kumar", prakriti: "Kapha-Vata", status: "Follow-up", lastVisit: "2025-09-10", age: 45, contact: "rajesh.k@example.com" },
  { id: "PAT003", name: "Meera Patel", prakriti: "Pitta", status: "Active", lastVisit: "2025-09-14", age: 35, contact: "meera.p@example.com" },
  { id: "PAT004", name: "Arjun Singh", prakriti: "Kapha", status: "Pending", lastVisit: "2025-09-12", age: 52, contact: "arjun.s@example.com" },
  { id: "PAT005", name: "Sunita Reddy", prakriti: "Vata", status: "Completed", lastVisit: "2025-08-20", age: 31, contact: "sunita.r@example.com" },
  { id: "PAT006", name: "Vikram Mehta", prakriti: "Pitta-Kapha", status: "Active", lastVisit: "2025-09-16", age: 39, contact: "vikram.m@example.com" },
];

const PatientsManagement = () => {
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

  if (selectedPatient) {
    return <PatientDetailView patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
  }

  return (
    <Card className="shadow-warm border-0 bg-card/50 backdrop-blur-sm animate-fade-up">
      <CardHeader>
        <CardTitle>Patient Management</CardTitle>
        <p className="text-sm text-muted-foreground">View, search, and manage all your patients.</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search patients by name or ID..." className="pl-9" />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Prakriti</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPatients.map((patient) => (
                <TableRow key={patient.id} onClick={() => setSelectedPatient(patient)} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.prakriti}</TableCell>
                  <TableCell>
                     <Badge variant="secondary" className={
                        patient.status === "Active" ? "bg-accent/10 text-accent" 
                        : patient.status === "Pending" ? "bg-warm/10 text-warm" 
                        : "bg-muted text-muted-foreground"
                      }>{patient.status}</Badge>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); alert('Actions for ' + patient.name); }}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientsManagement;