"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store/store";

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  type: string;
  price: number;
  enginePower: number;
  fuelEfficiency: number;
  image: string;
  maxSpeed: number;
  acceleration: number;
  weight: number;
}

export default function Admin() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [editingCar, setEditingCar] =useState<Partial<Car> | null>(null); 
  const {loggedUser}=useSelector((state:RootState)=>state.admin)
console.log(loggedUser);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:5000/cars");
        setCars(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const fuse = new Fuse(cars, {
    keys: ["brand", "model", "year"],
    threshold: 0.3,
  });

  const searchedCars = search ? fuse.search(search).map((result) => result.item) : cars;
  const filteredCars = searchedCars
    .filter((car) => (typeFilter ? car.type === typeFilter : true))
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "enginePower") return b.enginePower - a.enginePower;
      return 0;
    });

  const handleSave = async (car: Car) => {
    if (car.id) {
      await axios.put(`http://localhost:5000/cars/${car.id}`, car);
      setCars(cars.map((c) => (c.id === car.id ? car : c)));
    } else {
      const { data } = await axios.post("http://localhost:5000/cars", { ...car, id: Date.now() });
      setCars([...cars, data]);
    }
    setOpen(false);
    setEditingCar(null);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:5000/cars/${id}`);
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Car Management</h1>

      <div className="flex gap-4 mb-6">
        <Input placeholder="Search by brand or model..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-1/3" />

        <select onChange={(e) => setTypeFilter(e.target.value === "all" ? undefined : e.target.value)} className="w-1/3">
          <option value="all">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Coupe">Coupe</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value === "default" ? undefined : e.target.value)} className="w-1/3">
          <option value="default">Default</option>
          <option value="price">Price (Low to High)</option>
          <option value="enginePower">Engine Power (High to Low)</option>
        </select>

        <Button onClick={() => setOpen(true)}>Add Car</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price ($)</TableHead>
            <TableHead>Engine Power (HP)</TableHead>
            <TableHead>Max Speed (km/h)</TableHead>
            {loggedUser && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>
                <img src={car.image} alt={car.model} className="w-16 h-10 object-cover rounded" />
              </TableCell>
              <TableCell>{car.brand}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell>{car.type}</TableCell>
              <TableCell>{car.price}</TableCell>
              <TableCell>{car.enginePower}</TableCell>
              <TableCell>{car.maxSpeed}</TableCell>
              {loggedUser && <TableCell>
                <Button variant="outline" size="sm" onClick={() => { setEditingCar(car); setOpen(true); }}>Edit</Button>
                <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete(car.id)}>Delete</Button>
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {open && (
        <Dialog  open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCar ? "Edit Car" : "Add Car"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 py-7">
              <Label>Image</Label>
              {/* <Input
              type="file"
                defaultValue={editingCar?.image || ""}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setEditingCar({ ...editingCar, image: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              /> */}
               <Input
                defaultValue={editingCar?.image || ""}
                onChange={(e) => setEditingCar({ ...editingCar, image: e.target.value })}
              />
              <Label>Brand</Label>
              <Input
                defaultValue={editingCar?.brand || ""}
                onChange={(e) => setEditingCar({ ...editingCar, brand: e.target.value })}
              />
              <Label>Model</Label>
              <Input
                defaultValue={editingCar?.model || ""}
                onChange={(e) => setEditingCar({ ...editingCar, model: e.target.value })}
              />
              <Label>Year</Label>
              <Input
                type="number"
                defaultValue={editingCar?.year || ""}
                onChange={(e) => setEditingCar({ ...editingCar, year: Number(e.target.value) })}
              />
              <Label>Type</Label>
              <select
                value={editingCar?.type || ""}
                onChange={(e) => setEditingCar({ ...editingCar, type: e.target.value })}
                className="w-full p-2"
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Coupe">Coupe</option>
              </select>
              <Label>Price</Label>
              <Input
                type="number"
                defaultValue={editingCar?.price || ""}
                onChange={(e) => setEditingCar({ ...editingCar, price: Number(e.target.value) })}
              />
              <Label>Engine Power</Label>
              <Input
                type="number"
                defaultValue={editingCar?.enginePower || ""}
                onChange={(e) => setEditingCar({ ...editingCar, enginePower: Number(e.target.value) })}
              />
              <Label>Fuel Efficiency</Label>
              <Input
                type="number"
                defaultValue={editingCar?.fuelEfficiency || ""}
                onChange={(e) => setEditingCar({ ...editingCar, fuelEfficiency: Number(e.target.value) })}
              />
              <Label>Max Speed</Label>
              <Input
                type="number"
                defaultValue={editingCar?.maxSpeed || ""}
                onChange={(e) => setEditingCar({ ...editingCar, maxSpeed: Number(e.target.value) })}
              />
              <Label>Acceleration</Label>
              <Input
                type="number"
                defaultValue={editingCar?.acceleration || ""}
                onChange={(e) => setEditingCar({ ...editingCar, acceleration: Number(e.target.value) })}
              />
              <Label>Weight</Label>
              <Input
                type="number"
                defaultValue={editingCar?.weight || ""}
                onChange={(e) => setEditingCar({ ...editingCar, weight: Number(e.target.value) })}
              />
            </div>
            <DialogFooter>
              <Button onClick={() => handleSave(editingCar as Car)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
