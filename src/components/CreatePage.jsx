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
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useSwal from "@/hooks/useSwal";
import axiosInstance from "@/services/axiosInstance";
import Loader from "./Loader";

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
  const { isLoading, success, error, loading, hideLoading } = useSwal();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setCarForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { licensePlate, brand, model } = carForm;
      if (!licensePlate || !brand || !model) return;

      loading();

      if (!id) {
        await axiosInstance.post("/cars", carForm);
      } else {
        await axiosInstance.patch(`/cars/${id}`, carForm);
      }

      success({ title: "Updated!" });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      error();
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        loading();

        const res = await axiosInstance.get(`/cars/${id}`);
        if (res.error) throw new Error(res.message);

        delete res.data.createdAt;
        delete res.data.updatedAt;
        delete res.data.__v;
        delete res.data._id;
        hideLoading();
        setCarForm(res.data);
      } catch (err) {
        error({ text: err.message });
        setTimeout(() => navigate("/"), 2000);
      }
    };
    fetchCars();
  }, [id]);

  return (
    <section className="container">
      {isLoading && <Loader />}

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
            {id ? "Update" : "Create"}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default CreatePage;
