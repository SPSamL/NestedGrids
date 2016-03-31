module Larko.SharePoint.NestedGrids {
    export class DepartmentViewModel {
        //#region Class level variables and constructor
        public department: KnockoutObservable<Department>;
        public editingItem: KnockoutObservable<Department>;
        public facultyGrid;
        public majorGrid;
        public editTransaction = new ko.subscribable();
        
        constructor(id: number, name: string, departmentHead: string, departmentId: number, isEditing: boolean, isExpanded: boolean) {
            this.editingItem = ko.observable<Department>();
            this.department = ko.observable<Department>(new Department(id, name, departmentHead, departmentId, isEditing, isExpanded));
        }

        isDepartmentEditing(currentDepartment: Department): boolean {
            return currentDepartment === this.editingItem();
        }   
        //#endregion

        //#region Events
        saveDepartment(department: Department) {
            this.editTransaction.notifySubscribers(null, "commit");

            var currentVM = this;

            currentVM.updateListItem(department).then(
                function() {
                    currentVM.editingItem(null);
                },
                function(sender, args) {
                    Utilities.onQueryFailed(sender, args, "Failed to update Department: " + department.name());
                }
            );
        }

        cancelDepartment(department: Department) {
            this.editTransaction.notifySubscribers(null, "commit");
            this.editingItem(null);
        }

        editDepartment(department: Department) {
            department.beginEdit(this.editTransaction);
            this.editingItem(department);
        }

        deleteDepartment(department: Department) {
            this.deleteListItem(department).then(
                function() {
                    return;
                },
                function(sender, args) {
                    Utilities.onQueryFailed(sender, args, "Failed to delete Department: " + department.name());
                }
            );

            
        }

        expandDepartment(currentDepartment: Department) {
            if (this.department().isExpanded()) {
                this.department().isExpanded(false);
            }
            else {
                //currentDepartment.isExpanded(true);
                //this.departmentGrid = new NestedGrids.DepartmentGridViewModel(this.department());
                //this.departmentGrid.loadGrid();
                this.department().isExpanded(true);
            }
        }

        getDepartmentTemplate(currentDepartment: Department) {
            if (currentDepartment.isEditing()) {
                return "departmentEditTemplate";
            } else {
                return "departmentReadTemplate";
            }
        }
        //#endregion

        //#region Data
        private updateListItem(department: Department) {

            var deferred = $.Deferred();

            var clientContext = new SP.ClientContext();
            var oList = clientContext.get_web().get_lists().getByTitle(Constants.Lists.Departments.displayName);

            var updateItem = oList.getItemById(department.id);

            updateItem.set_item(Constants.Lists.Departments.Fields.Title.internalName, department.name());
            updateItem.set_item(Constants.Lists.Departments.Fields.DepartmentHead.internalName, department.departmentHead());

            updateItem.update();

            clientContext.executeQueryAsync(
                Function.createDelegate(this,
                    function () { deferred.resolve(this.updateItem); }),
                Function.createDelegate(this,
                    function (sender, args) { deferred.reject(sender, args); })
            );

            return deferred.promise();
        }

        private deleteListItem(department: Department) {

            var deferred = $.Deferred();

            var clientContext = new SP.ClientContext();
            var oList = clientContext.get_web().get_lists().getByTitle(Constants.Lists.Departments.displayName);

            var oListItem: SP.ListItem = oList.getItemById(department.id);
            
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