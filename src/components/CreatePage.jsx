import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useSwal from "@/hooks/useSwal";

const carBrands = [
  "Audi",
  "BMW",
  "Chevrolet",
  "Ford",
  "Honda",
  "Hyundai",
  "Jeep",
  "Kia",
  "Lexus",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Toyota",
  "Volkswagen (VW)",
  "Volvo",
  "Ferrari",
  "Lamborghini",
  "Maserati",
  "Porsche",
  "Tesla",
];

const CreatePage = () => {
  const [carForm, setCarForm] = useState({
    licensePlate: "",
    brand: "",
    model: "",
    remark: "",
  });
  const { success } = useSwal();
  const { id } = useParams();

  const handleChange = (key, value) => {
    setCarForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    success();
  };

  useEffect(() => {
    const fetchCar = async () => {};
    fetchCar();
  }, [id]);

  return (
    <section className="container">
      <Card>
        <CardHeader>
          <CardTitle className="uppercase text-xl">Create</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1">
                <label htmlFor="licensePlate">License plate</label>
                <Input
                  id="licensePlate"
                  type="text"
                  placeholder="License plate"
                  value={carForm.licensePlate}
                  onChange={(e) => handleChange("licensePlate", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="brand">Brand</label>
                <Select
                  id="brand"
                  value={carForm.brand}
                  onValueChange={(value) => handleChange("brand", value)}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {carBrands.map((brand) => (
                      <SelectItem value={brand} key={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label htmlFor="model">Model</label>
                <Input
                  id="model"
                  type="text"
                  placeholder="Model"
                  value={carForm.model}
                  onChange={(e) => handleChange("model", e.target.value)}
                />
              </div>
              <div className="col-span-2 space-y-1">
                <label htmlFor="remark">Remark</label>
                <Textarea
                  id="remark"
                  placeholder="Enter..."
                  rows="5"
                  value={carForm.remark}
                  onChange={(e) => handleChange("remark", e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Link to="/">
            <Button variant="destructive">
              <p>Cancel</p>
            </Button>
          </Link>
          <Button type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default CreatePage;
