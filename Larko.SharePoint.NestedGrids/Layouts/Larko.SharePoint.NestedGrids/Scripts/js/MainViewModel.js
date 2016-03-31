/// <reference path="../../../../tsdefs/knockout.d.ts" />
/// <reference path="../../../../tsdefs/sharepoint.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Larko;
(function (Larko) {
    var SharePoint;
    (function (SharePoint) {
        var NestedGrids;
        (function (NestedGrids) {
            var MainViewModel = (function (_super) {
                __extends(MainViewModel, _super);
                function MainViewModel() {
                    var _this = this;
                    _super.call(this);
                    //#region Class level variables and constructor
                    this.schools = ko.observableArray();
                    //#region Filter and Search
                    //sortField = ko.observable<Larko.SharePoint.NestedGrids.Sort>();
                    //searchText = ko.observable<string>();
                    //filters = ko.observableArray<Larko.SharePoint.NestedGrids.Filter>();
                    this.filteredSchools = ko.computed(function () {
                        var currentVM = _this;
                        if (!NestedGrids.Utilities.isObjectNullorUndefined(currentVM.schools) && !NestedGrids.Utilities.isObjectNullorUndefined(currentVM.schools())) {
                            var filtered = ko.utils.arrayFilter(currentVM.schools(), function (item) {
                                var searchVal = false, filterVal = false;
                                if (!NestedGrids.Utilities.isObjectNullorUndefined(currentVM.searchText) && !NestedGrids.Utilities.isObjectNullorUndefined(currentVM.searchText())) {
                                    if (currentVM.searchText().trim().length > 0)
                                        searchVal = NestedGrids.Utilities.isSearchStringFound(item.school(), currentVM.searchText());
                                    else
                                        searchVal = true;
                                }
                                if (!NestedGrids.Utilities.isObjectNullorUndefined(currentVM.filters) && !NestedGrids.Utilities.isObjectNullorUndefined(currentVM.filters())) {
                                    filterVal = NestedGrids.Utilities.isItemFilteredFromData(item.school(), currentVM.filters());
                                }
                                return (searchVal && filterVal);
                            });
                            if (!NestedGrids.Utilities.isObjectNullorUndefined(currentVM.sortField) && !NestedGrids.Utilities.isObjectNullorUndefined(currentVM.sortField())) {
                                return filtered.sort(function (left, right) {
                                    return NestedGrids.Utilities.sortEvaluation(currentVM.sortField(), left.school(), right.school()); // .thisSchool to compare actual School objects
                                });
                            }
                            else
                                return filtered;
                        }
                        else
                            return null;
                    });
                    this.deanOptions = ko.computed(function () {
                        var allDeans = ko.utils.arrayMap(_this.filteredSchools(), function (item) {
                            return item.school().dean();
                        }).sort();
                        var distinctDeans = ko.utils.arrayGetDistinctValues(allDeans).sort();
                        distinctDeans.splice(0, 0, "");
                        return distinctDeans;
                    });
                    //#endregion
                    //#region Paging
                    this.totalPages = ko.computed(function () {
                        if (NestedGrids.Utilities.isObjectNullorUndefined(_this.itemsPerPage()))
                            _this.itemsPerPage(parseInt($("#itemsPerPage").val()));
                        var div = Math.floor(_this.filteredSchools().length / _this.itemsPerPage());
                        div += _this.filteredSchools().length % _this.itemsPerPage() > 0 ? 1 : 0;
                        _this.totalPagesHolder.removeAll();
                        for (var i = 0; i < div; i++) {
                            _this.totalPagesHolder.push(i + 1);
                        }
                        return div - 1;
                    });
                    this.pagedSchools = ko.computed(function () {
                        if (!NestedGrids.Utilities.isObjectNullorUndefined(_this.currentPage) && !NestedGrids.Utilities.isObjectNullorUndefined(_this.currentPage()) && !NestedGrids.Utilities.isObjectNullorUndefined(_this.itemsPerPage) && !NestedGrids.Utilities.isObjectNullorUndefined(_this.itemsPerPage())) {
                            var firstItem = _this.currentPage() * _this.itemsPerPage();
                            if (!NestedGrids.Utilities.isObjectNullorUndefined(_this.filteredSchools) && !NestedGrids.Utilities.isObjectNullorUndefined(_this.filteredSchools()))
                                return _this.filteredSchools().slice(firstItem, firstItem + _this.itemsPerPage());
                            else
                                return null;
                        }
                        else {
                            return null;
                        }
                    }, this);
                    this.hasPreviousPage = ko.computed(function () {
                        return (!NestedGrids.Utilities.isObjectNullorUndefined(_this.currentPage) && !NestedGrids.Utilities.isObjectNullorUndefined(_this.currentPage()) && _this.currentPage() !== 0);
                    });
                    this.hasNextPage = ko.computed(function () {
                        return (!NestedGrids.Utilities.isObjectNullorUndefined(_this.currentPage) && !NestedGrids.Utilities.isObjectNullorUndefined(_this.currentPage()) && _this.currentPage() < _this.totalPages());
                    });
                    this.pagingOptions = [10, 25, 50, 100];
                    this.itemsPerPage(parseInt($("#itemsPerPage").val()));
                    this.loadGrid();
                }
                //#endregion
                //#endregion
                //#region Events
                MainViewModel.prototype.deleteSchoolVM = function (schoolVM) {
                    schoolVM.deleteSchool(schoolVM.school());
                    this.schools.remove(schoolVM);
                };
                //#region Sort and Filter Events
                //filtersChanged(data, event, filterControl, field) {
                //    var value = $(filterControl + " option:selected").text();
                //    if (value && (value !== "" || value !== "All")) {
                //        this.filters.push({
                //            field: field,
                //            value: value
                //        });
                //    }
                //    else {
                //        var existingFilter = ko.utils.arrayFirst(this.filters(), function (item: Filter) {
                //            if (item.field === field)
                //                return true;
                //            else
                //                return false;
                //        });
                //        if (!Utilities.isObjectNullorUndefined(existingFilter))
                //            this.filters.remove(existingFilter);
                //    }
                //    this.currentPage(0);
                //}
                //sortChanged(sortField: string) {
                //    var currSortField = "";
                //    var currSortAsc = true;
                //    if (!Utilities.isObjectNullorUndefined(this.sortField) && !Utilities.isObjectNullorUndefined(this.sortField())) {
                //        currSortField = this.sortField().sortField;
                //        currSortAsc = this.sortField().sortAsc;
                //    }
                //    if (currSortField === sortField) {
                //        this.sortField({
                //            sortField: currSortField,
                //            sortAsc: !currSortAsc
                //        });
                //    }
                //    else {
                //        this.sortField({
                //            sortField: sortField,
                //            sortAsc: true
                //        });
                //    }
                //}
                //#endregion
                //#region Paging
                MainViewModel.prototype.nextPage = function () {
                    if (this.hasNextPage())
                        this.currentPage(this.currentPage() + 1);
                };
                MainViewModel.prototype.previousPage = function () {
                    if (this.hasPreviousPage())
                        this.currentPage(this.currentPage() - 1);
                };
                MainViewModel.prototype.jumpToPage = function (pageNumber) {
                    if (pageNumber >= 1 && pageNumber <= this.totalPages() + 1)
                        this.currentPage(pageNumber - 1);
                };
                //@endregion
                //#endregion
                //#endregion
                //#region Data
                MainViewModel.prototype.loadGrid = function () {
                    var currentViewModel = this;
                    currentViewModel.retrieveSchools().then(function (item) {
                        currentViewModel.populateschools();
                    }, function (sender, args) {
                        NestedGrids.Utilities.onQueryFailed(sender, args, "Failed to get School items from list.");
                    });
                };
                MainViewModel.prototype.retrieveSchools = function () {
                    var deferred = $.Deferred();
                    var clientContext = new SP.ClientContext();
                    var oList = clientContext.get_web().get_lists().getByTitle(NestedGrids.Constants.Lists.Schools.displayName);
                    var includeFields = NestedGrids.Constants.Lists.Schools.Fields.Id.internalName + ", " + NestedGrids.Constants.Lists.Schools.Fields.Title.internalName + ", " + NestedGrids.Constants.Lists.Schools.Fields.Dean.internalName + ", " + NestedGrids.Constants.Lists.Schools.Fields.YearOpened.internalName + ", " + NestedGrids.Constants.Lists.Schools.Fields.Location.internalName;
                    var camlQuery = SP.CamlQuery.createAllItemsQuery();
                    this.schoolListItems = oList.getItems(camlQuery);
                    clientContext.load(this.schoolListItems, "Include(" + includeFields + ")");
                    clientContext.executeQueryAsync(Function.createDelegate(this, function () { deferred.resolve(this.schoolListItems); }), Function.createDelegate(this, function (sender, args) {
                        deferred.reject(sender, args);
                    }));
                    return deferred.promise();
                };
                MainViewModel.prototype.populateschools = function () {
                    if (this.schoolListItems.get_count() > 0) {
                        var listItemEnumerator = this.schoolListItems.getEnumerator();
                        while (listItemEnumerator.moveNext()) {
                            var vm = this;
                            var oListItem = listItemEnumerator.get_current();
                            var existsIndex = -1;
                            var id = oListItem.get_item(NestedGrids.Constants.Lists.Schools.Fields.Id.internalName);
                            var name = oListItem.get_item(NestedGrids.Constants.Lists.Schools.Fields.Title.internalName);
                            var dean = oListItem.get_item(NestedGrids.Constants.Lists.Schools.Fields.Dean.internalName);
                            var yearOpened = oListItem.get_item(NestedGrids.Constants.Lists.Schools.Fields.YearOpened.internalName);
                            var location = oListItem.get_item(NestedGrids.Constants.Lists.Schools.Fields.Location.internalName);
                            // Checks if the list item already exists in the ObservableArray
                            var exists = ko.utils.arrayFirst(vm.schools(), function (item) {
                                if (item.school().id === oListItem.get_item(NestedGrids.Constants.Lists.Schools.Fields.Id.internalName)) {
                                    existsIndex = ko.utils.arrayIndexOf(vm.schools(), item);
                                    return true;
                                }
                                return false;
                            });
                            if (exists)
                                this.schools.remove(exists);
                            var newSchoolVM = new NestedGrids.SchoolViewModel(name, location, yearOpened, dean, id, false, false);
                            //if (!Utilities.isObjectNullorUndefined(exists) && exists.IsDirty)
                            //    vm.schools.splice(existsIndex, 1, newSchoolVM);
                            //else if (Utilities.isObjectNullorUndefined(exists))
                            //    vm.schools.push(newSchoolVM);
                            this.schools.push(newSchoolVM);
                        }
                    }
                };
                //#endregion
                //#region Helper Functions
                MainViewModel.prototype.getSchoolTemplate = function (school) {
                    if (school.isSchoolEditing(school.school()))
                        return "schoolEditTemplate";
                    else
                        return "schoolReadTemplate";
                };
                return MainViewModel;
            }(NestedGrids.GridViewModel));
            NestedGrids.MainViewModel = MainViewModel;
        })(NestedGrids = SharePoint.NestedGrids || (SharePoint.NestedGrids = {}));
    })(SharePoint = Larko.SharePoint || (Larko.SharePoint = {}));
})(Larko || (Larko = {}));
//# sourceMappingURL=MainViewModel.js.map