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
            var DepartmentGridViewModel = (function (_super) {
                __extends(DepartmentGridViewModel, _super);
                function DepartmentGridViewModel(school) {
                    var _this = this;
                    _super.call(this);
                    //#region Class level variables and constructor
                    this.parentSchool = ko.observable();
                    this.departments = ko.observableArray();
                    //#region Filter and Search
                    //sortField = ko.observable<Sort>();
                    //searchText = ko.observable<string>();
                    //filters = ko.observableArray<Filter>();
                    this.filteredDepartments = ko.computed(function () {
                        var currentVM = _this;
                        currentVM.searchText($("#searchRequests").val());
                        if (!NestedGrids.Utilities.isObjectNullorUndefined(currentVM.departments) && !NestedGrids.Utilities.isObjectNullorUndefined(currentVM.departments())) {
                            var filtered = ko.utils.arrayFilter(currentVM.departments(), function (item) {
                                var searchVal = false, filterVal = false;
                                if (!NestedGrids.Utilities.isObjectNullorUndefined(currentVM.searchText) && !NestedGrids.Utilities.isObjectNullorUndefined(currentVM.searchText())) {
                                    if (currentVM.searchText().trim().length > 0)
                                        searchVal = NestedGrids.Utilities.isSearchStringFound(item.department(), currentVM.searchText());
                                    else
                                        searchVal = true;
                                }
                                if (!NestedGrids.Utilities.isObjectNullorUndefined(currentVM.filters) && !NestedGrids.Utilities.isObjectNullorUndefined(currentVM.filters())) {
                                    filterVal = NestedGrids.Utilities.isItemFilteredFromData(item.department(), currentVM.filters());
                                }
                                return (searchVal && filterVal);
                            });
                            if (!NestedGrids.Utilities.isObjectNullorUndefined(currentVM.sortField) && !NestedGrids.Utilities.isObjectNullorUndefined(currentVM.sortField())) {
                                return filtered.sort(function (left, right) {
                                    return NestedGrids.Utilities.sortEvaluation(currentVM.sortField(), left.department(), right.department());
                                });
                            }
                            else
                                return filtered;
                        }
                        else
                            return null;
                    });
                    this.departmentHeadOptions = ko.computed(function () {
                        var allDeans = ko.utils.arrayMap(_this.filteredDepartments(), function (item) {
                            return item.department().departmentHead();
                        }).sort();
                        var distinctDeans = ko.utils.arrayGetDistinctValues(allDeans).sort();
                        distinctDeans.splice(0, 0, "");
                        return distinctDeans;
                    });
                    this.parentSchool(school);
                    this.loadGrid();
                }
                //#endregion
                //#endregion
                //#region Events
                DepartmentGridViewModel.prototype.deleteDepartmentVM = function (departmentVM) {
                    departmentVM.deleteDepartment(departmentVM.department());
                    this.departments.remove(departmentVM);
                };
                DepartmentGridViewModel.prototype.doDepartmentsHaveSearchMatches = function (searchText) {
                    var currentVM = this;
                    var hasMatch = ko.utils.arrayFirst(currentVM.departments(), function (item) {
                        if (NestedGrids.Utilities.isSearchStringFound(item.department(), searchText))
                            return true;
                        else
                            return false;
                    });
                    if (hasMatch)
                        return true;
                    else
                        return false;
                };
                //#endregion
                //#region Data
                DepartmentGridViewModel.prototype.loadGrid = function () {
                    var currentViewModel = this;
                    currentViewModel.retrieveDepartments().then(function () {
                        currentViewModel.populateDepartments();
                    }, function (sender, args) {
                        NestedGrids.Utilities.onQueryFailed(sender, args, "Failed to get departments for department: " + currentViewModel.parentSchool().name());
                    });
                };
                DepartmentGridViewModel.prototype.retrieveDepartments = function () {
                    var deferred = $.Deferred();
                    var clientContext = new SP.ClientContext();
                    var oList = clientContext.get_web().get_lists().getByTitle(NestedGrids.Constants.Lists.Departments.displayName);
                    var includeFields = NestedGrids.Constants.Lists.Departments.Fields.Id.internalName + ", " + NestedGrids.Constants.Lists.Departments.Fields.Title.internalName + ", " + NestedGrids.Constants.Lists.Departments.Fields.DepartmentHead.internalName + ", " + NestedGrids.Constants.Lists.Departments.Fields.School.internalName;
                    var camlQuery = new SP.CamlQuery();
                    camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='School' LookupId= 'True' /><Value Type='Lookup' >" + this.parentSchool().id.toString() + "</Value></Eq></Where></Query></View>");
                    this.departmentListItems = oList.getItems(camlQuery);
                    clientContext.load(this.departmentListItems, "Include(" + includeFields + ")");
                    clientContext.executeQueryAsync(Function.createDelegate(this, function () { deferred.resolve(this.departmentListItems); }), Function.createDelegate(this, function (sender, args) {
                        deferred.reject(sender, args);
                    }));
                    return deferred.promise();
                };
                DepartmentGridViewModel.prototype.populateDepartments = function () {
                    if (this.departmentListItems.get_count() > 0) {
                        var listItemEnumerator = this.departmentListItems.getEnumerator();
                        while (listItemEnumerator.moveNext()) {
                            var vm = this;
                            var oListItem = listItemEnumerator.get_current();
                            var existsIndex = -1;
                            var id = oListItem.get_item(NestedGrids.Constants.Lists.Departments.Fields.Id.internalName);
                            var name = oListItem.get_item(NestedGrids.Constants.Lists.Departments.Fields.Title.internalName);
                            var departmentHead = oListItem.get_item(NestedGrids.Constants.Lists.Departments.Fields.DepartmentHead.internalName);
                            var schoolId = oListItem.get_item(NestedGrids.Constants.Lists.Departments.Fields.School.internalName);
                            // Checks if the list item already exists in the ObservableArray
                            var exists = ko.utils.arrayFirst(vm.departments(), function (item) {
                                if (item.department().id === oListItem.get_item(NestedGrids.Constants.Lists.Departments.Fields.Id.internalName)) {
                                    existsIndex = ko.utils.arrayIndexOf(vm.departments(), item);
                                    return true;
                                }
                                return false;
                            });
                            if (exists)
                                this.departments.remove(exists);
                            var departmentVM = new NestedGrids.DepartmentViewModel(id, name, departmentHead, schoolId, false, false);
                            this.departments.push(departmentVM);
                        }
                    }
                };
                //#endregion
                //#region Helper Methods
                DepartmentGridViewModel.prototype.getDepartmentTemplate = function (department) {
                    if (department.isDepartmentEditing(department.department()))
                        return "departmentEditTemplate";
                    else
                        return "departmentReadTemplate";
                };
                return DepartmentGridViewModel;
            }(NestedGrids.GridViewModel));
            NestedGrids.DepartmentGridViewModel = DepartmentGridViewModel;
        })(NestedGrids = SharePoint.NestedGrids || (SharePoint.NestedGrids = {}));
    })(SharePoint = Larko.SharePoint || (Larko.SharePoint = {}));
})(Larko || (Larko = {}));
//# sourceMappingURL=DepartmentGridViewModel.js.map