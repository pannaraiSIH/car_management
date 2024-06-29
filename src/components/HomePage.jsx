import React from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SquarePen, Trash2, Search, CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import useSwal from "@/hooks/useSwal";

const HomePage = () => {
  const { confirm } = useSwal();

  const handleDelete = () => {
    console.log("delete!");
  };

  return (
    <section className="mt-4">
      <div className="container space-y-4">
        <div className="flex justify-between">
          <div className="w-1/3 flex gap-1">
            <Input type="text" placeholder="Search..." />
            <Button>
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
                    <Button variant="outline" size="icon">
                      <SquarePen />
                    </Button>
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
            <Pagination className="justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default HomePage;
