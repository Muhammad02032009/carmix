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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import type { RootState } from "@/shared/store/store";
import Image from "next/image";

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
  const [editingCar, setEditingCar] = useState<Partial<Car> | null>(null);
  const { loggedUser } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:7000/cars");
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

  const searchedCars = search
    ? fuse.search(search).map((result) => result.item)
    : cars;
  const filteredCars = searchedCars
    .filter((car) => (typeFilter ? car.type === typeFilter : true))
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "enginePower") return b.enginePower - a.enginePower;
      return 0;
    });

  const handleSave = async (car: Car) => {
    try {
      if (car.id) {
        const { data } = await axios.put(
          `http://localhost:7000/cars/${car.id}`,
          car,
          {
            headers: { "Content-Type": "application/json" },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          }
        );
        setCars(cars.map((c) => (c.id === car.id ? data : c)));
      } else {
        const { data } = await axios.post(
          "http://localhost:7000/cars",
          { ...car, id: Date.now().toString() },
          {
            headers: { "Content-Type": "application/json" },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          }
        );
        setCars([...cars, data]);
      }
      setOpen(false);
      setEditingCar(null);
    } catch (error) {
      console.error("Ошибка при сохранении машины:", error);
      alert("Ошибка при сохранении данных!");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setCars(cars.filter((car) => car.id !== id));
      await axios.delete(`http://localhost:7000/cars/${id}`);
    } catch (error) {
      console.error("Ошибка при удалении машины:", error);
      alert("Ошибка при удалении машины!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Car Management</h1>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by brand or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />

        <select
          onChange={(e) =>
            setTypeFilter(e.target.value === "all" ? undefined : e.target.value)
          }
          className="w-1/3"
        >
          <option value="all">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Coupe">Coupe</option>
        </select>

        <select
          onChange={(e) =>
            setSortBy(e.target.value === "default" ? undefined : e.target.value)
          }
          className="w-1/3"
        >
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
                <Image
                  src={car.image || "/placeholder.svg"}
                  alt={car.model}
                  width={64}
                  height={40}
                  className="object-cover rounded"
                />
              </TableCell>
              <TableCell>{car.brand}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell>{car.type}</TableCell>
              <TableCell>{car.price}</TableCell>
              <TableCell>{car.enginePower}</TableCell>
              <TableCell>{car.maxSpeed}</TableCell>
              {loggedUser && (
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingCar(car);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleDelete(car.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-full  p-0 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <DialogHeader className="p-3 bg-gradient-to-r from-blue-600 to-purple-600">
              <DialogTitle className="text-2xl font-bold">
                {editingCar ? "Edit Car" : "Add New Car"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex  gap-6 p-6">
              <div className="col-span-1 md:col-span-4">
                <Label className="text-lg font-semibold mb-2 block">
                  Car Image
                </Label>
                <div className="flex flex-col w-[400px] items-center bg-gray-800 p-4 rounded-lg shadow-inner">
                  <Image
                    src={editingCar?.image || "/placeholder.svg"}
                    alt="Car Image"
                    width={300}
                    height={200}
                    className="object-cover rounded-lg mb-4 shadow-lg trans bn ition-transform duration-300 hover:scale-105"
                  />
                  <Input
                    type="file"
                    className="bg-gray-700 text-white file:bg-blue-600 file:text-white file:border-0 file:rounded-full file:px-4  file:mr-4 file:hover:bg-blue-700 transition-colors duration-300"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditingCar((prev) => ({
                            ...prev,
                            image: reader.result as string,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex ml-10 mt-3 mb-10 space-x-6">
                  <div>
                    <Label className="text-sm font-medium mb-1 block">
                      Brand
                    </Label>
                    <Input
                      value={editingCar?.brand || ""}
                      onChange={(e) =>
                        setEditingCar({ ...editingCar, brand: e.target.value })
                      }
                      className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1 block">
                      Model
                    </Label>
                    <Input
                      value={editingCar?.model || ""}
                      onChange={(e) =>
                        setEditingCar({ ...editingCar, model: e.target.value })
                      }
                      className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1 block">
                      Year
                    </Label>
                    <Input
                      type="number"
                      value={editingCar?.year || ""}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          year: Number(e.target.value),
                        })
                      }
                      className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1 block">
                      Type
                    </Label>
                    <select
                      value={editingCar?.type || ""}
                      onChange={(e) =>
                        setEditingCar({ ...editingCar, type: e.target.value })
                      }
                      className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:border-blue-500 transition-colors duration-300"
                    >
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Coupe">Coupe</option>
                    </select>
                  </div>
                </div>
                <div className="flex ml-10 mb-10 space-x-6">
                  <div>
                    <Label className="text-sm font-medium mb-1 block">
                      Price ($)
                    </Label>
                    <Input
                      type="number"
                      value={editingCar?.price || ""}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          price: Number(e.target.value),
                        })
                      }
                      className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1 block">
                      Engine Power (HP)
                    </Label>
                    <Input
                      type="number"
                      value={editingCar?.enginePower || ""}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          enginePower: Number(e.target.value),
                        })
                      }
                      className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1 block">
                      Fuel Efficiency (km/L)
                    </Label>
                    <Input
                      type="number"
                      value={editingCar?.fuelEfficiency || ""}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          fuelEfficiency: Number(e.target.value),
                        })
                      }
                      className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1 block">
                      Max Speed (km/h)
                    </Label>
                    <Input
                      type="number"
                      value={editingCar?.maxSpeed || ""}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          maxSpeed: Number(e.target.value),
                        })
                      }
                      className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                </div>
                <div className="col-span-1  ml-10 mb-10 space-x-6 md:col-span-2 grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1 block">
                      Acceleration (0-100 km/h in seconds)
                    </Label>
                    <Input
                      type="number"
                      value={editingCar?.acceleration || ""}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          acceleration: Number(e.target.value),
                        })
                      }
                      className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1 block">
                      Weight (kg)
                    </Label>
                    <Input
                      type="number"
                      value={editingCar?.weight || ""}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          weight: Number(e.target.value),
                        })
                      }
                      className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="bg-gray-900 p-4">
              <Button
                onClick={() => handleSave(editingCar as Car)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
