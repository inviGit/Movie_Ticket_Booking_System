import React, { Component } from "react";
import VendorTable from "./tables/vendorTable";
import vendorService from "../../service/vendorService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import _ from "lodash";
import AutocompleteInput from "../common/autocompleteInput";
import { toast } from "react-toastify";
import { Button, Grid, Paper } from "@material-ui/core";
import VendorDialog from "../view/alertDialog/vendorDialog";
import DeleteDialog from "./alertDialog/deleteDialog";

export class Vendor extends Component {
  state = {
    pageTitle: "WELCOME",
    allVendors: [],
    vendors: [],
    selectedVendor: "",
    openVendorInfoDialog: false,
    openDeleteDialog: false,
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    if (localStorage.getItem("role") !== "ROLE_ADMIN") {
      this.props.history.push("/not-authorized");
      this.setState({ pageTitle: "Vendors List" });
    } else {
      vendorService.getAllVendors().then((res) => {
        console.log(res);
        this.setState({ vendors: res.data, allVendors: res.data });
      });
    }
  }

  handleRole = () => {
    const role = localStorage.getItem("role");
    if (role === "ROLE_ADMIN") {
      return (
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => this.handleVendorForm()}
        >
          Add Vendor
        </Button>
      );
    }
  };

  handleAutoCompleteSelect = (event, vendor) => {
    let a = {};
    if (_.isNull(vendor)) {
      a = { ...this.state.allVendors };
      this.setState({ vendors: a });
    } else {
      a = [vendor];
      this.setState({ vendors: a });
    }
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, vendors } = this.state;

    const sorted = _.orderBy(vendors, [sortColumn.path], [sortColumn.order]);

    const filteredVendors = paginate(sorted, currentPage, pageSize);

    return { totalCount: _.size(vendors), data: filteredVendors };
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSuccess = (message) => {
    window.location.reload();
    toast(message);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleVendorForm = () => {
    this.props.history.push("/vendor-form");
  };

  handleDelete = (vendor) => {
    this.setState({ selectedVendor: vendor, openDeleteDialog: true });
  };

  handleDeleteDialogClose = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleDeleteDialogConfirm = () => {
    vendorService.removeVendor(this.state.selectedVendor.id).then((res) => {
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  handleVendorSelect = (vendor) => {
    this.setState({ selectedVendor: vendor, openVendorInfoDialog: true });
  };

  handleVendorDialogClose = () => {
    this.setState({ selectedVendor: "", openVendorInfoDialog: false });
  };

  render() {
    const {
      allVendors,
      selectedVendor,
      openVendorInfoDialog,
      openDeleteDialog,
      pageTitle,
      pageSize,
      currentPage,
      sortColumn,
    } = this.state;

    const { totalCount, data: filteredVendors } = this.getPagedData();
    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        {!_.isEmpty(selectedVendor) && !_.isNull(selectedVendor) ? (
          <VendorDialog
            open={openVendorInfoDialog}
            data={selectedVendor}
            onDialogClose={this.handleVendorDialogClose}
          />
        ) : (
          <h1></h1>
        )}

        <DeleteDialog
          open={openDeleteDialog}
          title={`Delete Vendor?`}
          content={`This action is irreversible. Vendor will be deleted permanently`}
          onCancel={this.handleDeleteDialogClose}
          onConfirm={this.handleDeleteDialogConfirm}
        />

        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={10}>
            <Paper>
              {" "}
              <AutocompleteInput
                data={allVendors}
                label={"name"}
                onItemSelect={this.handleAutoCompleteSelect}
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <div className="col py-3 px-lg-5  bg-light">
              {this.handleRole()}
              <VendorTable
                vendors={filteredVendors}
                sortColumn={sortColumn}
                onVendorSelect={this.handleVendorSelect}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Vendor;
