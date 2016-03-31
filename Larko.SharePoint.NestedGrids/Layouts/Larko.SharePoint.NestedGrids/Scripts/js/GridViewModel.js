/// <reference path="../../../../tsdefs/sharepoint.d.ts" />
var Larko;
(function (Larko) {
    var SharePoint;
    (function (SharePoint) {
        var SPSDemo;
        (function (SPSDemo) {
            var GridViewModel = (function () {
                function GridViewModel() {
                    var _this = this;
                    this.editTransaction = new ko.subscribable();
                    //#region Filter and Search
                    this.sortField = ko.observable();
                    this.searchText = ko.observable();
                    this.filters = ko.observableArray();
                    this.filteredSchools = ko.computed(function () {
                        var currentVM = _this;
                        if (!SPSDemo.Utilities.isObjectNullorUndefined(currentVM.schools) && !SPSDemo.Utilities.isObjectNullorUndefined(currentVM.schools())) {
                            var filtered = ko.utils.arrayFilter(currentVM.schools(), function (item) {
                                var searchVal = false, filterVal = false;
                                if (!SPSDemo.Utilities.isObjectNullorUndefined(currentVM.searchText) && !SPSDemo.Utilities.isObjectNullorUndefined(currentVM.searchText())) {
                                    if (currentVM.searchText().trim().length > 0)
                                        searchVal = SPSDemo.Utilities.isSearchStringFound(item, currentVM.searchText());
                                    else
                                        searchVal = true;
                                }
                                if (!SPSDemo.Utilities.isObjectNullorUndefined(currentVM.filters) && !SPSDemo.Utilities.isObjectNullorUndefined(currentVM.filters())) {
                                    filterVal = SPSDemo.Utilities.isItemFilteredFromData(item, currentVM.filters());
                                }
                                return (searchVal && filterVal);
                            });
                            if (!SPSDemo.Utilities.isObjectNullorUndefined(currentVM.sortField) && !SPSDemo.Utilities.isObjectNullorUndefined(currentVM.sortField())) {
                                return filtered.sort(function (left, right) {
                                    return SPSDemo.Utilities.sortEvaluation(currentVM.sortField(), left, right); // .thisSchool to compare actual School objects
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
                            return item.dean();
                        }).sort();
                        var distinctDeans = ko.utils.arrayGetDistinctValues(allDeans).sort();
                        distinctDeans.splice(0, 0, "");
                        return distinctDeans;
                    });
                    //#endregion
                    //#region Paging
                    this.currentPage = ko.observable();
                    this.itemsPerPage = ko.observable();
                    this.totalPagesHolder = ko.observableArray();
                    this.totalPages = ko.computed(function () {
                        if (!SPSDemo.Utilities.isObjectNullorUndefined(_this.itemsPerPage) && SPSDemo.Utilities.isObjectNullorUndefined(_this.itemsPerPage()))
                            _this.itemsPerPage(parseInt($("#schoolsPerPage").val()));
                        // Gets total full pages, then adds a final page if there's a remainder
                        if (!SPSDemo.Utilities.isObjectNullorUndefined(_this.filteredSchools) && !SPSDemo.Utilities.isObjectNullorUndefined(_this.filteredSchools()) && !SPSDemo.Utilities.isObjectNullorUndefined(_this.itemsPerPage) && !SPSDemo.Utilities.isObjectNullorUndefined(_this.itemsPerPage())) {
                            var div = Math.floor(_this.filteredSchools().length / _this.itemsPerPage());
                            div += _this.filteredSchools().length % _this.itemsPerPage() > 0 ? 1 : 0;
                            _this.totalPagesHolder.removeAll();
                            for (var i = 1; i <= div; i++) {
                                _this.totalPagesHolder.push(i);
                            }
                            return div;
                        }
                        else {
                            return 0;
                        }
                    });
                    this.pagedSchools = ko.computed(function () {
                        if (!SPSDemo.Utilities.isObjectNullorUndefined(_this.currentPage) && !SPSDemo.Utilities.isObjectNullorUndefined(_this.currentPage()) && !SPSDemo.Utilities.isObjectNullorUndefined(_this.itemsPerPage) && !SPSDemo.Utilities.isObjectNullorUndefined(_this.itemsPerPage())) {
                            var firstItem = _this.currentPage() * _this.itemsPerPage();
                            if (!SPSDemo.Utilities.isObjectNullorUndefined(_this.filteredSchools) && !SPSDemo.Utilities.isObjectNullorUndefined(_this.filteredSchools()))
                                return _this.filteredSchools().slice(firstItem, firstItem + _this.itemsPerPage());
                            else
                                return null;
                        }
                        else {
                            return null;
                        }
                    });
                    this.hasPreviousPage = ko.computed(function () {
                        return (!SPSDemo.Utilities.isObjectNullorUndefined(_this.currentPage) && !SPSDemo.Utilities.isObjectNullorUndefined(_this.currentPage()) && _this.currentPage() !== 0);
                    });
                    this.hasNextPage = ko.computed(function () {
                        return (!SPSDemo.Utilities.isObjectNullorUndefined(_this.currentPage) && !SPSDemo.Utilities.isObjectNullorUndefined(_this.currentPage()) && _this.currentPage() < _this.totalPages());
                    });
                    this.pagingOptions = [10, 25, 50, 100];
                }
                GridViewModel.prototype.counstructor = function () {
                    this.schools = ko.observableArray();
                };
                //#endregion
                //#endregion
                //#region Events
                //#region School
                GridViewModel.prototype.addSchool = function () {
                    var newSchool = new SPSDemo.School("", "", "", "", -1, true, false);
                    if (SPSDemo.Utilities.isObjectNullorUndefined(this.schools) || SPSDemo.Utilities.isObjectNullorUndefined(this.schools()))
                        this.schools = ko.observableArray();
                    this.schools.splice(0, 0, newSchool);
                };
                GridViewModel.prototype.saveSchool = function (school) {
                };
                GridViewModel.prototype.cancelSchool = function (school) {
                    this.editTransaction.notifySubscribers(null, "commit");
                    //this.editingItem(null);
                };
                GridViewModel.prototype.editSchool = function (school) {
                    school.beginEdit(this.editTransaction);
                    //this.editingItem(school);
                };
                GridViewModel.prototype.deleteSchool = function (school) {
                };
                GridViewModel.prototype.expandSchool = function (currentSchool) {
                    if (currentSchool.isExpanded()) {
                        currentSchool.isExpanded(false);
                    }
                    else {
                        currentSchool.isExpanded(true);
                    }
                };
                //#endregion
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
                        if (!SPSDemo.Utilities.isObjectNullorUndefined(existingFilter))
                            this.filters.remove(existingFilter);
                    }
                    this.currentPage(0);
                };
                GridViewModel.prototype.sortChanged = function (sortField) {
                    var currSortField = "";
                    var currSortAsc = true;
                    if (!SPSDemo.Utilities.isObjectNullorUndefined(this.sortField) && !SPSDemo.Utilities.isObjectNullorUndefined(this.sortField())) {
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
                //#endregion
                //#region Paging
                GridViewModel.prototype.nextPage = function () {
                    if (this.hasNextPage())
                        this.currentPage(this.currentPage() + 1);
                };
                GridViewModel.prototype.previousPage = function () {
                    if (this.hasPreviousPage())
                        this.currentPage(this.currentPage() - 1);
                };
                GridViewModel.prototype.jumpToPage = function (pageNumber) {
                    if (pageNumber >= 1 && pageNumber <= this.totalPages())
                        this.currentPage(pageNumber);
                };
                //@endregion
                //#endregion
                //#endregion
                //#region Data
                GridViewModel.prototype.loadGrid = function () {
                    var currentViewModel = this;
                    currentViewModel.retrieveSchools().then(function (item) {
                        currentViewModel.populateschools();
                    }, function (sender, args) {
                        SPSDemo.Utilities.onQueryFailed(sender, args, "Failed to get School items from list.");
                    });
                };
                GridViewModel.prototype.retrieveSchools = function () {
                    var deferred = $.Deferred();
                    var clientContext = new SP.ClientContext();
                    var oList = clientContext.get_web().get_lists().getByTitle(SPSDemo.Constants.Lists.Schools.displayName);
                    var includeFields = SPSDemo.Constants.Lists.Schools.Fields.Id.internalName + ", " + SPSDemo.Constants.Lists.Schools.Fields.Title.internalName + ", " + SPSDemo.Constants.Lists.Schools.Fields.Dean.internalName + ", " + SPSDemo.Constants.Lists.Schools.Fields.YearOpened.internalName + ", " + SPSDemo.Constants.Lists.Schools.Fields.Location.internalName;
                    var camlQuery = SP.CamlQuery.createAllItemsQuery();
                    this.schoolListItems = oList.getItems(camlQuery);
                    clientContext.load(this.schoolListItems, "Include(" + includeFields + ")");
                    clientContext.executeQueryAsync(Function.createDelegate(this, function () { deferred.resolve(this.schoolListItems); }), Function.createDelegate(this, function (sender, args) {
                        deferred.reject(sender, args);
                    }));
                    return deferred.promise();
                };
                GridViewModel.prototype.populateschools = function () {
                    if (this.schoolListItems.get_count() > 0) {
                        var listItemEnumerator = this.schoolListItems.getEnumerator();
                        while (listItemEnumerator.moveNext()) {
                            var vm = this;
                            var oListItem = listItemEnumerator.get_current();
                            var existsIndex = -1;
                            var id = oListItem.get_item(SPSDemo.Constants.Lists.Schools.Fields.Id.internalName);
                            var name = oListItem.get_item(SPSDemo.Constants.Lists.Schools.Fields.Title.internalName);
                            var dean = oListItem.get_item(SPSDemo.Constants.Lists.Schools.Fields.Dean.internalName);
                            var yearOpened = oListItem.get_item(SPSDemo.Constants.Lists.Schools.Fields.YearOpened.internalName);
                            var location = oListItem.get_item(SPSDemo.Constants.Lists.Schools.Fields.Location.internalName);
                            // Checks if the list item already exists in the ObservableArray
                            var exists = ko.utils.arrayFirst(vm.schools(), function (item) {
                                if (item.id === oListItem.get_item(SPSDemo.Constants.Lists.Schools.Fields.Id.internalName)) {
                                    existsIndex = ko.utils.arrayIndexOf(vm.schools(), item);
                                    return true;
                                }
                                return false;
                            });
                            var newSchoolVM = new SPSDemo.School(name, location, yearOpened, dean, id, false, false);
                            //if (!Utilities.isObjectNullorUndefined(exists) && exists.IsDirty)
                            //    vm.schools.splice(existsIndex, 1, newSchoolVM);
                            //else if (Utilities.isObjectNullorUndefined(exists))
                            //    vm.schools.push(newSchoolVM);
                            this.schools.push(newSchoolVM);
                        }
                    }
                };
                return GridViewModel;
            })();
            SPSDemo.GridViewModel = GridViewModel;
        })(SPSDemo = SharePoint.SPSDemo || (SharePoint.SPSDemo = {}));
    })(SharePoint = Larko.SharePoint || (Larko.SharePoint = {}));
})(Larko || (Larko = {}));
//# sourceMappingURL=GridViewModel.js.map