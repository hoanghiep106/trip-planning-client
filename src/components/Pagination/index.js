import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class MainPagination extends React.Component {
  static getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage;
    let endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= 6) { // more than 10 total pages so calculate start and end pages
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
    // create an array of pages to ng-repeat in the pager control
    const pages = [];
    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(i);
    }
    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      pages,
    };
  }

  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    if (this.props.totalItems) {
      this.setPage();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage !== this.props.currentPage ||
      this.props.totalItems !== nextProps.totalItems) {
      this.setPage(nextProps.totalItems, nextProps.currentPage);
    }
  }

  setPage(totalItems, currentPage) {
    let pager = Object.assign({}, this.state.pager);
    const total = totalItems || this.props.totalItems;
    pager = MainPagination.getPager(total, currentPage, this.props.limit);
    this.setState({ pager });
  }

  changePage(page) {
    let pager = Object.assign({}, this.state.pager);
    if (page < 1 || page > pager.totalPages) {
      return;
    }
    pager = MainPagination.getPager(this.props.totalItems, page, this.props.limit);
    this.setState({ pager });
    this.props.onChangePage(page);
  }

  render() {
    const pager = Object.assign({}, this.state.pager);
    return (
      <div className="pull-right mt-2">
        <Pagination className="pointer">
          <PaginationItem disabled={pager.currentPage === 1}>
            <PaginationLink previous onClick={() => this.changePage(1)} />
          </PaginationItem>
          {pager.pages.map(page =>
            (
              <PaginationItem key={page} active={pager.currentPage === page}>
                <PaginationLink onClick={() => this.changePage(page)}>{page}</PaginationLink>
              </PaginationItem>))
          }
          <PaginationItem disabled={pager.currentPage === pager.totalPages}>
            <PaginationLink next onClick={() => this.changePage(pager.totalPages)} />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

export default MainPagination;
