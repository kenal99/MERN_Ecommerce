import React from "react";
import "../style.css";

const Pagination = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          {[...Array(pages).keys()].map((x) => (
            <li
              className={x + 1 === page ? "page-item active_bg" : "page-item"}
              key={x + 1}
            >
              <a
                className="page-link"
                href={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `/page/${x + 1}`
                    : `/admin/productlist/${x + 1}`
                }
              >
                {x + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Pagination;
