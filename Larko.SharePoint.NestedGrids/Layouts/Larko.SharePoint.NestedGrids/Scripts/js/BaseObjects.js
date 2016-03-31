var Larko;
(function (Larko) {
    var SharePoint;
    (function (SharePoint) {
        var NestedGrids;
        (function (NestedGrids) {
            var GridViewModel = (function () {
                function GridViewModel() {
                    //#region Class level variales and constructor
                    //#region Paging
                    this.currentPage = ko.observable(0);
                    this.itemsPerPage = ko.observable(null);
                    this.totalPagesHolder = ko.observableArray(null);
                    //#endregion
                    //#region Sort and Filter
                    this.sortField = ko.observable();
                    this.searchText = ko.observable("");
                    this.filters = ko.observableArray();
                }
                //#endregion
                //#endregion
                //#region Events
                //#region Sort and Filter Events
                GridViewModel.prototype.filtersChanged = function (data, event, filterControl, field) {
                    var value = $(filterControl + " option:selected").text();
                    if (value && (value !== "" || value !== "All")) {
                        this.filters.push({
                            field: field,
                            value: value
                        });
                    }
                    else {
                        var existingFilter = ko.utils.arrayFirst(this.filters(), function (item) {
                            if (item.field === field)
                                return true;
                            else
                                return false;
                        });
                        if (!NestedGrids.Utilities.isObjectNullorUndefined(existingFilter))
                            this.filters.remove(existingFilter);
                    }
                    this.currentPage(0);
                };
                GridViewModel.prototype.sortChanged = function (sortField) {
                    var currSortField = "";
                    var currSortAsc = true;
                    if (!NestedGrids.Utilities.isObjectNullorUndefined(this.sortField) && !NestedGrids.Utilities.isObjectNullorUndefined(this.sortField())) {
                        currSortField = this.sortField().sortField;
                        currSortAsc = this.sortField().sortAsc;
                    }
                    if (currSortField === sortField) {
                        this.sortField({
                            sortField: currSortField,
                            sortAsc: !currSortAsc
                        });
                    }
                    else {
                        this.sortField({
                            sortField: sortField,
                            sortAsc: true
                        });
                    }
                };
                GridViewModel.prototype.getSortImage = function (sortField) {
                    if (!NestedGrids.Utilities.isObjectNullorUndefined(this.sortField) && !NestedGrids.Utilities.isObjectNullorUndefined(this.sortField()) && this.sortField().sortField === sortField) {
                        if (this.sortField().sortAsc)
                            return "/sites/spssa/_layouts/Larko.SharePoint.NestedGrids/css/uparrow.png";
                        else
                            return "/sites/spssa/_layouts/Larko.SharePoint.NestedGrids/css/downarrow.png";
                    }
                    else {
                        return "/sites/spssa/_layouts/images/blank.gif";
                    }
                };
                return GridViewModel;
            }());
            NestedGrids.GridViewModel = GridViewModel;
            var ItemViewModel = (function () {
                function ItemViewModel() {
                }
                return ItemViewModel;
            }());
            NestedGrids.ItemViewModel = ItemViewModel;
        })(NestedGrids = SharePoint.NestedGrids || (SharePoint.NestedGrids = {}));
    })(SharePoint = Larko.SharePoint || (Larko.SharePoint = {}));
})(Larko || (Larko = {}));
//# sourceMappingURL=BaseObjects.js.map