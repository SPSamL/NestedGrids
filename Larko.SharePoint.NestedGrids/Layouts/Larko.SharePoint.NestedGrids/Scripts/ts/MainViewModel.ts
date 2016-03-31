/// <reference path="../../../../tsdefs/knockout.d.ts" />
/// <reference path="../../../../tsdefs/sharepoint.d.ts" />

module Larko.SharePoint.NestedGrids {
    export class MainViewModel extends  GridViewModel {
        //#region Class level variables and constructor
        public schools: KnockoutObservableArray<SchoolViewModel> = ko.observableArray<SchoolViewModel>();
        private schoolListItems: SP.ListItemCollection;

        constructor() {
            super();
            this.itemsPerPage(parseInt($("#itemsPerPage").val()));
            this.loadGrid();
        }

        //#region Filter and Search
        //sortField = ko.observable<Larko.SharePoint.NestedGrids.Sort>();
        //searchText = ko.observable<string>();
        //filters = ko.observableArray<Larko.SharePoint.NestedGrids.Filter>();

        filteredSchools = ko.computed(() => {
            var currentVM = this;
            if (!Utilities.isObjectNullorUndefined(currentVM.schools) && !Utilities.isObjectNullorUndefined(currentVM.schools())) {
                var filtered = ko.utils.arrayFilter(currentVM.schools(), function (item: SchoolViewModel) {
                    var searchVal = false, filterVal = false;

                    if (!Utilities.isObjectNullorUndefined(currentVM.searchText) && !Utilities.isObjectNullorUndefined(currentVM.searchText())) {
                        if (currentVM.searchText().trim().length > 0)
                            searchVal = Utilities.isSearchStringFound(item.school(), currentVM.searchText());
                        else
                            searchVal = true;
                    }

                    if (!Utilities.isObjectNullorUndefined(currentVM.filters) && !Utilities.isObjectNullorUndefined(currentVM.filters())) {
                        filterVal = Utilities.isItemFilteredFromData(item.school(), currentVM.filters());
                    }

                    return (searchVal && filterVal);
                });

                if (!Utilities.isObjectNullorUndefined(currentVM.sortField) && !Utilities.isObjectNullorUndefined(currentVM.sortField())) {
                    return filtered.sort(function (left: SchoolViewModel, right: SchoolViewModel) {
                        return Utilities.sortEvaluation(currentVM.sortField(), left.school(), right.school()); // .thisSchool to compare actual School objects
                    });
                }
                else
                    return filtered;
            }
            else
                return null;
        });

        deanOptions = ko.computed(() => {
            var allDeans = ko.utils.arrayMap(this.filteredSchools(), function (item: SchoolViewModel) {
                return item.school().dean();
            }).sort();

            var distinctDeans = ko.utils.arrayGetDistinctValues(allDeans).sort();
            distinctDeans.splice(0, 0, "");

            return distinctDeans;
        });
        //#endregion

        //#region Paging

        public totalPages = ko.computed(() => {
            if (Utilities.isObjectNullorUndefined(this.itemsPerPage()))
                this.itemsPerPage(parseInt($("#itemsPerPage").val()));

            var div = Math.floor(this.filteredSchools().length / this.itemsPerPage());
            div += this.filteredSchools().length % this.itemsPerPage() > 0 ? 1 : 0;

            this.totalPagesHolder.removeAll();
            for (var i = 0; i < div; i++) {
                this.totalPagesHolder.push(i + 1);
            }

            return div - 1;
        });
        
        pagedSchools = ko.computed(() => {
            if (!Utilities.isObjectNullorUndefined(this.currentPage) && !Utilities.isObjectNullorUndefined(this.currentPage()) && !Utilities.isObjectNullorUndefined(this.itemsPerPage) && !Utilities.isObjectNullorUndefined(this.itemsPerPage())) {
                var firstItem = this.currentPage() * this.itemsPerPage();

                if (!Utilities.isObjectNullorUndefined(this.filteredSchools) && !Utilities.isObjectNullorUndefined(this.filteredSchools()))
                    return this.filteredSchools().slice(firstItem, firstItem + this.itemsPerPage());
                else
                    return null;
            } else {
                return null;
            }
        }, this);

        hasPreviousPage = ko.computed(() => {
            return (!Utilities.isObjectNullorUndefined(this.currentPage) && !Utilities.isObjectNullorUndefined(this.currentPage()) && this.currentPage() !== 0);
        });

        hasNextPage = ko.computed(() => {
            return (!Utilities.isObjectNullorUndefined(this.currentPage) && !Utilities.isObjectNullorUndefined(this.currentPage()) && this.currentPage() < this.totalPages());
        });

        pagingOptions: Array<number> = [10, 25, 50, 100];
        //#endregion
        //#endregion

        //#region Events
        public deleteSchoolVM(schoolVM: SchoolViewModel) {
            schoolVM.deleteSchool(schoolVM.school());
            this.schools.remove(schoolVM);
        }
        
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
        nextPage() {
            if (this.hasNextPage())
                this.currentPage(this.currentPage() + 1);
        }

        previousPage() {
            if (this.hasPreviousPage())
                this.currentPage(this.currentPage() - 1);
        }

        jumpToPage(pageNumber: number) {
            if (pageNumber >= 1 && pageNumber <= this.totalPages() + 1)
                this.currentPage(pageNumber -1);
        }
        //@endregion
        //#endregion
        //#endregion

        //#region Data
        loadGrid() {
            var currentViewModel = this;

            currentViewModel.retrieveSchools().then(
                function (item) {
                    currentViewModel.populateschools();
                },
                function (sender, args) {
                    Utilities.onQueryFailed(sender, args, "Failed to get School items from list.");
                });
        }

        private retrieveSchools() {
            var deferred = $.Deferred();

            var clientContext = new SP.ClientContext();
            var oList = clientContext.get_web().get_lists().getByTitle(Constants.Lists.Schools.displayName);
            var includeFields = Constants.Lists.Schools.Fields.Id.internalName + ", " + Constants.Lists.Schools.Fields.Title.internalName + ", " + Constants.Lists.Schools.Fields.Dean.internalName + ", " + Constants.Lists.Schools.Fields.YearOpened.internalName + ", " + Constants.Lists.Schools.Fields.Location.internalName;

            var camlQuery = SP.CamlQuery.createAllItemsQuery();
            this.schoolListItems = oList.getItems(camlQuery);

            clientContext.load(this.schoolListItems, "Include(" + includeFields + ")");

            clientContext.executeQueryAsync(
                Function.createDelegate(this,
                    function () { deferred.resolve(this.schoolListItems); }),
                Function.createDelegate(this,
                    function (sender, args) {
                        deferred.reject(sender, args);
                    })
            );

            return deferred.promise();
        }

        private populateschools() {
            if (this.schoolListItems.get_count() > 0) {
                var listItemEnumerator = this.schoolListItems.getEnumerator();

                while (listItemEnumerator.moveNext()) {
                    var vm = this;
                    var oListItem = listItemEnumerator.get_current();
                    var existsIndex = -1;

                    var id = oListItem.get_item(Constants.Lists.Schools.Fields.Id.internalName);
                    var name = oListItem.get_item(Constants.Lists.Schools.Fields.Title.internalName);
                    var dean = oListItem.get_item(Constants.Lists.Schools.Fields.Dean.internalName);
                    var yearOpened = oListItem.get_item(Constants.Lists.Schools.Fields.YearOpened.internalName);
                    var location = oListItem.get_item(Constants.Lists.Schools.Fields.Location.internalName);

                    // Checks if the list item already exists in the ObservableArray
                    var exists = ko.utils.arrayFirst(vm.schools(), function (item) {
                        if (item.school().id === oListItem.get_item(Constants.Lists.Schools.Fields.Id.internalName)) {
                            existsIndex = ko.utils.arrayIndexOf(vm.schools(), item);

                            return true;
                        }

                        return false;
                    });

                    if (exists)
                        this.schools.remove(exists);

                    var newSchoolVM = new SchoolViewModel(name, location, yearOpened, dean, id, false, false);

                    //if (!Utilities.isObjectNullorUndefined(exists) && exists.IsDirty)
                    //    vm.schools.splice(existsIndex, 1, newSchoolVM);
                    //else if (Utilities.isObjectNullorUndefined(exists))
                    //    vm.schools.push(newSchoolVM);
                    
                    this.schools.push(newSchoolVM);
                }
            }
        }
        //#endregion

        //#region Helper Functions

        public getSchoolTemplate(school: SchoolViewModel) {
            if (school.isSchoolEditing(school.school()))
                return "schoolEditTemplate";
            else
                return "schoolReadTemplate";
        }
        //#endregion
    }
}