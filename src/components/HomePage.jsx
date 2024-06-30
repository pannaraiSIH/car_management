import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SquarePen, Trash2, Search, CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import useSwal from "@/hooks/useSwal";
import MainPagination from "./MainPagination";
import Loader from "./Loader";
import axiosInstance from "@/services/axiosInstance";
import Swal from "sweetalert2";

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 7,
  });
  const { isLoading, success, confirm, loading, hideLoading, error } =
    useSwal();

  const dateFormat = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleSearch = () => {};

  const handlePagination = (key) => {
    const { page, total } = pagination;
    if (key === "prev") {
      if (page > 1) setPagination((prev) => ({ ...prev, page: page - 1 }));
    } else {
      if (page < total) setPagination((prev) => ({ ...prev, page: page + 1 }));
    }
  };

  const fetchCars = async () => {
    try {
      loading();
      const res = await axiosInstance.get("/cars");
      hideLoading();
      setCars(res.data);
    } catch (err) {
      error();
    }
  };

  const handleDelete = async (id) => {
    try {
      loading();
      const res = await axiosInstance.delete(`/cars/${id}`);
      if (res.error) throw new Error(res.message);
      success({ title: "Delete!" });
    } catch (err) {
      error({ text: err.message });
    } finally {
      fetchCars();
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <section className="mt-4">
      {isLoading && <Loader />}
      <div className="container space-y-4">
        <div className="flex justify-between">
          <div className="w-1/3 flex gap-1">
            <Input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={handleSearch}>
              <Search />
            </Button>
          </div>
          <Link to="/create">
            <Button className="space-x-2">
              <CirclePlus />
              <p>Add</p>
            </Button>
          </Link>
        </div>
        {/* table */}
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">No.</TableHead>
                  <TableHead className="">License plate</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead className="text-center">Remark</TableHead>
                  <TableHead className="text-right">Created at</TableHead>
                  <TableHead className="text-right">Updated at</TableHead>
                  <TableHead className="text-right">Operations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!cars.length && (
                  <TableRow>
                    <TableCell
                      colSpan="8"
                      className="text-center py-4 text-gray-400"
                    >
                      No Items
                    </TableCell>
                  </TableRow>
                )}
                {cars.map((car, index) => (
                  <TableRow key={car._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {car.licensePlate}
                    </TableCell>
                    <TableCell>{car.brand}</TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell className="w-[8rem] text-center text-ellipsis">
                      {car.remark || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {dateFormat(car.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      {dateFormat(car.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right flex gap-2 justify-end">
                      <Link to={`/create/${car._id}`}>
                        <Button variant="outline" size="icon">
                          <SquarePen />
                        </Button>
                      </Link>

                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => confirm(() => handleDelete(car._id))}
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <MainPagination
              pagination={pagination}
              handlePagination={handlePagination}
            />
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default HomePage;
