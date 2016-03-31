module Larko.SharePoint.NestedGrids {
    export class DepartmentGridViewModel extends GridViewModel {
        //#region Class level variables and constructor
        public parentSchool: KnockoutObservable<School> = ko.observable<School>();
        public departments: KnockoutObservableArray<DepartmentViewModel> = ko.observableArray<DepartmentViewModel>();

        private departmentListItems: SP.ListItemCollection;

        constructor(school: School) {
            super();
            this.parentSchool(school);
            this.loadGrid();
        }

        //#region Filter and Search

        public filteredDepartments = ko.computed(() => {
            var currentVM = this;

            currentVM.searchText($("#searchRequests").val());

            if (!Utilities.isObjectNullorUndefined(currentVM.departments) && !Utilities.isObjectNullorUndefined(currentVM.departments())) {
                var filtered = ko.utils.arrayFilter(currentVM.departments(),
                    function (item: DepartmentViewModel) {
                    var searchVal = false, filterVal = false;

                    if (!Utilities.isObjectNullorUndefined(currentVM.searchText) && !Utilities.isObjectNullorUndefined(currentVM.searchText())) {
                        if (currentVM.searchText().trim().length > 0)
                            searchVal = Utilities.isSearchStringFound(item.department(), currentVM.searchText());
                        else
                            searchVal = true;
                    }

                    if (!Utilities.isObjectNullorUndefined(currentVM.filters) && !Utilities.isObjectNullorUndefined(currentVM.filters())) {
                        filterVal = Utilities.isItemFilteredFromData(item.department(), currentVM.filters());
                    }

                    return (searchVal && filterVal);
                });

                if (!Utilities.isObjectNullorUndefined(currentVM.sortField) && !Utilities.isObjectNullorUndefined(currentVM.sortField())) {
                    return filtered.sort(function (left: DepartmentViewModel, right: DepartmentViewModel) {
                        return Utilities.sortEvaluation(currentVM.sortField(), left.department(), right.department());
                    });
                }
                else
                    return filtered;
            }
            else
                return null;
        });

        public departmentHeadOptions = ko.computed(() => {
            var allDeans = ko.utils.arrayMap(this.filteredDepartments(),
                function (item: DepartmentViewModel) {
                return item.department().departmentHead();
            }).sort();

            var distinctDeans = ko.utils.arrayGetDistinctValues(allDeans).sort();
            distinctDeans.splice(0, 0, "");

            return distinctDeans;
        });
        //#endregion
        //#endregion

        //#region Events
        public deleteDepartmentVM(departmentVM: DepartmentViewModel) {
            departmentVM.deleteDepartment(departmentVM.department());
            this.departments.remove(departmentVM);
        }

        public doDepartmentsHaveSearchMatches(searchText: string): boolean {
            var currentVM = this;
            var hasMatch = ko.utils.arrayFirst(currentVM.departments(), function(item: DepartmentViewModel) {
                if (Utilities.isSearchStringFound(item.department(), searchText))
                    return true;
                else
                    return false;
            });

            if (hasMatch)
                return true;
            else
                return false;
        }
        //#endregion

        //#region Data
        public loadGrid() {
            var currentViewModel = this;

            currentViewModel.retrieveDepartments().then(
                function () {
                    currentViewModel.populateDepartments();
                },
                function (sender, args) {
                    Utilities.onQueryFailed(sender, args, "Failed to get departments for department: " + currentViewModel.parentSchool().name());
                });
        }

        private retrieveDepartments() {
            var deferred = $.Deferred();

            var clientContext = new SP.ClientContext();
            var oList = clientContext.get_web().get_lists().getByTitle(Constants.Lists.Departments.displayName);
            var includeFields = Constants.Lists.Departments.Fields.Id.internalName + ", " + Constants.Lists.Departments.Fields.Title.internalName + ", " + Constants.Lists.Departments.Fields.DepartmentHead.internalName + ", " + Constants.Lists.Departments.Fields.School.internalName;

            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='School' LookupId= 'True' /><Value Type='Lookup' >" + this.parentSchool().id.toString() + "</Value></Eq></Where></Query></View>");
            this.departmentListItems = oList.getItems(camlQuery);

            clientContext.load(this.departmentListItems, "Include(" + includeFields + ")");

            clientContext.executeQueryAsync(
                Function.createDelegate(this,
                    function () { deferred.resolve(this.departmentListItems); }),
                Function.createDelegate(this,
                    function (sender, args) {
                        deferred.reject(sender, args);
                    })
            );

            return deferred.promise();
        }

        private populateDepartments() {
            if (this.departmentListItems.get_count() > 0) {
                var listItemEnumerator = this.departmentListItems.getEnumerator();

                while (listItemEnumerator.moveNext()) {
                    var vm = this;
                    var oListItem = listItemEnumerator.get_current();
                    var existsIndex = -1;

                    var id = oListItem.get_item(Constants.Lists.Departments.Fields.Id.internalName);
                    var name = oListItem.get_item(Constants.Lists.Departments.Fields.Title.internalName);
                    var departmentHead = oListItem.get_item(Constants.Lists.Departments.Fields.DepartmentHead.internalName);
                    var schoolId = oListItem.get_item(Constants.Lists.Departments.Fields.School.internalName);

                    // Checks if the list item already exists in the ObservableArray
                    var exists = ko.utils.arrayFirst(vm.departments(), function (item) {
                        if (item.department().id === oListItem.get_item(Constants.Lists.Departments.Fields.Id.internalName)) {
                            existsIndex = ko.utils.arrayIndexOf(vm.departments(), item);

                            return true;
                        }

                        return false;
                    });

                    if (exists)
                        this.departments.remove(exists);

                    var departmentVM = new DepartmentViewModel(id, name, departmentHead, schoolId, false, false);
                    
                    this.departments.push(departmentVM);
                }
            }
        }
        //#endregion

        //#region Helper Methods

        public getDepartmentTemplate(department: DepartmentViewModel) {
            if (department.isDepartmentEditing(department.department()))
                return "departmentEditTemplate";
            else
                return "departmentReadTemplate";
        }
        //#endregion
    }
}