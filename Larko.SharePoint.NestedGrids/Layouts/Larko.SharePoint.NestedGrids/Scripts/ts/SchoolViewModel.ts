module Larko.SharePoint.NestedGrids {
    export class SchoolViewModel {
        //#region Class level variables and constructor
        public school: KnockoutObservable<School>;
        public editingItem: KnockoutObservable<School>;
        public editTransaction = new ko.subscribable();
        public departmentGrid: DepartmentGridViewModel; //KnockoutObservable<DepartmentGridViewModel>;
        
        constructor(name: string, location: string, yearOpened: string, dean: string, id: number, isEditing: boolean, isExpanded: boolean) {
            this.editingItem = ko.observable<School>();
            this.school = ko.observable<School>(new School(name, location, yearOpened, dean, id, isEditing, isExpanded));
        }

        isSchoolEditing(currentSchool: School): boolean {
            return currentSchool === this.editingItem();
        }

        //#endregion

        //#region Events
        saveSchool(school: School) {
            this.editTransaction.notifySubscribers(null, "commit");

            var currentVM = this;

            currentVM.updateListItem(school).then(
                function () {
                    currentVM.editingItem(null);
                },
                function (sender, args) {
                    Utilities.onQueryFailed(sender, args, "Failed to update Department: " + school.name());
                }
            );
        }

        cancelSchool(school: School) {
            this.editTransaction.notifySubscribers(null, "rollback");
            this.editingItem(null);
            
        }

        editSchool(school: School) {
            school.beginEdit(this.editTransaction);
            this.editingItem(school);
        }

        deleteSchool(school: School) {
            this.deleteListItem(school).then(
                function() {
                    return;
                },
                function(sender, args) {
                    Utilities.onQueryFailed(sender, args, "Failed to delete School: " + school.name());
                });
        }

        expandSchool(currentSchool: School) {
            if (this.school().isExpanded()) {
                this.school().isExpanded(false);
            }
            else {
                //currentSchool.isExpanded(true);
                this.departmentGrid = new NestedGrids.DepartmentGridViewModel(this.school());
                //this.departmentGrid.loadGrid();
                this.school().isExpanded(true);               
            }
        }

        getSchoolTemplate(currentSchool: School) {
            if (currentSchool.isEditing()) {
                return "schoolEditTemplate";
            } else {
                return "schoolReadTemplate";
            }
        }
        //#endregion

        //#region Data
        private updateListItem(school: School) {

            var deferred = $.Deferred();

            var clientContext = new SP.ClientContext();
            var oList = clientContext.get_web().get_lists().getByTitle(Constants.Lists.Schools.displayName);

            var updateItem = oList.getItemById(school.id);

            updateItem.set_item(Constants.Lists.Departments.Fields.Title.internalName, school.name());
            updateItem.set_item(Constants.Lists.Schools.Fields.Dean.internalName, school.dean());

            updateItem.update();

            clientContext.executeQueryAsync(
                Function.createDelegate(this,
                    function () { deferred.resolve(this.updateItem); }),
                Function.createDelegate(this,
                    function (sender, args) { deferred.reject(sender, args); })
            );

            return deferred.promise();
        }

        private deleteListItem(school: School) {

            var deferred = $.Deferred();

            var clientContext = new SP.ClientContext();
            var oList = clientContext.get_web().get_lists().getByTitle(Constants.Lists.Schools.displayName);

            var oListItem: SP.ListItem = oList.getItemById(school.id);

            oListItem.deleteObject();

            clientContext.executeQueryAsync(
                Function.createDelegate(this,
                    function () { deferred.resolve(this.updateItem); }),
                Function.createDelegate(this,
                    function (sender, args) { deferred.reject(sender, args); }));

            return deferred.promise();
        }
        //#endregion
    }
}