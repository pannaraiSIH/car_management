import { useState } from "react";
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SquarePen, Trash2, Search, CirclePlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useSwal from "@/hooks/useSwal";
import MainPagination from "./MainPagination";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 7,
  });
  const { confirm } = useSwal();
  useNavigate;

  const handleSearch = () => {};

  const handlePagination = (key) => {
    const { page, total } = pagination;
    if (key === "prev") {
      if (page > 1) setPagination((prev) => ({ ...prev, page: page - 1 }));
    } else {
      if (page < total) setPagination((prev) => ({ ...prev, page: page + 1 }));
    }
  };

  const handleDelete = () => {
    console.log("delete!");
  };

  return (
    <section className="mt-4">
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
                  <TableHead className="text-right">Remark</TableHead>
                  <TableHead className="text-right">Created at</TableHead>
                  <TableHead className="text-right">Updated at</TableHead>
                  <TableHead className="text-right">Operations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1.</TableCell>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Link to={`/create/1`}>
                      <Button variant="outline" size="icon">
                        <SquarePen />
                      </Button>
                    </Link>

                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => confirm(handleDelete)}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
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
