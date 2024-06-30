/* eslint-disable react/prop-types */
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MainPagination = ({ pagination, setPagination, handlePagination }) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="flex justify-end">
        <Select
          defaultValue={pagination.limit}
          onValueChange={(value) =>
            setPagination((prev) => ({ ...prev, limit: value }))
          }
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20].map((item) => (
              <SelectItem value={item} key={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePagination("prev")}
            />
          </PaginationItem>
          {pagination.total < 5 &&
            Array.from({ length: pagination.total }, (_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink href="#" isActive={pagination.page === idx + 1}>
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          {pagination.total > 5 &&
            pagination.page <= 5 &&
            Array.from({ length: 5 }, (_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink href="#" isActive={pagination.page === idx + 1}>
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          {pagination.total > 5 &&
            pagination.page > 5 &&
            pagination.page <= pagination.total - 3 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                {Array.from(
                  { length: 3 },
                  (_, idx) =>
                    idx + pagination.page <= pagination.total && (
                      <PaginationItem key={idx + 1}>
                        <PaginationLink
                          href="#"
                          isActive={pagination.page === idx + pagination.page}
                        >
                          {idx + pagination.page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                )}
              </>
            )}
          {pagination.total > 5 &&
            pagination.page > 5 &&
            pagination.page > pagination.total - 3 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                {Array.from({ length: 3 }, (_, idx) => (
                  <PaginationItem key={idx + 1}>
                    <PaginationLink
                      href="#"
                      isActive={
                        pagination.page === pagination.total - (3 - idx - 1)
                      }
                    >
                      {pagination.total - (3 - idx - 1)}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </>
            )}
          <PaginationItem>
            <PaginationNext href="#" onClick={() => handlePagination("next")} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MainPagination;
